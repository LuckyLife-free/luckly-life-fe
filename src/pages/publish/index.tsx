import {ImageField, MyForm, MyTextField} from '@/components'
import {CreateArticleInput, useCreateArticleMutation} from '@/generated'
import {compressImage, useUploadFiles} from '@/helpers'
import {AddOutlined} from '@mui/icons-material'
import {Button, Divider, Drawer, Stack, Typography} from '@mui/material'
import {useCallback, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useEffectOnce} from 'react-use'

type FormShape = CreateArticleInput & {
  cover: Maybe<FileList>
}

export function Publish() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const uploadFiles = useUploadFiles()
  const [createMutation] = useCreateArticleMutation()
  const goBack = useCallback(() => navigate(-1), [navigate])
  const handleSubmit = useCallback(
    async (data: FormShape) => {
      const origin = data.cover?.[0]
      const compress = origin ? await compressImage(origin) : undefined
      const cover = compress ? (await uploadFiles([compress]))[0] : undefined
      await createMutation({variables: {input: {...data, cover, tags: []}}})
      goBack()
    },
    [createMutation, goBack, uploadFiles]
  )

  useEffectOnce(() => {
    setOpen(true)
  })

  return (
    <Drawer open={open} anchor="bottom">
      <MyForm onSubmit={handleSubmit}>
        <Stack height={window.innerHeight}>
          <Stack position="sticky" bgcolor="white" zIndex={10} top={0}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Button size="large" color="secondary" onClick={goBack}>
                取消
              </Button>
              <Button size="large" type="submit">
                发布
              </Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack spacing={2} padding={2}>
            <MyTextField
              name="title"
              label="标题"
              required
              fullWidth
              autoFocus
            />
            <MyTextField name="summary" label="简介" required fullWidth />
            <MyTextField
              name="content"
              label="正文"
              rows={10}
              multiline
              required
              fullWidth
            />
            <ImageField name="cover" cols={1}>
              <Stack color="gray" alignItems="center" flex={1}>
                <AddOutlined />
                <Typography variant="caption">上传封面</Typography>
              </Stack>
            </ImageField>
          </Stack>
        </Stack>
      </MyForm>
    </Drawer>
  )
}
