import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../componets/Card';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../componets/LoadingSpinner';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/posts')
    .then(res => {
      setPosts(res.data);
      setLoading(false);
    })
  }, []);

  const navigate = useNavigate();
  
  const editHandler = (id) => {
    console.log(id)
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

  const renderBlog = () => {
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
            <button className='card_button button' onClick={(e) => deleteHandler(e, post.id)}>Delete</button>
          </Card>
        )
      })
    
  }

  return (
    <div className='container'>
      <div className='card_header'>
        <h2>Blog List</h2>
        <Link to="/board">+</Link>
      </div>
      {renderBlog()}
    </div>
  )
}

export default Blog
