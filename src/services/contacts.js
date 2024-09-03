import { Contact } from '../models/contact.js';


export const getContacts = async () => {
  return await Contact.find();
}

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
}

export const createContact = async (payload) => {
  return await Contact.create(payload);

};

export const deleteContact = async (contactId) => {
  return await Contact.findOneAndDelete({ _id: contactId });

};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
