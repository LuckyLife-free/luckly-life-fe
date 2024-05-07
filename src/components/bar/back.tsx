import {ArrowBackRounded} from '@mui/icons-material'
import {IconButton, Stack, Typography} from '@mui/material'
import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

export function BackBar({title}: {title: string}) {
  const navigate = useNavigate()
  const onBack = useCallback(() => navigate(-1), [navigate])

  return (
    <Stack direction="row" alignItems="center" spacing={1} px={2} py={1}>
      <IconButton size="small" color="primary" onClick={onBack}>
        <ArrowBackRounded />
      </IconButton>
      <Typography variant="subtitle2" color="primary">
        {title}
      </Typography>
    </Stack>
  )
}
