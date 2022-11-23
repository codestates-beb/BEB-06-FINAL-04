import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import auth from './hooks/axios/auth';
import { setLocalData, clearLocalData } from './config/localStrage';

import Nav from './component/Nav';
import Main from './pages/main/Main';
import ListPage from './pages/list/ListPage';
import ClientMypage from './pages/mypage/Client';
import SupplierMypage from './pages/mypage/Supplier';
import ClientDetail from './pages/detail/Client';
import SupplierDetail from './pages/detail/Supplier';
import AdDetail from './pages/detail/Ad';
import LoginPage from './pages/login/LoginPage';
import UploadPage from './pages/detail/Upload';
import Emptypage from './component/Emptypage';
import Footer from './component/Footer';
import TestApiPage from './pages/testAPI/testapi';
import ContractPage from './pages/mypage/component/Contract';

import './App.css';

const App = () => {
  const [ userData, setUserData ] = useState({});
  console.log("userData", userData);

  //세션유지
  useEffect(() => {
    auth.refresh()
      .then(res => res.data)
      .then(data => {
        const { user, jwt_accessToken, isClient } = data;
        if (user && jwt_accessToken && typeof(isClient) === 'boolean') { 
          setLocalData("accessToken", jwt_accessToken);
          setLocalData("isClient", isClient);
          setUserData(user);
        }
      })
      .catch(err => {
        clearLocalData();
        console.log(err.response.data);
        return auth.logout()
        .then(res => alert("쿠키가 만료되었습니다 다시 로그인 해주세요."))
        .catch(err => console.log("logoutErr", err))
      })
  }, []);
  
  return (
    <>
      <Nav userData={userData} setUserData={setUserData} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list/*" element={<ListPage />} />
        <Route path="/mypage/client" element={<ClientMypage userData={userData}/>} />
        <Route path="/mypage/supplier" element={<SupplierMypage userData={userData}/>} />
        <Route path="/detail/client/:clientId" element={<ClientDetail />} />
        <Route path="/detail/supplier/:supplierId" element={<SupplierDetail />} />
        <Route path="/detail/ad/:adId" element={<AdDetail userData={userData}/>} />
        <Route path="/login" element={<LoginPage setUserData={setUserData} />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<Emptypage />} />
        <Route path="/testapi" element={<TestApiPage />} />
        <Route path="/contract" element={<ContractPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
