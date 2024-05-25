import 'swiper/css'
import './index.css'

import {CssBaseline} from '@mui/material'
import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {SnackBar} from './components'
import {ApolloProvider} from './context'
import {RootEntry} from './pages'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<div className="center">loading...</div>}>
          <RootEntry />
          <SnackBar />
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
)
