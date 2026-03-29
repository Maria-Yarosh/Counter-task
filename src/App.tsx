import { useState } from 'react'
import './App.css'
import { Button } from './Button'

function App() {
  const [count, setCount] = useState<number>(0)

  const handleIncreaseBtnClick = () => {
    if(count < 5) {
      setCount(count + 1)
    }
  }

  const handleResetBtnClick = () => {
    setCount(0)
  }

  return (
    <div className='container'>
      <div className='counter'>
        <p className={count === 5 ? 'error-count' : ''}>{count}</p>
      </div>
      <div className='btn-container'>
        <Button title='inc' onClick={handleIncreaseBtnClick} disabled={count === 5 }/>
        <Button title='reset' onClick={handleResetBtnClick} disabled={count === 0 || count < 5}/>
      </div>
    </div>
  )
}

export default App
