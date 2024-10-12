import { readdir } from 'fs/promises'

export const categories = [
  'desayuno',
  'almuerzo',
  'cena',
  'postre',
  'bebida',
  'snack',
  'sopa',
  'ensalada',
  'plato fuerte',
  'guarnición',
  'salsa',
  'pan',
  'dulce',
  'salado',
  'vegano',
  'vegetariano',
  'sin gluten',
  'sin lácteos',
  'sin huevo',
  'res',
  'pollo',
  'pescado',
  'mariscos',
  'cerdo',
] as const

export type CategoryI = (typeof categories)[number]

interface Post {
  slug: string
  title: string
  publishDate: string
  categories: CategoryI[]
  ingredients: string
  prepTime: string
}

export async function getPosts(): Promise<Post[]> {
  // Retrieve slugs from post routes
  const slugs = (
    await readdir(process.cwd() + '/app/recetas/(posts)', {
      withFileTypes: true,
    })
  ).filter((dir) => dir.isDirectory())

  // Retrieve metadata from MDX files
  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(
        `../../../../app/[lang]/recetas/(posts)/${name}/page.mdx`
      )
      return { slug: name, ...metadata }
    })
  )

  // Sort posts from newest to oldest
  posts.sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate))

  return posts
}

export async function getPostsByCategory({
  category,
}: {
  category: CategoryI
}): Promise<Post[]> {
  const allPosts = await getPosts()

  // Filter posts by specified category
  const posts = allPosts.filter(
    (post) => post.categories.indexOf(category) !== -1
  )

  return posts
}
