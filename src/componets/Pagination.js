import React from 'react';

const Pagination = ({ totalPage, getPosts, currentPage }) => {
  const pages = Array(totalPage).fill(1).map((val, idx) => val + idx);

  return (
    <>
      <nav className='pagination_wrap center'>
        <ul className='pagination'>
          <li><a>Previous</a></li>
          {pages.map(page => {
            return <li 
              onClick={() => getPosts(page)} 
              key={page}
              className={currentPage === page ? 'active' : ''}>
                {page}
              </li>
          })}
          <li><a>Next</a></li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination;
