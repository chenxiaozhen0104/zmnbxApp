<template>
    <div class="body">
        <!--<Header :title="headerTitle" :backShow="0" v-if="!_isWeixin()"></Header>-->
        <div class="workOrder-header" v-if="!_isWeixin()">
            <text class="workOrder-headerText">工单</text>
            <div class="workOrder-searchBox" @click="selectArea" v-if="!_isWeixin()">
                <text class="workOrder-areaSearch">区域搜索</text>
                <!--<image class="workOrder-searchImg" src="http://img.zmnbx.com//dist/Images/search.png"></image>-->
            </div>
        </div>
        <!--工单类型菜单切换-->
        <div class="workOrder-title wx-workOrder-title">
            <div class="workOrder-tab-item wx-workOrder-tab-item" @click="menuClick('processing')">
                <div class="workOrder-title-preparing">
                    <text class="workOrder-text" :style="{'color':colors[menu.processing.isChoose?1:0]}">{{state}}</text>
                    <image class="worOrder-img" src="http://img.zmnbx.com//dist/Images/triangle.png" ref="test"></image>
                </div>
            </div>
            <div class="workOrder-tab-item wx-workOrder-tab-item" @click="menuClick('processed')">
                <text class="workOrder-text" :style="{'color':colors[menu.processed.isChoose?1:0]}">已完成({{menu.processed.num}})</text>
            </div>
            <div class="workOrder-tab-item wx-workOrder-tab-item" @click="menuClick('all')">
                <text class="workOrder-text" :style="{'color':colors[menu.all.isChoose?1:0]}">全部({{menu.all.num}})</text>
            </div>
        </div>
        <!--工单列表及加载刷新-->
        <list class="workOrder-body wx-workOrder-body" loadmoreoffset="10" @loadmore="onOrderloading">
            <refresh class="refresh" :display="refreshing ? 'show' : 'hide'" v-if="!_isWeixin()" @refresh="onpullingdown">
                <text class="indicator">刷新中...</text>
            </refresh>

            <cell class="order-list" v-for="(item,index) in items" @click="showDetail(item.id)">
                <div class="workOrder-body-order wx-workOrder-body-order">
                    <image class="order-datail-img" :src="item.state | orderStatePic"></image>
                    <div class="order-detail">
                        <div class="order-detail-4">
                            <text class="order-detail-text-style order-detail-text-size">单号:</text>
                        </div>
                        <div class="order-detail-8">
                            <text class="order-detail-text-size">{{item.id}}</text>
                        </div>
                    </div>
                    <div class="order-detail">
                        <div class="order-detail-4">
                            <text class="order-detail-text-style order-detail-text-size">创建时间:</text>
                        </div>
                        <div class="order-detail-8">
                            <text class="order-detail-text-size">{{item.createTime}}</text>
                        </div>
                    </div>
                    <div class="order-detail">
                        <div class="order-detail-4">
                            <text class="order-detail-text-style order-detail-text-size">工单级别:</text>
                        </div>
                        <div class="order-detail-8">
                            <text class="order-detail-text-size">{{item.level | orderLevel}}</text>
                        </div>
                    </div>
                    <div class="order-detail">
                        <div class="order-detail-4">
                            <text class="order-detail-text-style order-detail-text-size">设备名称:</text>
                        </div>
                        <div class="order-detail-8">
                            <text class="order-detail-text-size">{{item.deviceName}}</text>
                        </div>
                    </div>
                    <div class="order-detail">
                        <div class="order-detail-4">
                            <text class="order-detail-text-style order-detail-text-size">需求类型:</text>
                        </div>
                        <div class="order-detail-8">
                            <text class="order-detail-text-size">{{item.type | orderType}}</text>
                        </div>
                    </div>
                    <div class="order-detail">
                        <div class="order-detail-4">
                            <text class="order-detail-text-style order-detail-text-size">安装地址:</text>
                        </div>
                        <div class="order-detail-8">
                            <text class="order-detail-text-size">{{item.devicePosition}}</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell class="loading" v-if="hasMore">
                <text>没有更多了</text>
            </cell>
        </list>
        <!--进行工单中分类选择-->
        <div class="workOrder-hid wx-workOrder-hid" v-if="menu.processing.hideOrder">
            <div class="workOrder-hidden-orderGoing workOrder-hidden-size" v-for="item in menu.processing.type" @click="orderStateItemClick(item)">
                <button><text class="workOrder-hidden-text" :class="[item.isSelect?'workOrder-checked':'workOrder-hidden-text']">{{item.name+'('+item.num+')'}}</text></button>
            </div>
        </div>
        <!--动画加载组件-->
        <goingOn :title="loadingTitle" v-if="isShow"></goingOn>
        <!--底部组件-->
        <Footer :active="1"></Footer>
        <app-detail :path="detail.path" title="工单详情" @close="closeDetail" />
      
    </div>
