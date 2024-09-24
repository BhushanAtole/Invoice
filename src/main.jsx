import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import Invoice from './components/Ivoice.jsx'
import Invoice1 from './components/Invoice.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Invoice/> */}
    <Invoice1/> 
  </StrictMode>,
)
