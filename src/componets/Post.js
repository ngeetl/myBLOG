import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Post = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeBody = e => setBody(e.target.value);
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
            axios.post('http://localhost:3001/posts', {
                title: title,
                body: body,
                createAt: Date.now()
            });
            navigate('/blog');
        }
    }

    return (
        <form className='center'> 
            <h3>New Post</h3>
            <div className='title_wrap post_wrap'>
                <label for="title">Title</label>
                <input id="title" 
                    value={title} 
                    onChange={onChangeTitle}
                    placeholder="제목을 입력하세요"
                    type="text"
                />
            </div>
            <div className='body_wrap post_wrap'>
                <label for="body">Body</label>
                <textarea id="body" 
                    value={body} 
                    onChange={onChangeBody}
                    onKeyUp={onKeyUp}
                    placeholder="게시글을 입력하세요"
                    type="text"
                />
            </div>
            <div className='post_button_wrap'><button className="post_button button" onClick={submit}>POST</button></div>
        </form>
    )
}

export default Post;
