<template>
    <div class="equipment-container">
        <!--<AppHeader :title="headerTitle" back="/device" v-if="!_isWeixin()"></AppHeader>-->
        <scroller>
            <div class="equipment-content wx-equipment-content">
                <div class="equipment-row">
                    <text class="equipment-title">所属公司：</text>
                    <div class="equipment-text">
                        <text class="select-text">{{useCompany}}</text>
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">设备名称：</text>
                    <div class="equipment-text">
                        <input class="equipment-txt" type="text" placeholder="请输入设备名称" v-model="equipmentName" />
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">二维码：</text>
                    <div class="equipment-text">
                        <input class="equipment-txt" type="text" placeholder="请输入二维码" v-model="qrCode" />
                        <!--新添加内容,扫码-->
                        <div class="select-box" @click="scan">
                            <image class="scan-code" src="http://img.zmnbx.com//dist/Images/scan.png"></image>
                        </div>
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">资产编号：</text>
                    <div class="equipment-text">
                        <input class="equipment-txt" type="text" placeholder="请输入资产代码" v-model="assetsId" />
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">型号：</text>
                    <div class="equipment-text">
                        <input class="equipment-txt" type="text" placeholder="请输入设备型号" v-model='equipmentModel' />
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">厂家：</text>
                    <div class="equipment-text">
                        <input type="text" class="equipment-txt" placeholder="请添加或者选择厂家" v-model="factory" />
                        <div class="select-box" @click="selectItem('factoryArray')">
                            <image class="select-btn" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                        </div>
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">品牌：</text>
                    <div class="equipment-text">
                        <input type="text" class="equipment-txt" placeholder="请添加或者选择品牌" v-model="brand" />
                        <div class="select-box" @click="selectBrand">
                            <image class="select-btn" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                        </div>
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">区域：</text>
                    <div class="equipment-text">
                        <input type="text" class="equipment-txt" placeholder="请添加或者选择区域" v-model="area" />
                        <div class="select-box" @click="selectItem('areaArray')">
                            <image class="select-btn" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                        </div>
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">类目：</text>
                    <div class="equipment-text">
                        <input type="text" class="equipment-txt" placeholder="请添加或者选择类目" v-model="category" />
                        <div class="select-box" @click="selectItem('categoryArray')">
                            <image class="select-btn" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                        </div>
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">安装地址：</text>
                    <div class="equipment-text">
                        <input class="equipment-txt" type="text" placeholder="请输入设备安装地址" v-model="position" />
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">采购时间：</text>
                    <div class="equipment-text" @click="pickDate('Procurement')">
                        <text class="select-text">{{procurementTime}}</text>
                        <image class="select-btn" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">质保时间：</text>
                    <div class="equipment-text" @click="pickDate('Warranty')">
                        <text class="select-text">{{warrantyTime}}</text>
                        <image class="select-btn" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">服务公司：</text>
                    <div class="equipment-checkbox">
                        <div class="select-checkbox" v-for="item in serviceCompany">
                            <switch class="checkbox-btn" :checked="item.Checked" @change="onchange(item)"></switch>
                            <text class="checkbox-text">{{item.Name}}</text>
                        </div>
                    </div>
                </div>
                <div class="equipment-row">
                    <text class="equipment-title">信息备注：</text>
                    <div class="equipment-text">
                        <input class="equipment-txt" type="text" v-model="note" />
                    </div>
                </div>
            </div>
        </scroller>
        <!--动画加载功能-->
        <goingOn :title="loadingTitle" v-if="loadingShow"></goingOn>
        <div class="equipment-bottom" v-if="addEquipmentShow">
            <button class="equipment-footer" @click="equipmentSubmit" :disabled="onlyOne">
                <text class="equipment-sub">提交</text>    
            </button>
        </div>
    </div>
</template>

