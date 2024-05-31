import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import { UserContext } from '../UserContext';



const Header = () => {
  // console.log(process.env.REACT_APP_SITE_URL)
  const{setUserInfo, userInfo}=  useContext(UserContext);
  useEffect(() => {
    fetch(process.env.REACT_APP_SITE_URL+'/profile', {
      credentials: 'include',
    }).then(response =>{
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [])

function logout(){
  // debugger;
  // fetch('http://localhost:4000/logout',{
  //   credentials: 'include',
  //   method: 'POST'
  // })
  // setUserInfo(null);
  fetch(process.env.REACT_APP_SITE_URL+'/logout', {
    credentials: 'include',
    method: 'POST'
  }).then(() => {
    setUserInfo(null);

  }).catch(err => {
    console.error('Logout failed', err);
  });
  // const history = useNavigate();
  // history('/');
  window.location.href='/';
}

const username = userInfo?.username;


  return (
    <header>
      <Link to="/" className="logo">KonnectBlog</Link>
      <nav>
        {username && (
          <>
          <Link to="/create"> Create New Post</Link>
          <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
        <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
        )}
      </nav>
    </header>
  )
}

export default Header