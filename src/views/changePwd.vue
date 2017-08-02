<template>
    <div class="change-container">
        <!--<AppHeader :title="headerTitle" v-if="!_isWeixin()" back="/my"></AppHeader>-->
        <div class="change-form wx-change-form">
            <div class="change-form-oldPwd change-row">
                <text class="change-form-text">旧密码:</text>
                <input type="password" class="change-form-input" placeholder="请输入旧密码" v-model="oldPwd" />
            </div>
            <div class="change-form-new change-row">
                <text class="change-form-text">新密码:</text>
                <input type="password" class="change-form-input" placeholder="请输入新密码" v-model="newPwd" @blur="onblur" />
            </div>
            <div class="change-form-reNewPwd change-row">
                <text class="change-form-text">确认密码:</text>
                <input type="password" class="change-form-input" placeholder="请再次输入新密码" v-model="reNewPwd" />
            </div>
        </div>
         <!--加载动画组件-->
         <goingOn :title="loadingTitle" v-if="isShow"></goingOn>
        <button class="change-ensure-btn" @click='submit' :disabled="!(oldPwd&&newPwd&&reNewPwd)">
                <text class="change-ensure-text">确认</text>
        </button>
    </div>
</template>
<style>
    .change-container {
        align-items: center;
        width: 750px;
    }
    
    .change-row {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 688px;
        height: 80px;
        border-radius: 5px;
        border-style: solid;
        border-color: #ddd;
        border-width: 2px;
        margin-top: 22px;
    }
    
    /*.change-form {
        margin-top: 88px;
    }*/
    
    .change-form-text {
        padding-left: 30px;
        font-size: 30px;
        color: #666;
        margin-right: 46px;
    }
    
    .change-form-input {
        width: 460px;
        height: 80px;
        border: none;
        background-color: transparent;
    }
    
    .change-ensure-btn {
        justify-content: center;
        align-items: center;
        width: 688px;
        height: 80px;
        background-color: #0092FC;
        margin-top: 64px;
        border-radius: 5px;
        border-style: solid;
        border-color: #ddd;
        border-width: 2px;
        opacity: 1;
        display:flex;
    }
    
    .change-ensure-btn:active {
        background-color: #3399ff;
    }
    
    .change-ensure-btn:disabled {
        opacity: 0.5;
    }
    
    .change-ensure-text {
        color: white;
        font-size: 35px;
        text-align: center;
    }
</style>
<script>
    var modal = weex.requireModule('modal')
    // import { _getUser } from "../store/fecth.js"
    export default {
        data: function () {
            return {
                oldPwd: '',
                newPwd: '',
                reNewPwd: '',
                headerTitle:'修改密码',
                loadingTitle:'提交中……',
                isShow:false
            }
        },
        methods: {
            submit() {
                if (this.newPwd != this.reNewPwd) {
                    modal.toast({
                        message: '新密码前后输入不一致',
                        duration: 0.2
                    })
                    return
                }
                this.isShow = true;
                this._post('/api/user/ResetPassword', { oldPassword: this.oldPwd, newPassword: this.newPwd }, (res) => {
                    this.isShow = false;
                    if (res.error) {
                        modal.toast({
                            message: '密码输入错误',
                            duration: 0.2
                        })
                        return
                    }
                    modal.toast({
                        message: '恭喜你，密码更改成功',
                        duration: 0.2
                    });
                    this.pageTo('/login')
                }, () => {
                    modal.toast({
                        message: '服务器内部错误',
                        duration: 0.2
                    })
                })
            },
            onblur() {
                // console.log(this.newPwd.length);
                if (this.newPwd.length < 6 || this.newPwd.length > 18) {
                    modal.toast({
                        message: '请输入6-18个字符',
                        duration: 0.2
                    })
                }
            }
        }
    }

</script>