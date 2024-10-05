'use client'

import { cn } from '@/lib/utils'
import { AnimatedList } from '@/components/ui/animated-list'

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

let notifications = [
  {
    name: 'Revisa tu lista de compras',
    description: 'Entiende lo que estás gastando',
    time: '1m atrás',
    icon: '📊',
    color: '#00C9A7',
  },
  {
    name: 'Ahorro en comestibles',
    description: 'Compara precios y ahorra hasta un 15%',
    time: '10m atrás',
    icon: '🛒',
    color: '#FFB800',
  },
  {
    name: 'Presupuesto semanal',
    description: 'Establece metas para cada categoría',
    time: '15m atrás',
    icon: '💰',
    color: '#FF3D71',
  },
  {
    name: 'Tip de ahorro',
    description: 'Compra a granel para ahorrar más',
    time: '5m atrás',
    icon: '💡',
    color: '#8A2BE2',
  },
  {
    name: 'Análisis de gastos',
    description: 'Crea listas con diferentes presupuestos',
    time: '8m atrás',
    icon: '🔍',
    color: '#FF69B4',
  },
  {
    name: 'Recordatorio',
    description: 'Actualiza tu lista de compras semanal',
    time: '12m atrás',
    icon: '📝',
    color: '#20B2AA',
  },
]

notifications = Array.from({ length: 10 }, () => notifications).flat()

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4',
        // animation styles
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
        // light styles
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        // dark styles
        'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
      )}
    >
      <div className='flex flex-row items-center gap-3'>
        <div
          className='flex size-10 items-center justify-center rounded-2xl'
          style={{
            backgroundColor: color,
          }}
        >
          <span className='text-lg'>{icon}</span>
        </div>
        <div className='flex flex-col overflow-hidden'>
          <figcaption className='flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white '>
            <span className='text-sm sm:text-lg'>{name}</span>
            <span className='mx-1'>·</span>
            <span className='text-xs text-gray-500'>{time}</span>
          </figcaption>
          <p className='text-sm font-normal dark:text-white/60'>
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export function NewProductsAnimatedList({ className }: { className?: string }) {
  return (
    <div className='h-[55vh] overflow-hidden flex-1'>
      <AnimatedList delay={2000}>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  )
}
