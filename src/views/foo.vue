<template>
  <div class="sms-container">
    <div class="innerContainer">
      <image class="sms-logo" src="http://gl.zmnbx.com/Areas/H5/Content/dist/images/login_logo.png"></image>
      <!-- 输入手机号 -->
      <div class="foo-form-group">
        <div class="foo-mobile-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/user2.png"></image>
        </div>
        <input class="login-txt-mobile" type="tel" placeholder="请输入手机号" v-model="mobile" />
        <code :mobile="mobile" :verify-user="true"></code>
        <!-- 验证码组件 -->
      </div>
      <!-- 结束输入手机号 -->
      <!-- 输入验证码 -->
      <div class="foo-form-group">
        <div class="foo-code-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/code2.png"></image>
        </div>
        <input class="login-txt-code" type="tel" placeholder="请输入验证码" v-model="smscode" />
      </div>
      <!-- 结束输入手机号 -->
      <!-- 登录按钮 -->
      <button class="login-btn" @click="submit" :disabled="!(mobile&&smscode)">
        <text class="log-btn-txt wx-log-btn-txt">登 录</text>
      </button>
      <!-- 结束登录按钮 -->
      <!-- 底部 -->
      <div class="login-footer">
        <text class="login-footer-text" @click="pageTo('/register')">账号注册</text>
        <text @click="pageTo('/password')" class="login-footer-text login-footer-right">密码登录</text>
      </div>
    </div>
    <!--加载动画组件-->
    <goingOn :title="loadingTitle" v-if="isShow"></goingOn>
    <!-- 结束底部 -->
  </div>
</template>

<style scoped>
  .sms-container {
    width: 750px;
  }
  
  .innerContainer {
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: -180px;
  }
  
  .sms-logo {
    width: 206px;
    height: 205px;
    margin-bottom:30px;
  }
  
  .foo-mobile-img,
  .foo-code-img {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .sms-img {
    width: 30px;
    height: 30px;
  }
  
  .foo-form-group {
    flex-direction: row;
    width: 655px;
    height: 70px;
    margin-top: 30px;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(162, 162, 162);
    align-items: center;
    padding-right: 5px;
  }
  
  .login-txt-code,
  .login-txt-mobile {
    height: 70px;
    border: none;
    flex: 1;
    background-color: transparent;
  }
  
  .login-btn {
    width: 655px;
    height: 80px;
    background-color: rgb(45, 117, 200);
    margin-top: 20px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .login-btn:active {
    background-color: #3399ff;
  }
  
  .login-btn:disabled {
    opacity: 0.5;
  }
  
  .log-btn-txt {
    
    color: white;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .login-footer {
    width: 655px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .login-footer-text {
    font-size: 30px;
    color: rgb(44, 97, 208);
  }
  
  .login-footer-right {
    text-align: right;
  }
</style>

<script>
  // 组件的路径
  import code from '../components/code.vue'
   import constants from "../store/constants"
  const storage = weex.requireModule('storage')
  var modal = weex.requireModule('modal')
  export default {
    components: { code },
    data() {
      return {
        mobile: '',
        smscode: '',
        Name: '',
        loadingTitle: '登录中……',
        isShow: false
      }
    },
    methods: {
      submit() {
        var self = this;
        this.isShow = true;
        self._post('/api/user/SMSLogin', { mobile: this.mobile, smsCode: this.smscode }, (res) => {
         
          if (res.error) {
            modal.toast({
              message: res.error,
              duration: 0.2
            })
          } else {
            this.$emit(constants.event.USER_LOAD, res)
            // if (res.serviceCompany) {
            //   this.pageTo('/homepage');
            // } else {
            //   this.pageTo('/companyType')
            // }
            storage.setItem('name', res.name, event => { });
            storage.setItem('token', res.id, event => { });
            storage.setItem('name', res.name, event => { });
            storage.setItem('userType', res.type, event => { });
            storage.setItem('useCompany', res.useCompany, event => { });
            storage.setItem('useCompanyId', res.useCompanyId, event => { });
            this._post('/api/user/Info', {}, (res) => {
              console.log(res+'user')
            storage.setItem('tokenCompany', res.id + "," + res.useCompany, event => { });
              if (res.useCompany) {
                this.pageTo('/homepage');
              } else {
                this.pageTo('/companyType')
              }
            })
          }
          this.isShow = false;
        }, () => {
          modal.toast({
            message: '服务器内部错误',
            duration: 0.2
          })
        });
      }
    }
  }

</script>