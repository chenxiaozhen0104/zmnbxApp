<template>
  <div class="password-container">
    <div class="innerContainer">
      <image class="sms-logo" src="http://gl.zmnbx.com/Areas/H5/Content/dist/images/login_logo.png" />
      <!-- 开始用户名和验证码 -->
      <div class="password-form-group">
        <div class="password-mobile-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/user2.png"></image>
        </div>
        <input class="password-username" type="tel" placeholder="请输入手机号" v-model="mobile" />
      </div>
      <div class="password-form-group">
        <div class="password-password-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/password.png"></image>
        </div>
        <input class="password-pwd" type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <!-- 结束用户名和验证码 -->
      <!-- 登录按钮 -->
      <button class="password-btn" @click='submit' :disabled="!(mobile&&password)">
      <text class="password-btn-text wx-password-btn-text">登 录</text>
    </button>
      <!--加载动画组件-->
      <goingOn :title="loadingTitle" v-if="isShow"></goingOn>
      <!-- 结束登录按钮 -->
      <!-- 底部 -->
      <div class="password-footer">
        <text class="password-footer-text" @click="pageTo('/forgetpwd')">忘记密码</text>
        <text class="password-footer-text password-footer-right" @click="pageTo('/login')">手机快捷登录</text>
      </div>
    </div>
    <!-- 结束底部 -->
  </div>
</template>

<style>
  .content-msg,
  .btn {
    font-size: 25px;
    color: #333;
  }
  
  .innerContainer {
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: -180px;
  }
  
  .password-container {
    width: 750px;
  }
  
  .sms-logo {
    width: 206px;
    height: 205px;
    margin-bottom:30px;
  }
  
  .password-username,.password-pwd {
    height: 70px;
    border: none;
    flex: 1;
    background-color: transparent;
  }
  
  .password-mobile-img,
  .password-password-img {
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
  
  .password-form-group {
    flex-direction: row;
    width: 655px;
    height: 70px;
    margin-top: 30px;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(162, 162, 162);
    align-items: center;
    padding-right: 5px;
  }
  
  .password-username,
  .password-pwd {
    flex: 1;
    height: 70px;
    border: none;
    background-color: transparent;
  }
  
  .password-btn {
    width: 655px;
    height: 80px;
    background-color: rgb(45, 117, 200);
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    opacity: 1;
    display: flex;
  }
  
  .password-btn:active {
    background-color: #3399ff;
  }
  
  .password-btn:disabled {
    opacity: 0.5;
  }
  
  .password-btn-text {
    color: white;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .password-footer {
    width: 650px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .password-footer-text {
    font-size: 30px;
    color: rgb(44, 97, 208);
  }
  
  .password-footer-right {
    text-align: right;
  }
</style>

<script>
  import code from "../components/code.vue"
  var modal = weex.requireModule('modal')
  var storage = weex.requireModule('storage')
  export default {
    components: { code },
    data: function () {
      return {
        mobile: '',
        password: '',
        btnDisabled: false,
        loadingTitle: '登录中……',
        isShow: false
      }
    },
    methods: {
      submit() {
        this.isShow = true;
        this._post('/api/user/PasswordLogin', { userName: this.mobile, password: this.password }, (res) => {
          if (res.error) {
            modal.toast({
              message: '用户名或密码错误',
              duration: 0.2
            })
          } else {
            storage.setItem('token', res.id, event => { });
            storage.setItem('name', res.name, event => { });
            storage.setItem('useCompany', res.useCompany, event => { });
            storage.setItem('userType', res.type, event => { });
            
            this._post('/api/user/Info', {}, (res) => {
              storage.setItem('tokenCompany', res.id + "," + res.useCompany, event => { });
              if (res.useCompany) {
                this.pageTo('/homepage');
              } else {
                this.pageTo('/companyType')
              }
            })
            // storage.setItem('token', res.id, event => { });
            // storage.setItem('name', res.name, event => { });
            // storage.setItem('id', res.id, event => { });
            // storage.setItem('userType', res.type, event => { });
            // this.pageTo('/homepage')
          }
          this.isShow = false;
        }, () => {
          modal.toast({
            message: '服务器内部错误',
            duration: 0.2
          })
        })
      }
    }
  }

</script>