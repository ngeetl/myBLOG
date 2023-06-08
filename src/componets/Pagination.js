import React from 'react';

const Pagination = ({ totalPage, getPosts, currentPage }) => {
  const pageLimit = 5
  const currentSet = Math.ceil(currentPage / pageLimit);
  const startPage = pageLimit * (currentSet - 1) + 1;
  const lastSet = Math.ceil(totalPage / pageLimit); 
  const pageForSet = currentSet === lastSet ? totalPage % pageLimit : pageLimit;
  const pages = Array(pageForSet).fill(startPage).map((val, idx) => val + idx);
  return (
    <>
      <nav className='pagination_wrap center'>
        <ul className='pagination'>
          <li onClick={() => startPage !== 1 && getPosts(startPage - pageLimit)}><a>Previous</a></li>
          {pages.map(page => {
            return <li 
              onClick={() => getPosts(page)} 
              key={page}
              className={currentPage === page ? 'active' : ''}>
                {page}
              </li>
          })}
          <li onClick={() => currentSet !== lastSet && getPosts(startPage + pageLimit)}><a>Next</a></li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination;
