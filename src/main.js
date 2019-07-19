import React from 'react';
import ReactDOM from 'react-dom'
// import './index.scss'
import Counter from './components/Counter'
import CommentList from './components/CommentList'
import MovieContainer from './components/App'

ReactDOM.render(
  <div>
    {/* <Counter />
    <CommentList /> */}
    <MovieContainer />
  </div>,
  document.getElementById('root')
)
