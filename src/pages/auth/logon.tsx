import {BackBar, MyForm, MyTextField} from '@/components'
import {
  LogonByEmailMutationVariables,
  useLogonByEmailMutation,
} from '@/generated'
import {useToken} from '@/helpers'
import {PersonAdd} from '@mui/icons-material'
import {Avatar, Box, Button, Typography} from '@mui/material'
import validator from 'validator'
import {ValidationCodeField} from './code'

type FormShape = LogonByEmailMutationVariables

export function Logon() {
  const [, setToken] = useToken()
  const [logonMutation] = useLogonByEmailMutation()
  const handleSubmit = async (props: FormShape) => {
    logonMutation({
      variables: props,
      onError() {
        alert({message: '邮箱或验证码错误'})
      },
      onCompleted(data) {
        setToken(data.logonByEmail.token)
        window.location.reload()
      },
    })
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
          <PersonAdd />
        </Avatar>
        <Typography component="h1" variant="h5">
          注册
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
            validate={validator.isEmail}
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
