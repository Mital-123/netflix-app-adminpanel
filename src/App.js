import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Component/Login';
import { useEffect, useState } from 'react';
import Sidebar from './Component/Sidebar';
import Dashboard from './Component/Dashboard';
import Users from './Component/Users';
import AddSeason from './Component/AddSeason';
import Series from './Component/Series';
import NewSeries from './Component/NewSeries';

function App() {

  const [login, setlogin] = useState(false)

  useEffect(() => {
    setlogin((localStorage.getItem("login")))
  }, [login]);

  return (
    <>
      <BrowserRouter>
        <div className='main_form d-flex'>
          {
            login ?
              <>
                <Sidebar />
                <div className='main-content flex-grow-1'>
                  <Routes>
                    <Route path="/" element={<Dashboard setlogin={setlogin} />} />
                    <Route path="/dashboard" element={<Dashboard setlogin={setlogin} />} />
                    <Route path="/user" element={<Users />} />
                    <Route path="/series" element={<NewSeries />} />
                    <Route path="/season" element={<AddSeason />} />
                  </Routes>
                </div>
              </>
              :
              <>
                <div className='main_login flex-grow-1'>
                  <Routes>
                    <Route path="/" element={<Login setlogin={setlogin} />} />
                    <Route path="*" element={<Login setlogin={setlogin} />} />
                  </Routes>
                </div>
              </>
          }
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;