import React from 'react'

import { Spin, Alert, Button, Icon } from 'antd'
// 导入样式
import './../../css/MovieDetail.scss'

export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { info: {}, isLoading: true}
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    const result = {
      title: '匆匆那年',
      images: './../../images/cat_5.png',
      casts: [
        { id: 1, name: 'AAA', avatars: './../../images/cat_5.png'},
        { id: 2, name: 'BBB', avatars: './../../images/cat_5.png'},
        { id: 3, name: 'CCC', avatars: './../../images/cat_5.png'}
      ],
      summary: '一家灯红酒绿的酒吧里，每个人都玩的特别的嗨，都在比较自己年轻时候干的最疯狂的事情，一个叫七七的人听到一个叫陈寻的人说自己高考的时候为了一个女孩放弃了一道十三分大题。七七对他的故事很感兴趣，就主动与他搭讪。早上，陈寻醒过来却发现自己和七七上了床，在七七的不断追问下，他想起了十五年前的那个故事。高中时期的一次早操上，那是陈寻第一次看到那个转学过来穿白裙子的女孩子方茴，方茴从来不和别人说话，这样特别的女孩引起了陈寻、赵烨、乔燃的兴趣，陈寻就给他们两个打赌要做第一个和她说话的男生。 谁知，陈寻并没有成功，赵烨心目中的女神林嘉茉就主动和方茴说话，并将她拉到自己的饭桌上一起吃饭，这也是他们第一次同桌吃饭。 陈寻推荐方茴为宣传委员，方茴也终于第一次和陈寻开口说话了，陈寻很开心。回到教室拿作业本的陈寻看到认真做宣传板报的方茴，就在这一刻，他喜欢上了方茴，而方茴对陈寻也有了青春的懵懂。晚上，陈寻偷偷的用左手在教室的黑板上写下了：方茴喜欢陈寻几个大字，第二天，方茴看到这几个字哭了起来。在升国旗的时候，方茴突然晕倒了，陈寻和乔燃很着急的将她送到了校医务室，陈寻趁乔燃出去的时候向方茴表明了心意，而方茴也接受了他，就这样他们偷偷的开始了青涩的恋情。'
    }
    this.setState({ info: result, isLoading: false})
  }
  render() {
    if (this.state.isLoading) {
      return (
        <Spin tip="Loading...">
          <Alert
            message="友情提示："
            description="数据正在疯狂加载中，请稍候..."
            type="info"
          />
        </Spin>
      )
    }
    const { info } = this.state
    const castList = info.casts.map(item => (
      <li key={item.id}>
        <img src={item.avatars} alt="" />
        <p>{item.name}</p>
      </li>
    ))
    return (
      <div>
        <Button type="primary" onClick={ () => this.props.history.go(-1)}><Icon type="left" />返回电影列表</Button>

        <div className="title-img">
          <h1>{ info.title }</h1>
          <img  src={ info.images} alt=""/>
        </div>
        <div className="casts">
          <h4 className="title">主要演员：</h4>
          <ul style={{ listStyle: 'none', paddingLeft: '20px'}}>
            { castList}
          </ul>
        </div>
        <div className="summary">
          <h4 className="title">剧情介绍:</h4>
          <p>{ info.summary }</p>
        </div>
      </div>
    )
  }
}