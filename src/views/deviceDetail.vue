<template>
    <div class="detail-container wx-detail-container">
        <!--设备信息-->
        <scroller>
            <div class="detail-content wx-detail-content">
                <div class="detail-list">
                    <div class="detail-list-col-4">
                        <text class="text-style text-size">设备名称:</text>
                    </div>
                    <div class="col-8">
                        <text class="text-size">{{item.Name}}</text>
                    </div>
                </div>
                <div class="detail-list">
                    <div class="detail-list-col-4">
                        <text class="text-style text-size">类目:</text>
                    </div>
                    <div class="col-8">
                        <text class="text-size">{{item.Category?item.Category.Name:'暂无'}}</text>
                    </div>
                </div>
                <div class="detail-list">
                    <div class="detail-list-col-4">
                        <text class="text-style text-size">型号:</text>
                    </div>
                    <div class="col-8">
                        <text class="text-size">{{item.Model||"暂无"}}</text>
                    </div>
                </div>
                <div class="detail-list">
                    <div class="detail-list-col-4">
                        <text class="text-style text-size">区域:</text>
                    </div>
                    <div class="col-8">
                        <text class="text-size">{{item.Area?item.Area.Name:'暂无'}}</text>
                    </div>
                </div>
                <div class="detail-list">
                    <div class="detail-list-col-4">
                        <text class="text-style text-size">二维码:</text>
                    </div>
                    <div class="col-8">
                        <div class="detail-code">
                            <input class="code-txt" type="text" v-model="item.QRCode" />
                            <image class="scan-code" @click='scan' src="http://img.zmnbx.com//dist/Images/scan.png"></image>
                        </div>
                    </div>
                </div>
                <div class="detail-list">
                    <div class="detail-list-col-4">
                        <text class="text-style text-size">安转地点:</text>
                    </div>
                    <div class="col-8">
                        <div><input type="text" class="address-txt" v-model="item.Position" /></div>
                    </div>
                </div>
                <div class="detail-list" v-if="editorShow">
                    <div class="detail-list-col-4">
                        <text class="text-style text-size">服务公司:</text>
                    </div>
                    <div class="col-8">
                        <div class="select-company">
                            <scroller>
                                <div class="select-checkbox" v-for="item in serviceCompany">
                                    <switch class="checkbox-btn" :checked="item.Checked" @change="onchange(item)"></switch>
                                    <text class="checkbox-text">{{item.Name}}</text>
                                </div>
                            </scroller>
                        </div>
                    </div>
                </div>
            </div>
        </scroller>
        <div class="detail-footer" v-if="editorShow">
            <text class="textStyle" @click='save'>保存</text>
        </div>
        <AppHeader :title="headerTitle" back="device" v-if="!_isWeixin()"></AppHeader>
    </div>
</template>

