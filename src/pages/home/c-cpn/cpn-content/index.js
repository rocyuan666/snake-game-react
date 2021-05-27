import React, { PureComponent } from 'react'

import utils from "../../../../utils/utils"

import CpnContentWrap from "./styled"

export default class index extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // 蛇长度
      snakeLength: 1,
      // 速度
      seed: 500,
      // 方向
      direction: "right",
      // 蛇头位置
      top: 0,
      left: 0,
      // 食物位置 & 颜色
      foodTop: -9999,
      foodLeft: -9999,
      foodBgColor: "#000"
    }
  }

  // 一开始展示食物
  componentDidMount() {
    this.randomFood()
    this.snakeContorl()
  }

  /**
   * 初始化
   */
  initPlay() {
    this.setState({
      snakeLength: 1,
      direction: "right",
      top: 0,
      left: 0
    })
  }

  /**
   * 蛇开始移动（递归方式）
   */
  snakeMove() {
    const { seed, direction } = this.state;
    if (this.snakeKill()) {
      alert("你挂了！！！")
      return console.log("失败了")
    } else {
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
      setTimeout(_ => {
        this.eatFood();
        this.snakeMove();
      }, seed)
    }
  }

  /**
   * 蛇死亡判断（碰壁）
   */
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

  /**
   * 随机食物的位置颜色
   */
  randomFood() {
    // 随机位置
    let NewFoodTop = Math.floor(Math.random() * 490 / 10) * 10
    let NewFoodLeft = Math.floor(Math.random() * 490 / 10) * 10
    this.setState({
      foodLeft: NewFoodLeft,
      foodTop: NewFoodTop
    })
    // 随机颜色
    let bgColor = utils.randomRgbColor(200, 200, 200)
    this.setState({
      foodBgColor: bgColor
    })
  }

  /**
   * 吃到食物（加分）
   */
  eatFood() {
    const { top, left, foodTop, foodLeft } = this.state;
    if (top === foodTop && left === foodLeft) {
      this.props.handleScore();
      this.randomFood();
    }
  }

  /**
   * 键盘控制蛇方向
   */
  snakeContorl() {
    window.onkeydown = e => {
      if (e.keyCode === 38) {
        // 上
        this.setState({
          direction: "top"
        })
      } else if (e.keyCode === 40) {
        // 下
        this.setState({
          direction: "bottom"
        })
      } else if (e.keyCode === 37) {
        // 左
        this.setState({
          direction: "left"
        })
      } else if (e.keyCode === 39) {
        // 右
        this.setState({
          direction: "right"
        })
      }
    }
  }

  render() {
    const { top, left, foodTop, foodLeft, foodBgColor } = this.state;
    return (
      <CpnContentWrap
        top={top}
        left={left}
        foodTop={foodTop}
        foodLeft={foodLeft}
        foodBgColor={foodBgColor}
      >
        <div className="snake-item">蛇身</div>
        <div className="food">食物</div>
      </CpnContentWrap>
    )
  }
}
