<template>
    <div class="orderDetail-container wx-orderDetail-container">
        <!--工单详情-->
        <scroller>
            <div class="orderDetail-list wx-orderDetail-list">
                <div class="orderDetail-top orderDetail-style">
                    <div class="row">
                        <text class="order-title order-font">单号：</text>
                        <text class="order-text order-font">{{item.Id}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">二维码：</text>
                        <text class="order-text">{{item.QRCode}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">工单级别：</text>
                        <text class="order-text">{{item.Level | orderLevel}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">需求类型：</text>
                        <text class="order-text">{{item.Type | orderType}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">创建时间：</text>
                        <text class="order-text">{{item.CreateTime}}</text>
                    </div>
                    <image class="work-status" :src="imgUrl"></image>
                </div>
                <div class="orderDetail-describe  orderDetail-style">
                    <div class="row">
                        <text class="order-title">需求描述：</text>
                        <text class="order-text">{{item.Describe}}</text>
                    </div>
                </div>
                <div class="orderDetail-info  orderDetail-style">
                    <div class="row">
                        <text class="order-title">设备名称：</text>
                        <text class="order-text">{{item.DeviceName}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">设备型号：</text>
                        <text class="order-text">{{item.DeviceModel||"暂无"}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">所属品牌：</text>
                        <text class="order-text">{{item.DeviceBrand||"暂无"}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">所属厂家：</text>
                        <text class="order-text">{{item.DeviceManufacturer||"暂无"}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">所属类目：</text>
                        <text class="order-text">{{item.CategoryName||"暂无"}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">所属区域：</text>
                        <text class="order-text">{{item.AreaName||"暂无"}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">安装地址：</text>
                        <text class="order-text">{{item.DevicePosition||"暂无"}}</text>
                    </div>
                </div>
                <!--上传图片-->
                <div class="orderDetail-describe  orderDetail-style">
                    <div class="row">
                        <text class="order-title">现场图片：</text>
                    </div>
                    <div class="row imgList">
                        <image class="showImg" :src="imgItem.Url" @load="onload" v-for="(imgItem,index) in imgList" @click="biggerImg(imgItem,index)"></image>
                    </div>
                </div>
                <!--结束上传图片-->
                <div class="orderDetail-repair orderDetail-style">
                    <div class="row">
                        <text class="order-title">报修单位：</text>
                        <text class="order-text">{{item.UserCompany}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">报修人员：</text>
                        <text class="order-text">{{item.UserName}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">联系电话：</text>
                        <text class="order-text order-phone" style="color:#3879d9" @click="call(item.UserPhone)">{{item.UserPhone}}</text>
                    </div>
                </div>
                <div class="orderDetail-maintain orderDetail-style">
                    <div class="row">
                        <text class="order-title">维修单位：</text>
                        <text class="order-text">{{item.ServiceCompany}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">维修人员：</text>
                        <text class="order-text">{{item.ServiceUserName}}</text>
                    </div>
                    <div class="row">
                        <text class="order-title">联系电话：</text>
                        <text class="order-text order-phone" style="color:#3879d9" @click="call(item.ServiceUserPhone)">{{item.ServiceUserPhone}}</text>
                    </div>
                </div>
            </div>
            <!--工单时间轴-->
            <div class="track-rcol">
                <div class="track-list" v-for="(timeLineItem,i) in timeLineContents">
                    <div class="time-style">
                        <text :class="[ i==0?'time-color':'time']">{{timeLineItem.CreateTime}}</text>
                        <text :class="[ i==0?'time-color':'txt']">{{timeLineItem.Content}}</text>
                    </div>
                    <image class="time-circle" :src="i==0?'http://img.zmnbx.com//dist/Images/ciricleBlue.png':'http://img.zmnbx.com//dist/Images/circleGray.png'"></image>
                </div>
            </div>
        </scroller>

        <!--底部按钮-->
        <div class="orderDetail-bottom" v-if="cancelShow">
            <text class="orderDetail-cancel" @click='btnFun' v-if="oneBtn">{{btnContent}}</text>
            <div class="twoBtn" v-if="!oneBtn">
                <text class="orderDetail-left-cancel" @click='btnFun'>{{btnCancel}}</text>
                <text class="orderDetail-right-transfer" @click='transfer'>{{btnTransfer}}</text>
            </div>
        </div>
        <!--弹框-->
        <div class="cancel-descript" v-if="descriptShow">
            <div class="cancel-box">
                <div class="cancel-content">
                    <!--评价-->
                    <div class="cancel-content-judge" v-if="showStar">
                        <text class="descript-title star-title">评分:</text>
                        <div class="cancel-judge">
                            <image class="judge-star" :src="item.src" v-for="(item, index) in star" @click="addStar(item,index)"></image>
                        </div>
                    </div>
                    <text class="descript-title">描述:</text>
                    <textarea rows='7' class="descript-text" v-model='descriptCont'></textarea>
                    <text @click='commit' class="descript-commit">提交</text>
                </div>
                <image @click='hideCont' class="workOrder-delete" src="http://img.zmnbx.com//dist/Images/delete.png"></image>
            </div>
        </div>
        <!--转单弹框-->
        <div class="cancel-descript" v-if="cancelTransfer">
            <div class="cancel-box transfer">
                <div class="cancel-transfer-content">
                    <text class="word-text">请选择接受服务单位</text>
                    <div class="selectList" @click="selectCompany">
                        <text class="selectList-text-size">{{serviceCompany.ServiceCompanyName}}</text>
                        <image class="select-img" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                    </div>
                    <div class="btn">
                        <button class="submit-transfer" @click="submitTransfer">
                            <text class="submit-text">提交</text>
                        </button>
                    </div>
                </div>
                <image @click='hideCont' class="workOrder-delete" src="http://img.zmnbx.com//dist/Images/delete.png"></image>
            </div>
        </div>
        <!--动画加载组件-->
        <goingOn :title="loadingTitle" v-if="isShow"></goingOn>
        <!--头部组件-->
        <!--<Header :title="headerTitle" :backShow="1" v-if="!_isWeixin()"></Header>-->
        <!--蒙版-->
        <div class="task wx-task" @click="clicks" v-if="showMask">
            <div class="maskBox">
                <text class="task-text wx-task-text">点击图片返回</text>
                <image class="task-img wx-task-img" resize="cover" :src="maskImg" @click="returnMask"></image>
            </div>
        </div>
    </div>
</template>

<style>
    .btn {
        position: relative;
        width: 600px;
        border: none;
        align-items: flex-end;
        height: 60px;
        /*background-color:red;*/
    }
    /*.cancel-box.transfer {
        padding-bottom: 40px;
    }*/
    
    .selectList {
        width: 500px;
        padding-left: 20px;
        position: relative;
        margin-bottom: 20px;
    }
    
    .select-img {
        height: 30px;
        width: 30px;
        position: absolute;
        left: 450px;
        top: 15px;
    }
    
    .word-text {
        font-size: 30px;
        color: #bbb;
        margin-bottom: 20px;
    }
    
    .selectList-text-size {
        width: 480px;
        border-style: solid;
        border-color: #aaa;
        border-width: 1px;
        padding-left: 20px;
        line-height: 60px;
        height: 60px;
        font-size: 28px;
    }
    
    .submit-transfer {
        width: 120px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        justify-content: center;
        background-color: #3879d9;
    }
    
    .submit-text {
        font-size: 30px;
        color: white;
        text-align: center;
    }
    
    .cancel-transfer-content {
        width: 650px;
        background-color: white;
        padding: 25px;
        justify-content: center;
        display: flex;
        position: relative;
    }
    /*.cancel-box {
        z-index: 100; 
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: #fff;
        padding: 20px 40px;
        width:400px;
        height:300px;
        display: flex;
        flex-direction: column;
        justify-content: center;

    }*/
    
    .cancel-content-judge {
        flex-direction: row;
        align-items: center;
        /*justify-content: space-between;*/
    }
    
    .star-title {
        margin-right: 50px;
    }
    
    .cancel-judge {
        margin-top: -10px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        /*background-color:red;*/
    }
    
    .judge-star {
        width: 50px;
        height: 50px;
        margin-right: 20px;
    }
    
    .track-text {
        font-size: 26px;
    }
    
    .task {
        width: 750px;
        height: 1334px;
        background-color: rgba(40, 40, 40, 0.6);
        position: absolute;
        left: 0;
        top: 0;
        align-items: center;
        justify-content: center;
        display: flex;
    }
    
    .maskBox {
        margin-top: -140px;
        align-items: center;
        justify-content: center;
    }
    
    .task-img {
        width: 600px;
        height: 600px;
        z-index: 10000;
    }
    
    .task-text {
        font-size: 30px;
        color: white;
        margin-bottom: 30px;
        z-index: 10000;
    }
    
    .showImg {
        height: 205px;
        width: 205px;
        margin-left: 25px;
    }
    /*工单详情样式*/
    
    .orderDetail-container {
        width: 750px;
        height: auto;
    }
    
    .orderDetail-list {
        padding-bottom: 30px;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 15px;
        background-color: #eeeeee;
    }
    
    .orderDetail-style {
        background-color: #fff;
        margin-bottom: 5px;
        border-width: 1px;
        border-style: solid;
        border-color: #d6d6d6
    }
    
    .orderDetail-top {
        position: relative;
    }
    
    .row {
        padding-top: 15px;
        padding-bottom: 15px;
        flex-direction: row;
    }
    /*.row.imgList {
        flex-wrap: wrap;
    }*/
    
    .work-status {
        position: absolute;
        top: 0;
        left: 0;
        height: 98px;
        width: 98px;
    }
    
    .showImg {
        height: 205px;
        width: 205px;
        margin-left: 25px;
    }
    
    .orderDetail-describe {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    
    .order-title {
        width: 150px;
        text-align: right;
        color: #c0c0c0
    }
    
    .order-title,
    .order-text {
        font-size: 26px;
    }
    
    .order-text {
        width: 570px;
        color: #728594;
        padding-left: 30px;
    }
    
    .order-phone {
        color: #3879d9;
    }
    
    .orderDetail-maintain {
        margin-bottom: 100px;
    }
    
    .orderDetail-bottom {
        height: 100px;
        width: 750px;
        justify-content: center;
        align-items: center;
        background-color: #f8f8f8;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    /*底部按钮样式*/
    
    .twoBtn {
        width: 720px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
    .orderDetail-cancel,
    .orderDetail-left-cancel,
    .orderDetail-right-transfer {
        text-align: center;
        color: white;
        font-size: 26px;
        line-height: 70px;
        height: 70px;
    }
    
    .orderDetail-cancel {
        width: 720px;
        background-color: #3879d9;
    }
    
    .orderDetail-left-cancel {
        width: 330px;
        background-color: #3879d9;
    }
    
    .orderDetail-right-transfer {
        width: 330px;
        background-color: #e7bc10;
    }
    /*取消保修单弹框样式*/
    
    .cancel-descript {
        width: 750px;
        height: 1334px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(40, 40, 40, 0.6);
        justify-content: center;
        align-items: center;
    }
    
    .cancel-box {
        width: 700px;
        padding: 20px;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    
    .cancel-content {
        width: 650px;
        background-color: white;
        padding: 25px;
    }
    
    .descript-title {
        color: #728594;
        font-size: 30px;
        padding-bottom: 15px;
    }
    
    .descript-text {
        width: 600px;
        height: 300px;
        border-color: #c0c0c0;
        border-style: solid;
        border-width: 1px;
    }
    
    .descript-commit {
        margin-top: 40px;
        width: 600px;
        height: 70px;
        background-color: #0092FC;
        text-align: center;
        border-radius: 5px;
        line-height: 70px;
        font-size: 30px;
        color: white;
    }
    
    .workOrder-delete {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 0px;
        right: 0px;
    }
    /*时间轴样式*/
    
    .track-rcol {
        width: 750px;
        padding-bottom: 150px;
        background-color: #eeeeee;
    }
    
    .track-list {
        padding-left: 40px;
        position: relative
    }
    
    .time-style {
        padding-top: 5px;
        padding-left: 40px;
        padding-right: 30px;
        padding-bottom: 30px;
        line-height: 18px;
        border-left-style: solid;
        border-left-color: #d6d6d6;
        border-left-width: 2px;
        color: #728594;
        font-size: 26px;
    }
    
    .time-circle {
        position: absolute;
        left: 26px;
        top: 0;
        height: 30px;
        width: 30px;
    }
    
    .time,
    .txt {
        margin-right: 20px;
        padding-bottom: 10px;
        color: #c0c0c0;
        font-size: 26px;
    }
    
    .time-color {
        color: #728594;
        font-size: 26px;
    }
</style>

<script>
    import * as orderCommon from '../filters/index.js';
    // import detail from '../components/detail.vue';
    var modal = weex.requireModule('modal');
    const picker = weex.requireModule('picker');
    var communication = weex.requireModule('Communication');
    const storage = weex.requireModule('storage');
    export default {
        data() {
            return {
                imgSizeArray: [],
                imgBig: [],
                serviceCompany: {},//定义的一个数组里面的对象的名字
                selectServiceCompany: [],//接收后台数据的数组
                cancelTransfer: false,
                userType: 0,
                btnCancel: '',
                btnTransfer: '',
                oneBtn: false,
                twoBtn: true,
                showStar: false,
                level: 5,
                serviceUserId: 0,
                stars: [],
                item: {},
                timeLineContents: [],
                imgUrl: '',
                cancelShow: false,
                descriptShow: false,
                btnContent: '',
                orderId: '',
                descriptCont: '',
                State: '',
                headerTitle: '工单详情',
                // maskImg: null
                isShow: false,
                loadingTitle: '提交中……',
                imgList: null,
                showMask: false,
                maskImg: '',
                star: [{
                    name: 1,
                    src: 'http://img.zmnbx.com//dist/Images/starTransparent.png',
                    isSelect: false
                }, {
                    name: 2,
                    src: 'http://img.zmnbx.com//dist/Images/starTransparent.png',
                    isSelect: false,
                }, {
                    name: 3,
                    src: 'http://img.zmnbx.com//dist/Images/starTransparent.png',
                    isSelect: false,
                }, {
                    name: 4,
                    src: 'http://img.zmnbx.com//dist/Images/starTransparent.png',
                    isSelect: false,
                }, {
                    name: 5,
                    src: 'http://img.zmnbx.com//dist/Images/starTransparent.png',
                    isSelect: false,
                }]
            }
        },
        methods: {
            selectCompany() {
                // 改变radio的颜色
                var index = 0;
                this.selectServiceCompany.forEach((m, i) => {
                    if (m.ServiceCompanyId == this.serviceCompany.ServiceCompanyId) {
                        index = i
                    }
                })
                // 选择接收服务单位

                picker.pick({
                    index: index,
                    items: this.selectServiceCompany.map(item => item.ServiceCompanyName)
                }, event => {
                    if (event.result === 'success') {
                        this.serviceCompany = this.selectServiceCompany[event.data]
                    }
                })

            },
            // 转单提交按钮
            submitTransfer() {
                this._post('/api/order/Forward', { serviceCompanyId: this.serviceCompany.ServiceCompanyId, orderId: this.orderId }, res => {
                    this.cancelTransfer = false;
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        // 将初始化时得到的orderId赋给当前的orderId
                        // this.orderId = res.orderId
                        modal.toast({
                            message: "转单成功",
                            duration: 0.2
                        })
                        this.init();
                    }

                })
            },
            // 评价
            addStar(item, index) {
                for (var i = 0; i < this.star.length; i++) {
                    if (i <= index) {
                        this.star[i].src = 'http://img.zmnbx.com//dist/Images/starYellow.png';
                        this.star[i].isSlect = true;
                    } else {
                        this.star[i].src = 'http://img.zmnbx.com//dist/Images/starTransparent.png';
                        this.star[i].isSlect = false;
                    }
                }
                this.level = this.star[index].name;
            },
            // 按钮事件
            btnFun() {
                this.descriptShow = true;
                this.descriptCont = " ";
            },
            biggerImg(imgItem, index) {
                // console.log(imgItem,index,this.imgSizeArra)
                // var ratio1 = (this.imgSizeArray[index].imgH / this.imgSizeArray[index].imgW).toFixed(2);
                // var imgW = 650;
                // var imgH = imgW * ratio1;
                // this.imgBig = [imgW + "px", imgH + "px"];
                this.showMask = true;
                this.maskImg = imgItem.Url;
            },
            returnMask() {
                this.showMask = false;
            },
            clicks() {
            },
            // 弹框关闭事件
            hideCont() {
                this.descriptShow = false;
                this.cancelTransfer = false;
            },
            // 转单
            transfer() {
                if (this.btnTransfer == "转单") {
                    this.cancelTransfer = true;
                } else {
                    modal.confirm({
                        message: '确认未完成？',
                        duration: 0.3,
                        okTitle: '确认',
                        cancelTitle: '取消'
                    }, (value) => {
                        if (value == "确认") {
                            this._get("/api/order/submitstate", {
                                orderId: this.orderId,
                                description: this.descriptCont,
                                state: 128,
                                toUserId: this.serviceUserId,
                                appType: 1
                            }, res => {
                                if (res.error) {
                                    modal.toast({
                                        message: "服务器繁忙，请稍后再试试",
                                        duration: 0.2
                                    })
                                } else {
                                    this.descriptShow = false;
                                    modal.toast({
                                        message: "执行成功",
                                        duraiton: 0.2
                                    })
                                    this.init()
                                }
                                self.isShow = false;

                            })

                        }
                    })
                }

            },
            // 初始化
            init() {
                storage.getItem('userType', event => {
                    this.userType = event.data
                })

                this._get('/api/order/get', {
                    id: this.orderId
                }, res => {
                    // console.log(res);
                    // 微信端需要,上线后删掉
                    // this.imgList = res.ImgUrl.filter(function (item) {
                    //     item.Url = item.Url.replace('http://192.168.1.240', 'http://wx.zmn.bolext.cn');
                    //     return true;
                    // });
                    //结束
                    console.log(res);    

                    this.oneBtn = false
                    this.imgList = res.imgUrl;
                    this.item = res;
                    this.imgUrl = orderCommon.orderState(res.State).src;
                    this.State = res.State;
                    this.serviceUserId = res.ServiceUserId;

                    if (this.State == 16 && (this.userType & 2 || this.userType & 8)) {
                        this.cancelShow = true;
                        this.btnContent = '取消'
                        this.oneBtn = true;
                    } else if (this.State == 8 && this.userType & 2) {
                        this.cancelShow = true;
                        this.btnContent = '取消'
                        this.oneBtn = true;
                    } else if ((this.State == 8 || this.State == 4) && ((this.userType & 8) > 0)) {
                        this.oneBtn = false;
                        this.btnTransfer = '转单'
                        this.btnCancel = '取消';
                        this.cancelShow = true;
                    } else if (this.State == 64) {
                        this.cancelShow = true;
                        this.oneBtn = false;
                        // this.btnContent = '确认完成'
                        this.btnTransfer = '未完成'
                        this.btnCancel = '确认完成';
                        this.showStar = true;
                    } else {
                        this.cancelShow = false;
                    }
                });
                this._get('/api/order/timeline', {
                    orderId: this.orderId
                }, res => {
                    this.timeLineContents = res
                });
            },
            //弹框提交事件
            commit() {
                var self = this;
                if (this.descriptCont == "") {
                    modal.toast({
                        message: "请输入描述内容",
                        duration: 0.2
                    })
                } else {
                    this.isShow = true;
                    if (this.State == 8 || this.State == 16) {
                        this._get("/api/order/submitstate", {
                            orderId: this.orderId,
                            description: this.descriptCont,
                            state: 256,
                            // level: this.level,
                            toUserId: this.serviceUserId,
                            appType: 1
                        }, res => {
                            // console.log(res)
                            if (res.success) {
                                this.descriptShow = false;
                                this.cancelTransfer = false;
                                modal.toast({
                                    message: res.success + " 工单已取消",
                                    duraiton: 0.2
                                })
                            } else {
                                modal.toast({
                                    message: "服务器繁忙，请稍后再试试",
                                    duration: 0.2
                                })
                            }
                            self.descriptCont = "" //清除描述框里面的内容
                            self.isShow = false;
                            self.init()
                        })
                    } else if (this.State == 64) {
                        this._get("/api/order/submitstate", {
                            orderId: this.orderId,
                            description: this.descriptCont,
                            state: 2048,
                            level: this.level,
                            toUserId: this.serviceUserId,
                            appType: 1
                        }, res => {
                            if (res.error) {
                                modal.toast({
                                    message: "服务器繁忙，请稍后再试试",
                                    duration: 0.2
                                })
                            } else {
                                this.descriptShow = false;
                                modal.toast({
                                    message: "执行成功",
                                    duraiton: 0.2
                                })
                                this.init()
                            }
                            self.descriptCont = ""//清除描述框里面的内容
                            self.isShow = false;

                        })
                    }

                }
            },
            // 拨打电话
            call(phoneNumber) {
                communication.call(phoneNumber)
            },
            // 查看图片原来的尺寸
            onload(e) {
                console.log("图片加载加载完成")
                let imgSize = {
                    imgH: e.size.naturalHeight,
                    imgW: e.size.naturalWidth
                }
                this.imgSizeArray.push(imgSize);
            }
        },
        created() {
            // 将路由跳转的id值赋给工单的id
            this.orderId = this.$route.params.id;
           
            storage.getItem('token', event => {
                this.cuuUserId = event.data;
                this.init()
            });
            this._post('/api/company/ListServiceCompany', {}, res => {
                this.selectServiceCompany = res;
                this.serviceCompany = res[0]
            })
        }
    }

</script>