import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Component/Login';
import { useEffect, useState } from 'react';
import Sidebar from './Component/Sidebar';
import AddSeason from './Component/AddSeason';
import NewSeries from './Component/NewSeries';
import Episodes from './Component/Episodes';
import AddMovies from './Component/AddMovies';
import SubScription from './Component/SubScription';
import UserData from './Component/UserData';

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
                    <Route path="/" element={<NewSeries setlogin={setlogin} />} />
                    <Route path="/series" element={<NewSeries setlogin={setlogin} />} />
                    <Route path="/season/:id" element={<AddSeason />} />
                    <Route path="/episodes/:id" element={<Episodes />} />
                    <Route path="/movies" element={<AddMovies />} />
                    <Route path="/subscription" element={<SubScription />} />
                    <Route path='/users' element={<UserData/>}/>
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