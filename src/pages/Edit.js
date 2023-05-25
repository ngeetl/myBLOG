import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../componets/LoadingSpinner';

const Edit = () => {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(true);

    const onChangeTitle = (e) => setTitle(e.target.value);
    const onChangeBody = (e) => setBody(e.target.value);
    const onKeyUp = e => {
        if(e.keyCode === 13) {
            submit(e);
        }
    }

    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();

        if(title.length === 0) {
            alert('제목을 입력하세요');
        } else if(body.length === 0) {
            alert('본문 내용을 입력하세요');
        } else if((title.length > 1) && (body.length > 1)) {
            axios.put(`http://localhost:3001/posts/${id}`, {
                title: title,
                body: body
            });
            navigate('/blog');
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`)
                .then(res => {
                    setTitle(res.data.title + '-수정본');
                    setBody(res.data.body);
                    setLoading(false);
                });
    }, [id]);

    const renderEdit = () => {
        if(loading) {
            return <LoadingSpinner/>
        }
        return (
            <>
                <div className='title_wrap post_wrap'>
                    <label for="title">Title</label>
                    <input id="title" 
                        value={title}
                        onChange={onChangeTitle}
                        type="text"
                    />
                </div>
                <div className='body_wrap post_wrap'>
                    <label for="body">Body</label>
                    <textarea id="body" 
                        value={body} 
                        onChange={onChangeBody}
                        onKeyUp={onKeyUp}
                        type="text"
                    />
                </div>
            </>
        )
    }

    return (
        <form className='center'> 
            <h3>Edit Page</h3>
            {renderEdit()}
            <div className='post_button_wrap'><button className="post_button button" onClick={submit}>Edit</button></div>
        </form>
    )
}

export default Edit;
