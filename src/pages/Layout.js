import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import useToast from '../Hooks/toast';

const Layout = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const { addToast } = useToast();
  const activeStyle = ({ isActive }) => {
    return {
      color: isActive ? "rgb(255, 225, 76)" : "rgb(222, 232, 246)"
    }
  }

  const loginClick= () => {
    if(isLogin) {
      dispatch(logout());
      addToast({
        type: 'success',
        message: "접근이 해제되었습니다."
      })

    } else {
      dispatch(login());
      addToast({
        type: 'success',
        message: "접근이 허용되었습니다."
      })
    }
  }

  return (
      <div className='nav_bar'>
        <h1><Link to="/">myBLOG</Link></h1>
        <div className='nav'>
          <div><NavLink style={activeStyle} to="/blog">BLOG</NavLink></div>
          {isLogin && <div><NavLink style={activeStyle} to="/board">BOARD</NavLink></div>}
          {isLogin && <div><NavLink style={activeStyle} to="/admin">MY</NavLink></div>}
          <div>
            <button 
              className='login'
              onClick={loginClick}>
                {isLogin ? 'Admin' : 'Visitor'}
            </button>
          </div>
        </div>
      </div>
  )
}

export default Layout
