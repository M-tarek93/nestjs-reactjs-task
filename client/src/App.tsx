import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <div className='container mt-3'>
      <ToastContainer
        position='top-center'
        hideProgressBar
        autoClose={2000}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
