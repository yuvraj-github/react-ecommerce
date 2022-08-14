import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import ProductsList from './Components/ProductsList';
import PrivateComponent from './PrivateComponent';
import AddProduct from './Components/AddProduct';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductsList />} />
            <Route path='/addProduct' element={<AddProduct />} />
            <Route path='/updateProduct/:id' element={<UpdateProduct />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
