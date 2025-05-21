import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
//TANSTACK QUERY
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
//STYLES
import './global.css'

//Tanstack Query
  //Create a client
  const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <App />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </StrictMode>,
)
