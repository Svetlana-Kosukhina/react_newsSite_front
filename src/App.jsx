import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import AuthPage from './components/forms/AuthPage';
import MainPage from './components/MainPage';
import UserProfile from './components/UserProfile';

import { whoAmIRequested } from './redux/actions/authActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(whoAmIRequested());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<AuthPage type="login" />} />
      <Route path="/registration" element={<AuthPage type="registration" />} />
      <Route path="/users/:id" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
