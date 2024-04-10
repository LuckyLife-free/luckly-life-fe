import {useBottomTab} from '@/helpers'
import {
  AddCircle,
  AddCircleOutline,
  Home,
  HomeOutlined,
  Search,
} from '@mui/icons-material'
import {BottomNavigation, BottomNavigationAction, Stack} from '@mui/material'
import {PropsWithChildren, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useEffectOnce} from 'react-use'

export function WithBottomBar(props: PropsWithChildren) {
  const {children} = props
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useBottomTab()
  const [opacity, setOpacity] = useState(
    (import.meta as any).env.MODE === 'development' ? 0.05 : 1
  )

  useEffectOnce(() => {
    if (location.pathname.match('/home')) {
      setValue('home')
    } else if (location.pathname.match('/publish')) {
      setValue('publish')
    } else if (location.pathname.match('/search')) {
      setValue('search')
    }
  })

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        setOpacity(opacity === 1 ? 0.05 : 1)
      }
    }
    document.body.addEventListener('keydown', listener)
    return () => {
      document.body.removeEventListener('keydown', listener)
    }
  }, [opacity])

  return (
    <Stack height="100vh" sx={{opacity}}>
      {children}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        sx={{borderTop: (t) => `1px solid ${t.palette.divider}`}}
      >
        <BottomNavigationAction
          label="主页"
          value="home"
          icon={value === 'home' ? <Home /> : <HomeOutlined />}
          onClick={() => navigate('/home')}
        />
        <BottomNavigationAction
          label="发布"
          value="publish"
          icon={value === 'publish' ? <AddCircle /> : <AddCircleOutline />}
          onClick={() => navigate('/publish')}
        />
        <BottomNavigationAction
          label="搜索"
          value="search"
          icon={<Search />}
          onClick={() => navigate('/search')}
        />
      </BottomNavigation>
    </Stack>
  )
}
