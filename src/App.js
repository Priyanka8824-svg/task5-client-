import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";

import {useState,useEffect} from "react";
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';

import TaskForm from './components/TaskForm';
import Tasks from './components/Tasks';

import PersistLogin from './components/PersistLogin';

import Login from './components/pages/Login.js';
import SignUp from './components/pages/SignUp.js';
import Home from './components/pages/Home.js';
import Error404 from './components/pages/Error404.js';
import AccountActivation from './components/pages/AccountActivation.js';
import Account from './components/pages/Account.js';
import AccountUpdateForm from './components/pages/AccountUpdateForm.js';
import Users from './components/pages/Users.js';
import UserTasks from './components/pages/UserTasks.js';

import useAuth from './hooks/useAuth';

function App() {

  const auth = useAuth()

  return (
    <div className="App5">
        <BrowserRouter>
          <Navbar/>
         
          <Routes>
         
            <Route path={'/'} element={<PersistLogin/>}>
         
              <Route path={'/tasks/add/'}  
                element={ auth.user.role=="manager"||auth.user.role=="team_leader" ? <TaskForm/> : <Navigate to={`/login/`}/> }   
              />
         
              <Route path={'/tasks/'}  
                element={ auth.loggedIn ? <Tasks/> : <Navigate to={`/login/`}/> }   
              />
         
              <Route path={'/'}  element={<Home/>} />
              <Route path={'/home/'}  element={<Home/>} />
              <Route path={'/signup/'}  element={<SignUp/>} />
              <Route path={'/login/'}  element={<Login/>} />
              
              <Route path={'/account/'}  
                element={ auth.loggedIn ? <Account/> : <Navigate to={`/login/`}/> }   />
              
              <Route path={'/account/update/'}  
                element={ auth.loggedIn ? <AccountUpdateForm/> : <Navigate to={`/login/`}/> }   />
              
              <Route path={'/users/'}  
                element={ auth.loggedIn ? <Users/> : <Navigate to={`/login/`}/> }   />
              
              <Route path={'/user/tasks/:id/'}
                element={ auth.user.role=="manager"||auth.user.role=="team_leader" ? <UserTasks/> :
                         <Navigate to={`/login/`}/> }   />
            </Route>

            <Route path={'/account/activate/:token/'}  element={<AccountActivation/>} />
            <Route path={'*'}  element={<Error404/>} />

          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;
