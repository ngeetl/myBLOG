import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Layout = () => {
  const activeStyle = ({isActive}) => {
    return {
      color: isActive ? "rgb(255, 225, 76)" : "rgb(222, 232, 246)"
    }
  }
  return (
      <div className='nav_bar'>
        <h1><Link to="/">myBLOG</Link></h1>
        <div className='nav'>
          <div><NavLink style={activeStyle} to="/blog">BLOG</NavLink></div>
          <div><NavLink style={activeStyle} to="/board">BOARD</NavLink></div>
          <div><NavLink style={activeStyle} to="/edit">EDIT</NavLink></div>
        </div>
      </div>
  )
}

export default Layout
