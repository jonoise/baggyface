import mongoose from 'mongoose'

const PriceSchema = new mongoose.Schema(
  {
    value: Number,
    ean: String,
  },
  {
    timestamps: true,
  }
)

export const Price =
  mongoose.models.Price || mongoose.model('Price', PriceSchema)

export type PriceI = {
  _id: mongoose.Types.ObjectId
  value: number
  ean: string
  createdAt?: Date
  updatedAt?: Date
}
