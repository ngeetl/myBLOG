import React, { useEffect, useState } from 'react';

const Card = ({ post, editHandler, children }) => {
         
        return (
        <div className='card_wrap' onClick={editHandler}>
            <div className='card'>
                <div>제목 : {post.title}</div>
                <div>내용 : {post.body}</div>
            </div>
            {children}
        </div>
        )
}

export default Card;
