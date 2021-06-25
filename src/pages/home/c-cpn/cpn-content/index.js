import React, { PureComponent } from 'react'

import utils from "../../../../utils/utils"

import CpnContentWrap from "./styled"

export default class index extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			// 速度
			seed: 200,
			// 方向
			direction: "right",
			// 蛇位置 数组末尾是蛇头位置
			snakePositions: [
				{ top: 0, left: 0, }
			],
			// 食物位置 & 颜色
			foodTop: -9999,
			foodLeft: -9999,
			foodBgColor: "#000",
			// 计时器
			timeInterval: null
		}
	}

	/**
	 * 初始化
	 */
	initGame() {
		// 生成食物
		this.randomFood()
		// 监听键盘-控制蛇
		this.snakeContorl()
		// 清除计时器
		clearInterval(this.state.timeInterval)
		// 初始化状态
		this.setState({
			direction: "right",
			snakePositions: [
				{ top: 0, left: 0, }
			],
		})
	}

	/**
	 * 开始游戏
	 */
	playGame() {
		const { seed } = this.state;
		const createTimeInterval = setInterval(_ => {
			if (this.snakeKill()) {
				// 游戏结束
				this.gameOver()
			} else {
				// 游戏正常
				this.eatFood();
				this.snakeMove();
			}
		}, seed)
		this.setState({
			timeInterval: createTimeInterval
		})
	}

	/**
	 * 蛇移动
	 * 先要清除  数组的末尾是蛇头
	 * 思路：
	 * 1（错误）开始想的是移动整条蛇，此思路走不通
	 * 2（正确）用复制一份蛇的尾巴通过计算位置后放在蛇头的前面（成为新的蛇头），然后删除旧的蛇尾，这就向前走了一步（重复）
	 */
	snakeMove() {
		const { snakePositions, direction } = this.state;
		// 记录目前蛇头位置
		const oldTop = snakePositions[snakePositions.length - 1].top
		const oldLeft = snakePositions[snakePositions.length - 1].left

		if (direction === "right") {
			// 向右移动
			this.setState(state => {
				const newSnakePositions = [...state.snakePositions]
				// 计算新的蛇头位置
				const newSnake = {
					top: oldTop,
					left: oldLeft + 10
				}
				// 新的蛇头放入数组
				newSnakePositions.push(newSnake)
				// 删除之前的蛇尾
				newSnakePositions.shift()
				return {
					snakePositions: newSnakePositions
				}
			})
		} else if (direction === "left") {
			// 向左移动
			this.setState(state => {
				const newSnakePositions = [...state.snakePositions]
				const newSnake = {
					top: oldTop,
					left: oldLeft - 10
				}
				newSnakePositions.push(newSnake)
				newSnakePositions.shift()
				return {
					snakePositions: newSnakePositions
				}
			})
		} else if (direction === "bottom") {
			// 向下移动
			this.setState(state => {
				const newSnakePositions = [...state.snakePositions]
				const newSnake = {
					top: oldTop + 10,
					left: oldLeft
				}
				newSnakePositions.push(newSnake)
				newSnakePositions.shift()
				return {
					snakePositions: newSnakePositions
				}
			})
		} else if (direction === "top") {
			// 向上移动
			this.setState(state => {
				const newSnakePositions = [...state.snakePositions]
				const newSnake = {
					top: oldTop - 10,
					left: oldLeft
				}
				newSnakePositions.push(newSnake)
				newSnakePositions.shift()
				return {
					snakePositions: newSnakePositions
				}
			})
		} else { }
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
		if (snakePositions[snakePositions.length - 1].top === foodTop && snakePositions[snakePositions.length - 1].left === foodLeft) {
			this.props.handleScore();
			this.handleSnakeLength()
			this.randomFood();
		}
	}

	/**
	 * 处理蛇身长长
	 * 思路：吃一截食物，从蛇尾处（数组0位）加一截
	 */
	handleSnakeLength() {
		const { snakePositions, direction } = this.state;
		const snakeObj = {}
		// 记录蛇尾位置
		const lastTop = snakePositions[0].top
		const lastLeft = snakePositions[0].left
		// 需要按照方向加值（不然会造成蛇长成畸形！！！）
		if (direction === "right") {
			snakeObj.top = lastTop
			snakeObj.left = lastLeft - 10
		} else if (direction === "left") {
			snakeObj.top = lastTop
			snakeObj.left = lastLeft + 10
		} else if (direction === "bottom") {
			snakeObj.top = lastTop - 10
			snakeObj.left = lastLeft
		} else if (direction === "top") {
			snakeObj.top = lastTop + 10
			snakeObj.left = lastLeft
		} else { }
		this.setState(state => {
			const newSnakePositions = [...state.snakePositions]
			newSnakePositions.unshift(snakeObj)
			return {
				snakePositions: newSnakePositions
			}
		})
	}

	/**
	 * 蛇死亡判断（碰壁、吃自己）
	 */
	snakeKill() {
		const { snakePositions } = this.state;
		const snakeHeaderTop = snakePositions[snakePositions.length - 1].top;
		const snakeHeaderLeft = snakePositions[snakePositions.length - 1].left;
		if (snakeHeaderTop < 0 || snakeHeaderTop > 490 || snakeHeaderLeft < 0 || snakeHeaderLeft > 490) {
			// 蛇死了(碰壁)
			return true;
		} else {
			const newSnakePositions = [...snakePositions]
			// 删除掉蛇头（蛇头必定会和蛇头一样，所以除掉蛇头作对比）
			newSnakePositions.pop()
			for (let i in newSnakePositions) {
				if (snakeHeaderTop === newSnakePositions[i].top && snakeHeaderLeft === newSnakePositions[i].left) {
					// 蛇死了（吃自己）
					return true;
				}
			}
			// 蛇活着
			return false;
		}
	}

	/**
	 * 失败了
	 */
	gameOver() {
		alert("游戏结束")
		clearInterval(this.state.timeInterval)
	}

	/**
	 * 键盘控制蛇方向
	 * ↑ 38
	 * ↓ 40
	 * ← 37
	 * → 39
	 */
	snakeContorl() {
		window.onkeydown = e => {
			this.setState(state => {
				let newDirection = state.direction;
				if (e.keyCode === 38 && state.direction !== "bottom") {
					// 上
					newDirection = "top"
				} else if (e.keyCode === 40 && state.direction !== "top") {
					// 下
					newDirection = "bottom"
				} else if (e.keyCode === 37 && state.direction !== "right") {
					// 左
					newDirection = "left"
				} else if (e.keyCode === 39 && state.direction !== "left") {
					// 右
					newDirection = "right"
				}
				return {
					direction: newDirection
				}
			})
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
								className={"snake-item " + (snakeIndex === snakePositions.length - 1 ? "red" : "")}
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
