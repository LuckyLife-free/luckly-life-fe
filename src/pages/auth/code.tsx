import {MyTextField} from '@/components'
import {useSendEmailVerificationCodeMutation} from '@/generated'
import {Button, Stack} from '@mui/material'
import {useCallback, useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {useBoolean, useCounter, useInterval} from 'react-use'

export function ValidationCodeField() {
  const [isRunning, setIsRunning] = useBoolean(false)
  const [countDown, {inc, reset}] = useCounter(60, 60, 0)
  const [sendCode] = useSendEmailVerificationCodeMutation()
  const {watch} = useFormContext()
  const onClickButton = useCallback(() => {
    setIsRunning(true)
    sendCode({variables: {email: watch('email')}})
  }, [sendCode, setIsRunning, watch])

  useInterval(inc, isRunning ? 1000 : null)

  useEffect(() => {
    if (countDown <= 0) {
      setIsRunning(false)
      reset()
    }
  }, [countDown, reset, setIsRunning])

  return (
    <Stack position="relative">
      <MyTextField
        margin="normal"
        required
        fullWidth
        label="邮箱验证码"
        name="verificationCode"
        autoComplete="verificationCode"
        type="number"
      />
      <Button
        variant="text"
        disabled={isRunning}
        onClick={onClickButton}
        sx={{position: 'absolute', right: 16, height: '100%'}}
      >
        {isRunning ? `重新获取(${countDown}s)` : '获取验证码'}
      </Button>
    </Stack>
  )
}
