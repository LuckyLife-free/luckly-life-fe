import {useToken} from '@/helpers'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {useShallowCompareEffect} from 'react-use'
import {Login} from './auth/login'
import {Logon} from './auth/logon'
import {Reset} from './auth/reset'
import {HomePage} from './home'
import {Publish} from './publish'
import {SearchPage} from './search'

export function RootEntry() {
  const [token] = useToken()
  const navigate = useNavigate()

  useShallowCompareEffect(() => {
    navigate(token ? '/home' : '/login')
  }, [{token}])

  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/logon" Component={Logon} />
      <Route path="/reset" Component={Reset} />
      <Route path="/home" Component={HomePage} />
      <Route path="/publish" Component={Publish} />
      <Route path="/search" Component={SearchPage} />
    </Routes>
  )
}
