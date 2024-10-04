import React from 'react'
import { RiTimeFill } from '@remixicon/react'
import { getPosts } from './recetas/(posts)/helpers'
import Link from 'next/link'

export const RecipesNavbar = async () => {
  const posts = await getPosts()

  return (
    <div className='w-80 xl:h-screen xl:border-r border-gray-700 overflow-y-auto'>
      <div className='flex items-center justify-between p-4'>
        <h3 className='font-bold'>Recetas</h3>

        <Link href='/recetas/categorias' className='text-xs'>
          Ver Categorías
        </Link>
      </div>
      <div className='space-y-4'>
        {posts.map((recipe, index) => (
          <Link
            href={`/recetas/${recipe.slug}`}
            key={index}
            className='block border-t border-gray-700 p-4'
          >
            <div className='flex flex-wrap gap-2 mb-2'>
              {recipe.categories.map((category, catIndex) => (
                <span key={catIndex} className='text-xs text-muted-foreground'>
                  {category}
                </span>
              ))}
            </div>
            <h4 className='font-bold'>{recipe.title}</h4>
            <div className='text-sm text-emerald-600 dark:text-cyan-300 mt-1 flex items-center space-x-2'>
              <RiTimeFill className='w-4 opacity-80' />
              <span>{recipe.prepTime}</span>
            </div>
            <p className='text-sm mt-2'>{recipe.ingredients}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
