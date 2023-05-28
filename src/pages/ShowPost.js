import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ShowPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`)
      .then(res => {
        console.log(res.data);
        setPost(res.data);
      });
  }, [id]);

  const printDate = (timeStamp) => {
    return new Date(timeStamp).toLocaleString();
  }

  return(
    <div className='container'>
      <div className='showpost center'>
        <div className='showpost_header'>
          <div><h2>{post.title}</h2></div>
          <small>{printDate(post.createAt)}</small>
          <span className='edit_button' onClick={()=>navigate(`/blog/${id}/edit`)}>Edit</span>
        </div>
        <div className='showpost_body'>{post.body}</div>
      </div>
    </div>
  )
}

export default ShowPost;
