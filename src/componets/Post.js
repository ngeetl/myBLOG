import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [publish, setPublish] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);

    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeBody = e => setBody(e.target.value);
    const onKeyUp = e => {
        if(e.keyCode === 13) {
            submit(e);
        }
    }

    const onChangePublish = () => {
        publish ? setPublish(false) : setPublish(true);
    };
    
    const submit = (e) => {
        e.preventDefault();

        setTitleError(false);
        setBodyError(false);

        if(validateForm()) {
            axios.post('http://localhost:3001/posts', {
                title: title,
                body: body,
                publish: publish,
                createAt: Date.now()
            });
            navigate('/admin');
        }
    }
    
    const validateForm = () => {
        let validated = true;

        if(title === '') {
            setTitleError(true);
            validated = false;
        }
        if(body === '') {
            setBodyError(true);
            validated = false;
        }

        return validated
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
                    style={titleError ? {borderColor: 'red'} : null}
                />
                {titleError && <div style={{color: 'red'}}>제목을 입력하지 않았습니다!</div>}
            </div>
            <div className='body_wrap post_wrap'>
                <label for="body">Body</label>
                <textarea id="body" 
                    value={body} 
                    onChange={onChangeBody}
                    onKeyUp={onKeyUp}
                    placeholder="게시글을 입력하세요"
                    type="text"
                    style={bodyError ? {borderColor: 'red'} : null}
                />
                {bodyError && <div style={{color: 'red'}}>본문 내용을 입력하지 않았습니다!</div>}
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
