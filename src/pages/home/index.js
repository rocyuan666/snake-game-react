import React, { createRef, PureComponent } from 'react'

import RocHomeWrap from "./styled"

import RocCpnController from "./c-cpn/cpn-controller"
import RocCpnContent from "./c-cpn/cpn-content"

export default class index extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      score: 0
    }
    this.refContent = createRef()
  }
  /**
   * 开始游戏
   */
  playGame() {
    this.refContent.current.initGame()
    this.refContent.current.playGame()
  }
  
  /**
   * 得分了
   */
  handleScore() {
    this.setState(state => {
      return {
        score: state.score + 1
      }
    })
  }
  render() {
    return (
      <RocHomeWrap>
        {/* 操作控制区域 */}
        <RocCpnController playGame={_ => {this.playGame()}} score={this.state.score} />
        {/* 游戏内容区域 */}
        <RocCpnContent ref={this.refContent} handleScore={() => {this.handleScore()}} />
      </RocHomeWrap>
    )
  }
}
