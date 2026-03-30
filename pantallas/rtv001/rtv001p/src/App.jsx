import { useState } from 'react'
import React from 'react';
import Mant from './pages/Mant';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


      <Mant />
    </>
  )
}

export default App