<style>
    .equipment-container {
        width: 750px;
    }
    
    .equipment-content {
        padding: 15px;
        /*margin-top: 88px;*/
        margin-bottom: 100px;
    }
    
    .equipment-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .equipment-title {
        width: 180px;
        text-align: right;
        padding-right: 15px;
        font-size: 30px;
        color: #bdbdbd;
    }
    
    .equipment-text {
        padding-left: 15px;
        width: 520px;
        height: 70px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(162, 162, 162);
        position: relative;
        flex-direction: row;
        align-items: center;
    }
    
    .equipment-checkbox {
        padding-left: 5px;
        padding-bottom: 15px;
        padding-top: 15px;
        padding-right: 10px;
        width: 520px;
        height: auto;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(162, 162, 162);
    }
    
    .checkbox-btn {
        width: 100px;
        font-size: 29px;
    }
    
    .checkbox-text {
        width: 400px;
        padding-left: 5px;
        font-size: 29px;
    }
    
    .select-checkbox {
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        padding-bottom: 5px;
        padding-top: 5px;
    }
    
    .equipment-txt {
        margin-top: 1px;
        height: 66px;
        border: none;
        width: 400px;
        background-color: transparent;
        font-size: 28px;
        margin-right: 10px;
    }
    
    .select-text {
        height: 66px;
        width: 400px;
        line-height: 66px;
        font-size: 29px;
    }
    
    .select-box {
        height: 70px;
        width: 90px;
        position: relative;
    }
    
    .select-btn {
        height: 30px;
        width: 30px;
        position: absolute;
        right: 30px;
        top: 20px;
    }
    /*新添加扫码样式*/
    
    .scan-code {
        position: absolute;
        right: 15px;
        top: 5px;
        height: 60px;
        width: 60px;
    }
    
    .equipment-bottom {
        height: 100px;
        width: 750px;
        justify-content: center;
        align-items: center;
        background-color: #f8f8f8;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    
    .equipment-footer {
        height: 70px;
        width: 720px;
        text-align: center;
        color: white;
        line-height: 70px;
        background-color: #3879d9;
        justify-content: center;
        align-items: center;
    }
    
    .equipment-sub {
        color: white;
        font-size: 26px;
        text-align: center;
    }
    
    .equipment-footer:disabled {
        opacity: 0.6;
    }
</style>


<script>
    // import detail from '../components/detail.vue';
    import C from '../store/constants'
    import { _getDeviceById } from '../store/fecth.js'
    const picker = weex.requireModule('picker')
    const modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage');
    const qrCodeModule = weex.requireModule('QRCodeModule')
    export default {
        data() {
            return {
                headerTitle: '添加设备',
                procurementTime: '请选择采购时间',
                warrantyTime: '请选择质保时间',
                factory: '',
                brand: '',
                area: '',
                category: '',
                useCompany: '',
                menu: {
                    factoryArray: null,
                    areaArray: [],
                    categoryArray: null,
                },
                brandArray: [],
                serviceCompany: null,
                useCompanyId: '',
                assetsId: '',
                qrCode: '',
                equipmentName: '',
                equipmentModel: '',
                position: '',
                note: '',
                serviceCompanyId: [],
                onlyOne: false,
                loadingTitle: '提交中……',
                loadingShow: false,
                addEquipmentShow: false,
                id: 0
            }
        },
        filters: {
            none(val) {
                return val || '暂无'
            }
        },
        methods: {
            // 扫码事件
            scan() {
                qrCodeModule.showQRCode((result) => {
                    result = result.substr(result.lastIndexOf('/') + 1);
                    this.qrCode = result
                })
            },
            // 时期选择
            pickDate(type) {
                picker.pickDate({
                    max: '2087-01-01',
                    min: '1900-01-01',
                    value: type == 'Procurement' ? this.procurementTime : this.warrantyTime
                }, event => {
                    if (event.result == 'success') {
                        if (type == 'Procurement') {
                            this.procurementTime = event.data;
                        } else {
                            this.warrantyTime = event.data;
                        }

                    }
                })
            },
            // 选择事件
            selectItem(type) {
                var self = this;
                picker.pick({
                    index: 0,
                    items: this.menu[type].map(item => item.Name)
                }, event => {
                    if (event.result === 'success') {
                        if (type == 'factoryArray') {
                            self.factoryId = self.menu.factoryArray[event.data].ManufacturerId;
                            self.factory = self.menu.factoryArray[event.data].Name;
                            self._get('/api/device/GetBrandWithManufacturer', { ManufacturerId: self.factoryId }, res => {
                                if (res.Brand.length == 0) {
                                    self.brandArray.push({ Name: '暂无' });
                                } else {
                                    self.brandArray = res.Brand
                                }
                                // 默认选择第一个
                                self.brand = self.brandArray[0].Name;
                            })
                        } else if (type == 'areaArray') {
                            self.area = self.menu.areaArray[event.data].Name;
                        } else if (type == 'categoryArray') {
                            self.category = self.menu.categoryArray[event.data].Name;
                        } else {
                            return;
                        }
                    }
                })
            },
            // 品牌选择事件
            selectBrand() {
                var self = this;
                if (!self.factory) {
                    modal.toast({
                        message: '请先选择厂家',
                        duration: 0.2
                    })
                    return;
                } else {
                    picker.pick({
                        index: 0,
                        items: self.brandArray.map(item => item.Name)
                    }, event => {
                        if (event.result == 'success') {
                            self.brand = self.brandArray[event.data].Name;
                        }
                    })
                }
            },
            // 服务公司是否选择事件
            onchange(item) {
                var self = this;
                if (item.Checked) {
                    item.Checked = false;
                } else {
                    item.Checked = true;
                }
            },
            // 提交按钮事件
            equipmentSubmit() {
                var self = this;

                if (!self.equipmentName) {
                    modal.toast({
                        message: '请输入设备名称(必填项)',
                        duration: 0.2
                    })
                    return;
                } else {
                    self.onlyOne = true;
                    self.loadingShow = true;
                    if (self.procurementTime == '请选择采购时间') {
                        self.procurementTime = '';
                    }
                    if (self.warrantyTime == '请选择质保时间') {
                        self.warrantyTime = ''
                    }
                    for (let i = 0; i < self.serviceCompany.length; i++) {
                        if (self.serviceCompany[i].Checked) {
                            self.serviceCompanyId.push(self.serviceCompany[i].ServiceCompanyId);
                        }
                    }
                    this._post('/api/device/SaveDeviceInfo',
                        {
                            DeviceId: self.id,
                            AssetsId: self.assetsId,
                            QRCode: self.qrCode ? self.qrCode : '',
                            Name: self.equipmentName,
                            Model: self.equipmentModel,
                            ManufacturerName: self.factory,
                            BrandName: self.brand == '暂无' ? '' : self.brand,
                            AreaName: self.area == '暂无' ? '' : self.area,
                            CategoryName: self.category,
                            UseCompanyId: self.useCompanyId,
                            Position: self.position,
                            BuyTime: self.procurementTime,
                            WarrantyTime: self.warrantyTime,
                            Note: self.note,
                            ServiceCompanyId: self.serviceCompanyId
                        }, res => {
                            console.log(self.factory)
                            if (res.error) {
                                modal.toast({
                                    message: res.error,
                                    duration: 0.1,
                                })
                            } else {
                                modal.toast({
                                    message: res.success,
                                    duration: 0.1
                                })
                                // this.pageTo('/device');
                                self.$events.emit(C.event.DETAIL_BACK)
                                // storage.setItem('deviceItem', JSON.stringify([]), event => { });
                            }
                            self.onlyOne = false;
                            self.loadingShow = false;
                        })
                }
            }
        },
        // 初始化
        created() {
            var self = this;
            this._get('/api/device/GetDeviceSelectInfo', {}, res => {
                self.menu.factoryArray = res.Manufacturer;
                console.log(res);
                // self.menu.areaArray = res.Area.length==0?self.menu.areaArray.push({ Name: '暂无' ,AreaId:'0'}):res.Area;
                self.menu.categoryArray = res.Category;
                self.useCompany = res.UseCompany[0].Name;
                self.useCompanyId = res.UseCompany[0].UseCompanyId;
                self.serviceCompany = res.ServiceCompany;
                if (res.Area.length == 0) {
                    self.menu.areaArray.push({ Name: '暂无' });
                } else {
                    self.menu.areaArray = res.Area
                }
            });

            let id = this.$route.params.id;
            this.id = id;
            if (this.id != 0) {
                _getDeviceById(id).then((res) => {
                    console.log(res);
                    console.log(res.QRCode + 'qrcode')
                    console.log(res.ManufacturerName)
                    self.equipmentName = res.Name || "暂无";
                    self.qrCode = res.QRCode;
                    self.position = res.Position || "暂无";
                    self.assetsId = res.AssetsId || "暂无";
                    self.equipmentModel = res.Model || "暂无";
                    self.factory = res.ManufacturerName || "暂无";
                    self.brand = res.brand || "暂无";
                    self.area = res.area || "暂无";
                    self.category = res.category || "暂无";
                    self.procurementTime = res.BuyTime || "请选择采购时间";
                    self.warrantyTime = res.WarrantyTime || "请选择质保时间";
                    self.note = res.Note || '暂无'
                }).catch((res) => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    }
                });
            }

            storage.getItem('userType', event => {
                if (event.data & 8) {
                    this.addEquipmentShow = true;
                    if (this.id == "0") {
                        this.headerTitle = "添加设备"
                    } else {
                        this.headerTitle = "编辑设备"
                    }
                } else {
                    this.addEquipmentShow = false;
                    this.headerTitle = "设备详情"
                }
            })
        }
    }

</script>