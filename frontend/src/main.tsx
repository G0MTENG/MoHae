import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './routes'

const ApplicationContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  max-width: 600px;
  height: 100svh;

  position: relative;

  overflow-y: auto;

  border: 1px solid #bcbbb5;
`

// async function enableMocking() {
//   if (!import.meta.env.DEV) {
//     return
//   }

//   const { worker } = await import('./mocks/browser')

//   return worker.start()
// }

;(async () => {
  // await enableMocking()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={new QueryClient()}>
        <ApplicationContainer>
          <Router />
        </ApplicationContainer>
      </QueryClientProvider>
    </StrictMode>,
  )
})()
