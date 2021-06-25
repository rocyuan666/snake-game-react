import React, { PureComponent } from 'react'

import CpnContorllerWrap from "./styled"

export default class index extends PureComponent {
	clickPlayGame() {
		this.props.playGame();
	}
	render() {
		return (
			<CpnContorllerWrap>
				<span className="btn-play" onClick={e => { this.clickPlayGame() }}>开始</span>
				<p>得分：{this.props.score}</p>
				<p className="tips-text">提示：键盘 ↑ ↓ ← → 控制蛇方向</p>
			</CpnContorllerWrap>
		)
	}
}
