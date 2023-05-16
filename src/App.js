import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screen/Home';
import About from './screen/About';
import Contact from './screen/Contact';  
import Employee from './screen/Employee';
import Login from './screen/Login';
import Header from './screen/Header';
import Register from './screen/Register';




function App() {
  return (
    <div className="App">
     <BrowserRouter>
    
     <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="employee" element={<Employee/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>

      
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
