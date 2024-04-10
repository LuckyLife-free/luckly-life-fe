import {PropsWithChildren, useCallback} from 'react'
import {
  FieldValues,
  Form,
  FormProvider,
  FormSubmitHandler,
  useForm,
} from 'react-hook-form'

type MyFormProps<T> = PropsWithChildren<{
  onSubmit: (data: T) => void
}>

export function MyForm<T extends FieldValues>(props: MyFormProps<T>) {
  const useFormReturn = useForm()
  const {onSubmit: onSubmitProps, children} = props
  const onSubmit: FormSubmitHandler<any> = useCallback(
    ({data}) => onSubmitProps(data),
    [onSubmitProps]
  )

  return (
    <FormProvider {...useFormReturn}>
      <Form onSubmit={onSubmit}>{children}</Form>
    </FormProvider>
  )
}
