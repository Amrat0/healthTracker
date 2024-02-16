import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/HomePage/Home'
import DashBoardPage from './pages/DashboardPage/DashBoardPage'
import Login from './auth/LoginPage/Login';
import Register from './auth/RegisterPage/Register';
import NotFind from './pages/notfind'
import OutputDash from './pages/DashboardPage/OutputDash';
import EditUser from './pages/DashboardPage/editUser';
import Tracking from './pages/DashboardPage/inputData';

const App = ()=>{
   window.localStorage.getItem("loggedIn")
    let Token = localStorage.getItem("token")

     return (
        <>
        <Router>
        
            {
                Token==null?
                //logout
                <Routes>
                <Route path='/' element={<Home />}  />
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<NotFind Token={Token}/>}></Route>
                </Routes>
                :
                //login
                <Routes>
                    
                <Route path='/' element={<DashBoardPage />}  />
                <Route path='/dashboard' element={<DashBoardPage />}></Route>
                <Route path='/register' element={<Register />} />
                <Route path='output' element={<OutputDash/>} />
                <Route path='*' element={<NotFind Token={Token}/>}></Route>
                <Route path='/editUser' element={<EditUser/>}></Route>
                <Route path='/inputData' element={<Tracking/>}></Route>
                
                </Routes>
            }
        </Router>
        </>
           )}

export default App;