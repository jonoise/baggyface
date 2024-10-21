import dbConnect from '@/lib/db/connect'
import { Product } from '@/lib/models/product'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  req: NextRequest,
  ctx: { params: { id: string } }
) => {
  const id = ctx.params.id
  console.log({ id })
  try {
    await dbConnect()
    const product = await Product.findById(id).select('-properties')
    console.log({ product })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ message: 'PUTA' })
  }
}
