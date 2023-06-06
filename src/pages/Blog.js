import React from 'react';
import CardList from '../componets/CardList';
import Pagination from '../componets/Pagination';

const Blog = () => {

  return (
    <div className='container'>
      <div className='card_header'>
        <h2>Blog List</h2>
      </div>
      <CardList isAdmin={false}/> 
      <Pagination />
    </div>
  )
}

export default Blog
