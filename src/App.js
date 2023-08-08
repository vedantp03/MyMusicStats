import './App.css';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Main from "./Callback"
import Artists from "./artists"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/callback" element={<Main />} />
      <Route path="/artists" element={<Artists />} />
    </Routes>
  );
}

export default App;