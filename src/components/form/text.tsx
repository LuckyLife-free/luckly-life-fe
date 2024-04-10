import {BaseTextFieldProps, TextField} from '@mui/material'
import {useController, useFormContext} from 'react-hook-form'

type MyTextFieldProps = BaseTextFieldProps & {
  name: string
  validate?: (value: string) => Promise<boolean>
}

export function MyTextField(props: MyTextFieldProps) {
  const {name, validate, ...rest} = props
  const {register, getFieldState} = useFormContext()
  const {fieldState} = useController({name, rules: {validate}})
  const {error: fieldError} = getFieldState(name)
  const placeholder = fieldError?.message ?? rest.placeholder
  const error = !!fieldState.error || rest.error

  return (
    <TextField
      {...rest}
      {...register(name)}
      placeholder={placeholder}
      error={error}
    />
  )
}
