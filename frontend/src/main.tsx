import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFoundPage, SplashPage, HomePage, SignInPage, SignUpPage } from '@/pages'
import styled from 'styled-components'

const ApplicationContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  max-width: 600px;
  height: 100vh;

  border: 1px solid #bcbbb5;
`

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('./mocks/browser')

  return worker.start()
}

;(async () => {
  await enableMocking()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ApplicationContainer>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SplashPage />} />
            <Route path='/sign-in' element={<SignInPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ApplicationContainer>
    </StrictMode>,
  )
})()
