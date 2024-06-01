import {useShadowMode, useToken} from '@/helpers'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {useShallowCompareEffect} from 'react-use'
import {ActivityPage} from './activity'
import {Login} from './auth/login'
import {Logon} from './auth/logon'
import {Reset} from './auth/reset'
import {ArticleDetail} from './detail/article'
import {UserDetail} from './detail/user'
import {HomePage} from './home'
import {MePage} from './me'
import {Publish} from './publish'
import {SearchPage} from './search'
import {SearchResult} from './search/search'

export function RootEntry() {
  const [token] = useToken()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const authPath = ['/login', '/logon', '/reset']

  useShadowMode()

  useShallowCompareEffect(() => {
    if (!token) {
      navigate('/login')
    } else if (
      pathname === '/' ||
      authPath.some((path) => pathname.startsWith(path))
    ) {
      navigate('/home')
    }
  }, [{token}])

  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/logon" Component={Logon} />
      <Route path="/reset" Component={Reset} />
      <Route path="/home" Component={HomePage} />
      <Route path="/activity" Component={ActivityPage} />
      <Route path="/publish" Component={Publish} />
      <Route path="/search" Component={SearchPage} />
      <Route path="/me" Component={MePage} />
      <Route path="/search/home" Component={HomePage} />
      <Route path="/search/result" Component={SearchResult} />
      <Route path="/detail/article" Component={ArticleDetail} />
      <Route path="/detail/user" Component={UserDetail} />
    </Routes>
  )
}
