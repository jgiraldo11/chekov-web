
import { useState,createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './app/login/page';
import Signup from './app/signup/page';
import './App.css';

export const AuthContext = createContext(null)

function App() {
  const [user, setUser] = useState();
  return ( /* BrowserRouter is a higher order component: like a super suit */
   <AuthContext.Provider value={{ user,setUser }}> 
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={user ? <h1>Todo</h1> : <Login />} />
      </Routes>
    </BrowserRouter>
  </AuthContext.Provider> 
  );
}

export default App;
