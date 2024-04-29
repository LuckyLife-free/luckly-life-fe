import {useRecentSearch, useSearch} from '@/helpers'
import {Cancel, Search} from '@mui/icons-material'
import {
  Button,
  Divider,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
  styled,
} from '@mui/material'

const StyledOutlinedInput = styled(OutlinedInput)(({theme: t}) => ({
  '.MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  background: t.palette.grey[100],
  borderRadius: 28,
  height: 36,
  padding: 0,
}))

type SearchInputProps = {
  onFocusedChange?: (focused: boolean) => void
}

export function SearchInput(props: SearchInputProps) {
  const {onFocusedChange} = props
  const [searches, setSearches] = useRecentSearch()
  const [value, setValue] = useSearch()

  return (
    <StyledOutlinedInput
      fullWidth
      value={value}
      placeholder={searches?.[0]}
      sx={{input: {zIndex: 999}}}
      onFocus={() => onFocusedChange?.(true)}
      onBlur={() => setTimeout(() => onFocusedChange?.(false), 100)}
      onChange={(e) => setValue(e.target.value)}
      startAdornment={<Search color="disabled" sx={{m: 1}} />}
      endAdornment={
        <Stack
          direction="row"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem sx={{my: 1}} />}
        >
          {value && (
            <IconButton onClick={() => setValue('')}>
              <Cancel fontSize="small" color="disabled" />
            </IconButton>
          )}
          <Button
            variant="text"
            color="primary"
            sx={{minWidth: 0}}
            onClick={() => setSearches((prev) => [...(prev ?? []), value])}
            disabled={!value}
          >
            <Typography variant="body2" noWrap pr={1}>
              搜索
            </Typography>
          </Button>
        </Stack>
      }
    />
  )
}
