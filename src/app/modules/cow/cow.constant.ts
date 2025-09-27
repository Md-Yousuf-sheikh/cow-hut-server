import {
  ICowBreeds,
  ICowCategory,
  ICowLabels,
  ICowLocations,
} from './cow.interface'

// cow.constant
export const cowLocation: ICowLocations[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
]
export const cowBreed: ICowBreeds[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
]
export const cowLabel: ICowLabels[] = ['sale', 'sold out']
export const cowCategory: ICowCategory[] = ['Dairy', 'Beef', 'DualPurpose']

//  3 Weeks -> 1500$
//  1.5 Maths -> 1000$
//  3 Maths -> 750$
