import dbConnect from '@/lib/db/connect'
import { Product, ProductI } from '@/lib/models/product'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect()
    const products = await Product.aggregate([
      { $match: { price: { $exists: true, $gt: 0 } } },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          brand: 1,
          category: 1,
        },
      },
    ])

    console.log(products[0])

    return NextResponse.json(products)
  } catch (error) {
    console.error({ error })
    return NextResponse.json(
      { message: 'Error fetching products' },
      { status: 500 }
    )
  }
}
