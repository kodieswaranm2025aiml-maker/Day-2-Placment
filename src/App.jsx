import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <h1 style={{ color: 'blue', fontSize: '24px', textAlign: 'center' }}>Welcome to React
      </h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p className="text-gray-500 text-lg text-center">  learn React by building simple interfaces with components.
      </p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Click me
      </button>
    </>
  )
}

export default App
