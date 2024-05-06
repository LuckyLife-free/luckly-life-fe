import {useToken} from '@/helpers'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {useShallowCompareEffect} from 'react-use'
import {Login} from './auth/login'
import {Logon} from './auth/logon'
import {Reset} from './auth/reset'
import {HomePage} from './home'
import {Publish} from './publish'
import {SearchPage} from './search'

export function RootEntry() {
  const [token] = useToken()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const authPath = ['/login', '/logon', '/reset']

  useShallowCompareEffect(() => {
    if (!token) {
      navigate('/login')
    } else if (authPath.some((path) => pathname.startsWith(path))) {
      navigate('/home')
    }
  }, [{token}])

  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/logon" Component={Logon} />
      <Route path="/reset" Component={Reset} />
      <Route path="/home" Component={HomePage} />
      <Route path="/publish" Component={Publish} />
      <Route path="/search" Component={SearchPage} />
      <Route path="/search/home" Component={HomePage} />
    </Routes>
  )
}
