import { Control, RegisterOptions } from 'react-hook-form'

interface InputProps {
  control: Control<any>
  name: string
  label: string
  rules?: RegisterOptions
  defaultValue?: string
  disabled?: boolean
  shouldUnregister?: boolean
  placeholder?: string
  description?: string
}

export interface InputFieldProps extends InputProps {
  _input?: React.InputHTMLAttributes<HTMLInputElement>
  _container?: React.HTMLAttributes<HTMLDivElement>
}

export interface SelectFieldProps extends InputProps {
  options: { value: string; label: string }[]
  onChange?: (value: string) => void
  _container?: React.HTMLAttributes<HTMLDivElement>
}
