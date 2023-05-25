import React, { useEffect, useState } from 'react';

const Card = ({ post, editHandler, children }) => {
        const printDate = (timeStamp) => {
            return new Date(timeStamp).toLocaleString();
        }    

        return (
        <div className='card_wrap' onClick={editHandler}>
            <div className='card'>
                <div>제목 : {post.title}</div>
                <div>내용 : {post.body}</div>
                <small>{printDate(post.createAt)}</small>
            </div>
            {children}
        </div>
        )
}

export default Card;
