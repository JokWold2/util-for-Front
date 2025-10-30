// if you want to make sure a Object or Array which is Trusted
// you can use this function. Its useful for front
// the first value is the res which is back from after
// the seond value is the variable that you want to check
// the third value is the rules of check ( you can read TheMethodOfUse to learn how to use it )

// thats make you Pleasantly surprised！
import { ref } from "vue"
// Mixin类（面向对象方式）- 第62-741行
// c函数（函数式方式）- 第744-1234行
// '校验'模式：验证接口返回的数据结构是否符合预期
// '测试'模式：根据规则生成模拟测试数据
// ✅ 支持对象和数组的深层嵌套校验
// ✅ 自动生成测试数据（字符串、数字、图片URL、时间等）
// ✅ 错误收集和反馈机制（存储到localStorage）
// ✅ 可配置数据数量、严格模式等
// ✅ 支持随机值和枚举值
// config数组支持的参数：
// - {} 或 [] : 指定返回数据格式
// - 数字 : 指定生成数据的数量（默认5）
// - true/false : 控制MIXINCHECK开关
// - '测试' : 测试模式
// - '校验' : 校验模式
// - 'only' : only模式（影响数据生成方式）
// 校验模式
// c(response, response.data, ['校验'], ['name', 'age=()'])
// // 测试模式 - 生成5条数据
// c('test', null, ['测试', [], 5], ['name', 'age=()', 'avatar=img'])
interface ListItem {
	name: string,
	type: string
}
interface Back {
	path: string,
	errorShow: boolean,
	dataShow: boolean,
	type: string,
	res: any,
	data: any,
	data2: any,
	backList: Array<ListItem>
}

const back = {
	path: '',
	errorShow: false,
	dataShow: false,
	type: "",
	res: {},
	data: {},
	data2: {},
	backList: [] as any
}

