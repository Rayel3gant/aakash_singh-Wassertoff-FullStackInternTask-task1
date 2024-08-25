import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App ">
      <Navbar/>


      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/details/:productId' element={<Details/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>


    </div>
  );
}

export default App;
