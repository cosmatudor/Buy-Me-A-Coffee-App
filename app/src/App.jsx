import Home from './Components/Home'
import Install from './Components/Install'


function App() {
  if (window.ethereum) {
    return <Home />;
  }
  else {
    return <Install />;
  }
}

export default App;
