import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowAvailableAppointments(req: Request, res: Response) {
    const { salonId, date, time } = req.query;

    try {
        if (!salonId || !date || typeof date !== 'string' || !time || typeof time !== 'string') {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }

        const findStaffId = await prisma.salonStaff.findMany({
            where: {
                salonId: Number(salonId)
            },
            select: {
                staffID: true
            }
        });

        if (findStaffId.length === 0) {
            return res.status(404).json({ status: 404, error: 'No staff found for the provided salonId' });
        }

        const staffIdOfSalon = findStaffId.map(service => service.staffID);
        const resultsTwo: unknown[] = [];

        for (let i = 0; i < staffIdOfSalon.length; i++) {
            const findBlocks = await prisma.appointmentBlock.findMany({
                where: {
                    staffId: staffIdOfSalon[i],
                    isBook: true,
                    date: date,
                    endTime: {
                        gt: time
                    },
                    customerAppointmentBlock: {
                        some: {
                            isCancel: false,
                            isReject: null,
                        }
                    }
                },
                select: {
                    startTime: true,
                    endTime: true,
                    staff: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            salonStaff: {
                                select: {
                                    salonId: true
                                }
                            }
                        }
                    },
                    customerAppointmentBlock: {
                        select: {
                            isCancel: true,
                            isReject: true,
                            startTime: true,
                            customerId: true,
                            date: true,
                            customer: {
                                select: {
                                    name: true,
                                    gender: true,
                                    image: true,
                                    contactNo: true,
                                }
                            }
                        }
                    },
                    serviceAppointmentBlock: {
                        select: {
                            service: {
                                select: {
                                    name: true,
                                    price: true,
                                }
                            }
                        }
                    }
                }
            });

            if (findBlocks.length > 0) {
                resultsTwo.push(...findBlocks);
            }
        }

        if (resultsTwo.length === 0) {
            return res.status(404).json({ status: 404, error: 'No available appointments found' });
        }

        return res.status(200).json({ status: 200, data: resultsTwo, message: 'Successfully displayed appointments.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
