import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// Define an endpoint to fetch service names
app.get('/services', async (req, res) => {
  try {
    // Query the database to get all service names
    const services = await prisma.service.findMany({
      select: {
        name: true // Select only the 'name' field
      }
    });

    // Extract service names from the query result
    const serviceNames = services.map(service => service.name);

    // Send the list of service names as a response
    res.json(serviceNames);
  } catch (error) {
    console.error('Error fetching service names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
