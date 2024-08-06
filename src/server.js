import express from 'express';
import dotenv from 'dotenv';
import { initMongoDb } from './db/initMongoDb.js';
import { env } from './utils/env.js';
import pino from 'pino-http';
import cors from 'cors';
import { Contact } from './models/contact.js';
dotenv.config();

const PORT = Number(env('PORT', '8080'));

export async function setupServer() {
  const app = express();
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json({ data: contacts });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Oops, our faults' });
    }
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (contact === null) {
      return res.status(404).send({ message: 'Contact not found' });
    }
    res.status(200).json({ data: contact });
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
  });

  try {
    await initMongoDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
