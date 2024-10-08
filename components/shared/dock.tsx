import { useModalStore } from '@/lib/stores/modal-store'
import { cn } from '@/lib/utils'
import { Home, PlusIcon, Search, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobileDock() {
  const pathname = usePathname()
  const { newList } = useModalStore((s) => s)
  const navItems = [
    { icon: Home, label: 'Inicio', href: '/' },
    { icon: Search, label: 'Buscar', href: '/buscar' },
    { icon: ShoppingBag, label: 'Listas', href: '/listas' },
    {
      icon: PlusIcon,
      label: 'Nueva',
      isButton: true,
      onClick: () => {
        newList.setOpen(true)
      },
    },
  ]
  return (
    <div className='fixed bottom-4 left-0 right-0 flex justify-center lg:hidden z-50'>
      <nav className='flex justify-around items-center h-16 bg-background/80 backdrop-blur-md border border-border rounded-full px-4 shadow-lg'>
        {navItems.map((item, index) =>
          item.isButton ? (
            <button
              key={index}
              onClick={item.onClick}
              className='flex flex-col items-center justify-center w-16 h-full text-xs relative overflow-hidden'
            >
              <item.icon className='h-3 w-3 mb-1' />
              <span className='text-xs'>{item.label}</span>
              {pathname === item.href && (
                <span className='absolute -bottom-2 left-[50%] mx-auto w-4 h-4 bg-primary rounded-full transform -translate-x-1/2' />
              )}
            </button>
          ) : (
            <Link
              key={item.href}
              href={item.href || '#'}
              className={cn(
                `flex flex-col items-center justify-center w-16 h-full text-xs relative overflow-hidden`
              )}
            >
              <item.icon className='h-3 w-3 mb-1' />
              <span className='text-xs'>{item.label}</span>
              {pathname === item.href && (
                <span className='absolute -bottom-2 left-[50%] mx-auto w-4 h-4 bg-primary rounded-full transform -translate-x-1/2' />
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
