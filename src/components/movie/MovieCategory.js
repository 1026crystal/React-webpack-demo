import React, { Component } from 'react'

// 导入 antd 组件
import { Card, Spin, Alert, Rate, Pagination } from 'antd';
// 导入自定义样式
import '../../css/moviecategory.scss'

export default class MovieCategory extends Component {
  constructor(props) {
    super(props)
    // state只存放与页面逻辑相关的内容
    this.state = {
      data: {},
      isLoading: true
    }

    this.goPage = this.goPage.bind(this)
  }
  /**
   * 组件已经被挂在到页面中
   * 可以进行DOM操作，可以发送请求获取数据
   * 可以通过setState修改状态的值
   * @memberof MovieCategory
   */
  componentDidMount() {
    console.log(111, this.props);
    // 当前电影类型:
    this.movieType = this.props.match.params.movieType
    // 获取数据
    this.fetchData()
  }
  componentWillReceiveProps(nextProps) {
    console.log(222, nextProps);
    // 当前页:
    this.page = nextProps.match.params.page - 0 || 1
    // 当前电影类型:
    this.movieType = nextProps.match.params.movieType
    this.setState({ isLoading: true })
    // 获取数据
    this.fetchData()
  }
  fetchData() {
    const result = {
      subjects: [
        { id: 1, title: '未知死亡', year: '2014年', images: './../../images/cat_5.png', genres: ['动作', '喜剧'], rating: 10},
        { id: 2, title: '三傻大闹宝莱坞', year: '2015年', images: './../../images/cat_5.png', genres: ['动作', '喜剧'], rating: 6},
        { id: 3, title: '七号房的礼物', year: '2016年', images: './../../images/cat_5.png', genres: ['动作', '喜剧'], rating: 8},
        { id: 4, title: '匆匆那年', year: '2017年', images: './../../images/cat_5.png', genres: ['动作', '喜剧'], rating: 4},
        { id: 5, title: '西红柿首富', year: '2018年', images: './../../images/cat_5.png', genres: ['动作', '喜剧'], rating: 8}
      ],
      total: 5
    }
    this.setState({ data: result, isLoading: false})
  }
  // 页面跳转
  goPage(page, pageSize) {
    this.props.history.push(`/movielist/${this.movieType}/${page}`)
  }
  // 跳转到详情页面
  goDetail(id) {
    this.props.history.push(`/movielist/detail/${id}`)
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spin tip="Loading...">
          <Alert
            message="友情提示："
            description="数据正在疯狂加载中，请稍候..."
            type="info" />
        </Spin>
      )
    }
    const { subjects, total} = this.state.data

    const movieList = subjects.map( item => {
      return(
        <Card
          key={item.id}
          hoverable
          cover={<img alt="example" src={item.images} />}
          onClick={() => { this.goDetail(item.id) } }
        >
          <h3>{ item.title }</h3>
          <p>电影类型：{ item.genres.join('、') }</p>
          <p>上映年份：{ item.year }</p>
          <Rate disabled defaultValue={ item.rating / 2 } />
        </Card>
      )
    })
    return (
      <div>
        {/* 电影列表 */}
        <div className="movie_list">{ movieList }</div>
        <Pagination style={{ marginTop: '20px', float: 'right'}} defaultCurrent={1} current={this.page} defaultPageSize={5} total={total} onChange={ this.goPage } />
      </div>
    )
  }
}