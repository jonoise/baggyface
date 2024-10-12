import React from 'react'
import { Form } from '../ui/form'
import { InputField } from './input-field'
import { useForm } from 'react-hook-form'
import { TagsInputField } from './input-tags'
import { Button } from '../ui/button'

import { customAlphabet } from 'nanoid'
import { useListsStore } from '@/lib/storage'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTranslation } from '../shared/i18n-provider'
const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
)
export const NewListForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const t = useTranslation()
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
          label={t.common.name}
          placeholder={t.common.list_name}
        />
        <InputField
          control={form.control}
          name='description'
          label={t.common.description}
          placeholder={t.common.list_description}
        />
        <TagsInputField
          control={form.control}
          name='tags'
          label={t.common.tags}
        />
        <div className='mt-4 flex justify-end gap-4'>
          <Button>{t.common.save}</Button>
        </div>
      </form>
    </Form>
  )
}
