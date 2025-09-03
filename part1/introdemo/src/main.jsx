import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

let isStrictMode = false

if (isStrictMode) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  createRoot(document.getElementById('root')).render(
    <App />
  )
}