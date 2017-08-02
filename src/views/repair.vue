<template>
    <div class="repair-container">
        <AppHeader :title="headerTitle" v-if="!_isWeixin()" back="/device"></AppHeader>
        <!--保修工单详情-->
        <scroller>
            <div class="repair-content wx-repair-content">
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style text-size">设备名称:</text>
                    </div>
                    <div class="repair-detail-col-8">
                        <text class="text-size">{{item.Name}}</text>
                    </div>
                </div>
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style text-size">类目:</text>
                    </div>
                    <div class="repair-detail-col-8">
                        <text class="text-size">{{item.Category?item.Category.Name:'暂无'}}</text>
                    </div>
                </div>
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style text-size">型号:</text>
                    </div>
                    <div class="repair-detail-col-8">
                        <text class="text-size">{{item.Model}}</text>
                    </div>
                </div>
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style text-size">二维码:</text>
                    </div>
                    <div class="repair-detail-col-8">
                        <text class="text-size">{{item.QRCode}}</text>
                    </div>
                </div>
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style text-size">安装地点:</text>
                    </div>
                    <div class="repair-detail-col-8">
                        <text class="text-size">{{item.Position}}</text>
                    </div>
                </div>
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style text-size">选择服务单位:</text>
                    </div>
                    <div class="repair-detail-col-8">
                        <text class="text-size orderType" @click="serverNameFun">{{serverName}}</text>
                        <image class="repair-select-img" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                    </div>
                </div>
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style text-size">工单类型:</text>
                    </div>
                    <div class="repair-detail-col-8">
                        <text class="text-size orderType" @click="workOrder('type')">{{typeSelectItem.name}}</text>
                        <image class="repair-select-img" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                    </div>
                </div>
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style text-size">工单级别:</text>
                    </div>
                    <div class="repair-detail-col-8">
                        <text class="text-size orderLevel" @click="workOrder('level')">{{levelSelectItem.name}}</text>
                        <image class="repair-select-img" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                    </div>
                </div>
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style text-size">故障描述:</text>
                    </div>
                    <div class="repair-detail-col-8">
                        <textarea rows="8" class="textarea-text text-size" v-model='descriptCont'></textarea>
                    </div>
                </div>
                <!--删除图片-->
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style text-size">现场图片:</text>
                    </div>
                    <div class="repair-detail-col-8 repair-imgList">
                        <image @longpress="delPhoto(photo.id)" v-for="photo in photoes" class="uploadImg" :src="photo.localPath" v-if="!_isWeixin()"></image>
                        <image @click="delPhoto(photo.id)" v-for="photo in photoes" class="uploadImg" :src="photo.localPath" v-if="_isWeixin()"></image>
                        <image class="uploadImg" v-if="photoes.length<3" @click="camera" src="http://img.zmnbx.com//dist/Images/upload1.png"></image>
                    </div>
                </div>
                <!--分割虚线-->
                <div class="history"></div>
                <!--最新报修-->
                <div class="repair-detail">
                    <div class="repair-detail-col-4">
                        <text class="text-style repair-text-size">最近报修:</text>
                    </div>
                    <div class="repair-detail-col-8">
                        <div class="repair-records" v-for="item in records">
                            <!--<div class="repair-records" @click="showDetail(item.MainOrderId)" v-for="item in records">-->
                            <div class="col-6">
                                <text class="col-6-text">{{item.CreateTime}}</text>
                                <text class="col-6-text">{{item.ServiceCompanyName}}</text>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!_isWeixin()">
                    <div class="progress" v-if="progressShow">
                        <text style="color:white">{{progress}}</text>
                    </div>
                </div>
            </div>
        </scroller>
        <!--加载动画组件-->
        <goingOn :title="loadingTitle" v-if="showLoading"></goingOn>
        <!--底部按钮-->
        <div class="repair-footer wx-repair-footer" v-if="showRepairBtn">
            <text class="repair-submit text-size" @click="repair">报修</text>
        </div>
    </div>
</template>

