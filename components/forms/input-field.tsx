import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { InputFieldProps } from '@/types/inputs'

export const InputField = (props: InputFieldProps) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      defaultValue={props.defaultValue}
      rules={props.rules}
      disabled={props.disabled}
      shouldUnregister={props.shouldUnregister}
      render={({ field }) => (
        <FormItem className={cn('w-full', props._container?.className)}>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={props.placeholder}
              {...props._input}
            />
          </FormControl>
          {props.description && (
            <FormDescription
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
          )}
        </FormItem>
      )}
    />
  )
}
