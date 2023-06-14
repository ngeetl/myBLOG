import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../componets/Card';
import LoadingSpinner from '../componets/LoadingSpinner';
import Pagination from './Pagination';
import Toast from './Toast';

const CardList = ({ isAdmin }) => {
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage]= useState(1);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    let limit = 5;
    const [toasts, setToasts] = useState([]);

    // post 불러오기 (GET)
    const getPosts = (page = 1) => {
      setCurrentPage(page);

      let params = {
        _page: page,
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
        title_like: searchText,
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
  
    useEffect(getPosts, []);

    // post 수정
    const navigate = useNavigate();
    
    const editHandler = (id) => {
      navigate(`/blog/${id}`);
    }

    const addToast = (toast) => {
      let id = Math.random();
      const toastWithId = {...toast, id: id};
      setToasts(prev => [...prev, toastWithId]);
      toasts.map(toast => {
        setTimeout(() => removeToast(toast.id), 4000);
      })
    }

    const removeToast = (id) => {
      const toastFilter = toasts.filter(toast => toast.id !== id);
      setToasts(toastFilter);
    }

    const deleteHandler = (e, id) => {
      e.stopPropagation();
      axios.delete(`http://localhost:3001/posts/${id}`)
        .then(() => {
          setPosts((prevposts) => {
            return prevposts.filter(post => post.id !== id)
          })
        });
      addToast({type: "success", message: "메세지가 삭제되었습니다."});
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

    // search API
    const onSearch = (e) => {
      if(e.key === 'Enter') {
        getPosts()
      }
    }

    return (
      <>
        <Toast toasts={toasts} removeToast={removeToast}/>
        <div className='search center'>
          <input 
            className='search_bar'
            type='text'
            placeholder='search...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={onSearch}/>
        </div>
        {renderList()}
        {totalPage > 1 && <Pagination totalPage={totalPage} getPosts={getPosts} currentPage={currentPage}/>}
      </>
    )
}

export default CardList
