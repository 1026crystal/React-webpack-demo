import React from 'react'
import CommentItem from './CommentItem'
import './../css/CommentList.scss'

export default class CommentList  extends React.Component {
  constructor(props) {
    super(props)
    // 初始化状态
    this.state = {
      list: [
        { id: 1, user: '张三1', content: '哈哈，苹果' },
        { id: 2, user: '张三2', content: '哈哈，香蕉' },
        { id: 3, user: '张三3', content: '哈哈，橙子' },
        { id: 4, user: '张三4', content: '哈哈，榴莲' },
        { id: 5, user: '张三5', content: '哈哈，车厘子'}
        
      ]
    }
  }
  // 渲染评论列表
  renderList() {
    return this.state.list.map((item) => {
      return (
        <CommentItem key={ item.id} {...item} />
      )
    })
  }
  render() {
    return (
      <div className="comment_wrapper">
        <h1>评论列表</h1>
        <ul>
          { this.renderList()}
        </ul>
      </div>
    )
  }
}
