import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [posts, setPosts] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then(res => {
        setPosts(res.data);
      })
  }, []);
  
  

  return (
    <div className='container'>
      <h2 className='home_header'>BEST ARTICLE</h2>
      <div className='popular_post_wrap'>
        <div className='popular_post_box'>
          <div className='popular_post'>
            {/* <h3>{posts[1].title}</h3>
            <p>{posts[1].body}</p> */}
          </div>
        </div>
        <div className='popular_post_box'></div>
        <div className='popular_post_box'></div>
        <div className='popular_post_box'></div>
        <div className='popular_post_box'></div>
        <div className='popular_post_box'></div>
      </div>
    </div>
  )
}

export default Home
