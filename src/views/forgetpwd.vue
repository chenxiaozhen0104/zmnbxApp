<template>
  <div class="forgetpwd-container">
    <div class="innerContainer">
      <!-- 输入手机号 -->
      <div class="forgetpwd-form-group">
        <div class="forgetpwd-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/user2.png"></image>
        </div>
        <input class="forgetpwd-phone" type="tel" placeholder="请输入注册手机号" v-model='mobile' />
        <code :mobile="mobile"></code>
      </div>
      <!-- 结束输入手机号 -->
      <!-- 输入验证码 -->
      <div class="forgetpwd-form-group">
        <div class="forgetpwd-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/code2.png"></image>
        </div>
        <input class="forgetpwd-code" type="tel" placeholder="请输入验证码" v-model='code' />
      </div>
      <!-- 结束输入验证码 -->
      <!-- 输入登录密码 -->
      <div class="forgetpwd-form-group">
        <div class="forgetpwd-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/password.png"></image>
        </div>
        <input type="password" class="forgetpwd-newCode" placeholder="请输入新的登录密码" v-model='newpwd' @blur="onblur" />
      </div>
      <div class="forgetpwd-form-group">
        <div class="forgetpwd-img">
          <image class="sms-img" src="http://img.zmnbx.com//dist/Images/password.png"></image>
        </div>
        <input type="password" class="forgetpwd-reNewCode" placeholder="请再次输入登录密码" v-model='reNewpwd' />
      </div>
      <!-- 结束输入登录密码 -->
      <!-- 注册按钮 -->
      <button class='set-newpwd' @click='submit' :disabled="!(mobile && code && newpwd && reNewpwd)">
      <text class='newText wx-newText'>设置新密码</text>
    </button>
      <!--加载动画组件-->
      <goingOn :title="loadingTitle" v-if="isShow"></goingOn>
      <!-- 结束注册按钮 -->
      <!-- 底部 -->
      <div class="forgetpwd-footer">
        <text class="forgetpwd-footer-text" @click="pageTo('/login')">返回登录</text>
      </div>
    </div>
    <!-- 结束底部 -->
  </div>
</template>

<style>
  .forgetpwd-container {
    width: 750px;
  }
  
  .innerContainer {
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: -180px;
  }
  
  .forgetpwd-form-group {
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
  
  .forgetpwd-phone,
  .forgetpwd-code,
  .forgetpwd-newCode,
  .forgetpwd-reNewCode {
    flex: 1;
    height: 70px;
    border: none;
    background-color: transparent;
  }
  
  .forgetpwd-img {
    width: 70px;
    height: 70px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  
  .sms-img {
    width: 30px;
    height: 30px;
  }
  
  .set-newpwd {
    width: 655px;
    height: 80px;
    background-color: rgb(45, 117, 200);
    margin-top: 20px;
    opacity: 1;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  
  .newText {
    font-size: 30px;
    color: white;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  
  .set-newpwd:active {
    background-color: #3399ff;
  }
  
  .set-newpwd:disabled {
    opacity: 0.5;
  }
  
  .forgetpwd-footer {
    width: 650px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .forgetpwd-footer-text {
    color: rgb(45, 117, 200);
    font-size: 30px;
    padding-left: 30px;
  }
</style>

<script>
  // 组件的路径
  import code from "../components/code.vue"
  var modal = weex.requireModule('modal')
  export default {
    components: { code },
    data: function () {
      return {
        mobile: '',
        code: '',
        newpwd: '',
        reNewpwd: '',
        btnDisabled: false,
        loadingTitle: '提交中……',
        isShow: false
      }
    },
    methods: {
      submit() {
        if (this.newpwd != this.reNewpwd) {
          modal.toast({
            message: '密码前后输入不一致',
            duration: 0.2
          })
          return
        }
        this.isShow = true;
        this._post('/api/user/forgetPassword', {
          mobile: this.mobile,
          smsCode: this.code,
          password: this.newpwd
        }, (res) => {
           this.isShow = false;
          if (res.error) {
            modal.toast({
              message: res.error,
              duration: 0.2
            })
          } else {
            modal.toast({
              message: '更改密码成功，请重新登录',
              duration: 0.2
            })
            //   message: '修改成功',
            //   duration: 0.2
            // })
            this.pageTo('/login')
          }
         

        }, () => {
          this.isShow = false;
          modal.toast({
            message: '服务器内部错误',
            duration: 0.2
          })
        })
      },
      onblur() {
        if (this.newpwd.length < 6 || this.newpwd.length > 18) {
          modal.toast({
            message: '请输入6-18个字符',
            duration: 0.2
          })
        }
      }
    }
  }

</script>