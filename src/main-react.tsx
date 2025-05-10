import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'


function renderSdk(elem: HTMLElement) {
  const root = createRoot(elem!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  return root
}

export default renderSdk
