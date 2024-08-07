import express from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

router.put('/:id', ctrlWrapper(upsertContactController));

router.patch('/:id', ctrlWrapper(patchContactController));

export default router;
