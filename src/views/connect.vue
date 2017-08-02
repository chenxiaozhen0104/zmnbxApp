<template>
    <div>
        <!--<AppHeader :title="headerTitle"  v-if="!_isWeixin()" back="/my"></AppHeader>-->
            <div class="connect-form connect-top wx-connect-top">
                <image class="connect-img" src="http://img.zmnbx.com//dist/Images/company.png"></image>
                <text class="connect-text">杭州绿中游智能科技有限公司</text>
            </div>
            <div class="connect-form">
                <image class="connect-img" src="http://img.zmnbx.com//dist/Images/location.png"></image>
                <text class="connect-text">杭州市西湖区文一西路</text>
            </div>
            <div class="connect-form">
                <image class="connect-img" src="http://img.zmnbx.com//dist/Images/telephone.png"></image>
                <text class="connect-text">0571-56075698</text>
            </div>
            <div class="connect-form">
                <image class="connect-img" src="http://img.zmnbx.com//dist/Images/mail.png"></image>
                <text class="connect-text">lzylf@sina.com</text>
            </div>
            <div class="connect-form">
                <image class="connect-img" src="http://img.zmnbx.com//dist/Images/wechat.png"></image>
                <text class="connect-text">lzywxgz</text>
            </div>
        <!--<Header :title="headerTitle" backShow="1"></Header>
        <div class="connect-form">
            <image class="connect-img" src="http://img.zmnbx.com//dist/Images/company.png"></image>
            <text class="connect-text">杭州绿中游智能科技有限公司</text>
        </div>
        <div class="connect-form">
            <image class="connect-img" src="http://img.zmnbx.com//dist/Images/location.png"></image>
            <text class="connect-text">杭州市西湖区文一西路</text>
        </div>
        <div class="connect-form">
            <image class="connect-img" src="http://img.zmnbx.com//dist/Images/telephone.png"></image>
            <text class="connect-text">0571-56075698</text>
        </div>
        <div class="connect-form">
            <image class="connect-img" src="http://img.zmnbx.com//dist/Images/mail.png"></image>
            <text class="connect-text">lzylf@sina.com</text>
        </div>
        <div class="connect-form">
            <image class="connect-img" src="http://img.zmnbx.com//dist/Images/wechat.png"></image>
            <text class="connect-text">lzywxgz</text>
        </div>-->
    </div>
</template>
<style>
    .connect-form {
        width: 750px;
        height: 90px;
        padding-left: 34px;
        flex-direction: row;
        align-items: center;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #ddd;
    }
    /*.connect-top{
        margin-top:88px;
    }*/
    .connect-img {
        width: 40px;
        height: 40px;
        margin-right: 34px;
    }
    
    .connect-text {
        font-size: 30px;
        color: #333;
    }
</style>

<script>
    export default {
        data() {
            return {
                headerTitle: '联系客服'
            }
        }
    }

</script>