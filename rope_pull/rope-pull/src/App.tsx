
import './App.css'
import Control from './Control'

function App() {
  const onPullRight = (e) => {

  }
  const onPullLeft = (e) => {
    
  }
  return (
    <>
      <Control
      onPullLeft={onPullLeft}
      onPullRight={onPullRight}
      />
    </>
  )
}

export default App
