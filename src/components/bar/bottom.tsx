import {useBottomTab} from '@/helpers'
import {
  AddCircle,
  AddCircleOutline,
  Article,
  ArticleOutlined,
  Home,
  HomeOutlined,
  Person,
  PersonOutlined,
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
    <Stack height={window.innerHeight} justifyContent="space-between">
      {children}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        sx={{
          borderTop: (t) => `1px solid ${t.palette.divider}`,
          position: 'sticky',
          flexShrink: 0,
          zIndex: 1,
          bottom: 0,
        }}
      >
        <BottomNavigationAction
          label="主页"
          value="home"
          icon={value === 'home' ? <Home /> : <HomeOutlined />}
          onClick={() => (onClickMenu?.(), navigate('/home'))}
        />
        <BottomNavigationAction
          label="征文"
          value="activity"
          icon={value === 'activity' ? <Article /> : <ArticleOutlined />}
          onClick={() => (onClickMenu?.(), navigate('/activity'))}
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
        <BottomNavigationAction
          label="我的"
          value="me"
          icon={value === 'me' ? <Person /> : <PersonOutlined />}
          onClick={() => (onClickMenu?.(), navigate('/me'))}
        />
      </BottomNavigation>
    </Stack>
  )
}