</template>

<style>
    .body {
        background-color: #eee;
    }
    
    button {
        border: none;
        background-color: transparent;
    }
    
    .weex-list-inner {
        background-color: transparent;
    }
    
    .searchArea {
        width: 100px;
        height: 100px;
    }
    /*头部样式*/
    
    .workOrder-header {
        height: 88px;
        background-color: #0092FC;
        flex-direction: row;
        width: 750px;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    
    .workOrder-headerText {
        font-size: 40px;
        color: white;
    }
    /*.workOrder-header {
        width: 750px;*/
    
    .workOrder-searchBox {
        height: 88px;
        width: 140px;
        position: absolute;
        right: 0;
        top: 0;
        justify-content: center;
        align-items: center;
    }
    
    .workOrder-searchImg {
        height: 45px;
        width: 45px;
    }
    
    .workOrder-areaSearch {
        color: white;
    }
    /*工单菜单栏切换样式*/
    
    .workOrder-title {
        width: 750px;
        height: 105px;
        flex-direction: row;
        justify-content: space-between;
        background-color: white;
        border-bottom-color: #ddd;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        /*margin-top: 88px;*/
    }
    
    .workOrder-tab-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .workOrder-title-preparing {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: 66px;
    }
    
    .workOrder-text {
        font-size: 30px;
        color: #555;
        margin-right: 20px;
    }
    
    .worOrder-img {
        width: 30px;
        height: 30px;
    }
    
    .order-list {
        padding: 5px 5px;
        flex-direction: row;
    }
    
    .loading,
    .refresh {
        height: 80px;
        justify-content: center;
        align-items: center;
        width: 750px;
        line-height: 80px;
    }
    
    .indicator {
        font-size: 26px;
    }
    /*工单列表样式*/
    
    .workOrder-body {
        /*background-color: #eee;*/
        margin-bottom: 105px;
        /*margin-top: 100px;*/
    }
    
    .workOrder-body-order {
        width: 730px;
        background-color: white;
        margin-top: 10px;
        margin-left: 10px;
        padding-bottom: 20px;
        position: relative;
        border-style: solid;
        border-color: #ccc;
        border-width: 2px;
    }
    
    .order-detail {
        flex-direction: row;
        margin-top: 10px;
        justify-content: center;
    }
    
    .order-datail-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100px;
        height: 100px;
    }
    
    .order-detail-4 {
        flex: 3;
    }
    
    .order-detail-8 {
        flex: 7;
        padding-left: 20px;
    }
    
    .order-detail-text-style {
        color: #bdbdbd;
        padding-right: 10px;
        text-align: right;
    }
    
    .order-detail-text-size {
        font-size: 30px;
    }
    /*进行中分类选择样式*/
    
    .workOrder-hid {
        width: 750px;
        height: 300px;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        padding-top: 41px;
        background-color: white;
        position: absolute;
        left: 0;
        top: 193px;
        padding-left: 31px;
        border-top-color: #d3d3d3;
        border-top-width: 2px;
        border-top-style: solid;
        border-bottom-color: #d3d3d3;
        border-bottom-width: 2px;
        border-bottom-style: solid;
    }
    
    .workOrder-hidden-size {
        width: 213px;
        height: 68px;
        border-style: solid;
        border-width: 3px;
        border-color: #6c6c6c;
        background-color: white;
        margin-right: 25px;
        margin-bottom: 41px;
        justify-content: center;
        align-items: center;
    }
    
    .workOrder-hidden-text {
        font-size: 30px;
        color: #555;
    }
    
    .workOrder-checked {
        color: #3879D9;
    }
    
    .workOrder-itemId {
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #777;
        height: 60px;
        background-color: white;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    
    .workOrder-itemId-left {
        font-size: 20px;
        color: #555;
    }
</style>
<script>
  
    import * as orderCommon from '../filters/index.js';
    import { _getOrderStateNum } from "../store/fecth.js";
   import appDetail from '../components/detail.vue'
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');
    const dom = weex.requireModule('dom');
    const storage = weex.requireModule('storage');
    const picker = weex.requireModule('picker')
    export default {
       components: { 'app-detail': appDetail },
        data() {
            return {
                detail: {
                    path: '',
                    id: ''
                },
                loadingTitle: '加载中……',
                isShow: false,
                refreshing: false,
                showLoading: 'hide',
                pageIndex: 1,
                total: 0,
                items: [],
                curState: 4 + 8 + 16 + 32 + 64,
                colors: ['#333333', '#3879D9'],
                state: '进行中',
                hasMore: false,
                // headerTitle: '工单',
                areas: null,
                areaId: null,
                menu: {
                    processing: {
                        isChoose: true,
                        hideOrder: false,
                        curState: 4 + 8 + 16 + 32 + 64,
                        type: [{
                            name: '派单中',
                            src: 'http://img.zmnbx.com//dist/Images/sendingGreen.png',
                            state: 8,
                            isSelect: false,
                            num: 0

                        }, {
                            name: '已派单',
                            src: 'http://img.zmnbx.com//dist/Images/sendDoneGreen.png',
                            state: 16,
                            isSelect: false,
                            num: 0
                        }, {
                            name: '工作中',
                            src: 'http://img.zmnbx.com//dist/Images/workingGreen.png',
                            state: 32,
                            isSelect: false,
                            num: 0
                        }, {
                            name: '未确认',
                            src: 'http://img.zmnbx.com//dist/Images/unconfirmedRed.png',
                            state: 64,
                            isSelect: false,
                            num: 0
                        }, {
                            name: '进行中',
                            src: 'http://img.zmnbx.com//dist/Images/sendingGreen.png',
                            state: 8 + 16 + 32 + 64,
                            isSelect: true,
                            num: 0
                        }]
                    },
                    processed: {
                        isChoose: false,
                        name: '已完成',
                        src: 'http://img.zmnbx.com//dist/Images/doneBlue.png',
                        state: 1024 + 2048,
                        num: 0
                    },
                    all: {
                        name: '全部',
                        isChoose: false,
                        state: 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 + 1024 + 2048 + 4096,
                        src: 'http://img.zmnbx.com//dist/Images/workingGreen.png',
                        num: 0
                    }

                },
            }
        },
        methods: {
            showDetail(id) {
                this.detail.id = id
                this.detail.path = '/workOrder/orderDetail/' + id
               
            },
            closeDetail() {
                this.detail.path = ''
                //关闭详情页面更新订单状态
                this._get('/api/order/get', {
                    id: this.detail.id
                }, res => {
                    for (let i = 0; i < this.items.length; i++) {
                        if (this.items[i].id == this.detail.id) {
                            let item = this.items[i]
                            item.state = res.State
                            return
                        }
                    }
                })
            },
            // redirectResult(routeUrl, index) {
            //     storage.setItem('selectRow', index, event => {
            //         this.pageTo(routeUrl);
            //     });
            // },
            //查询事件
            doSearch() {
                var self=this;
                this._post('/api/order/search', {
                    state: self.curState,
                    atype: 1,
                    pageIndex: self.pageIndex,
                    pageSize: 10,
                    AreaId: self.areaId
                }, res => {
                    console.log(res)
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        self.total = res.count;
                        if (self.items.length <res.count) {
                            self.pageIndex++;
                            self.items = self.items.concat(res.data);
                            // storage.setItem('workOrderItem', JSON.stringify(this.items), event => { });
                            self.hasMore = false
                        } else {
                            self.hasMore = true
                        }
                    }
                    self.refreshing = false;
                    self.isShow = false;
                })
            },
            //进行中状态切换点击事件
            orderStateItemClick(item) {
                // console.log(item);
                this.loadingTitle = "加载中..."
                this.state = item.name;
                this.menu.processing.hideOrder = !this.menu.processing.hideOrder;
                //  this.menu.processing.hideOrder = false;
                var testEl = this.$refs.test;
                animation.transition(testEl, {
                    styles: {
                        transform: 'rotate(0)',
                        transformOrigin: 'center center'
                    },
                    duration: 500,
                    timingFunction: 'ease',
                    delay: 0
                })
                this.menu.processing.isChoose = true;
                this.menu.processing.type = this.menu.processing.type.map(function (item) {
                    item.isSelect = false;
                    return item;
                });
                item.isSelect = true;
                this.menu.processed.isChoose = false;
                this.menu.all.isChoose = false;
                this.curState = item.state;
                this.pageIndex = 1;
                this.items = [];
                this.doSearch();
                this.isShow = true;
                // 三角动画
                var testEl = this.$refs.test;
                animation.transition(testEl, {
                    styles: {
                        color: '#333333',
                        transform: 'rotate(0)',
                        transformOrigin: 'center center'
                    },
                    duration: 500,
                    timingFunction: 'ease',
                    delay: 0
                })
            },
            //菜单切换点击事件
            menuClick(Type) {
                this.loadingTitle = "加载中..."
                this.menu.processing.isChoose = false;
                this.menu.processed.isChoose = false;
                this.menu.all.isChoose = false;
                this.menu[Type].isChoose = true;
                if (Type == "processing") {
                    // 三角动画
                    var testEl = this.$refs.test;
                    this.menu[Type].hideOrder = !this.menu[Type].hideOrder;
                    animation.transition(testEl, {
                        styles: {
                            transform: this.menu[Type].hideOrder ? 'rotate(180deg)' : 'rotate(0)',
                            transformOrigin: 'center center'
                        },
                        duration: 500,
                        timingFunction: 'ease',
                        delay: 0
                    })
                } else {
                    this.menu.processing.hideOrder = false;
                    var testEl = this.$refs.test;
                    animation.transition(testEl, {
                        styles: {
                            transform: 'rotate(0)',
                            transformOrigin: 'center center'
                        },
                        duration: 500,
                        timingFunction: 'ease',
                        delay: 0
                    })
                    //执行查询
                    this.curState = this.menu[Type].state;
                    this.pageIndex = 1;
                    this.items = [];
                    // storage.setItem('workOrderItem', JSON.stringify(this.items), event => { });
                    this.doSearch();
                    this.isShow = true;
                    // 三角动画
                    var testEl = this.$refs.test;
                    animation.transition(testEl, {
                        styles: {
                            color: '#333333',
                            transform: this.menu[Type].hideOrder ? 'rotate(180deg)' : 'rotate(0)',
                            transformOrigin: 'center center'
                        },
                        duration: 500,
                        timingFunction: 'ease',
                        delay: 0
                    })
                }

            },
            //上拉加载更多
            onOrderloading() {
                this.showLoading = "show";
                this.doSearch();
                this.isShow = true;
            },
            // 下来刷新
            onpullingdown() {
                this.refreshing = true;
                this.pageIndex = 1
                this.items = [];
                // storage.setItem('workOrderItem', JSON.stringify(this.items), event => { });
                this.doSearch();
                this.isShow = true;
                this.loadingTitle = "刷新中..."
                this.orderNum(this.areaId);
            },
            // 区域选择
            selectArea() {
                var self = this.areas
                picker.pick({
                    index: 0,
                    items: self.map(item => item.Name)
                }, event => {
                    if (event.result === 'success') {
                        this.areaId = self[event.data].AreaId;
                        this.pageIndex = 1
                        this.items = [];
                        this.doSearch();
                        this.orderNum(this.areaId);
                      
                        this.isShow = true;
                    }
                })
            },
            orderNum(areaId) {
                var self = this;
                this._get("api/order/getorderstatenum", { appType: 1, AreaId: self.areaId }, res => {
                    // 工单数量清空
                    self.menu.all.num = 0;
                    self.menu.processed.num = 0;
                    self.menu.processing.type[0].num = 0;
                    self.menu.processing.type[1].num = 0;
                    self.menu.processing.type[2].num = 0;
                    self.menu.processing.type[3].num = 0;
                    self.menu.processing.type[4].num = 0;
                    for (let i = 0; i < res.length; i++) {
                        self.menu.all.num += res[i].Num;
                        if (res[i].State & (1024|2048)) {
                            self.menu.processed.num += res[i].Num;
                        } else if (res[i].State == 8) {
                            self.menu.processing.type[0].num += res[i].Num;
                            self.menu.processing.type[4].num += res[i].Num;
                        } else if (res[i].State == 16) {
                            self.menu.processing.type[1].num += res[i].Num;
                            self.menu.processing.type[4].num += res[i].Num;
                        } else if (res[i].State == 32) {
                            self.menu.processing.type[2].num += res[i].Num;
                            self.menu.processing.type[4].num += res[i].Num;
                        } else if (res[i].State == 64) {
                            self.menu.processing.type[3].num += res[i].Num;
                            self.menu.processing.type[4].num += res[i].Num;
                        }
                    }
                })
            }

        },
        created() {
            this.doSearch();
            this.isShow = true;
            var self = this;

            // var self = this;
            // storage.getItem('workOrderItem', event => {
            //     if (event.result === "success") {
            //         self.items = JSON.parse(event.data);
            //     }
            // })

            if (self.items.length == 0) {
                this.doSearch();
                this.isShow = true;
            }
            this._get("api/order/GetAreas", {}, res => {
                this.areas = res;
                this.areas.unshift({ "Name": "全部区域", "AreaId": null })
            });

            this.orderNum(this.areaId);

            //selectRow不为空要定位到指定项
            // setTimeout(() => {
            //     storage.getItem('selectRow', event => {
            //         if (event.result === "success") {
            //             const el = self.$refs['a' + event.data][0];
            //             dom.scrollToElement(el, {});
            //             //清空selectRow值
            //             storage.setItem('selectRow', "0", event => {
            //             });
            //         }
            //     })
            // }, 500);

        }
    }

</script>