const ImageList = [
	'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
	'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
	'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
	'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
	'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
	'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
	'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]

function randomDate(start: string, end: string) {
	if (start != null && end != null) {
		const _start = new Date(start).getTime();
		const _end = new Date(end).getTime();
		const differ = _end - _start;
		const time_stamp = Math.random() * differ;
		const time = _start + time_stamp;
		//格式化时间
		const datetime = new Date();
		datetime.setTime(time);
		const year = datetime.getFullYear();
		const month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		const date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
		const hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
		const minute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
		const second = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
		return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
	} else {
		return '---';
	}
}

type config = '校验' | '测试' | 'only' | boolean | number | {} | []
export class Mixin {

	// 外部调用字符
	MIXINCHECK: boolean = true 
	#CHECKMODE = '校验'
	#DATANUM = 5
	#DATAONLY = false

	// 请求判断字符
	#FIELD = 'ok'
	#FIELDSTATUS: any = true

	// 弹框返回字符
	MC: Back[] = []

	// 内部使用字符
	#VSTRING = '测试字符'
	#STRICT: boolean = false //严格模式
	#VDATA = {}
	#BACK = {
		path: '',
		errorShow: false,
		dataShow: false,
		type: "",
		res: {},
		data: {},
		data2: {},
		backList: [] as any[]
	}
	#IMAGELIST = [
		'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
		'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
		'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
		'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
		'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
		'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
		'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
	]
	constructor() {
		this.c = this.c.bind(this)
	}
	c(way: any, check: any, config: config[], checkList: any): any {
		this.#DATANUM=5
		this.#DATAONLY=false
		this.#CHECKMODE = '校验'
		this.#VDATA = {}
		
		config.forEach((item: any) => {
			if (JSON.stringify(item) === JSON.stringify({}) as any) {
				this.#VDATA = item
			} else if (JSON.stringify(item) === JSON.stringify([]) as any) {
				this.#VDATA = item
			} else if (typeof item == 'number') {
				this.#DATANUM = item
			} else if (item === true as any) {
				this.MIXINCHECK = item as any
			} else if (item === false as any) {
				this.MIXINCHECK = item as any
			} else if (item === '测试' as any) {
				this.#CHECKMODE = '测试'
			} else if (item === '校验' as any) {
				this.#CHECKMODE = '校验'
			} else if (item === 'only' as any) {
				this.#DATAONLY = true
			}
		})
		// 关闭
		if (!this.MIXINCHECK) {
			return new Promise((resolve, reject) => {
				if (typeof way == 'object') {
					if (way[this.#FIELD] == this.#FIELDSTATUS) {
						resolve(check)
					} else {
						reject()
					}
				} else if (typeof way == 'string') {
					resolve(check)
				}else{
					resolve(check)
				}
			})
		}
		if (typeof way == 'object') {
			this.#BACK.type = '后端'
			this.#BACK.res = way.data
			if (way.config) {
				this.#BACK.path = way.config.url
				this.#BACK.data = JSON.parse(way.config.data ? way.config.data : '{}')
			}
		} else if (typeof way == 'string') {
			this.#BACK.type = '前端'
			this.#BACK.path = way
			this.#BACK.data = check
		}
		if (!way) {
			this.#BACK.backList.push({
				name: "res路径或者来源不存在",
				type: 'res不存在'
			})
			this.MC.push(this.#BACK)
			return new Promise((reject) => {
				this.MC[0].data = JSON.stringify(this.MC[0].data, null, 2)
				window.localStorage.setItem('MC', JSON.stringify(this.MC))
				reject(JSON.parse(JSON.stringify(this.MC[0])))

			})
		} else if (!check && this.#CHECKMODE == '校验') {
			this.#BACK.backList.push({
				name: "返回数据为空",
				type: '校验主体不存在',
			})
			this.MC.push(this.#BACK)
			return new Promise((reject) => {
				this.MC[0].data = JSON.stringify(this.MC[0].data, null, 2)
				window.localStorage.setItem('MC', JSON.stringify(this.MC))
				reject(JSON.parse(JSON.stringify(this.MC[0])))
			})
		}
		if (typeof check == 'string' && this.#CHECKMODE == '校验') {
			this.#BACK.backList.push({
				name: "校验主体不存在",
				type: '校验主体不存在',
			})
			this.MC.push(this.#BACK)
			return new Promise((reject) => {
				this.MC[0].data = JSON.stringify(this.MC[0].data, null, 2)
				window.localStorage.setItem('MC', JSON.stringify(this.MC))
				reject(JSON.parse(JSON.stringify(this.MC[0])))
			})
		}


		let VALUE: any
		if (this.#CHECKMODE == '测试') {
			if (!Array.isArray(this.#VDATA)) { //对象
				let Value: any = {}
				checkList.forEach((item: any, index: any) => {
					if (typeof item == 'string') {

						if (item.indexOf('=') != -1) {
							if (item.indexOf('(') != -1) {

								// 随机数字
								if (!item.substring(item.indexOf('=') + 2, item.length - 1)) {
									Value[item.substring(0, item.indexOf('='))] = index + Number(Math.round(Math.random() * 100).toFixed(3))
								} else if (item.indexOf('|') != -1) {
									let str = item.substring(item.indexOf('=') + 2, item.length - 1).split('|')
									Value[item.substring(0, item.indexOf('='))] = str[Math.floor(Math.random() * (str.length - 0 + 1)) + 0]
								} else {
									Value[item.substring(0, item.indexOf('='))] = Number(item.substring(item.indexOf('=') + 2, item.length - 1))
								}
							} else {
								if (item.indexOf('|') != -1) {
									let str = item.substring(item.indexOf('=') + 1).split('|')
									Value[item.substring(0, item.indexOf('='))] = str[Math.floor(Math.random() * (str.length - 0 + 1)) + 0]
								} else if (item.substring(item.indexOf('=') + 1) == 'time') {
									Value[item.substring(0, item.indexOf('='))] = randomDate('2001-04-08 16:54:59', '2025-04-08 16:54:59')
								} else if (item.substring(item.indexOf('=') + 1) == 'img') {
									Value[item.substring(0, item.indexOf('='))] = this.#IMAGELIST[Math.floor(Math.random() * (6 - 0 + 1)) + 0]
								} else {
									Value[item.substring(0, item.indexOf('='))] = item.substring(item.indexOf('=') + 1)
								}
							}
							// only模式下的 自增数据 用于对应数据
							if (!item.substring(item.indexOf('=') + 1)) {
								Value[item.substring(0, item.indexOf('='))] = `${this.#VSTRING}${index + 1}`
							}
						} else {
							Value[item] = `${this.#VSTRING}${this.#DATAONLY ? index + Number(Math.round(Math.random() * 100).toFixed(3)) : index + 1}`
						}
					} else if (!Array.isArray(item)) {//对象
						this.#ValueJSON(Value, item)
					} else if (Array.isArray(item)) {//数组
						this.#ValueList(Value, item)
					}
				})
				VALUE = Value
			} else if (Array.isArray(this.#VDATA)) { //数组
				let Value = []
				for (let i = 0; i < this.#DATANUM; i++) {
					Value.push({})
				}
				checkList.forEach((item: any) => {
					if (typeof item == 'string') {
						if (item.indexOf('=') != -1) {
							Value.forEach((item2: any, index2) => {
								if (item.indexOf('(') != -1) {
									// 随机数字
									if (!item.substring(item.indexOf('=') + 2, item.length - 1)) {
										item2[item.substring(0, item.indexOf('='))] = Number(Math.round(Math.random() * 1000))
									} else if (item.indexOf('|') != -1) {
										let str = item.substring(item.indexOf('=') + 2, item.length - 1).split('|')
										item2[item.substring(0, item.indexOf('='))] = Number(str[Math.floor(Math.random() * (str.length - 0 + 1)) + 0])
									} else {
										item2[item.substring(0, item.indexOf('='))] = Number(item.substring(item.indexOf('=') + 2, item.length - 1))
									}
								} else {
									if (item.indexOf('|') != -1) {
										let str = item.substring(item.indexOf('=') + 1).split('|')
										item2[item.substring(0, item.indexOf('='))] = str[Math.floor(Math.random() * (str.length - 0 + 1)) + 0]
									} else if (item.substring(item.indexOf('=') + 1) == 'img') {
										item2[item.substring(0, item.indexOf('='))] = this.#IMAGELIST[Math.floor(Math.random() * (6 - 0 + 1)) + 0]
									} else if (item.substring(item.indexOf('=') + 1) == 'time') {
										item2[item.substring(0, item.indexOf('='))] = randomDate('2001-04-08 16:54:59', '2025-04-08 16:54:59')
									} else {
										item2[item.substring(0, item.indexOf('='))] = item.substring(item.indexOf('=') + 1)
									}
									// item2[item.substring(0, item.indexOf('='))] = item.substring(item.indexOf('=') + 1)
								}
								// only模式下的 自增数据 用于对应数据
								if (!item.substring(item.indexOf('=') + 1)) {
									item2[item.substring(0, item.indexOf('='))] = `${this.#VSTRING}${index2 + 1}`
								}
							})
						} else {
							Value.forEach((item2: any, index2) => {
								item2[item] = `${this.#VSTRING}${this.#DATAONLY ? Number(Math.round(Math.random() * 1000)) : index2 + 1}`
							})
						}

					} else if (!Array.isArray(item)) {//对象
						Value.forEach((item2) => {
							this.#ValueJSON(item2, item)
						})
						// ValueJSON(Value[index], item)
					} else if (Array.isArray(item)) {//数组
						Value.forEach((item2) => {
							this.#ValueList(item2, item)
						})
						// ValueList(Value[index], item)
					}
				})
				VALUE = Value
			}
		} else if (this.#CHECKMODE == '校验') {
			if (!Array.isArray(check)) { //对象
				this.#BACK.type = this.#BACK.type + '--对象'
				checkList.forEach((item: any) => {
					if (typeof item == 'string') {
						let kk = item
						if (kk.indexOf('=') != -1) {
							kk = item.substring(0, item.indexOf('='))
						}

						if (!check[kk]) {
							if (check[kk] === 0) {

							} else {
								this.#BACK.backList.push({
									name: kk + '不存在',
									type: "不存在"
								})
							}
						} else {
							// 严格模式启用
							if (item.indexOf('=') != -1 && item.indexOf('|') != -1 && this.#STRICT) {
								let str = item.substring(item.indexOf('=') + 1).split('|')
								let flag = false
								str.forEach((item2: any) => {
									if (check[kk] == item2) {
										flag = true
									}
								})
								if (!flag) {
									this.#BACK.backList.push({
										name: kk + '数据错误--应为' + str.join('或'),
										type: "数据错误"
									})
								}
							} else if (item.indexOf('(') != -1 && typeof check[kk] != 'number' && this.#STRICT) {
								this.#BACK.backList.push({
									name: kk + '格式错误--应为数字',
									type: "格式错误"
								})
							} else if (item.indexOf('(') == -1 && item.indexOf('=') != -1 && typeof check[kk] != 'string' && this.#STRICT) {
								this.#BACK.backList.push({
									name: kk + '格式错误--应为字符串',
									type: "格式错误"
								})
							}
						}
					} else if (!Array.isArray(item)) { //对象
						this.#JSONs(check, item, undefined, undefined, undefined)
					} else if (Array.isArray(item)) { //数组
						this.#LISTs(check, item, undefined, undefined, undefined)
					}
				})
			} else if (Array.isArray(check)) { //数组
				this.#BACK.type = this.#BACK.type + '--数组'
				check.forEach((item, index) => {
					checkList.forEach((item2: any) => {
						if (typeof item2 == 'string') {
							let kk = item2
							if (kk.indexOf('=') != -1) {
								kk = item2.substring(0, item2.indexOf('='))
							}
							if (!item[kk]) {
								if (item[kk] === 0) {

								} else {
									this.#BACK.backList.push({
										name: `数组 下标${index}中 属性${kk}不存在`,
										type: "数组元素属性不存在"
									})
								}
							} else {
								if (item2.indexOf('=') != -1 && item2.indexOf('|') != -1 && this.#STRICT) {
									let str = item2.substring(item2.indexOf('=') + 1).split('|')
									let flag = false
									str.forEach((item3: any) => {
										if (item[kk] == item3) {
											flag = true
										}
									})
									if (!flag) {
										this.#BACK.backList.push({
											name: kk + '数据错误--应为' + str.join('或'),
											type: "数据错误"
										})
									}
								} else if (item2.indexOf('(') != -1 && typeof item[kk] != 'number' && this.#STRICT) {
									this.#BACK.backList.push({
										name: kk + '格式错误--应为数字',
										type: "格式错误"
									})
								} else if (item2.indexOf('(') == -1 && item2.indexOf('=') != -1 && typeof item[kk] != 'string' && this.#STRICT) {
									this.#BACK.backList.push({
										name: kk + '格式错误--应为字符串',
										type: "格式错误"
									})
								}
							}
						} else if (!Array.isArray(item2)) { //对象
							this.#JSONs(item, item2, index, undefined, index)
						} else if (Array.isArray(item2)) { //数组
							this.#LISTs(item, item2, index, undefined, index)
						}
					})
				})
			}

			if (this.#BACK.backList.length != 0) {
				this.MC.push(this.#BACK)
			}
		}
		//  此处return 应为判断请求行为状态码以和以往请求习惯吻合  至于数据错误以及请求状态可以交由函数自动处理
		return new Promise((resolve, reject) => {
			if (this.#CHECKMODE == '测试') {
				resolve(VALUE)
			} else if (this.#CHECKMODE == '校验') {
				if (typeof way == 'object') {
					if (way[this.#FIELD] == this.#FIELDSTATUS) {
						resolve(check)
						if (this.MC.length != 0) {
							this.MC[0].data = JSON.stringify(this.MC[0].data, null, 2)
							window.localStorage.setItem('MC', JSON.stringify(this.MC))

						}
						console.log(this.MC);
					} else {
						reject()
					}
				} else if (typeof way == 'string') {
					if (this.MC.length == 0) {
						resolve(check)
					} else {
						window.localStorage.setItem('MC', JSON.stringify(this.MC))
						this.MC[0].data = JSON.stringify(this.MC[0].data, null, 2)
						reject()
					}
				}
			}
		})
	}

	#JSONs(checks: any, value: any, indexS: any, parent: any, INDEX: any) {
		let kk = value.n
		if (kk.indexOf('=') != -1) {
			kk = value.n.substring(0, value.n.indexOf('='))
		}
		// 预留功能
		// if (kk.indexOf('-') != -1) {
		// 	kk = value.n.substring(0, value.n.indexOf('-'))
		// }
		if (!checks[kk]) {
			if (indexS || indexS == 0) {
				// console.log(checks, value, indexS, parent);
				this.#BACK.backList.push({
					name: `属性名${parent ? parent : '数组'} 下标${indexS}中${kk}不存在`,
					type: '不存在'
				})
			} else {
				if (checks[kk] === 0) {

				} else {
					this.#BACK.backList.push({
						name: kk,
						type: '不存在'
					})
				}
			}
		} else {
			if (Array.isArray(checks[kk]) != Array.isArray(value)) {
				this.#BACK.backList.push({
					name: `属性名${parent ? parent : '数组'} 下标${indexS ? indexS : '无'}中${kk}格式错误--应为对象`,
					type: '格式错误'
				})
			} else {
				value.l.forEach((item: any) => {
					if (typeof item == 'string') {
						let ss = item
						if (ss.indexOf('=') != -1) {
							ss = item.substring(0, item.indexOf('='))
						}
						// 预留功能
						// if (kk.indexOf('-') != -1) {
						// 	kk = value.n.substring(0, value.n.indexOf('-'))
						// }
						if (!checks[kk][ss]) {
							// if(checks[value.n][item]===true||checks[value.n][item]===false){
							//    return
							// }
							if (indexS || indexS === 0) {
								this.#BACK.backList.push({
									name: `属性名${parent ? parent : '数组'} 下标${indexS}中${kk}.${ss}不存在`,
									type: '不存在'
								})
							} else {
								if (checks[kk][ss] === 0) {

								} else {
									this.#BACK.backList.push({
										name: kk + '.' + ss + '不存在',
										type: '不存在'
									})
								}
							}
						} else {
							// 严格模式
							if (item.indexOf('=') != -1 && item.indexOf('|') != -1 && this.#STRICT) {
								let str = item.substring(item.indexOf('=') + 1).split('|')
								let flag = false
								str.forEach((item3: any) => {
									if (checks[kk][ss] == item3) {
										flag = true
									}
								})
								if (!flag) {
									this.#BACK.backList.push({
										name: kk + '数据错误--应为' + str.join('或'),
										type: "数据错误"
									})
								}
							} else if (item.indexOf('(') != -1 && typeof checks[kk][ss] != 'number' && this.#STRICT) {
								this.#BACK.backList.push({
									name: kk + '格式错误--应为数字',
									type: "格式错误"
								})
							} else if (item.indexOf('(') == -1 && item.indexOf('=') != -1 && typeof checks[kk][ss] != 'string' && this.#STRICT) {
								this.#BACK.backList.push({
									name: kk + '格式错误--应为字符串',
									type: "格式错误"
								})
							}

						}
					} else if (!Array.isArray(item)) {
						this.#JSONs(checks[kk], item, undefined, undefined, INDEX)
					} else if (Array.isArray(item)) {
						this.#LISTs(checks[kk], item, undefined, undefined, INDEX)
					}
				})
			}
		}
	}
	#LISTs(checks: any, value: any, indexS: any, parent: any, INDEX: any) {
		let kk = value[0]
		if (kk.indexOf('=') != -1) {
			kk = value[0].substring(0, value[0].indexOf('='))
		}
		// 预留功能
		// if (kk.indexOf('-') != -1) {
		// 	kk = value.n.substring(0, value.n.indexOf('-'))
		// }
		
		if (!checks[kk]) {
			if (indexS || indexS === 0) {
				this.#BACK.backList.push({
					name: `属性名${parent ? parent : '数组'} 下标${indexS}中${kk}不存在`,
					type: '不存在'
				})
			} else {
				this.#BACK.backList.push({
					name: kk + '不存在',
					type: '不存在'
				})
			}
		} else {
			if (Array.isArray(checks[kk]) != Array.isArray(value)) {
				this.#BACK.backList.push({
					name: `属性名${parent ? parent : ''}${kk}格式错误--应为数组`,
					type: '格式错误'
				})
			} else {
				checks[kk].forEach((item: any, index: any) => {
					value[1].forEach((item2: any) => {
						if (typeof item2 == 'string') {
							let ss = item2
							if (ss.indexOf('=') != -1) {
								ss = item2.substring(0, item2.indexOf('='))
							}
							// 预留功能
							// if (kk.indexOf('-') != -1) {
							// 	kk = value.n.substring(0, value.n.indexOf('-'))
							// }
							if (!item[ss]) {
								// if(checks[value.n][item]===true||checks[value.n][item]===false){
								//    return
								// }
								let dd = null
								if (INDEX != null || INDEX != undefined) {
									dd = String(INDEX)
								}
								if (item[ss] === 0) {

								} else {
									this.#BACK.backList.push({
										name: `属性名${parent ? parent : ''}-${dd ? '下标' + dd : ''} 属性名${kk} 下标${index}中${ss}不存在`,
										type: '不存在'
									})
								}
							} else {
								// 严格模式
								if (item2.indexOf('=') != -1 && item2.indexOf('|') != -1 && this.#STRICT) {
									let str = item2.substring(item2.indexOf('=') + 1).split('|')
									let flag = false
									str.forEach((item3: any) => {
										if (checks[kk][ss] == item3) {
											flag = true
										}
									})
									if (!flag) {
										this.#BACK.backList.push({
											name: kk + '数据错误--应为' + str.join('或'),
											type: "数据错误"
										})
									}
								} else if (item2.indexOf('(') != -1 && typeof item[ss] != 'number' && this.#STRICT) {
									this.#BACK.backList.push({
										name: kk + '格式错误--应为数字',
										type: "格式错误"
									})
								} else if (item2.indexOf('(') == -1 && item2.indexOf('=') != -1 && typeof item[ss] != 'string' && this.#STRICT) {
									this.#BACK.backList.push({
										name: kk + '格式错误--应为字符串',
										type: "格式错误"
									})
								}
							}
						} else if (!Array.isArray(item2)) { //对象
							this.#JSONs(item, item2, index, kk, INDEX)
						} else if (Array.isArray(item2)) { //数组
							let dd = null
							if (INDEX == null || INDEX == undefined) {
								dd = String(index)
							}
							this.#LISTs(item, item2, index, kk, dd ? dd : INDEX)
						}
					})
				})
			}
		}
	}

	#ValueList(Value: any, checklist: any) {
		let kk = []
		for (let i = 0; i < this.#DATANUM; i++) {
			kk.push({})
		}
		checklist[1].forEach((item: any) => {
			if (typeof item == 'string') {
				// 预留功能
				// if (kk.indexOf('-') != -1) {
				// 	kk = value.n.substring(0, value.n.indexOf('-'))
				// }
				if (item.indexOf('=') != -1) {
					kk.forEach((item2: any, index2) => {
						if (item.indexOf('(') != -1) {
							//
							if (!item.substring(item.indexOf('=') + 2, item.length - 1)) {
								item2[item.substring(0, item.indexOf('='))] = Number(Math.round(Math.random() * 1000))
							} else if (item.indexOf('|') != -1) {
								let str = item.substring(item.indexOf('=') + 2, item.length - 1).split('|')
								item2[item.substring(0, item.indexOf('='))] = Number(str[Math.floor(Math.random() * (str.length - 0 + 1)) + 0])
							} else {
								item2[item.substring(0, item.indexOf('='))] = Number(item.substring(item.indexOf('=') + 2, item.length - 1))
							}
						} else {
							if (item.indexOf('|') != -1) {
								let str = item.substring(item.indexOf('=') + 1).split('|')
								item2[item.substring(0, item.indexOf('='))] = str[Math.floor(Math.random() * (str.length - 0 + 1)) + 0]
							} else if (item.substring(item.indexOf('=') + 1) == 'img') {
								item2[item.substring(0, item.indexOf('='))] = this.#IMAGELIST[Math.floor(Math.random() * (6 - 0 + 1)) + 0]
							} else if (item.substring(item.indexOf('=') + 1) == 'time') {
								item2[item.substring(0, item.indexOf('='))] = randomDate('2001-04-08 16:54:59', '2025-04-08 16:54:59')
							} else {
								item2[item.substring(0, item.indexOf('='))] = item.substring(item.indexOf('=') + 1)
							}
						}
						// only模式下的 自增字符数据 用于对应数据 格式为 字段名=''
						if (!item.substring(item.indexOf('=') + 1)) {
							item2[item.substring(0, item.indexOf('='))] = `${this.#VSTRING}${index2 + 1}`
						}
					})
				} else {
					kk.forEach((item2: any, index2) => {
						item2[item] = `${this.#VSTRING}${this.#DATAONLY ? Number(Math.round(Math.random() * 1000)) : index2 + 1}`
					})
				}
			} else if (!Array.isArray(item)) {//对象
				kk.forEach((item2) => {
					this.#ValueJSON(item2, item)
				})
			} else if (Array.isArray(item)) {//数组
				kk.forEach((item2) => {
					this.#ValueList(item2, item)
				})
			}
		})

		Value[checklist[0]] = kk
	}
	#ValueJSON(Value: any, checklist: any) {
		let kk: any = {}
		checklist.l.forEach((item2: any, index2: any) => {
			if (typeof item2 == 'string') {
				// 预留功能
				// if (kk.indexOf('-') != -1) {
				// 	kk = value.n.substring(0, value.n.indexOf('-'))
				// }
				if (item2.indexOf('=') != -1) {
					if (item2.indexOf('(') != -1) {
						//
						if (!item2.substring(item2.indexOf('=') + 2, item2.length - 1)) {
							kk[item2.substring(0, item2.indexOf('='))] = index2 + Number(Math.round(Math.random() * 1000))
						} else if (item2.indexOf('|') != -1) {
							let str = item2.substring(item2.indexOf('=') + 2, item2.length - 1).split('|')
							kk[item2.substring(0, item2.indexOf('='))] = Number(str[Math.floor(Math.random() * (str.length - 0 + 1)) + 0])
						} else {
							kk[item2.substring(0, item2.indexOf('='))] = Number(item2.substring(item2.indexOf('=') + 2, item2.length - 1))
						}
					} else {
						if (item2.indexOf('|') != -1) {
							let str = item2.substring(item2.indexOf('=') + 1).split('|')
							kk[item2.substring(0, item2.indexOf('='))] = str[Math.floor(Math.random() * (str.length - 0 + 1)) + 0]
						} else if (item2.substring(item2.indexOf('=') + 1) == 'img') {
							kk[item2.substring(0, item2.indexOf('='))] = this.#IMAGELIST[Math.floor(Math.random() * (6 - 0 + 1)) + 0]
						} else if (item2.substring(item2.indexOf('=') + 1) == 'time') {
							kk[item2.substring(0, item2.indexOf('='))] = randomDate('2001-04-08 16:54:59', '2025-04-08 16:54:59')
						} else {
							kk[item2.substring(0, item2.indexOf('='))] = item2.substring(item2.indexOf('=') + 1)
						}
					}
					// only模式下的 自增字符数据 用于对应数据  格式为 字段名=''
					if (!item2.substring(item2.indexOf('=') + 1)) {
						kk[item2.substring(0, item2.indexOf('='))] = `${this.#VSTRING}${index2 + 1}`
					}
				} else {
					kk[item2] = `${this.#VSTRING}${this.#DATAONLY ? Number(Math.round(Math.random() * 1000)) : index2 + 1}`
				}
			} else if (!Array.isArray(item2)) {//对象
				this.#ValueJSON(kk, item2)
			} else if (Array.isArray(item2)) {//数组
				this.#ValueList(kk, item2)
			}
			Value[checklist.n] = kk

		})
	}
}


