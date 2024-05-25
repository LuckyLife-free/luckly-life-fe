import {MyForm, MyTextField} from '@/components'
import {
  LoginByEmailMutationVariables,
  useLoginByEmailMutation,
} from '@/generated'
import {useSnackbar, useToken} from '@/helpers'
import {PermIdentity} from '@mui/icons-material'
import {Avatar, Box, Button, Grid, Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import validator from 'validator'

type FormShape = LoginByEmailMutationVariables

export function Login() {
  const [, setToken] = useToken()
  const [, alert] = useSnackbar()
  const [loginMutation] = useLoginByEmailMutation()
  const handleSubmit = async (props: FormShape) => {
    loginMutation({
      variables: props,
      onError() {
        alert({message: '邮箱或密码错误'})
      },
      onCompleted(data) {
        setToken(data.loginByEmail.token)
        window.location.reload()
      },
    })
  }

  return (
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
        <PermIdentity />
      </Avatar>
      <Typography component="h1" variant="h5">
        登录
      </Typography>
      <MyForm onSubmit={handleSubmit}>
        <MyTextField
          name="email"
          margin="normal"
          required
          fullWidth
          label="邮箱"
          autoComplete="email"
          autoFocus
          validate={validator.isEmail}
        />
        <MyTextField
          name="password"
          margin="normal"
          required
          fullWidth
          label="密码"
          type="password"
          autoComplete="password"
        />
        <Button type="submit" fullWidth variant="contained" sx={{my: 3}}>
          登录
        </Button>
        <Grid container alignItems="center">
          <Grid item xs>
            <Link to="/reset">忘记密码</Link>
          </Grid>
          <Grid item>
            <Link to="/logon">新用户注册</Link>
          </Grid>
        </Grid>
      </MyForm>
    </Box>
  )
}
