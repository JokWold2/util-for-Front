c(way, check, checkList) {
            let back = {
                path: '',
                errorShow: false,
                dataShow: false,
                type: "",
                data: {
                    name: "234234",
                    rr: '2342',
                    list: [{ ss: "23423", kk: { ww: "asdasd" }, hh: ['werw'] }, { ss: "23423", kk: { ww: "asdasd" }, hh: ['werw'] }]
                },
                backList: []
            }
            if (!way) {
                back.backList.push({
                    name: "res",
                    type: 'res不存在'
                })
                this.checkList.push(back)
                return
            } else if (!check) {
                back.backList.push({
                    name: "主体",
                    type: '主体不存在',
                })
                this.checkList.push(back)
                return
            }
            if (typeof way == 'object') {
                back.type = '后端'
            } else if (typeof way == 'string') {
                back.type = '前端'
                back.path = way
            }

            function JSON(checks, value, indexS, parent, INDEX) {
                if (!checks[value.n]) {
                    if (indexS || indexS == 0) {
                        // console.log(checks, value, indexS, parent);
                        back.backList.push({
                            name: `属性名${parent ? parent : '数组'} 下标${indexS}中${value.n}不存在`,
                            type: '不存在'
                        })
                    } else {
                        if (checks[value.n] === 0) {

                        } else {
                            back.backList.push({
                                name: value.n,
                                type: '不存在'
                            })
                        }
                    }
                } else {
                    value.l.forEach((item, index) => {
                        if (typeof item == 'string') {
                            if (!checks[value.n][item]) {
                                if (indexS || indexS === 0) {
                                    back.backList.push({
                                        name: `属性名${parent ? parent : '数组'} 下标${indexS}中${value.n}.${item}不存在`,
                                        type: '不存在'
                                    })
                                } else {
                                    if (checks[value.n][item] === 0) {

                                    } else {
                                        console.log(checks);
                                        back.backList.push({
                                            name: value.n + '.' + item + '不存在',
                                            type: '不存在'
                                        })
                                    }
                                }
                            }
                        } else if (!Array.isArray(item)) {
                            JSON(checks[value.n], item, undefined, undefined, INDEX)
                        } else if (Array.isArray(item)) {
                            LIST(checks[value.n], item, undefined, undefined, INDEX)
                        }
                    })
                }
            }
            function LIST(checks, value, indexS, parent, INDEX) {
                console.log(checks[value[0]]);
                if (!checks[value[0]]) {
                    if (indexS || indexS === 0) {
                        back.backList.push({
                            name: `属性名${parent ? parent : '数组'} 下标${indexS}中${value[0]}不存在`,
                            type: '不存在'
                        })
                    } else {
                        back.backList.push({
                            name: value[0] + '不存在',
                            type: '不存在'
                        })
                    }
                } else {
                    checks[value[0]].forEach((item, index) => {
                        value[1].forEach((item2, index2) => {
                            if (typeof item2 == 'string') {
                                if (!item[item2]) {
                                    let kk = null
                                    if (INDEX != null || INDEX != undefined) {
                                        kk = String(INDEX)
                                    }
                                    back.backList.push({
                                        name: `${kk ? '下标' + kk : ''} 属性名${value[0]} 下标${index}中${item2}不存在`,
                                        type: '不存在'
                                    })
                                }
                            } else if (!Array.isArray(item2)) {//对象
                                JSON(item, item2, index, value[0], INDEX)
                            } else if (Array.isArray(item2)) {//数组
                                let kk = null
                                if (INDEX == null || INDEX == undefined) {
                                    kk = String(index)
                                }
                                LIST(item, item2, index, value[0], kk ? kk : INDEX)
                            }
                        })
                    })
                }
            }
            if (!Array.isArray(check)) {//对象
                back.type = back.type + '--对象'
                checkList.forEach((item, index) => {
                    if (typeof item == 'string') {
                        if (!check[item]) {
                            if (check[item] === 0) {

                            } else {
                                back.backList.push({
                                    name: item + '不存在',
                                    type: "不存在"
                                })
                            }
                        }
                    } else if (!Array.isArray(item)) {//对象
                        JSON(check, item)
                    } else if (Array.isArray(item)) {//数组
                        LIST(check, item)
                    }
                })
            } else if (Array.isArray(check)) {//数组
                back.type = back.type + '--数组'
                check.forEach((item, index) => {
                    checkList.forEach((item2, index2) => {
                        if (typeof item2 == 'string') {
                            if (!item[item2]) {
                                back.backList.push({
                                    name: `数组 下标${index}中 属性${item2}不存在`,
                                    type: "数组元素属性不存在"
                                })
                            }
                        } else if (!Array.isArray(item2)) {//对象
                            JSON(item, item2, index, undefined, index)
                        } else if (Array.isArray(item2)) {//数组
                            LIST(item, item2, index, undefined, index)
                        }
                    })
                })
            }
            console.log(back);
            //  此处return 应为判断请求行为状态码以和以往请求习惯吻合  至于数据错误以及请求状态可以放在这里
            // return new Promise((resolve, reject) => {
            //     if (back.backList.length != 0) {
            //         reject('参数错误')
            //     } else if (typeof way != 'string') {
            //         reject('')
            //     }else if(typeof way =='object'){
            //         if(way.data.success){  

            //         }
            //     }
            // })
        }
