import { Model, Schema, model } from 'mongoose'
import { ICow } from './cow.interface'
import { cowBreed, cowCategory, cowLabel, cowLocation } from './cow.constant'

type CowModel = Model<ICow, Record<string, unknown>>

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: cowLocation, // enum and cow location
    },
    breed: {
      type: String,
      required: true,
      enum: cowBreed, // enum and cow breed
    },
    weight: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'sale',
      enum: cowLabel, // enum and cow label
    },
    category: {
      type: String,
      required: true,
      enum: cowCategory, // enum and cow category
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Cow = model<ICow>('Cow', cowSchema)
