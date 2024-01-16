<template>
    <div class="CheckList" v-if="c.length != 0">
        <div class="back">
            <div v-if="show">
                <div @click="() => { show = false }" class="box2">
                    <div>
                        <div>
                            前端 <span>{{ way2 }}</span>
                        </div>
                        <div>
                            后端 <span>{{ way1 }}</span>
                        </div>
                    </div>
                    <div> {{ getAppraise }}</div>
                </div>
            </div>
            <div class="list" v-if="show" v-for="(item, index) in c " :key="index"
                :class="{ 'way1': item.type.substring(0, 2) == '后端' ? true : false, 'way2': item.type.substring(0, 2) == '前端' ? true : false, }">
                <div>
                    <div>来源：</div>
                    <div>{{ item.type }}</div>
                </div>
                <div>
                    <div>路径：</div>
                    <div>{{ item.path }}</div>
                </div>
                <div>
                    <div @click="() => { item.errorShow = !item.errorShow }">
                        <div>
                            错误
                        </div>
                        <div v-if="!item.errorShow">
                            <span class="numtext">{{ item.backList.length }}</span> 条
                        </div>
                        <div v-if="item.errorShow">
                            {{ emo.a }}
                        </div>
                    </div>
                    <div :style="{ 'height': item.errorShow ? 'auto' : '0px', }">
                        <div v-for="(item2, index2) in item.backList" :key="item2.name">
                            {{ item2.name }}
                        </div>
                    </div>
                </div>
                <div v-if="item.type.substring(0, 2) == '后端'">
                    <div @click="() => { item.dataShow = !item.dataShow }">
                        <div>
                            数据
                        </div>
                        <div v-if="!item.dataShow">
                            已截取
                        </div>
                        <div v-if="item.dataShow">
                            ≖‿≖✧
                        </div>
                    </div>
                    <div :style="{ height: item.dataShow ? 'auto' : '0px', }">
                        <textarea name="" class="textarea" v-model="item.data" readonly
                            :class="{ 'border2': item.type.substring(0, 2) == '后端' ? true : false, 'border1': item.type.substring(0, 2) == '前端' ? true : false, }"></textarea>
                    </div>
                </div>
            </div>
            <div v-if="!show">
                <div @click="() => { show = true }" class="box">
                    <div>{{ c.length }}</div>
                    <div>{{ getWord }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        c:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    data() {
        return {
            emo: {
                a: ' <(￣ˇ￣)/'
            },
            show: false,
            way1: 0,
            way2: 0
        }
    },
    watch: {
        c: {
            handler(newV, oldV) {
                this.c = newV
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        // console.log(this.c[0]);
        this.c.forEach((item, index) => {
            item.data = JSON.stringify(item.data, null, 2)
            if (item.type.substring(0, 2) == '后端') {
                this.way1++
            } else if (item.type.substring(0, 2) == '前端') {
                this.way2++
            }
        })
    },
    computed: {
        getWord() {
            let num = this.c.length
            let back = '(╯°□°）╯︵ ┻━┻'
            if (num == 1) {
                back = '问题不大'
            } else if (num == 2) {
                back = '有点难搞哦'
            } else if (num == 3) {
                back = '还上不上线了？'
            } else if (num == 4) {
                back = '嘞还玩个球哦'
            } else if (num == 5) {
                back = '麻烦把地球炸一下'
            } else if (num == 6) {
                back = '(╯°□°）╯︵ ┻━┻'
            }
            return back
        },
        getAppraise() {
            if (this.way1 == this.way2) {
                return '竟然打了个平手？'
            }
            if (this.way1 > this.way2) {
                let num = this.way1 - this.way2
                let back = "don't worry"
                if (num == 1) {
                    back = '前端略胜一筹'
                } else if (num == 2) {
                    back = '后端小有问题'
                } else if (num == 3) {
                    back = '后端怎么个事？'
                } else if (num == 4) {
                    back = '后端睡着了？？'
                }
                return back
            } else if (this.way2 > this.way1) {
                let num = this.way2 - this.way1
                let back = "don't worry"
                if (num == 1) {
                    back = '后端险胜'
                } else if (num == 2) {
                    back = '前端只是没注意'
                } else if (num == 3) {
                    back = '高手也会失手！'
                } else if (num == 4) {
                    back = '今天运势不好..'
                }
                return back
            }
            return this.way1
        }
    }
}
</script>

<style lang="less" scoped>
.CheckList {
    position: fixed;
    width: 300px;
    top: 40px;
    right: 20px;
    z-index: 10000;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    // background-color: aqua;
}

.box {
    display: flex;
    width: 100%;
    font-weight: 600;
    justify-content: space-between;
}

.box2 {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
    height: 44px;
    line-height: 24px;
    font-weight: 600;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: rgba(68, 182, 254, 0.7) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(68, 182, 254, 0.8) 0px -2px 6px 0px inset;

    >div:nth-child(1) {
        display: flex;
        font-weight: normal;

        >div:nth-child(1) {
            margin-right: 10px;

            span {
                color: #40c9ff;
            }
        }

        >div:nth-child(2) {
            font-weight: normal;

            span {
                color: #e81cff;
            }
        }
    }
}

.way1 {
    box-shadow: rgba(284, 184, 255, 0.7) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(232, 28, 255, 0.8) 0px -2px 6px 0px inset;
}

.way2 {
    box-shadow: rgba(64, 201, 255, 0.7) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(64, 201, 255, 0.8) 0px -2px 6px 0px inset;
}

.list {
    text-align: left;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: 600;

    .textarea {
        width: 100%;
        max-height: 200px;
        outline: none;
        border-radius: 10px 0px 0px 0px;
        padding-right: 3px;
        overflow: auto;
    }

    .numtext {
        font-family: Georgia, 'Times New Roman', Times, serif;
        position: relative;
        top: -2px;
    }

    .border1 {
        border: 1px solid #40c9ff;
    }

    .border2 {
        border: 1px solid #e81cff;
    }

    >div:nth-child(1) {
        display: flex;
    }

    >div:nth-child(2) {
        display: flex;
    }

    >div:nth-child(3) {
        margin-top: 5px;
        margin-bottom: 5px;

        >div:nth-child(1) {
            display: flex;
            cursor: pointer;

            >div:nth-child(1) {
                margin-right: 10px;
            }
        }

        >div:nth-child(2) {
            overflow: hidden;

            >div {
                font-size: 12px;
                font-weight: normal;
                letter-spacing: 3px;
                border-bottom: 1px solid #666;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            }
        }
    }

    >div:nth-child(4) {
        margin-top: 5px;
        margin-bottom: 5px;

        >div:nth-child(1) {
            cursor: pointer;
            display: flex;

            >div:nth-child(1) {
                margin-right: 10px;
            }
        }

        >div:nth-child(2) {
            overflow: hidden;

            >div {
                font-size: 12px;
                font-weight: normal;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            }
        }
    }
}

.back {
    padding: 10px;
    margin-right: 0px !important;
    box-sizing: border-box;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    height: 100%;
    width: 100%;
    background: linear-gradient(#fff, #fff) padding-box,
        linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
    border: 2px solid transparent;
    background-size: 200% 100%;
    overflow: hidden;
    font-size: 14px;
    font-family: inherit;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    box-sizing: border-box;
    animation: gradient 5s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>
