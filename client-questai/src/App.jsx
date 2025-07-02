import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' 
import './App.css'
import { GameOfLifeController } from './GameOfLife/GameOfLifeController';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <GameOfLifeController columns={40} rows={40} />
    </div>
    </>
  )
}

export default App
