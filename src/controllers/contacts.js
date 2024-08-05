import { Contact } from '../models/contact.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).send(contacts);
};

export const getContactByIdController = async ({id}, res) => {
  const contact = await Contact.findById(id);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.send(contact);
};