export function c(way: any, check: any, config: any[], checkList: any): any {
	let MIXINCHECK: boolean = false
	let CHECKMODE = '测试'
	let DATANUM = 5
	let DATAONLY = false
	let MC: Back[] = []
	let Vdata

	config.forEach((item: any, index) => {
		if (JSON.stringify(item) === JSON.stringify({}) as any) {
			Vdata = item
		} else if (JSON.stringify(item) === JSON.stringify([]) as any) {
			Vdata = item
		} else if (typeof item == 'number') {
			DATANUM = item
		} else if (item === true as any) {
			MIXINCHECK = item as any
		} else if (item === false as any) {
			MIXINCHECK = item as any
		} else if (item === '测试' as any) {
			CHECKMODE = '测试'
		} else if (item === '校验' as any) {
			CHECKMODE = '校验'
		} else if (item === 'only' as any) {
			DATAONLY = true
		}
	})

	if (!MIXINCHECK) {
		return new Promise((resolve, reject) => {
			resolve(check)
		})
	}
	if (typeof way == 'object') {
		back.type = '后端'
		back.res = way.data
		if (way.config) {
			back.path = way.config.url
			back.data = JSON.parse(way.config.data)
		}
	} else if (typeof way == 'string') {
		back.type = '前端'
		back.path = way
		back.data = check
	}
	if (!way) {
		back.backList.push({
			name: "res路径或者来源不存在",
			type: 'res不存在'
		})
		MC.push(back)
		return new Promise((resolve, reject) => {
			MC[0].data = JSON.stringify(MC[0].data, null, 2)
			reject(JSON.parse(JSON.stringify(MC[0])))
		})
	} else if (!check && CHECKMODE == '校验') {
		back.backList.push({
			name: "返回数据为空",
			type: '校验主体不存在',
		})
		MC.push(back)
		return new Promise((resolve, reject) => {
			MC[0].data = JSON.stringify(MC[0].data, null, 2)
			reject(JSON.parse(JSON.stringify(MC[0])))
		})
	}
	if (typeof check == 'string' && CHECKMODE == '校验') {
		back.backList.push({
			name: "校验主体不存在",
			type: '校验主体不存在',
		})
		MC.push(back)
		return new Promise((resolve, reject) => {
			MC[0].data = JSON.stringify(MC[0].data, null, 2)
			reject(JSON.parse(JSON.stringify(MC[0])))
		})
	}


	function JSONs(checks: any, value: any, indexS: any, parent: any, INDEX: any) {
		let kk = value.n
		if (kk.indexOf('=') != -1) {
			kk = value.n.substring(0, value.n.indexOf('='))
		}
		// 预留功能
		// if (kk.indexOf('-') != -1) {
		// 	kk = value.n.substring(0, value.n.indexOf('-'))
		// }
		if (!checks[kk]) {
			if (indexS || indexS == 0) {
				// console.log(checks, value, indexS, parent);
				back.backList.push({
					name: `属性名${parent ? parent : '数组'} 下标${indexS}中${kk}不存在`,
					type: '不存在'
				})
			} else {
				if (checks[kk] === 0) {

				} else {
					back.backList.push({
						name: kk,
						type: '不存在'
					})
				}
			}
		} else {
			if (Array.isArray(checks[kk]) != Array.isArray(value)) {
				back.backList.push({
					name: `属性名${parent ? parent : '数组'} 下标${indexS ? indexS : '无'}中${kk}格式错误--应为对象`,
					type: '格式错误'
				})
			} else {
				value.l.forEach((item: any, index: any) => {
					if (typeof item == 'string') {
						let ss = item
						if (ss.indexOf('=') != -1) {
							ss = item.substring(0, item.indexOf('='))
						}
						// 预留功能
						// if (kk.indexOf('-') != -1) {
						// 	kk = value.n.substring(0, value.n.indexOf('-'))
						// }
						if (!checks[kk][ss]) {
							// if(checks[value.n][item]===true||checks[value.n][item]===false){
							//    return
							// }
							if (indexS || indexS === 0) {
								back.backList.push({
									name: `属性名${parent ? parent : '数组'} 下标${indexS}中${kk}.${ss}不存在`,
									type: '不存在'
								})
							} else {
								if (checks[kk][ss] === 0) {

								} else {
									back.backList.push({
										name: kk + '.' + ss + '不存在',
										type: '不存在'
									})
								}
							}
						}
					} else if (!Array.isArray(item)) {
						JSONs(checks[kk], item, undefined, undefined, INDEX)
					} else if (Array.isArray(item)) {
						LISTs(checks[kk], item, undefined, undefined, INDEX)
					}
				})
			}
		}
	}

	function LISTs(checks: any, value: any, indexS: any, parent: any, INDEX: any) {
		let kk = value[0]
		if (kk.indexOf('=') != -1) {
			kk = value[0].substring(0, value[0].indexOf('='))
		}
		// 预留功能
		// if (kk.indexOf('-') != -1) {
		// 	kk = value.n.substring(0, value.n.indexOf('-'))
		// }
		if (!checks[kk]) {
			if (indexS || indexS === 0) {
				back.backList.push({
					name: `属性名${parent ? parent : '数组'} 下标${indexS}中${kk}不存在`,
					type: '不存在'
				})
			} else {
				back.backList.push({
					name: kk + '不存在',
					type: '不存在'
				})
			}
		} else {
			if (Array.isArray(checks[kk]) != Array.isArray(value)) {
				back.backList.push({
					name: `属性名${parent ? parent : ''}${kk}格式错误--应为数组`,
					type: '格式错误'
				})
			} else {
				checks[kk].forEach((item: any, index: any) => {
					value[1].forEach((item2: any, index2: any) => {
						if (typeof item2 == 'string') {
							let ss = item2
							if (ss.indexOf('=') != -1) {
								ss = item2.substring(0, item2.indexOf('='))
							}
							// 预留功能
							// if (kk.indexOf('-') != -1) {
							// 	kk = value.n.substring(0, value.n.indexOf('-'))
							// }
							if (!item[ss]) {
								// if(checks[value.n][item]===true||checks[value.n][item]===false){
								//    return
								// }
								let dd = null
								if (INDEX != null || INDEX != undefined) {
									dd = String(INDEX)
								}
								if (item[ss] === 0) {

								} else {
									back.backList.push({
										name: `属性名${parent ? parent : ''}-${dd ? '下标' + dd : ''} 属性名${kk} 下标${index}中${ss}不存在`,
										type: '不存在'
									})
								}
							}
						} else if (!Array.isArray(item2)) { //对象
							JSONs(item, item2, index, kk, INDEX)
						} else if (Array.isArray(item2)) { //数组
							let dd = null
							if (INDEX == null || INDEX == undefined) {
								dd = String(index)
							}
							LISTs(item, item2, index, kk, dd ? dd : INDEX)
						}
					})
				})
			}
		}
	}


	// 2.0
	function ValueList(Value: any, checklist: any) {
		let kk = []
		for (let i = 0; i < DATANUM; i++) {
			kk.push({})
		}
		checklist[1].forEach((item: any, index: number) => {
			if (typeof item == 'string') {
				// 预留功能
				// if (kk.indexOf('-') != -1) {
				// 	kk = value.n.substring(0, value.n.indexOf('-'))
				// }
				if (item.indexOf('=') != -1) {
					kk.forEach((item2: any, index2) => {
						if (item.indexOf('(') != -1) {
							item2[item.substring(0, item.indexOf('='))] = Number(item.substring(item.indexOf('=') + 2, item.length - 1))
							//
							if (!item.substring(item.indexOf('=') + 2, item.length - 1)) {
								item2[item.substring(0, item.indexOf('='))] = Number(Math.round(Math.random() * 1000))
							}
						} else {
							if (item.substring(item.indexOf('=') + 1) == 'img') {
								item2[item.substring(0, item.indexOf('='))] = ImageList[Math.floor(Math.random() * (7 - 0 + 1)) + 0]
							} else if (item.substring(item.indexOf('=') + 1) == 'time') {
								item2[item.substring(0, item.indexOf('='))] = randomDate('2001-04-08 16:54:59', '2025-04-08 16:54:59')
							} else {
								item2[item.substring(0, item.indexOf('='))] = item.substring(item.indexOf('=') + 1)
							}
						}
						// only模式下的 自增字符数据 用于对应数据 格式为 字段名=''
						if (!item.substring(item.indexOf('=') + 1)) {
							item2[item.substring(0, item.indexOf('='))] = `测试字符${index2 + 1}`
						}
					})
				} else {
					kk.forEach((item2: any, index2) => {
						item2[item] = `测试字符${DATAONLY ? Number(Math.round(Math.random() * 1000)) : index2 + 1}`
					})
				}
			} else if (!Array.isArray(item)) {//对象
				kk.forEach((item2, index2) => {
					ValueJSON(item2, item)
				})
			} else if (Array.isArray(item)) {//数组
				kk.forEach((item2, index2) => {
					ValueList(item2, item)
				})
			}
		})

		Value[checklist[0]] = kk
	}
	function ValueJSON(Value: any, checklist: any) {
		let kk: any = {}
		checklist.l.forEach((item2: any, index2: any) => {
			if (typeof item2 == 'string') {
				// 预留功能
				// if (kk.indexOf('-') != -1) {
				// 	kk = value.n.substring(0, value.n.indexOf('-'))
				// }
				if (item2.indexOf('=') != -1) {
					if (item2.indexOf('(') != -1) {
						kk[item2.substring(0, item2.indexOf('='))] = Number(item2.substring(item2.indexOf('=') + 2, item2.length - 1))
						//
						if (!item2.substring(item2.indexOf('=') + 2, item2.length - 1)) {
							kk[item2.substring(0, item2.indexOf('='))] = index2 + Number(Math.round(Math.random() * 1000))
						}
					} else {
						if (item2.substring(item2.indexOf('=') + 1) == 'img') {
							kk[item2.substring(0, item2.indexOf('='))] = ImageList[Math.floor(Math.random() * (7 - 0 + 1)) + 0]
						} else if (item2.substring(item2.indexOf('=') + 1) == 'time') {
							kk[item2.substring(0, item2.indexOf('='))] = randomDate('2001-04-08 16:54:59', '2025-04-08 16:54:59')
						}
						kk[item2.substring(0, item2.indexOf('='))] = item2.substring(item2.indexOf('=') + 1)
					}
					// only模式下的 自增字符数据 用于对应数据  格式为 字段名=''
					if (!item2.substring(item2.indexOf('=') + 1)) {
						kk[item2.substring(0, item2.indexOf('='))] = `测试字符${index2 + 1}`
					}
				} else {
					kk[item2] = `测试字符${DATAONLY ? Number(Math.round(Math.random() * 1000)) : index2 + 1}`
				}
			} else if (!Array.isArray(item2)) {//对象
				ValueJSON(kk, item2)
			} else if (Array.isArray(item2)) {//数组
				ValueList(kk, item2)
			}
			Value[checklist.n] = kk

		})
	}

	// if (config) {
	// 	if (config.Mode) {
	// 		CHECKMODE = config.Mode
	// 	}
	// 	if (config.dataOnly) {
	// 		DATAONLY = config.dataOnly
	// 	}
	// 	if (config.dataNum) {
	// 		DATANUM = config.dataNum
	// 	}
	// 	if (config.Check) {
	// 		MIXINCHECK = config.Check
	// 	}
	// }

	let VALUE: any
	if (CHECKMODE == '测试') {
		if (!Array.isArray(Vdata)) { //对象
			let Value: any = {}
			checkList.forEach((item: any, index: any) => {
				if (typeof item == 'string') {
					if (item.indexOf('=') != -1) {
						if (item.indexOf('(') != -1) {
							Value[item.substring(0, item.indexOf('='))] = Number(item.substring(item.indexOf('=') + 2, item.length - 1))
							// 随机数字
							if (!item.substring(item.indexOf('=') + 2, item.length - 1)) {
								Value[item.substring(0, item.indexOf('='))] = index + Number(Math.round(Math.random() * 100).toFixed(3))
							}
						} else {
							Value[item.substring(0, item.indexOf('='))] = item.substring(item.indexOf('=') + 1)
						}
						// only模式下的 自增数据 用于对应数据
						if (!item.substring(item.indexOf('=') + 1)) {
							Value[item.substring(0, item.indexOf('='))] = `测试字符${index + 1}`
						}
					} else {
						Value[item] = `测试字符${DATAONLY ? index + Number(Math.round(Math.random() * 100).toFixed(3)) : index + 1}`
					}

				} else if (!Array.isArray(item)) {//对象
					ValueJSON(Value, item)
				} else if (Array.isArray(item)) {//数组
					ValueList(Value, item)
				}
			})
			VALUE = Value
		} else if (Array.isArray(Vdata)) { //数组
			let Value = []
			for (let i = 0; i < DATANUM; i++) {
				Value.push({})
			}
			checkList.forEach((item: any, index: any) => {
				if (typeof item == 'string') {
					if (item.indexOf('=') != -1) {
						Value.forEach((item2: any, index2) => {
							if (item.indexOf('(') != -1) {
								item2[item.substring(0, item.indexOf('='))] = Number(item.substring(item.indexOf('=') + 2, item.length - 1))
								// 随机数字
								if (!item.substring(item.indexOf('=') + 2, item.length - 1)) {
									item2[item.substring(0, item.indexOf('='))] = Number(Math.round(Math.random() * 1000))
								}
							} else {
								item2[item.substring(0, item.indexOf('='))] = item.substring(item.indexOf('=') + 1)
							}
							// only模式下的 自增数据 用于对应数据
							if (!item.substring(item.indexOf('=') + 1)) {
								item2[item.substring(0, item.indexOf('='))] = `测试字符${index2 + 1}`
							}
						})
					} else {
						Value.forEach((item2: any, index2) => {
							item2[item] = `测试字符${DATAONLY ? Number(Math.round(Math.random() * 1000)) : index2 + 1}`
						})
					}
				} else if (!Array.isArray(item)) {//对象
					Value.forEach((item2, index2) => {
						ValueJSON(item2, item)
					})
					// ValueJSON(Value[index], item)
				} else if (Array.isArray(item)) {//数组
					Value.forEach((item2, index2) => {
						ValueList(item2, item)
					})
					// ValueList(Value[index], item)
				}
			})
			VALUE = Value
		}
	} else if (CHECKMODE == '校验') {
		if (!Array.isArray(check)) { //对象
			back.type = back.type + '--对象'
			checkList.forEach((item: any, index: any) => {
				if (typeof item == 'string') {
					let kk = item
					if (kk.indexOf('=') != -1) {
						kk = item.substring(0, item.indexOf('='))
					}

					if (!check[kk]) {
						if (check[kk] === 0) {

						} else {
							back.backList.push({
								name: kk + '不存在',
								type: "不存在"
							})
						}
					} else {
						// if (typeof check[kk] != 'string') {
						// 	back.backList.push({
						// 		name: kk + '格式错误--应为字符串',
						// 		type: "格式错误"
						// 	})
						// }
					}
				} else if (!Array.isArray(item)) { //对象
					JSONs(check, item, undefined, undefined, undefined)
				} else if (Array.isArray(item)) { //数组
					LISTs(check, item, undefined, undefined, undefined)
				}
			})
		} else if (Array.isArray(check)) { //数组
			back.type = back.type + '--数组'
			check.forEach((item, index) => {
				checkList.forEach((item2: any, index2: any) => {
					if (typeof item2 == 'string') {
						let kk = item2
						if (kk.indexOf('=') != -1) {
							kk = item2.substring(0, item2.indexOf('='))
						}
						if (!item[kk]) {
							if (item[kk] === 0) {

							} else {
								back.backList.push({
									name: `数组 下标${index}中 属性${kk}不存在`,
									type: "数组元素属性不存在"
								})
							}
						} else {
							// if (typeof item[kk] != 'string') {
							// 	back.backList.push({
							// 		name: `数组 下标${index}中 属性${kk}格式错误--应为字符串`,
							// 		type: "格式错误"
							// 	})
							// }
						}
					} else if (!Array.isArray(item2)) { //对象
						JSONs(item, item2, index, undefined, index)
					} else if (Array.isArray(item2)) { //数组
						LISTs(item, item2, index, undefined, index)
					}
				})
			})
		}

		if (back.backList.length != 0) {
			MC.push(back)
		}
	}

	//  此处return 应为判断请求行为状态码以和以往请求习惯吻合  至于数据错误以及请求状态可以交由函数自动处理
	return new Promise((resolve, reject) => {
		if (CHECKMODE == '测试') {
			resolve(VALUE)
		} else {
			if (MC.length != 0) {
				MC[0].data = JSON.stringify(MC[0].data, null, 2)
				reject(JSON.parse(JSON.stringify(MC[0])))
			} else {
				resolve(check)
			}
		}
	})
}


