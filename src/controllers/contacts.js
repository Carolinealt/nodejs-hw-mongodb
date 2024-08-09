import {
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import { Contact } from '../models/contact.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).send(contact);
};

export const createContactController = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const contact = {
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  };

  const createdContact = await createContact(contact);
  console.log(createdContact);
  res.send({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await deleteContact(id);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).end();
};

export const upsertContactController = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body, { upsert: true });
  console.log(req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).send({
    status,
    message: 'Successfully upserted a contact!',
    data: result.contact,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};
