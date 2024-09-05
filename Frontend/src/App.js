import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './Signup/SignUp';
import AfterSignUp from './After-SignUp/AfterSignUp'; // Import AfterSignUp component
import Home from './Home/Home';
import MyPage from './MyPage/MyPage';
import QuizCreator from './Quiz-Creator/QuizCreator';
import SubjectPage from './pages/Subject';
import SolvePage from './pages/Solve';
import ResultPage from './pages/Result';
import Header from './components/Header';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Example function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/after-signup" element={<AfterSignUp />} /> 
        <Route path="/quizcreator" element={<QuizCreator />} /> 
        <Route path="/mypage" element={<MyPage />} />  
        <Route path="/solve" element={<SubjectPage />} />
        <Route path="/solve/result" element={<ResultPage />} />
        <Route path="/solve/:subject" element={<SolvePage />} />
      </Routes>
    </div>
  );
}

export default App;
