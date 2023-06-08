import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../componets/Card';
import LoadingSpinner from '../componets/LoadingSpinner';
import Pagination from './Pagination';

const CardList = ({ isAdmin }) => {
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage]= useState(1);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    let limit = 1;

    // post 불러오기 (GET)
    const getPosts = (page = 1) => {
      setCurrentPage(page);

      let params = {
        _page: page,
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
      }
      if(!isAdmin) {
        params = {
          ...params,
          publish: true
        }
      }
      axios.get('http://localhost:3001/posts', {
        params: params
      })
      .then(res => {
        setPosts(res.data);
        setLoading(false);
        setTotalPage(Math.ceil(res.headers['x-total-count']/limit));
      })
    }
  
    useEffect(getPosts, [isAdmin, totalPage, limit]);
    // post 수정
    const navigate = useNavigate();
    
    const editHandler = (id) => {
      navigate(`/blog/${id}`);
    }
    const deleteHandler = (e, id) => {
      e.stopPropagation();
      axios.delete(`http://localhost:3001/posts/${id}`)
      .then(() => {
        setPosts((prevposts) => {
          return prevposts.filter(post => post.id !== id)
        })
      })
    } 

    // post Card rendering
    const renderList = () => {
        if(loading) {
          return (
            <LoadingSpinner/>
          )
        } else if(posts.length === 0) {
          return (
            <div className='center'>나만의 블로그를 작성해 보세요!</div>
          )
        }
        return posts.map(post => {
            return(
              <Card post={post} key={post.id} editHandler={() => editHandler(post.id)}>
                {isAdmin ? (
                    <button 
                        className='card_button button' 
                        onClick={(e) => deleteHandler(e, post.id)}>
                            Delete
                    </button>) : null}
              </Card>
            )
          })
        }
        // useEffect(renderList ,[posts, isAdmin, loading])
    return (
      <>
        {renderList()}
        {totalPage > 1 && <Pagination totalPage={totalPage} getPosts={getPosts} currentPage={currentPage}/>}
      </>
    )
}

export default CardList
