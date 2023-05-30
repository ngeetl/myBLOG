import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../componets/Card';
import LoadingSpinner from '../componets/LoadingSpinner';

const CardList = ({ isAdmin }) => {
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
        return posts.filter(post => isAdmin || post.publish).map(post => {
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

    return renderList();
}

export default CardList
