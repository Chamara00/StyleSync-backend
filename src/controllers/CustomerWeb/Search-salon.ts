import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SalonResponse {
    id: number;
    name: string;
    line1: string | null;
    line2: string | null;
    city: string | null;
    country: string | null;
    reviews: {
        id: number;
        time: string;
        date: Date;
        value: number;
        customerId: number;
        salonId: number;
    }[];
    services: string[];
}

export async function SearchResult(req: Request, res: Response) {
    const { searchValue, searchType } = req.body;

    try {
        if (!searchValue || !searchType) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }

        let salons: SalonResponse[] = [];

        if (searchType === 'nameOrLocation') {
            // Search salons by name or location
            const foundSalons = await prisma.salon.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: searchValue,
                                mode: 'insensitive', // Case-insensitive search
                            },
                        },
                        {
                            location: {
                                contains: searchValue,
                                mode: 'insensitive', // Case-insensitive search
                            },
                        },
                    ],
                },
                include: {
                    review: true,
                    salonStaff: {
                        include: {
                            staff: {
                                include: {
                                    serviceStaff: {
                                        include: {
                                            Service: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            salons = foundSalons.map(salon => ({
                id: salon.id,
                name: salon.name,
                line1: salon.line1,
                line2: salon.line2,
                city: salon.city,
                country: salon.country,
                reviews: salon.review,
                services: Array.from(new Set(salon.salonStaff.flatMap(salonStaff =>
                    salonStaff.staff.serviceStaff.map(ss => ss.Service.name)
                ))),
            }));
        } else if (searchType === 'serviceName') {
            // Search salons by service name
            const services = await prisma.service.findMany({
                where: {
                    name: {
                        contains: searchValue,
                        mode: 'insensitive', // Case-insensitive search
                    },
                },
                include: {
                    serviceStaff: {
                        include: {
                            staff: {
                                include: {
                                    salonStaff: {
                                        include: {
                                            salon: {
                                                include: {
                                                    review: true,
                                                    salonStaff: {
                                                        include: {
                                                            staff: {
                                                                include: {
                                                                    serviceStaff: {
                                                                        include: {
                                                                            Service: true,
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            // Extract unique salons from the services
            const salonMap = new Map<number, SalonResponse>();
            services.forEach(service => {
                service.serviceStaff.forEach(serviceStaff => {
                    serviceStaff.staff.salonStaff.forEach(salonStaff => {
                        const salon = salonStaff.salon;
                        if (!salonMap.has(salon.id)) {
                            salonMap.set(salon.id, {
                                id: salon.id,
                                name: salon.name,
                                line1: salon.line1,
                                line2: salon.line2,
                                city: salon.city,
                                country: salon.country,
                                reviews: salon.review,
                                services: [],
                            });
                        }
                        const salonEntry = salonMap.get(salon.id);
                        salonEntry?.services.push(service.name);
                    });
                });
            });

            // Convert the map to an array of results
            salons = Array.from(salonMap.values());
        } else {
            return res.status(400).json({ status: 400, error: 'Invalid search type' });
        }

        if (salons.length === 0) {
            return res.status(404).json({ status: 404, error: 'No matching salons found' });
        }

        return res.status(200).json({ status: 200, data: salons });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Failed to process search result' });
    } finally {
        await prisma.$disconnect();
    }
}
