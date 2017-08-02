<template>
    <div class="container wx-container">
        <!--<AppHeader :title="headerTitle" back="/my" v-if="!_isWeixin()"></AppHeader>-->
        <list>
            <cell class="person-list" v-for="item in personLists" @click="itemClick(item)">
                <div class="list-left">
                    <div class="row">
                        <div class="col-8">
                            <text class="text-name">{{item.NickName||'暂无'}}</text>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <text class="text-info">手机号码:{{item.Phone||'暂无'}}</text>
                        </div>
                        <div class="list-left-col-4">
                            <text class="text-info">性别:{{item.Sex||'暂无'}}</text>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <text class="text-info">邮箱:{{item.Email||'暂无'}}</text>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <text class="text-info">所属区域:{{item.AreaName||'暂无'}}</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <div class="no-person wx-no-person" v-if="noPerson">
            <text>暂无人员数据</text>
        </div>
        <div class="span" v-if="areaShow" >
            <div class="arearContent">
                <div class="arearContent-hidden" @click="noneclick" v-if="areaShow">
                    <div class="arearControl-name">
                        <text class="hidden-text">{{selectPerson}}</text>
                    </div>
                    <div class="arear-choose">
                        <div class="arear-choose-orderGoing workOrder-hidden-sizes" v-for="item in areas" :style="{'background-color':colors[item.isSelect?1:0]}"
                            @click="selectArea(item)">
                            <text class="hidden-text">{{item.name}}</text>
                        </div>
                        <div class="workOrder-btn-content" @click="submit">
                            <text class="workOrder-submit">提交</text>
                        </div>
                    </div>
                </div>
                <image @click="hide" class="workOrder-delete" src="http://img.zmnbx.com//dist/Images/delete.png"></image>
            </div>
        </div>
        <goingOn :title="loadingTitle" v-if="showloading"></goingOn>
    </div>
</template>

<style>
    .container {
        width: 750px;
        /*padding-top: 88px;*/
    }
    
    .span {
        width: 750px;
        height: 1334px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(40, 40, 40, 0.6);
        justify-content: center;
        align-items: center;
    }
    
    .person-list {
        padding: 15px;
        border-bottom-color: #ddd;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        flex-direction: row;
        width: 750px;
        /*margin-top:88px;*/
    }
    
    .list-left {
        flex: 10;
    }
    
    .list-align {
        align-items: center;
    }
    
    .row {
        flex-direction: row;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    
    .col-8 {
        flex: 8;
    }
    
    .list-left-col-4 {
        flex: 4;
    }
    
    .text-name {
        font-size: 28px;
    }
    
    .text-info {
        color: #aaa;
        font-size: 22px;
    }
    
    .no-person {
        position: absolute;
        top: 0;
        left: 0;
        height: 100px;
        width: 750px;
        justify-content: center;
        align-items: center;
    }
    
    .workOrder-hidden {
        width: 710px;
        overflow: auto;
        padding-top: 41px;
        background-color: white;
    }
    
    .workOrder-hidden {
        width: 710px;
        overflow: auto;
        padding-top: 41px;
        background-color: white;
    }
    
    .arearContent {
        position: relative;
        padding-top: 20px;
        width: 730px;
        height: auto;
        justify-content: center;
        align-items: center;
        background-color:white;
    }
    
    .arear-choose {
        width: 710px;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        padding-top: 41px;
        padding-left: 12px;
    }
    
    .arearControl-name {
        justify-content: center;
        align-items: center;
        width: 710px;
        text-align: center;
    }
    
    .workOrder-hidden-sizes {
        width: 212px;
        height: 68px;
        border-style: solid;
        border-width: 3px;
        border-color: #ddd;
        background-color: white;
        margin-right: 20px;
        margin-bottom: 41px;
        justify-content: center;
        align-items: center;
    }
    
    .workOrder-delete {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 0px;
        right: 0px;
    }
    
    .hidden-text {
        font-size: 30px;
        color: #555;
    }
    
    .workOrder-btn-content {
        margin-top: 40px;
        margin-bottom: 50px;
        width: 690px;
        height: 80px;
        background-color: #0092FC;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }
    
    .workOrder-submit {
        font-size: 30px;
        color: white;
    }
</style>

<script>
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');
    export default {
        data() {
            return {
                headerTitle: '用户区域设置',
                personLists: [],
                areaShow: false,
                areas: [],
                noPerson: false,
                colors: ["#ffffff", "#92d14f"],
                selectUserId: '',
                selectPerson: '',
                showloading: false,
                loadingTitle: "加载中……"

            }
        },
        methods: {
            noneclick() { },
            selectArea(item) {
                item.isSelect = !item.isSelect;
            },
            itemClick(obj) {
                console.log(obj)
                this.selectUserId = obj.UserId;
                this.areaShow = true;
                var self = this.areas.map(function (item) {
                    item.isSelect = false;
                    return item;
                });

                if (obj.AreaName) {
                    var arrArea = obj.AreaId.split(',');
                    if (arrArea.length > 0) {
                        for (var i = 0; i < arrArea.length - 1; i++) {
                            self[arrArea[i] - 1].isSelect = true;
                        }
                    }
                }

                this.selectPerson = obj.NickName;
            },
            hide() {
                this.areaShow = false;
            },
            getPersonInfo() {
                var self = this;
                //人员列表
                this._get("/api/company/getcompanypersonlist", {
                    appType: 1
                }, function (res) {
                    if (res.length > 0) {
                        self.personLists = res.filter(function (item) {
                            if (item.AreaName) {
                                var arrArea = item.AreaName.split(',');
                                if (arrArea.length > 0) {
                                    //点击展开的时候用
                                    item.AreaId = item.AreaName;
                                    item.AreaName = '';
                                    for (var i = 0; i < arrArea.length - 1; i++) {
                                        self.areas.forEach(function (itemarea) {
                                            if (itemarea.id == arrArea[i] && arrArea[i]) {
                                                item.AreaName += itemarea.name + ','
                                            }
                                        });
                                    }
                                }
                            }
                            return true;
                        });
                    } else {
                        self.noPerson = true;
                    }
                    self.showloading = false;
                });
            },
            submit() {
                var self = this;
                var areaName = '';
                this.areas.forEach(function (item) {
                    if (item.isSelect) {
                        areaName += item.id + ','
                    }
                });
                if (areaName) {
                    this._post("/api/company/setcompanypersonarea", {
                        userId: self.selectUserId + '',
                        areas: areaName
                    }, function (res) {
                        if (res.error) {
                            modal.toast({
                                message: res.error,
                                duration: 0.2
                            })
                        } else {
                            modal.toast({
                                message: '用户区域添加成功',
                                duration: 0.2
                            });
                            self.areaShow = false;
                            self.getPersonInfo();
                        }
                    });
                } else {
                    modal.toast({
                        message: "请选择区域",
                        duration: 0.2
                    })
                }
            }
        },
        created() {
            this.showloading = true;
            //区域列表
            var self = this;
            this._get("/api/device/initdata", {}, function (res) {
                console.log(res)
                self.areas = res.area.filter(function (item) {
                    item.isSelect = false;
                    return true;
                });
                self.getPersonInfo();
            });

        }
    };

</script>