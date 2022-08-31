import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Dashboard from "./Components/Dashboard";
import Dashboardd from "./Components/Dashboardd";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {  
  return (
  <Router>
    <div className="App">
       <Routes>
          <Route path='/' element={<Dashboard route='generalites' />}></Route>
          <Route path='/generalites' element={<Dashboard route='generalites' />}></Route>
          <Route path='/delais' element={<Dashboardd route='delais' />}></Route>  
       </Routes>                          
    </div>
  </Router>
  );
}

export default App;