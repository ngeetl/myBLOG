import React from 'react';

const Pagination = ({ totalPage, getPosts, currentPage }) => {
  const pageLimit = 5
  const currentSet = Math.ceil(currentPage / pageLimit);
  const startPage = pageLimit * (currentSet - 1) + 1;
  const lastSet = Math.ceil(totalPage / pageLimit); 
  const pageForSet = currentSet === lastSet ? totalPage % pageLimit : pageLimit;
  const pages = Array(pageForSet).fill(startPage).map((val, idx) => val + idx);

  console.log(totalPage);
  return (
    <>
      <nav className='pagination_wrap center'>
        <ul className='pagination'>
          <li onClick={() => currentPage !== 1 && getPosts(currentPage - 1)}><a>Previous</a></li>
          {pages.map(page => {
            return <li 
              onClick={() => getPosts(page)} 
              key={page}
              className={currentPage === page ? 'active' : ''}>
                {page}
              </li>
          })}
          <li onClick={() => currentPage !== totalPage && getPosts(currentPage + 1)}><a>Next</a></li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination;
