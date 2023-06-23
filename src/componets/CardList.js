import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../componets/Card';
import LoadingSpinner from '../componets/LoadingSpinner';
import Pagination from './Pagination';
import useToast from '../Hooks/toast';
import { increase } from '../store/viewSlice';
import { useDispatch } from 'react-redux';

const CardList = ({ isAdmin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage]= useState(1);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [errMessage, setErrMessage] = useState('');
    let limit = 5;
    // useRef 변수
    const { addToast } = useToast();
    
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
      }).catch(err => {
        setErrMessage('서버로부터 불러오는 것을 실패하였습니다.');
        addToast({
          type: 'err',
          message: "서버 접속 실패"
        })
        setLoading(false);
      })
    }
  
    useEffect(getPosts, []);

    // err 메세지
    if(errMessage) {
      return <div className='center'>{errMessage}</div>
    }

    // post 수정    
    const editHandler = (id) => {
      navigate(`/blog/${id}`);
      dispatch(increase());
    }

    const deleteHandler = (e, id) => {
      e.stopPropagation();
      axios.delete(`http://localhost:3001/posts/${id}`)
        .then(() => {
          getPosts(1);
          addToast({type: "success", message: "메세지가 삭제되었습니다."});
        }).catch(err => {
          addToast({
            type: "err",
            message: "오류가 발생하였습니다."
          })
        });
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
