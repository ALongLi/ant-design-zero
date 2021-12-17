import { useState } from 'react'
import { Button } from 'antd'

import './App.less'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello, Ant Design Zero!</p>
        <p>
          <Button type="primary" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </Button>
        </p>
      </header>
    </div>
  )
}

export default App
