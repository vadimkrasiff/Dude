import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Profile from './component/Profile/Profile';
import { connect, Provider } from 'react-redux';
import store from './redux/store';
import Login from './component/Login/Login';
import Header from './component/Header/Header';
import NavBar from './component/NavBar/NavBar';
import { initializeApp } from './redux/app-reducer';
import { useEffect } from 'react';
import { compose } from 'redux';



let App = (props) => {


  return <>
        <Header />
        <div className='wrapper'>

          <div className='content'>
            <NavBar />
            <div className='component'>
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route extends path='/' element={<Navigate to="/profile" replace />}>
              </Route>
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
  connect(mapStateToProps, initializeApp))
  (App);

  const SamuraiJSApp = () => {
    return<BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
  }

export default SamuraiJSApp;
