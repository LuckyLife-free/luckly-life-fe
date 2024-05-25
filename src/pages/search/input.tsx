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
import {useRef, useState} from 'react'
import {useUpdateEffect} from 'react-use'

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
  autoFocus?: boolean
  onFocusedChange?: (focused: boolean) => void
}

export function SearchInput(props: SearchInputProps) {
  const ref = useRef<HTMLDivElement>()
  const {onFocusedChange, autoFocus} = props
  const [searches, addSearch] = useRecentSearch()
  const [search, setSearch] = useSearch()
  const [value, setValue] = useState('')
  const placeholder = searches?.[0]

  useUpdateEffect(() => {
    search && addSearch(search)
    setValue(search)
  }, [search])

  return (
    <StyledOutlinedInput
      fullWidth
      ref={ref}
      value={value}
      sx={{zIndex: 999}}
      autoFocus={autoFocus}
      placeholder={placeholder}
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
            <IconButton onClick={() => setSearch('')}>
              <Cancel fontSize="small" color="disabled" />
            </IconButton>
          )}
          <Button
            variant="text"
            color="primary"
            sx={{minWidth: 0}}
            onClick={() => setSearch(value ?? placeholder)}
            disabled={!value && !placeholder}
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