<style>
    .repair-imgList {
        width: 450px;
        flex-wrap: wrap;
        flex-direction: row;
        display: flex;
        flex: 8;
        padding-left: 20px;
        position: relative;
    }
    
    .repair-records {
        border-style: solid;
        border-color: #ddd;
        border-width: 1px;
        /*justify-content: flex-start;*/
        margin-bottom: 20px;
        padding-left: 20px;
        padding-top: 10px;
        padding-right: 20px;
        width: 450px;
    }
    
    .col-6 {
        /*flex-direction: row;*/
        margin-bottom: 10px;
        flex-wrap: wrap;
    }
    
    .col-6-text {
        font-size: 26px;
        color: #bdbdbd;
    }
    
    .history {
        border-top-style: dashed;
        border-top-color: #bbb;
        border-top-width: 3px;
        width: 750px;
        margin-top: 40px;
    }
    
    .repair-container {
        width: 750px;
        position: relative;
    }
    /*报修工单详情样式*/
    
    .repair-detail {
        flex-direction: row;
        margin-top: 30px;
        width: 750px;
    }
    
    .repair-content {
        /*margin-top: 88px;*/
        margin-bottom: 100px;
    }
    
    .repair-detail-col-4 {
        flex: 4;
        /*text-align: right;*/
        display: flex;
        align-items: flex-end;
    }
    
    .repair-detail-col-8 {
        flex: 8;
        padding-left: 20px;
        position: relative;
    }
    
    select {
        flex: 8;
        border-width: 1px;
        border-color: #333;
        border-style: solid;
        padding-left: 20px;
    }
    
    .text-style {
        color: #bdbdbd;
        padding-right: 10px;
        text-align: right;
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    .text-size {
        font-size: 28px;
    }
    
    .repair-text-size {
        font-size: 26px;
    }
    
    .picture {
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }
    
    .uploadImg {
        height: 165px;
        width: 170px;
        margin-right: 20px;
        margin-bottom: 20px;
    }
    
    .progress {
        height: 100px;
        width: 100px;
        background-color: rgba(40, 40, 40, 0.7);
        border-radius: 50px;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 390px;
        left: 325px;
    }
    
    .repair-camera {
        width: 590px;
        margin-top: 30px;
        margin-left: 80px;
        flex-direction: row;
        margin-bottom: 120px;
        border-width: 1px;
        border-color: black;
        border-style: solid;
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    
    .textarea-text {
        height: 250px;
        width: 450px;
        border-width: 1px;
        border-color: #bdbdbd;
        border-style: solid;
    }
    
    .orderType,
    .orderLevel {
        /*height: 60px;*/
        width: 450px;
        border-style: solid;
        border-color: black;
        border-width: 1px;
        padding-left: 20px;
        line-height: 60px;
    }
    
    .repair-select-img {
        height: 30px;
        width: 30px;
        position: absolute;
        left: 429px;
        top: 15px;
    }
    /*底部按钮样式*/
    
    .repair-footer {
        height: 100px;
        width: 750px;
        background-color: #f8f8f8;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        /*position: absolute;
        bottom: 0;
        left: 0;*/
    }
    
    .repair-submit {
        height: 70px;
        width: 720px;
        text-align: center;
        color: white;
        font-size: 26px;
        line-height: 70px;
        background-color: #3879d9;
    }
    
    .repair-submit:active {
        background-color: #0092FC;
    }
</style>

<script>
    import { _getDeviceByQRCode, _getDeviceById, _getDeviceInfo, _getDeviceInfoByQRCode } from "../store/fecth.js"
    import config from 'config'
    var camera = weex.requireModule('CameraModule')
    var photoPick = weex.requireModule('PhotoPickModule')
    var fileModule = weex.requireModule('FileModule')
    const modal = weex.requireModule('modal')
    const animation = weex.requireModule('animation')
    const picker = weex.requireModule('picker')
    const storage = weex.requireModule('storage');
    const pickerItems = {
        type: [{ name: "需要维修", value: 1 },
        { name: "需要保养", value: 2 }],
        level: [{ name: "普通工单", value: 1 },
        { name: "加急工单", value: 2 }]
    }
    const serverAdd = [{ "Name": "暂无签约单位", "ServiceCompanyId": 0 }];
    export default {
        data: function () {
            return {
                records: [],
                headerTitle: "报修",
                item: {
                    Category: {}
                },
                value: '',
                typeSelectItem: pickerItems.type[0],
                levelSelectItem: pickerItems.level[0],
                titleShow: true,
                progressShow: false,
                progress: '',
                descriptCont: '',
                photoes: [],
                // loadingTitle: '报修中……',
                // isShow: false
                showLoading: false,
                loadingTitle: '提交中……',
                serverName: '',
                serverList: null,
                ServiceCompanyId: '',
                DeviceId: '',
                areaId: '',
                showRepairBtn: false,
                history: '',
                alterShow: true
            }
        },
        methods: {
            // 工单类型及级别选择
            workOrder(type) {
                var items = pickerItems[type]
                var index = 0;
                // 改变radio的颜色
                items.forEach((m, i) => {
                    if (type == "type" && m.value == this.typeSelectItem.value) {
                        index = i
                    }
                    if (type == "level" && m.value == this.levelSelectItem.value) {
                        index = i
                    }
                })
                // 单选框
                picker.pick({
                    index: index,
                    items: pickerItems[type].map(item => item.name)
                }, event => {
                    if (event.result === 'success') {
                        this[type + 'SelectItem'] = pickerItems[type][event.data]
                    }
                })
            },
            serverNameFun() {
                var self = this.serverList;
                picker.pick({
                    index: 0,
                    items: self.map(item => item.Name)
                }, event => {
                    if (event.result === 'success') {
                        this.ServiceCompanyId = self[event.data].ServiceCompanyId;
                        this.serverName = self[event.data].Name
                    }
                    // this.isShow = false;
                })
            },
            // 图片删除
            delPhoto(id) {
                this.photoes = this.photoes.filter(m => m.id != id)
            },
            // 报修事件  
            repair() {
                var self = this;
                if (self.alterShow) {
                    if (this.ServiceCompanyId != "0") {
                        this.showLoading = true;
                        this._post("/api/order/create", {
                            DeviceId: this.DeviceId,
                            Describe: this.descriptCont,
                            Level: this.levelSelectItem.value,
                            Type: this.typeSelectItem.value,
                            RepairImages: this.photoes.map(item => item.id).join(','),
                            ServiceCompanyId: this.ServiceCompanyId,
                            AreaId: this.areaId
                        }, res => {
                            this.showLoading = false;
                            if (res.error) {
                                modal.toast({
                                    message: res.error,
                                    duration: 0.2
                                })
                            } else {
                                self.pageTo('/workOrder');
                            }

                        })
                    } else {
                        modal.toast({
                            message: "请选择服务公司",
                            duration: 0.2
                        })
                    }
                } else {
                    modal.confirm({
                        message: "该设备正在维修,是否继续报修？",
                        okTitle: '确认',
                        cancelTitle: "取消"
                    }, res => {
                        if (res == "确认") {
                            if (this.ServiceCompanyId != "0") {
                                this.showLoading = true;
                                this._post("/api/order/create", {
                                    DeviceId: this.DeviceId,
                                    Describe: this.descriptCont,
                                    Level: this.levelSelectItem.value,
                                    Type: this.typeSelectItem.value,
                                    RepairImages: this.photoes.map(item => item.id).join(','),
                                    ServiceCompanyId: this.ServiceCompanyId,
                                    AreaId: this.areaId
                                }, res => {

                                    this.showLoading = false;
                                    if (res.error) {
                                        modal.toast({
                                            message: res.error,
                                            duration: 0.2
                                        })
                                    } else {
                                        self.pageTo('/workOrder');
                                    }

                                })
                            } else {
                                modal.toast({
                                    message: "请选择服务公司",
                                    duration: 0.2
                                })
                            }
                        }
                    })
                }
            },
            // 相机事件
            camera() {
                // if (this.photoes.length > 2) {
                //     modal.toast({
                //         message: "最多只能上传三张图片",
                //         duration: 0.2
                //     });
                //     return;
                // }
                camera.open(res => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        let photo = {
                            localPath: res.path
                        }
                        this.photoes.push(photo)
                        this.uploadImage(photo);
                        this.progressShow = true;
                    }
                })
            },
            // 图片上传
            uploadImage(photo) {
                // fileModule.upload(`${config.server}/api/upload/uploadimg`, photo.localPath, done => {
                // modal.toast({
                //     message: JSON.parse(done)[0].PictureId,
                //     duration: 0.4
                // })
                fileModule.upload(`${config.server}/api/upload/uploadimg?type=2`, photo.localPath, done => {
                    photo.id = JSON.parse(done)[0].PictureId
                }, res => {
                    if (res.progress == 1) {
                        this.progressShow = false;
                    }
                    this.progress = res.progress * 100 + "%";
                }, res => {
                    modal.toast({
                        message: JSON.stringify(res.error),
                        duration: 0.4
                    })
                })
            },
            init(res) {
                this.item = res.device;
                this.DeviceId = res.device.DeviceId;
                this.areaId = res.device.AreaId;
                this.alterShow = res.canRpearid;

                if (res.DeviceContractList.length > 0) {

                    this.serverList = res.DeviceContractList;
                    this.serverName = res.DeviceContractList[0].Name;
                    this.ServiceCompanyId = res.DeviceContractList[0].ServiceCompanyId;
                } else {
                    this.serverList = serverAdd;
                    this.serverName = serverAdd[0].Name;
                    this.ServiceCompanyId = serverAdd[0].ServiceCompanyId;
                }
            },
        },
        // 初始化

        created() {
            var self = this;
            let qrcode = this.$route.params['qrcode'];
            if (qrcode) {
                this._get("/api/device/GetRepairRecord", { qrCodeOrDeviceId: qrcode }, res => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        this.records = res
                    }
                })
                _getDeviceInfoByQRCode(qrcode).then((res) => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        self.showRepairBtn = true;
                        this.init(res);
                    }
                    // self.item = res.device;
                    // self.DeviceId = res.device.DeviceId;
                    // self.areaId = res.device.AreaId;
                    // if (res.DeviceContractList.length > 0) {
                    //     self.serverList = res.DeviceContractList;
                    //     self.serverName = res.DeviceContractList[0].Name;
                    //     self.ServiceCompanyId = res.DeviceContractList[0].ServiceCompanyId;
                    // } else {
                    //     self.serverList = serverAdd;
                    //     self.serverName = serverAdd[0].Name;
                    //     self.ServiceCompanyId = serverAdd[0].ServiceCompanyId;
                    // }
                }).catch((res) => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.4
                        })
                    }
                })
            } else {
                var self = this;
                this.showRepairBtn = true;
                let deviceId = this.$route.params.id;
                this._get("/api/device/GetRepairRecord", { qrCodeOrDeviceId: deviceId + '' }, res => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        console.log(res)
                        this.records = res
                    }
                })

                _getDeviceInfo(deviceId).then((res) => {
                    console.log(res);
                    this.init(res);
                    // self.item = res.device;
                    // self.DeviceId = res.device.DeviceId;
                    // self.areaId = res.device.AreaId;
                    // if (res.DeviceContractList.length > 0) {
                    //     self.serverList = res.DeviceContractList;
                    //     self.serverName = res.DeviceContractList[0].Name;
                    //     self.ServiceCompanyId = res.DeviceContractList[0].ServiceCompanyId;
                    // } else {
                    //     self.serverList = serverAdd;
                    //     self.serverName = serverAdd[0].Name;
                    //     self.ServiceCompanyId = serverAdd[0].ServiceCompanyId;
                    // }

                }).catch((res) => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.4
                        })
                    }
                })
            }
        }
    }

</script>