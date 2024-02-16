import { createRoot } from 'react-dom/client';
// import { RouterProvider } from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// import Contact from './pages/contact';
// import Login from './auth/LoginPage/Login';
// import Register from './auth/RegisterPage/Register';
// import NotFind from './pages/notfind';
// import Home from './pages/HomePage/Home';
// import Track from './pages/track';
// import DashBoardPage from '../src/pages/DashboardPage/DashBoardPage'


// export const routes = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home/>,
//   },
//   {
//     path: '/track',
//     element: <Track/>,
//   },
//   {
//     path: '/dashboard',
//     element: <DashBoardPage/>,
//   },

 
//   {
//     path: '/contact',
//     element: <Contact />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/register',
//     element: <Register/>
//   },
//   {
//     path: '*',
//     element: <NotFind />
    
//   }
  // {
  //   path: '/dashboard',
  //   element: <ProtectedRoutes />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Dashboard />
  //     },
  //     {
  //       path: 'test',
  //       element: <About />
  //     }
  //   ]
  // },
  // {
  //   path: '/user/:userId',
  //   element: <User/>,  
  // },

// ]);


const rootElement=document.getElementById('root');
const root= createRoot(rootElement);

root.render(

   // <RouterProvider router={routes} /> 

    <App />

);



