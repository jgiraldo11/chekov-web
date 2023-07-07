import { useState,createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './app/login/page';
import Signup from './app/signup/page';
import Todo from './app/page';
import './App.css';

export const AuthContext = createContext(null)

function App() {
  const [user, setUser] = useState();

const _setUser = (data) => {
  sessionStorage.setItem("user", JSON.stringify(data));
  setUser(data);
}

  useEffect(() => {
    if(!user) {
      // look to see if user was stored in session data:
      const previousUser = sessionStorage.getItem("user");
      if(previousUser) {
        // if so, let's set state back to that user:
        setUser(JSON.parse(previousUser));
      }
    }
  }, [])
  return ( /* BrowserRouter is a higher order component: like a super suit */
   <AuthContext.Provider value={{ user,setUser:_setUser }}> 
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={user ? <Todo /> : <Login />} />
      </Routes>
    </BrowserRouter>
  </AuthContext.Provider> 
  );
}

export default App;
