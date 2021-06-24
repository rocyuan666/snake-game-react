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
			// 蛇位置 数组第一位是蛇头位置
			snakePositions: [
				{ top: 0, left: 0, }
			],
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
			snakePositions: [
				{ top: 0, left: 0, }
			],
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
					const newSnakePositions = state.snakePositions.map((item) => {
						item.left += 10
						return item
					})
					return {
						snakePositions: newSnakePositions
					}
				})
			} else if (direction === "left") {
				// 向左移动
				this.setState(state => {
					const newSnakePositions = state.snakePositions.map((item) => {
						item.left -= 10
						return item
					})
					return {
						snakePositions: newSnakePositions
					}
				})
			} else if (direction === "bottom") {
				// 向下移动
				this.setState(state => {
					const newSnakePositions = state.snakePositions.map((item) => {
						item.top += 10
						return item
					})
					return {
						snakePositions: newSnakePositions
					}
				})
			} else if (direction === "top") {
				// 向上移动
				this.setState(state => {
					const newSnakePositions = state.snakePositions.map((item) => {
						item.top -= 10
						return item
					})
					return {
						snakePositions: newSnakePositions
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
		const { snakePositions } = this.state;
		if (snakePositions[0].top < 0 || snakePositions[0].top > 490 || snakePositions[0].left < 0 || snakePositions[0].left > 490) {
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
		const { snakePositions, foodTop, foodLeft } = this.state;
		if (snakePositions[0].top === foodTop && snakePositions[0].left === foodLeft) {
			this.props.handleScore();
			this.handleSnakeLength()
			this.randomFood();
		}
	}

	/**
	 * 处理蛇身长长（有问题）
	 */
	handleSnakeLength() {
		const { snakePositions, direction } = this.state;
		const snakeObj = {}
		snakePositions.forEach((item, index) => {
			if (index === snakePositions.length - 1) {
				// 需要按照方向加值（不然会造成蛇长成畸形！！！）
				if (direction === "right") {
					snakeObj.top = item.top
					snakeObj.left = item.left - 10
				} else if (direction === "left") {
					snakeObj.top = item.top
					snakeObj.left = item.left + 10
				} else if (direction === "bottom") {
					snakeObj.top = item.top - 10
					snakeObj.left = item.left
				} else if (direction === "top") {
					snakeObj.top = item.top + 10
					snakeObj.left = item.left
				} else { }
			}
		})
		this.setState(state => {
			const newSnakePositions = [...state.snakePositions]
			newSnakePositions.push(snakeObj)
			return {
				snakePositions: newSnakePositions
			}
		})
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
		const { snakePositions, foodTop, foodLeft, foodBgColor } = this.state;
		return (
			<CpnContentWrap
				foodTop={foodTop}
				foodLeft={foodLeft}
				foodBgColor={foodBgColor}
			>
				{
					snakePositions.map((snakeItem, snakeIndex) => {
						return (
							<div
								className="snake-item"
								key={snakeIndex}
								style={{
									top: snakeItem.top,
									left: snakeItem.left
								}}
							>蛇身</div>
						)
					})
				}
				<div className="food">食物</div>
			</CpnContentWrap>
		)
	}
}
