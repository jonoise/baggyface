import { PageContainer } from '@/components/shared/page-container'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries/get'
import Link from 'next/link'

type ChangelogEntry = {
  version: string
  date: string
  changes: string[]
  link: string
}

export default async function Changelog(ctx: { params: { lang: Locale } }) {
  const changelogData: ChangelogEntry[] = [
    {
      version: '0.1.1',
      date: '22 de Octubre del 2024',
      changes: [
        '👌 - Ahora puedes agregar cantidades a los productos de tu lista.',
        '📐 - Agregamos tabs para cambiar entre "Productos", "Agregar" y "Comprando" en la lista.',
        '🥽 - Agregamos previsualización de productos en la búsqueda.',
        '🛍️ - Agregamos Modo "Comprando" en la lista.',
        '🔎 - Quitamos la página de búsqueda y dejamos la búsqueda en la lista.',
        '🔄 - Agregamos changelog.',
      ],
      link: '/changelog/release-notes-011',
    },
  ]
  const dictionary = await getDictionary(ctx.params.lang)
  return (
    <PageContainer className='container mx-auto py-4 '>
      <h1 className='text-3xl font-bold mb-6'>
        {dictionary.navigation.changelog}
      </h1>
      <ScrollArea>
        {changelogData.map((entry, index) => (
          <div key={index}>
            <Separator />
            <div className='mb-6 last:mb-0 mt-4'>
              <h2 className='text-xl font-semibold'>
                Version {entry.version}
                <span className='text-sm font-normal text-muted-foreground ml-2'>
                  {entry.date}
                </span>
              </h2>
              <ul className='mt-2 space-y-2'>
                {entry.changes.map((change, changeIndex) => (
                  <li key={changeIndex} className='text-sm'>
                    {change}
                  </li>
                ))}
              </ul>
              {entry.link && (
                <p className='mt-4'>
                  Lee más sobre esta versión en el siguiente enlace:{' '}
                  <Link
                    href={entry.link}
                    target='_blank'
                    className='text-sm text-blue-500 underline'
                  >
                    Ver más
                  </Link>
                </p>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
    </PageContainer>
  )
}
