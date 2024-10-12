'use client'

import React, { useState, KeyboardEvent } from 'react'
import { useController, Control } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Plus } from 'lucide-react'

interface TagsInputFieldProps {
  name: string
  label: string
  control: Control<any>
}

export function TagsInputField({ name, label, control }: TagsInputFieldProps) {
  const [inputValue, setInputValue] = useState('')
  const {
    field: { value: tags, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const addTag = () => {
    if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
      onChange([...tags, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag: string) => tag !== tagToRemove))
  }

  return (
    <div className='space-y-2'>
      <Label htmlFor={name}>{label}</Label>
      <div className='flex space-x-2'>
        <Input
          id={name}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder='Fiesta, dinner, cumpleaños, etc'
          className='flex-grow'
        />
        <Button type='button' onClick={addTag} size='icon' variant='outline'>
          <Plus className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex flex-wrap gap-2 mt-2'>
        {tags.map((tag: string) => (
          <Badge
            key={tag}
            variant='secondary'
            className='flex items-center gap-1 text-sm px-2 py-1'
          >
            {tag}
            <X
              className='h-3 w-3 cursor-pointer'
              onClick={() => removeTag(tag)}
            />
          </Badge>
        ))}
      </div>
      {error && <p className='text-sm text-red-500'>{error.message}</p>}
    </div>
  )
}
