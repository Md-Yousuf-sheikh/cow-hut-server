import { Schema, Types } from 'mongoose'

export type ICowLocations =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'

export type ICowBreeds =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej'

export type ICowLabels = 'sale' | 'sold out'
export type ICowCategory = 'Dairy' | 'Beef' | 'DualPurpose'

export type ICow = {
  name: string
  age: string
  price: string
  location: ICowLocations
  breed: ICowBreeds
  weight: string
  label?: ICowLabels
  category: ICowCategory
  seller: Schema.Types.ObjectId
}
