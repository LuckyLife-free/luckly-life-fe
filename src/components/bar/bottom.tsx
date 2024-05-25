import {useBottomTab} from '@/helpers'
import {
  AddCircle,
  AddCircleOutline,
  Home,
  HomeOutlined,
  Search,
} from '@mui/icons-material'
import {BottomNavigation, BottomNavigationAction, Stack} from '@mui/material'
import {PropsWithChildren} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useEffectOnce} from 'react-use'

type WithBottomBarProps = PropsWithChildren<{
  onClickMenu?: () => void
}>

export function WithBottomBar(props: WithBottomBarProps) {
  const {children, onClickMenu} = props
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useBottomTab()

  useEffectOnce(() => {
    if (location.pathname.startsWith('/home')) {
      setValue('home')
    } else if (location.pathname.startsWith('/publish')) {
      setValue('publish')
    } else if (location.pathname.startsWith('/search')) {
      setValue('search')
    }
  })

  return (
    <Stack height={window.innerHeight}>
      {children}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        sx={{borderTop: (t) => `1px solid ${t.palette.divider}`, flexShrink: 0}}
      >
        <BottomNavigationAction
          label="主页"
          value="home"
          icon={value === 'home' ? <Home /> : <HomeOutlined />}
          onClick={() => (onClickMenu?.(), navigate('/home'))}
        />
        <BottomNavigationAction
          label="发布"
          value="publish"
          icon={value === 'publish' ? <AddCircle /> : <AddCircleOutline />}
          onClick={() => (onClickMenu?.(), navigate('/publish'))}
        />
        <BottomNavigationAction
          label="搜索"
          value="search"
          icon={<Search />}
          onClick={() => (onClickMenu?.(), navigate('/search'))}
        />
      </BottomNavigation>
    </Stack>
  )
}
