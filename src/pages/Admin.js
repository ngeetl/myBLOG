import React from 'react';
import CardList from '../componets/CardList';
import { Link } from 'react-router-dom';
import Pagination from '../componets/Pagination';

const Admin = () => {

    return (
        <div className='container'>
          <div className='card_header'>
            <h2>Blog List</h2>
            <Link to="/board">+</Link>
          </div>
          <CardList isAdmin={true}/> 
          <Pagination /> 
        </div>
      )
}

export default Admin
