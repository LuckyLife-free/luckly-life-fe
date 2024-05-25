import {useSnackbar} from '@/helpers'
import {Snackbar as RawSnackbar} from '@mui/material'

export function SnackBar() {
  const [{message}, setSnackbar] = useSnackbar()

  return (
    <RawSnackbar
      open={!!message}
      message={message}
      onClose={() => setSnackbar({message: ''})}
      sx={{width: 'fit-content', margin: 'auto'}}
      autoHideDuration={3000}
    />
  )
}
