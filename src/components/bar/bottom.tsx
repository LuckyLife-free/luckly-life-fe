import {useBottomTab} from '@/helpers'
import {
  AddCircle,
  AddCircleOutline,
  Home,
  HomeOutlined,
  Search,
} from '@mui/icons-material'
import {BottomNavigation, BottomNavigationAction, Stack} from '@mui/material'
import {PropsWithChildren, RefObject, useCallback} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useEffectOnce} from 'react-use'

type WithBottomBarProps = PropsWithChildren<{
  contentRef: RefObject<HTMLElement>
}>

export function WithBottomBar(props: WithBottomBarProps) {
  const {children, contentRef} = props
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useBottomTab()
  const scrollToTop = useCallback(() => {
    contentRef.current?.scrollTo({top: 0})
  }, [contentRef])

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
      <Stack flex={1} overflow="auto" ref={contentRef}>
        {children}
      </Stack>
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
          onDoubleClick={scrollToTop}
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
          onDoubleClick={scrollToTop}
        />
      </BottomNavigation>
    </Stack>
  )
}
