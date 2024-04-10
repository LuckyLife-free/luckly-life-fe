import {readImage} from '@/helpers/image'
import {Box, ImageList, ImageListItem, ImageListProps} from '@mui/material'
import {ReactNode, useState} from 'react'
import {useController, useFormContext} from 'react-hook-form'
import {useUpdateEffect} from 'react-use'

type MyTextFieldProps = ImageListProps & {
  name: string
  multiple?: boolean
  children?: ReactNode
  validate?: (value: string) => Promise<boolean>
}

type Image = {
  src: string
  name: string
}

export function ImageField(props: MyTextFieldProps) {
  const {register} = useFormContext()
  const {name, multiple, validate, children, ...rest} = props
  const {field} = useController({name, rules: {validate}})
  const [images, setImages] = useState<Image[]>([])

  useUpdateEffect(() => {
    const files = field.value as FileList
    const tasks = Array.from(files ?? []).map(readImage)
    Promise.all(tasks).then((result) => setImages([...images, ...result]))
  }, [field.value])

  return (
    <ImageList {...rest}>
      {images.map(({src, name}) => (
        <ImageListItem key={name}>
          <Box width="100%" height="100%">
            <img
              src={src}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </ImageListItem>
      ))}
      <ImageListItem
        key="adding"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {children}
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          {...register(name)}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
          }}
        />
      </ImageListItem>
    </ImageList>
  )
}
