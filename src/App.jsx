import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ServiceCard from './Copmonents/Plan/PlanList'
import { Route, Routes } from 'react-router'
import PaymentSuccess from './Copmonents/PaymentSuccess'
import PaymentCancel from './Copmonents/PaymentCancel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
<Route path="/" element={<ServiceCard />} />
<Route path="/payment-success" element={<PaymentSuccess />} />

<Route path="/payment-cancel" element={<PaymentCancel />} />


    </Routes>
    </>
  )
}

export default App
