import { mongoose } from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: { type: String, required: true },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['personal', 'home', 'work'],
      required: true,
      default: 'personal',
    },
  },
  {
    Timestamp: true,
  },
);

export const Contact = mongoose.model('Contact', contactSchema);

