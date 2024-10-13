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
import { validateBody } from '../middlewares/validateBody.js';
import { isValidID } from '../middlewares/isValidID.js';
import { contactSchema, contactPatchSchema } from '../validation/contact.js'
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticate)

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', isValidID, ctrlWrapper(getContactByIdController));

router.post('/', validateBody(contactSchema), ctrlWrapper(createContactController));

router.delete('/:id', isValidID, ctrlWrapper(deleteContactController));

router.put('/:id', isValidID, validateBody(contactSchema), ctrlWrapper(upsertContactController));

router.patch('/:id', isValidID, validateBody(contactPatchSchema), ctrlWrapper(patchContactController));

export default router;
