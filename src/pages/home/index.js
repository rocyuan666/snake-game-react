import React, { createRef, PureComponent } from 'react'

import RocHomeWrap from "./styled"

import RocCpnController from "./c-cpn/cpn-controller"
import RocCpnContent from "./c-cpn/cpn-content"

export default class index extends PureComponent {
  constructor(props) {
    super(props)
    this.refContent = createRef()
  }
  // 开始游戏
  playGame() {
    this.refContent.current.snakeMove()
  }
  render() {
    return (
      <RocHomeWrap>
        {/* 操作控制区域 */}
        <RocCpnController playGame={_ => {this.playGame()}} />
        {/* 游戏内容区域 */}
        <RocCpnContent ref={this.refContent} />
      </RocHomeWrap>
    )
  }
}
