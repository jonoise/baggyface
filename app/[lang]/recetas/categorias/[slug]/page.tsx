import { notFound } from 'next/navigation'
import {
  categories,
  CategoryI,
  getPostsByCategory,
} from '../../(posts)/helpers'

export default async function Category({
  params,
}: {
  params: { slug: CategoryI }
}) {
  const { slug } = params

  // 404 if the category does not exist
  if (categories.indexOf(slug) == -1) notFound()

  const posts = await getPostsByCategory({ category: slug })

  return (
    <main>
      <h1>Category: {slug}</h1>
    </main>
  )
}
