import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    linkText: { type: String },
    brand: { type: String },
    link: { type: String },
    ean: { type: String },
    price: { type: Number },
    category: { type: String },
    images: [{ type: mongoose.Schema.Types.Mixed }],
  },
  {
    timestamps: true,
  }
)

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export interface ProductI {
  _id: string
  name: string
  linkText: string
  brand: string
  link: string
  ean: string
  category: string
  price: number
  images: Array<ProductImageI>
  properties: Array<ProductPropertyI>
  createdAt: Date
  updatedAt: Date
}

type ProductImageI = {
  cacheId: string
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string
  __typename: 'Image'
}
type ProductPropertyI = {
  name: string
  value: string
}
