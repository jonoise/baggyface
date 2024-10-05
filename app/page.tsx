import MainGraphs from '@/components/graphs/main-graphs'
import dbConnect from '@/lib/db/connect'
import { Product } from '@/lib/models/product'

export default async function Home() {
  await dbConnect()
  const products = await Product.find({
    price: { $exists: true, $gt: 0 },
  }).lean()
  const p = JSON.parse(JSON.stringify(products))

  return <MainGraphs p={p} />
}
