import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCustomers(req: Request, res: Response) {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        gender: true,
        email: true,
        review: true,
        customerAppointmentBlock: true,
      },
    });
    console.log('Admin - get all customer function called');
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ status: 500, error: 'Failed to get customer data' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCustomerById(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ status: 400, error: 'Customer ID is required' });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        gender: true,
        email: true,
        review: true,
        customerAppointmentBlock: {
          select: {
            staffId: true,
            startTime: true,
            isCancel: true,
            date: true,
            customerId: true,
          },
        },
      },
    });

    if (!customer) {
      return res.status(404).json({ status: 404, error: 'Customer not found' });
    }

    // Add a formattedDate field for each customerAppointmentBlock
    if (customer.customerAppointmentBlock) {
      customer.customerAppointmentBlock = customer.customerAppointmentBlock.map((appointment) => ({
        ...appointment,
        formattedDate: appointment.date.toISOString().split('T')[0], // Converts to 'YYYY-MM-DD' format
      }));
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    return res.status(500).json({ status: 500, error: 'Failed to get customer data' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ status: 400, error: 'Customer ID is required' });
  }

  try {
    // Delete the customer
    await prisma.customer.findMany({
      where: { id: Number(id) },
    });

    res.status(200).json('Csutomer deleted');
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ status: 500, error: 'Failed to delete customer' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCustomerCount(req: Request, res: Response) {
  try {
    const count = await prisma.customer.count();
    console.log({ 'customer count': count });
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching customer count:', error);
    return res.status(500).json({ status: 500, error: 'Failed to get customer count' });
  } finally {
    await prisma.$disconnect();
  }
}
