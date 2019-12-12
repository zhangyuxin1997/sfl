import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "../../assets/css/Promotion.css"
import "../../assets/iconfont/promotion/iconfont.css"
import axios from "axios"
import { LazyLoadImage } from '@tjoskar/react-lazyload-img'
import TopNav from "../../components/Nav"
import "../../rem"
import Frame from "../../components/Frame"

class Promotion extends Component {
    state = {
        data: [],
        topShow: false,
        sonData: [],
        navShow:false,
        showHom : false
    }

    //监视滚动条
    handleScroll() {
        let scrollTop = this.refs.aaa.scrollTop;
        if (scrollTop >= 1500) {
            this.setState({
                topShow: true,
                navShow:true
            })
        } else {
            this.setState({
                topShow: false,
                navShow:false
            })
        }
    }



    toHome = () => {
        this.props.history.push("/app/home")
    }
    componentDidMount() {
        var a = document.querySelector(".promotion");




        //连接接口
        axios.get("/api").then(res => {
            var str = res.data.substring(14);
            var str1 = str.substring(0, str.length - 1);
            this.setState({
                data: JSON.parse(str1).product,
                how: true,
                sonData: JSON.parse(str1).product
            })
        })

        var _this = this

        //滚动条
        a.addEventListener('scroll', () => {
            _this.handleScroll();
        })
    }
    //回到顶部
    goTop() {
        var _this = this;
        var speed = 50;
        var timer = setInterval(() => {
            _this.refs.aaa.scrollTop = _this.refs.aaa.scrollTop - speed;
            speed++
            if (_this.refs.aaa.scrollTop <= 0) {
                clearInterval(timer)
                this.setState({
                    topShow: false
                })
            }
        })
    }

    handleBack = () => {
        this.props.history.push("/app/home")
    }
    showHome =()=>{
        this.setState({
            showHom : ! this.state.showHom
        })
    }
    //判断子元素传来的数据，对页面数据进行更改
    fn(fromson) {
        var getson = []
        console.log(fromson)
        console.log(this.state.data)
        if (fromson[0] === "分类") {
            this.state.data.map(item => {
                return ((item.category === fromson[2] && item.sublevel === fromson[1]) ? getson.push(item) : null)
            })
        }
        if (fromson[0] === "分类" && fromson[1] === "全部商品" && fromson[2] === "全部分类") {
            getson = this.state.data
        }
        if (fromson[0] === "品牌") {
            this.state.data.map(item => {
                return ((item.skuBrand === fromson[1]) ? getson.push(item) : null)
            })
        }
        if (fromson[0] === "品牌" && fromson[1] === "全部品牌") {
            getson = this.state.data
        }
        // if(fromson[0]=="排序"){
        //     if(fromson[1]=="priceGao"){
        //         this.state.getson.sort((a,b)=>{
        //             a.offerPrice - b.offerPrice
        //         })
        //         console.log(getson)
        //     }
        // }
        this.setState({
            sonData: getson
        })
        
    }
    render() {
        return (
            <div className="promotion" ref="aaa">
                <header><i className="iconfont icon-back" onClick={this.handleBack}></i>每 周 特 惠<i className="iconfont icon-gengduo" onClick={this.showHome}></i></header>
                {
                    this.state.navShow ? <TopNav fromson={this.fn.bind(this)} /> : null
                }
                {
                    this.state.showHom ? <Frame/> : null
                }
                

                

                <section>
                    <ul className="clarList">
                        <li>

                            <img src="https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2019/12/ws1205/images/ws1205_01.jpg" alt="每周特惠" />

                        </li>
                        <li>
                            <img src="https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2019/12/ws1205/images/offer1209.jpg" alt="每周特惠"></img>
                        </li>
                        <li>
                            <img src="https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2019/12/ws1205/images/ws1205_02.jpg" alt="每周特惠"></img>
                        </li>
                        <li>
                            <img src="https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2019/12/ws1205/images/ws1205_03.jpg" alt="每周特惠"></img>
                            {/* <div className="filter">
                                <div className="filter-l"></div>
                                <div className="filter-r"></div>
                            </div> */}
                        </li>
                        <li>
                            <img src="https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2019/12/ws1205/images/ws1205_04.jpg" alt="每周特惠"></img>
                            {/* <div className="filter">
                                <div className="filter-l"></div>
                                <div className="filter-r"></div>
                            </div> */}
                        </li>
                        <li>
                            <img src="https://ssl3.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2019/12/ws1205/images/ws1205_05.jpg" alt="每周特惠"></img>
                            {/* <div className="filter">
                                <div className="filter-l"></div>
                                <div className="filter-r"></div>
                            </div> */}
                        </li>
                        <li>
                            <img src="https://ssl3.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2019/12/ws1205/images/ws1205_06.jpg" alt="每周特惠"></img>
                            {/* <div className="filter">
                                <div className="filter-l"></div>
                                <div className="filter-r"></div>
                            </div> */}
                        </li>
                        <li>
                            <img src="https://ssl3.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2019/12/ws1205/images/ws1205_07.jpg" alt="每周特惠"/>
                        </li>
                        <li>
                            <ul className="app_list clear_fix">
                                {
                                    this.state.sonData.map((item) => {
                                        return (
                                            <li key={item.skuId}>
                                                <Link to={`/product/${item.skuProductID}`} >
                                                    <div className="pro_img">
                                                        <LazyLoadImage
                                                            defaultImage="https://ssl1.sephorastatic.cn/soa/public/images/preload180509.png"
                                                            image={item.skuPic2}
                                                        ></LazyLoadImage>
                                                        {/* <img src={item.skuPic2} /> */}
                                                    </div>
                                                    <div className="pro_brand">
                                                        {item.skuBrand}
                                                    </div>
                                                    <div className="pro_name">
                                                        {item.Icon === "New" ? <img src="//s1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/03/newspring20180323/red.jpg" alt="上新"/> : null}
                                                        {item.Icon === "Exclusive" ? <img src="//s1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/03/newspring20180323/exclusive.jpg" alt="独家"/> : null}
                                                        {item.skuName}
                                                    </div>
                                                    <div className="pro_price">
                                                        {item.Price ? <span className="Price">价值¥{item.Price}</span> : null}
                                                        <span className="offerPrice"><em>￥</em>{item.offerPrice}</span>
                                                    </div>
                                                    <div className="pro_btn"></div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }


                            </ul>
                        </li>
                        <li>
                            <img src="https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2019/12/ws1205/images/ws1205_09.jpg" alt="any"/>
                        </li>
                    </ul>

                    {
                        this.state.topShow ? <div className="goTop" ref="gotop" onClick={this.goTop.bind(this)}></div> : null
                    }

                </section>

                <footer>
                    <i onClick={this.toLogin}>
                        登陆
                    </i>
                    <i onClick={this.toHome}>
                        首页
                    </i>
                    <i>下载丝芙兰App</i>
                    <p>本网站隶属于丝芙兰(上海)化妆品销售有限公司</p>
                </footer>
            </div >
        )
    }
}

export default Promotion


// 懒加载 https://ssl1.sephorastatic.cn/soa/public/images/preload180509.png
// 数据接口：https://s1.sephorastatic.cn/wcsfrontend/campaign/campaign_img/2019/12/ws20191205/data201912041758.json?callback=jsonpCallback