import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './component/layout';
import Login from './component/login';
import { Routes, Route } from "react-router-dom";
import Usercontext from './component/context/usercontext';
import Roomcontext from './component/context/roomcontext';



function App() {


  return (
    <div className="app">
      <Usercontext>
        <Roomcontext>
        <Routes>
          <Route path="/" element={<Layout></Layout>} />
          <Route path="/login" element={ <Login></Login>} />
        </Routes> 
        </Roomcontext> 
      </Usercontext>   
    </div>
  );
}

export default App;
