import React from 'react'
import './../css/Counter.scss'

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0};
    this.decrease = this.decrease.bind(this);
    this.increase = this.increase.bind(this);
  }
  // 加1
  increase() {
    let self = this;
    self.setState( { number: self.state.number + 1});
  }
  // 减1
  decrease() {
    let self = this;
    self.setState({ number: self.state.number - 1});
  }
  render() {
    return(
      <div className="counter_wrapper">
        <input type="button" value="-" onClick={ this.decrease}/>
        <span className="number">{ this.state.number }</span>
        <input type="button" value="+" onClick={ this.increase }/>
      </div>
    )
  }
}