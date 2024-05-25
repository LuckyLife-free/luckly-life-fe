import {BaseTextFieldProps, TextField} from '@mui/material'
import {useController, useFormContext} from 'react-hook-form'

type MyTextFieldProps = BaseTextFieldProps & {
  name: string
  validate?: (value: string) => boolean | Promise<boolean>
}

export function MyTextField(props: MyTextFieldProps) {
  const {name, validate, placeholder, required, ...rest} = props
  const {fieldState} = useController({name, rules: {validate, required}})
  const {register, getFieldState} = useFormContext()
  const {error: fieldError} = getFieldState(name)
  const error = !!fieldState.error || rest.error

  return (
    <TextField
      {...rest}
      {...register(name)}
      placeholder={placeholder}
      helperText={fieldError?.message}
      error={error}
    />
  )
}
