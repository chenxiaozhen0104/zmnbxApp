<template>
    <div>
        <!--<AppHeader :title="headerTitle" back="/my" v-if="!_isWeixin()"></AppHeader>-->
        <div class="basic-photo wx-basic-photo basic-border">
            <text class="basic-text">头像</text>
            <image class="basic-photo-img basic-right" src="http://img.zmnbx.com//dist/Images/photo.png"></image>
        </div>
        <div class="basic-username basic-border">
            <text class="basic-text">用户名</text>
            <text class="basic-right">{{item.name}}</text>
        </div>
        <div class="basic-sex basic-border">
            <text class="basic-text">性别</text>
            <text class="basic-right">{{item.sex || "暂无"}}</text>
        </div>
        <div class="basic-mobile basic-border">
            <text class="basic-text">手机号</text>
            <text class="basic-right">{{item.phone}}</text>
        </div>
        <div class="basic-email basic-border">
            <text class="basic-text">邮箱</text>
            <text class="basic-right">{{item.email || "暂无"}}</text>
        </div>
        <div class="basic-company">
            <text class="basic-text">公司</text>
            <div class="basic-right">
                <div class="basic-company-text">
                    <text class="basic-text">{{item.useCompany}}</text>
                    <text class="checkState">{{&nbsp;&nbsp;checkState}}</text>
                </div>
            </div>
        </div>
        <div class="version">
            <text class="version-text">{{"版本:&nbsp;&nbsp;v-"+appVersion}}</text>
        </div>
    </div>
</template>
<style>
    .basic-border,
    .basic-company {
        width: 750px;
        height: 90px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 63px;
        padding-right: 63px;
    }
    
    .basic-border {
        border-bottom-style: solid;
        border-bottom-color: #ddd;
        border-bottom-width: 2px;
    }
    
    .basic-text {
        font-size: 30px;
        color: #333;
    }
    /*.basic-photo{
        margin-top:88px;
    }*/
    
    .basic-photo-img {
        width: 50px;
        height: 50px;
    }
    
    .basic-right {
        font-size: 30px;
        color: #333;
    }
    
    .version {
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 750px;
        justify-content: center;
        align-items: center;
    }
    
    .version-text {
        color: #aaa;
        font-size: 30px;
    }
    .basic-company-text {
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }
    .checkState {
        color: orange;
        font-size: 26px;
        text-align: right;
        margin-top: 10px;
    }
</style>
<script>
    import { _getUser } from "../store/fecth.js"
    var modal = weex.requireModule('modal')
    export default {
        data: function () {
            return {
                item: {},
                // headerTitle: '个人信息',
                // 判断是否是APP，是就返回版本号，不是就返回固定版本
                appVersion: weex.config.env ? weex.config.env.appVersion : '0.1.0',
                checkState: '',
                useCompany:''
            }
        },
        created() {
            var self = this;
            _getUser().then((res) => {
                console.log(res)
                self.item = res
                if (res.status == "Normal") {
                    self.checkState = ''
                } else if (res.status == "NotActive") {
                    self.checkState = '审核中'
                } else {
                    self.checkState = '审核不通过'
                }
            }).catch((res) => {
                if (res.error) {
                    modal.toast({
                        message: res.error,
                        duration: 0.2
                    })
                }
            })
        }
    }

</script>