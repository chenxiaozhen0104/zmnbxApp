<template>
  <div class="register-container">
    <div class="innerContainer">
      <image class="sms-logo" src="http://gl.zmnbx.com/Areas/H5/Content/dist/images/login_logo.png" />
      <div class="register-form-group">
        <div class="register-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/user2.png"></image>
        </div>
        <input class="register-txt-realName" type="text" placeholder="请输入真实姓名" v-model='realName' />
      </div>
      <!-- 输入手机号 -->
      <div class="register-form-group">
        <div class="register-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/mobile1.png"></image>
        </div>
        <input class="register-txt-mobile" type="tel" placeholder="请输入手机号" v-model='mobile' />
        <code :mobile="mobile"></code>
      </div>
      <!-- 结束输入手机号 -->
      <!-- 输入验证码 -->
      <div class="register-form-group">
        <div class="register-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/code2.png"></image>
        </div>
        <input class="register-txt-code" type="tel" placeholder="请输入验证码" v-model='code' />
      </div>
      <!-- 结束输入验证码 -->
      <!-- 输入登录密码 -->
      <div class="register-form-group">
        <div class="register-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/password.png"></image>
        </div>
        <input type="password" class="register-txt-pwd" placeholder="请输入登录密码" v-model='password' @blur="onblur" />
      </div>
      <div class="register-form-group">
        <div class="register-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/password.png"></image>
        </div>
        <input type="password" class="register-txt-repwd" placeholder="请再次输入登录密码" v-model='repassword' />
      </div>
      <!-- 结束输入登录密码 -->
      <!-- 注册按钮 -->
      <button class="register-btn" @click='submit' :disabled="!(realName&&mobile&&code&&password&&repassword)">
      <text class='register-txt-register wx-register-txt-register'>注 册</text>
    </button>
      <!-- 结束注册按钮 -->
      <goingOn :title="loadingTitle" v-if="isShow"></goingOn>
      <!-- 底部 -->
      <div class="footer" @click="pageTo('/login')">
        <text class="register-txt">已有账号？</text>
      </div>
    </div>
    <!-- 结束底部 -->
  </div>
</template>

<style>
  .register-container {
    width: 750px;
  }
  .innerContainer{
    flex:1;
    align-items: center;
    justify-content: center;
    margin-top:-180px;
  }
  .sms-logo {
    width: 206px;
    height: 205px;
    margin-bottom:30px;
  }
  
  .register-form-group {
    flex-direction: row;
    width: 655px;
    height: 70px;
    margin-top: 20px;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(162, 162, 162);
    align-items: center;
    padding-right: 5px; 
  }
  .register-img{
    width: 70px;
    height: 70px;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  .register-txt-mobile,
  .register-txt-code,
  .register-txt-pwd,
  .register-txt-repwd,
  .register-txt-realName {
    height: 70px;
    border: none;
    flex:1;
    background-color: transparent;
  }
  .sms-img{
    width:30px;
    height:30px;
  }
  /*.tel-text {
    position: absolute;
    left: 50px;
    top: 0;
    height: 70px;
    border: none;
  }*/
  
  .img {
    position: relative;
    width: 70px;
    height: 70px;
  }
  
  .register-btn:active {
    background-color: #3399ff;
  }
  
  .register-btn:disabled {
    opacity: 0.5;
  }
  
  .footer {
    width: 655px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 30px;
  }
  
  .register-txt {
    color: rgb(45, 117, 200);
    font-size: 30px;
    text-align: center;
  }
  
  .register-btn {
    align-items: center;
    justify-content: center;
    background-color: rgb(45, 117, 200);
    width:655px;
    margin-top: 20px;
    height: 80px;
    opacity: 1;
    display: flex;
  }
  
  .register-txt-register {
    color: white;
    font-size: 30px;
    font-weight: bold;
    display:flex;
    justify-content: center;
    align-items:center;
  }
</style>

<script>
  // 组件的路径

  import code from '../components/code.vue'
  const storage = weex.requireModule('storage')
  var modal = weex.requireModule('modal')
  export default {
    components: { code },
    data: function () {
      return {
        mobile: '',
        code: '',
        password: '',
        repassword: '',
        realName: '',
        loadingTitle: '提交中……',
        isShow: false
      }
    },
    methods: {
      submit() {
        if (this.password != this.repassword) {
          modal.toast({
            message: '密码前后输入不一致',
            duration: 0.2
          })
          return
        }
        this.isShow = true;
        this._post('/api/user/register', { password: this.password, mobile: this.mobile, smsCode: this.code, realName: this.realName }, (res) => {
          this.isShow = false;
          if (res.error) {
            modal.toast({
              message: res.error,
              duration: 0.2
            })
          } else {
            storage.setItem('userType', res.type, event => { });
            storage.setItem('token', res.id, event => { });
            storage.setItem('name', res.name, event => { });
            this.pageTo('/companyType');
          }
        }, (res) => {
          modal.toast({
            message: '服务器内部错误',
            duration: 0.2
          })
        })
      },
      onblur() {
        if (this.password.length < 6 || this.password.length > 18) {
          modal.toast({
            message: '请输入6-18个字符',
            duration: 0.2
          })
        }
        return
      }
    },
    created() {
    }
  }

</script>