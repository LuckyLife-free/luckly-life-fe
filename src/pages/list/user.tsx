import {BaseUserFragment} from '@/generated'
import {defaultUser} from '@/helpers'
import {Avatar, Stack, Typography} from '@mui/material'
import {Fragment} from 'react'
import {useNavigate} from 'react-router-dom'

export function UserList(props: {data: BaseUserFragment[]}) {
  const navigate = useNavigate()

  return (
    <Fragment>
      {props.data.map((d) => (
        <Stack
          key={d.id}
          direction="row"
          alignItems="center"
          onClick={() => navigate(`/detail/user?id=${d.id}`)}
          bgcolor={(t) => t.palette.grey[50]}
          borderRadius={2}
          spacing={2}
          p={1}
        >
          <Avatar
            src={d.avatar?.url || defaultUser}
            sx={{width: 40, height: 40}}
          >
            {d.avatar?.name}
          </Avatar>
          <Stack>
            <Typography
              variant="caption"
              color={(t) => t.palette.text.secondary}
            >
              {d.signature}
            </Typography>
            <Typography variant="subtitle2">{d.name}</Typography>
          </Stack>
        </Stack>
      ))}
    </Fragment>
  )
}
