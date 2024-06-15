import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createService(req: Request, res: Response) {
  const { name, serviceType, price, duration } = req.body;

  if (!name || !serviceType || !price || !duration) {
    return res.status(400).json({ status: 400, error: 'Inputs not found' });
  }

  try {
    const service = await prisma.service.create({
      data: {
        name: name,
        serviceType: serviceType,
        price: price,
        duration: duration,
      },
    });
    res.status(201).json({ status: 201, message: 'Service created', data: service });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ status: 500, error: 'Failed to create service' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllServies(req: Request, res: Response) {
  try {
    const services = await prisma.service.findMany();
    res.status(200).json({ status: 200, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ status: 500, error: 'Failed to fetch services' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getServiceById(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ status: 400, error: 'Service ID not found' });
  }

  try {
    const service = await prisma.service.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ status: 200, data: service });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ status: 500, error: 'Failed to fetch service' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateService(req: Request, res: Response) {
  const { id } = req.params;
  const { name, serviceType, price, duration } = req.body;

  if (!id) {
    return res.status(400).json({ status: 400, error: 'Service ID is required' });
  }

  try {
    const updatedService = await prisma.service.update({
      where: { id: Number(id) },
      data: {
        name,
        serviceType,
        price,
        duration,
      },
    });

    res.status(200).json({ status: 200, message: 'Service updated', data: updatedService });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ status: 500, error: 'Failed to update service' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteService(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ status: 400, error: 'Service ID is required' });
  }

  try {
    // Delete related records in serviceStaff
    await prisma.serviceStaff.deleteMany({
      where: { serviceId: Number(id) },
    });

    // Delete related records in serviceAppointmentBlock
    await prisma.serviceAppointmentBlock.deleteMany({
      where: { serviceId: Number(id) },
    });

    // Delete the service
    await prisma.service.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ status: 200, message: 'Service deleted' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ status: 500, error: 'Failed to delete service' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getServiceCount(req: Request, res: Response) {
  try {
    const count = await prisma.service.count();
    console.log({ 'service count': count });
    res.status(200).json({ count: count });
  } catch (error) {
    console.error('Error fetching service count:', error);
    res.status(500).json({ status: 500, error: 'Failed to fetch service count' });
  } finally {
    await prisma.$disconnect();
  }
}