<style>
    .detail-container {
        width: 750px;
    }
    /*设备信息样式*/
    
    .detail-list {
        flex-direction: row;
        margin-top: 40px;
        justify-content: center;
    }
    
    .detail-content {
        margin-top: 88px;
    }
    
    .detail-list-col-4 {
        flex: 4;
        text-align: right;
    }
    
    .col-8 {
        flex: 8;
        padding-left: 20px;
        display: flex;
    }
    
    .text-style {
        color: #bdbdbd;
        padding-right: 10px;
        text-align: right;
    }
    
    .text-size {
        font-size: 26px;
    }
    
    .detail-code {
        flex-direction: row;
        position: relative;
    }
    
    .scan-code {
        margin-left: 30px;
        height: 60px;
        width: 60px;
    }
    
    .select-company {
        height: 230px;
        width: 470px;
        border-width: 1px;
        border-style: solid;
        border-color: #ddd;
        padding: 10px;
    }
    
    .checkbox-btn {
        width: 100px;
    }
    
    .checkbox-text {
        width: 370px;
        padding-left: 5px;
        font-size: 26px;
    }
    
    .select-checkbox {
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        padding-bottom: 5px;
        padding-top: 5px;
    }
    
    .code-txt,
    .address-txt {
        height: 60px;
        width: 340px;
        border-color: #ddd;
        border-width: 1px;
        border-style: solid;
        font-size: 26px;
    }
    /*底部按钮样式*/
    /*保存和报修样式*/
    /*.detail-footer {
        flex-direction: row;
        justify-content: center;
        margin-top: 100px;
    }
    .btnCommonStyle {
        height: 80px;
        width: 250px;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
    }
    
    .btn-save {
        margin-right: 30px;
        background-color: #f0ad4e;
    }
    
    .btn-href {
        margin-left: 30px;
        background-color: #d9534f;
    }
    .textStyle {
        color: white;
        font-size: 30px;
    }*/
    /*只有保存样式*/
    
    .detail-footer {
        height: 100px;
        width: 750px;
        justify-content: center;
        align-items: center;
        background-color: #f8f8f8;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    
    .textStyle {
        height: 70px;
        width: 720px;
        text-align: center;
        color: white;
        font-size: 26px;
        line-height: 70px;
        background-color: #3879d9;
    }
</style>


<script>
    import { _getDeviceById, _getDeviceInfo, _setDeviceServerCompany } from '../store/fecth.js'
    var modal = weex.requireModule('modal')
    const qrCodeModule = weex.requireModule('QRCodeModule')
    const storage = weex.requireModule('storage')
    export default {
        data() {
            return {
                headerTitle: '',
                item: {
                    Category: {},
                    Area: {}
                },
                serviceCompany: [],
                serviceCompanyId: [],
                editorShow: false
            }
        },
        methods: {
            // 扫码事件
            scan() {
                qrCodeModule.showQRCode((result) => {
                    result = result.substr(result.lastIndexOf('/') + 1);
                    this.item.QRCode = result
                })
            },
            // 保存按钮
            save() {
                var self = this;
                self.serviceCompanyId = [];
                for (let i = 0; i < this.serviceCompany.length; i++) {
                    if (this.serviceCompany[i].Checked) {
                        self.serviceCompanyId.push(this.serviceCompany[i].ServiceCompanyId);
                    }
                }
                this._post('/api/device/SetQRCodeWithServerCompany', {
                    DeviceId: self.item.DeviceId,
                    QRCode: self.item.QRCode,
                    Position: self.item.Position,
                    ServiceCompanyId: self.serviceCompanyId
                }, (res) => {
                    if (res.status == "0") {
                        modal.toast({
                            message: "保存成功",
                            duration: 0.2
                        })
                    } else {
                        modal.toast({
                            message: res.error,
                            duration: 0.4
                        })
                    }
                })
                // _setDeviceServerCompany(this.item.DeviceId, this.item.QRCode, this.item.Position, this.serviceCompanyId).then((res) => {
                //     console.log(res);
                //     modal.toast({
                //         message: "保存成功",
                //         duration: 0.2
                //     })
                // }).catch((res) => {
                //     if (res.error) {
                //         modal.toast({
                //             message: res.error,
                //             duration: 0.2
                //         })
                //     }
                // })
            },
            onchange(item) {
                if (item.Checked) {
                    item.Checked = false;
                } else {
                    item.Checked = true;
                }
            }
        },
        // 初始化
        created() {
            let id = this.$route.params.id;
            _getDeviceInfo(id).then((res) => {
                this.item = res.device;
                this.headerTitle = res.device.Name;
                var self = this;
                res.JoinCompanyList.forEach(function (item) {
                    self.serviceCompany.push({
                        Checked: false,
                        Name: item.Name,
                        ServiceCompanyId: item.ServiceCompanyId
                    });
                    return true;
                });
            }).catch((res) => {
                if (res.error) {
                    modal.toast({
                        message: res.error,
                        duration: 0.2
                    })
                }
            });
            storage.getItem('userType', event => {
                if (event.data & 8) {
                    this.editorShow = true;
                } else {
                    this.editorShow = false;
                }
            })
        }
    }

</script>