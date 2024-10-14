import { Contact } from '../models/contact.js';

export const getContacts = async ({ page, perPage, sortBy, sortOrder, filter: { contactType, isFavourite }, userId }) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (typeof contactType !== 'undefined') {
    contactQuery.where({ contactType: { $eq: contactType } })
  }

  if (typeof isFavourite !== 'undefined') {
    contactQuery.where({ isFavourite: { $eq: isFavourite } })
  }

  contactQuery.where("userId").equals(userId);

  const [count, contacts] = await Promise.all([
    Contact.find().countDocuments(),
    contactQuery.sort({ [sortBy]: sortOrder }).skip(skip).limit(perPage)
  ]);
  const totalPages = Math.ceil(count / perPage);


  return { data: contacts, page, perPage, totalItems: count, hasNextPage: totalPages - page > 0, hasPreviousPage: page > 1 };
}

export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
}

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
  return contact;
};

export const updateContact = async (contactId, userId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    userId,
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