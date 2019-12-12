import React, { Component } from 'react'
import "./index.css"
import axios from "axios"
import {  Icon } from 'antd';

class TopNav extends Component {
    state = {
        data: [],
        //左侧栏
        category: [],
        checked: false,
        //对应左侧栏的商品类别
        proList: [],
        isFenlei: false,
        isPinpai: false,
        isPaixu: false,
        isShaixuan: false,
        //品牌名
        brandList: [],
        leftId: null,
        what: null,
        pinpaiName: null,
        fenleiSpan: "分类"
    }
    componentDidMount() {
        //连接接口
        axios.get("/api").then(res => {
            var str = res.data.substring(14);
            var str1 = str.substring(0, str.length - 1);
            var arr = JSON.parse(str1).product;
            //console.log(arr)
            var t = ["全部分类"];
            for (var i = 0; i < arr.length; i++) {
                t.push(arr[i].category);
            }
            for (var k = 0; k < t.length; k++) {
                for (var j = k + 1; j < t.length; j++) {
                    if (t[k] === t[j]) {
                        t.splice(j, 1);
                        j--;
                    }
                }
            }
            this.setState({
                category: t,
                data: arr
            }, () => {
                //console.log(this.state.data)
            })
        })


    }



    //判断点击的是哪个按钮
    //分类
    isFenlei = () => {
        this.setState({
            isFenlei: !this.state.isFenlei,
            isPinpai: false,
            isPaixu: false,
            isShaixuan: false,
            what: "分类"
        })
    }
    //点击左侧显示右侧
    showRight(id) {

        var oLi = document.querySelectorAll(".flex-left ul li");
        for (var t = 0; t < oLi.length; t++) {
            oLi[t].style.backgroundColor = ""
        }
        oLi[id[1]].style.backgroundColor = "white"

        var list = []
        this.state.data.map(item => {
            //console.log([item.category, item.sublevel])
            if (item.category === id[0]) {
                // list.push(id[0])
                list.push(item.sublevel)
            }
            if (id[0] === "全部分类") {
                // list.push(id[0])
                list.push("全部商品")
            }
            return list
        })
        //去重
        for (var i = 0; i < list.length; i++) {
            for (var j = i + 1; j < list.length; j++) {
                if (list[i] === list[j]) {
                    list.splice(j, 1);
                    j--;
                }
            }
        }
        this.setState({
            proList: list,
            leftId: id[0]
        })



        this.setState({
            checked: true
        })
    }

    //品牌
    isPinpai = () => {
        this.setState({
            isPinpai: !this.state.isPinpai,
            isFenlei: false,
            isPaixu: false,
            isShaixuan: false,
            what: "品牌"
        })
        this.pinPailist()
    }
    //获得品牌名
    pinPailist() {
        var list = ["全部品牌"]
        this.state.data.map(item => {
            list.push(item.skuBrand)
            return list
        })
        for (var i = 0; i < list.length; i++) {
            for (var j = i + 1; j < list.length; j++) {
                if (list[i] === list[j]) {
                    list.splice(j, 1);
                    j--;
                }
            }
        }
        this.setState({
            brandList: list
        })
        //console.log(list)
    }
    //排序
    isPaixu = () => {
        this.setState({
            isPaixu: !this.state.isPaixu,
            isFenlei: false,
            isPinpai: false,
            isShaixuan: false,
            what: "排序"
        })
    }
    //筛选
    isShaixuan = () => {
        this.setState({
            isShaixuan: !this.state.isShaixuan,
            isFenlei: false,
            isPinpai: false,
            isPaixu: false,
            what: "筛选"
        })
    }

    //给父元素传递选择的参数

    toFather(text) {
        //console.log(this.state.what)
        this.props.fromson([this.state.what, text, this.state.leftId])

        if (this.state.what === "分类") {
            this.setState({
                fenleiSpan: text
            })
        }

    }

    putInPinPaiName(name) {
        //console.log(name)
        this.setState({
            pinpaiName: name
        })
    }


    render() {
        // var liStyle = {
        //     backgroundColor: this.state.checked ? "white" : null
        // }

        return (
            <div className="topNav">
                <div className="nav">
                    <li onClick={this.isFenlei}><span>{this.state.fenleiSpan}</span>{this.state.isFenlei ? <Icon type="up" /> : <Icon type="down" />}</li>
                    <li onClick={this.isPinpai}><span>品牌</span> {this.state.isPinpai ? <Icon type="up" /> : <Icon type="down" />}</li>
                    <li onClick={this.isPaixu}><span>排序</span> {this.state.isPaixu ? <Icon type="up" /> : <Icon type="down" />}</li>
                    <li onClick={this.isShaixuan}><span>筛选</span> {this.state.isShaixuan ? <Icon type="up" /> : <Icon type="down" />}</li>
                </div>
                {
                    this.state.isFenlei ? (
                        <div className="fenlei">
                            <div className="flex-wrapper">
                                <div className="flex-left">
                                    <ul>
                                        {
                                            this.state.category.map((item, index) => {
                                                return (
                                                    <li key={index} onClick={this.showRight.bind(this, [item, index])} >
                                                        {item}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="flex-right">
                                    <article>
                                        {
                                            this.state.proList.map(item => {
                                                return (
                                                    <p key={item} onClick={this.toFather.bind(this, item)}>{item}</p>
                                                )
                                            })
                                        }
                                    </article>
                                </div>
                            </div>
                        </div>
                    ) : null
                }

                {
                    this.state.isPinpai ? (<div className="pinpai">
                        <div className="flex-top">
                            <ul>
                                {
                                    this.state.brandList.map(item => {
                                        return (<li key={item} onClick={this.putInPinPaiName.bind(this, item)}>{item}</li>)
                                    })
                                }
                            </ul>

                        </div>
                        <div className="flex-bottom">
                            <div className="btn" onClick={this.toFather.bind(this, this.state.pinpaiName)}>完成</div>
                        </div>
                    </div>) : null
                }

                {
                    this.state.isPaixu ? (
                        <div className="paixu">
                            <ul>
                                <li>
                                    人气最高
                        </li>
                                <li onClick={this.toFather.bind(this,"priceGao")}>
                                    价格最高
                        </li>
                                <li onClick={this.toFather.bind(this,"priceDi")}>
                                    价格最低
                        </li>
                            </ul>
                        </div>
                    ) : null
                }
                {
                    this.state.isShaixuan ? (
                        <div className="shaixuan">
                            <div className="flex-top">
                                <div className="for">
                                    <p>目标人群</p>
                                    <ul>
                                        <li>男士</li>
                                        <li>女士</li>
                                        <li>通用</li>
                                    </ul>
                                </div>
                                <div className="price">
                                    <p>价格</p>
                                    <ul>
                                        <li>150以下</li>
                                        <li>150-300</li>
                                        <li>300-600</li>
                                        <li>600-900</li>
                                        <li>900-1200</li>
                                        <li>1200以上</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-bottom">
                                <div>重置</div>
                                <div>完成</div>
                            </div>
                        </div>

                    ) : null
                }





            </div>

        )
    }
}

export default TopNav
