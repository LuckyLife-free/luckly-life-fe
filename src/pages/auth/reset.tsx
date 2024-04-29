import {BackBar, MyForm, MyTextField} from '@/components'
import {
  LogonByEmailMutationVariables,
  useLoginByEmailMutation,
  useResetPasswordByEmailMutation,
} from '@/generated'
import {useToken} from '@/helpers'
import {LockReset} from '@mui/icons-material'
import {Avatar, Box, Button, Typography} from '@mui/material'
import {SubmitHandler} from 'react-hook-form'
import {ValidationCodeField} from './code'

type FormShape = LogonByEmailMutationVariables

export function Reset() {
  const [, setToken] = useToken()
  const [loginMutation] = useLoginByEmailMutation()
  const [resetMutation] = useResetPasswordByEmailMutation()
  const handleSubmit: SubmitHandler<FormShape> = async (data) => {
    const resetResult = await resetMutation({
      variables: data,
    })
    if (resetResult.data?.resetPasswordByEmail) {
      const result = await loginMutation({
        variables: data,
      })
      if (result.data?.loginByEmail) {
        setToken(result.data.loginByEmail.token)
        window.location.reload()
      }
    }
  }

  return (
    <Box>
      <BackBar title="登录" />
      <Box
        px={4}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockReset />
        </Avatar>
        <Typography component="h1" variant="h5">
          重置密码
        </Typography>
        <MyForm onSubmit={handleSubmit}>
          <MyTextField
            margin="normal"
            required
            fullWidth
            label="邮箱"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <MyTextField
            margin="normal"
            required
            fullWidth
            label="密码"
            name="password"
            type="password"
            autoComplete="password"
          />
          <ValidationCodeField />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            注册
          </Button>
        </MyForm>
      </Box>
    </Box>
  )
}
