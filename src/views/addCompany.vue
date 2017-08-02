<template>
    <div class="device-container">
        <!--头部-->
        <div class="device-head wx-device-head">
            <div class="device-search wx-device-search">
                <div class="search-bg wx-search-bg">
                    <image class="img-search" src="http://img.zmnbx.com//dist/Images/search1.png"></image>
                    <input class="search-input wx-search-input" type="text" placeholder="请输入公司名称" v-model="Name" @input="onSearch()" />
                </div>
            </div>
            <image class="returnBack" src="http://img.zmnbx.com//dist/Images/return1.png" @click="pageTo('/companyType')"></image>
        </div>
        <list v-if="itemsShow">
            <cell class="device-list wx-device-list" v-for="item in items">
                <div class="list-left" @click="itemClick(item)">
                    <div class="row">
                        <div class="col-8">
                            <text class="text-name">{{item.Name||'暂无'}}</text>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <text class="text-info">联系人：{{item.Contact||'暂无'}}</text>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <text class="text-info">地址：{{item.Position||'暂无'}}</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <list v-else>
            <cell class="device-list">
                <a class="list-left">
                    <div class="list-left-col-4 list-align">
                        <text class="text-info">暂无结果</text>
                    </div>
                </a>
            </cell>
        </list>
        <!--动画加载功能-->
        <goingOn :title="loadingTitle" v-if="loadingShow"></goingOn>
    </div>
</template>

<style>
    /*头部搜索样式*/
    
    .device-search {
        height: 100px;
        background-color: #0092fc;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    
    .returnBack {
        height: 40px;
        width: 40px;
        position: absolute;
        left: 20px;
        top: 30px;
    }
    
    .search-bg {
        height: 80px;
        width: 550px;
        background-color: rgba(46, 140, 212, 0.8);
        padding-left: 40px;
        border-radius: 80px;
        position: relative;
    }
    
    .img-search {
        position: absolute;
        top: 23px;
        left: 20px;
        height: 40px;
        width: 40px;
    }
    
    .search-input {
        height: 80px;
        width: 510px;
        margin-left: 40px;
        border: 0;
        background-color: transparent;
        placeholder-color: #FFFFFF;
        color: #FFFFFF;
    }
    /*公司列表样式*/
    
    .device-list {
        padding: 15px;
        background-color: #FFFFFF;
        border-bottom-color: #ddd;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        flex-direction: row;
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
</style>

<script>
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');
    const storage = weex.requireModule('storage')
    export default {
        data() {
            return {
                items: [],
                Name: '',
                itemsShow: true,
                loadingShow: false,
                loadingTitle: "加载中……"
            }
        },
        methods: {
            //点击事件
            itemClick(obj) {
                var self = this;
                modal.confirm({
                    message: '确定加入' + obj.Name + '?',
                    okTitle: '确定',
                    cancelTitle: '取消'
                }, function (resultTitle) {
                    if (resultTitle == "确定") {
                        self._post('/api/company/addcompany', {
                            appType: 1,
                            id: obj.Id
                        }, (res) => {
                            console.log(res);
                            if (res.error) {
                                modal.alert({
                                    message: res.error,
                                    duration: 0.3
                                }, function (result) { });
                            } else {
                                modal.toast({
                                    message: '加入成功',
                                    duration: 0.2
                                })
                                storage.setItem('useCompany', obj.Name, event => { });
                                self.pageTo('/homepage');
                            }
                        }, () => {
                            modal.toast({
                                message: '服务器内部错误',
                                duration: 0.2
                            });

                        });

                    }
                });

            },
            //查询事件
            onSearch() {

                if (this.Name) {
                    this.loadingShow = true;
                    this._post('/api/company/getallcompanyinfo', {
                        appType: 1,
                        name: this.Name
                    }, (res) => {
                        this.loadingShow = false;
                        if (res.length > 0) {
                            this.itemsShow = true;
                            this.items = res;
                        } else {
                            this.itemsShow = false;
                        }
                    });
                }
            }
        },
        created() {

        }

    }

</script>