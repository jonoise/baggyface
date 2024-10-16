import dbConnect from '@/lib/db/connect'
import { Product, ProductI } from '@/lib/models/product'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect()
    const products = await Product.find<ProductI>({
      price: { $exists: true, $gt: 0 },
    })
      .select({
        name: 1,
        price: 1,
        category: 1,
        brand: 1,
      })
      .limit(100)
      .lean()
    const p = JSON.parse(JSON.stringify(products))
    return NextResponse.json(p)
  } catch (error) {
    console.error({ error })
    return NextResponse.json(
      { message: 'Error fetching products' },
      { status: 500 }
    )
  }
}
