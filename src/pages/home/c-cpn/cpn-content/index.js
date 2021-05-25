import React, { PureComponent } from 'react'

import CpnContentWrap from "./styled"

export default class index extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      seed: 1000,  // 速度
      direction: "right",  // 方向
      top: 0,
      left: 0,
    }
  }
  // 蛇开始移动（递归方式）
  snakeMove() {
    const { seed, direction } = this.state;
    if (this.snakeKill()) {
      return console.log("失败了")
    } else {
      setTimeout(_ => {
        if (direction === "right") {
          // 向右移动
          this.setState(state => {
            return {
              left: state.left + 10
            }
          })
        } else if (direction === "left") {
          // 向左移动
          this.setState(state => {
            return {
              left: state.left - 10
            }
          })
        } else if (direction === "bottom") {
          // 向下移动
          this.setState(state => {
            return {
              top: state.top + 10
            }
          })
        } else if (direction === "top") {
          // 向上移动
          this.setState(state => {
            return {
              top: state.top - 10
            }
          })
        } else { }
        this.snakeMove()
      }, seed)
    }
  }
  // 蛇死亡判断
  snakeKill() {
    const { top, left } = this.state;
    if (top < 0 || top > 490 || left < 0 || left > 490) {
      // 蛇死了
      return true;
    } else {
      // 蛇活着
      return false;
    }
  }
  render() {
    const { top, left } = this.state;
    return (
      <CpnContentWrap top={top} left={left}>
        <div className="snake-item"></div>
      </CpnContentWrap>
    )
  }
}
