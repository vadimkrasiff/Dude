import './App.css';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Profile from './component/Profile/Profile';
import { connect, Provider } from 'react-redux';
import store from './redux/store';
import Login from './component/Login/Login';
import Header from './component/Header/Header';
import NavBar from './component/NavBar/NavBar';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './comon/Preloader';
import Users from './component/Users/Users';
import { useEffect } from 'react';




let App = (props) => {

  useEffect(()=>props.initializeApp(), [])

if(!props.initialized)
return <div className="preloader"><Preloader/></div> 

  return <>
        <Header />
        <div className='wrapper'>

          <div className='content'>
            <NavBar />
            <div className='component'>
            <Routes >
              <Route path='/login' element={<Login />}/>
              <Route path='/profile/:userId?' element={<Profile />}/>
              <Route  path='/users' element={<Users />} />
              {/* <Route exact path='/users' element={<Navigate to="/users?page=1" replace />} /> */}
              <Route exact path='/' element={<Navigate to="/profile" replace />} />
              
            </Routes>
            </div>
          </div>
        </div>

  </>
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

let AppContainer = compose(
  connect(mapStateToProps, {initializeApp}))
  (App);

  const ExportApp = () => {
    return<BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
  }

export default ExportApp;
