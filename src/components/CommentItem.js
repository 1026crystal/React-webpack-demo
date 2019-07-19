import React from 'react'

export default function CommentItem( { user, content}) {
  return (
    <li>
      <h3>评论人: { user }</h3>
      <p>评论内容: { content }</p>
    </li>
  )
}