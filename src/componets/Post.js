import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Post = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [publish, setPublish] = useState(false);

    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeBody = e => setBody(e.target.value);
    const onKeyUp = e => {
        if(e.keyCode === 13) {
            submit(e);
        }
    }

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
                publish: publish,
                createAt: Date.now()
            });
            navigate('/blog');
        }
    }
    const onChangePublish = () => {
        publish ? setPublish(false) : setPublish(true);
    };

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
            <div className='publish_wrap'>
                <input 
                    type='checkbox'
                    checked={publish}
                    onChange={onChangePublish}/>
                <labe>Publish</labe>
            </div>
            <div className='post_button_wrap'>
                <button 
                    className="post_button button" 
                    onClick={submit}>
                    POST
                </button>
                <button 
                    className="cancel_button button" 
                    onClick={()=>navigate(`/blog`)}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default Post;
