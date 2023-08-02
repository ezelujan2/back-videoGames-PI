import './App.css';
import {Route, Routes} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Homepage from './components/HomePage/Homepage';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Homepage/>}/>
      </Routes>
    </>
  );
}

export default App;
