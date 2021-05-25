import React, { PureComponent } from 'react'

import CpnContorllerWrap from "./styled"

export default class index extends PureComponent {
  clickPlayGame() {
    this.props.playGame();
  }
  render() {
    return (
      <CpnContorllerWrap>
        <button onClick={e => { this.clickPlayGame() }}>开始</button>
      </CpnContorllerWrap>
    )
  }
}
