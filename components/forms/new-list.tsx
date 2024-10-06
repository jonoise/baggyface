import React from 'react'
import { Form } from '../ui/form'
import { InputField } from './input-field'
import { useForm } from 'react-hook-form'
import { TagsInputField } from './input-tags'
import { Button } from '../ui/button'

import { nanoid } from 'nanoid'
import { useListsStore } from '@/lib/storage'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const NewListForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm({})
  const router = useRouter()
  const { addList } = useListsStore()
  const onsubmit = form.handleSubmit((data: any) => {
    const id = nanoid()
    addList({
      id,
      products: [],
      title: '',
      description: '',
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    })
    router.push(`/listas/${id}`)
    toast.success('Lista creada exitosamente')
    onSuccess?.()
  })
  return (
    <Form {...form}>
      <form onSubmit={onsubmit} className='space-y-4'>
        <InputField
          control={form.control}
          name='title'
          label='Nombre'
          placeholder='Nombre de la lista'
        />
        <InputField
          control={form.control}
          name='description'
          label='Descripción'
          placeholder='Descripción de la lista'
        />
        <TagsInputField control={form.control} name='tags' label='Etiquetas' />
        <div className='mt-4 flex justify-end gap-4'>
          <Button>Crear</Button>
        </div>
      </form>
    </Form>
  )
}
