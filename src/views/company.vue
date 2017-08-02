<template>
    <div>
        <AppHeader :title="headerTitle" v-if="!_isWeixin()" back="/companyType"></AppHeader>
        <div class="company-name wx-company-name company-border">
            <text class="company-left">公司名称</text>
            <div class="company-right">
                <input type="text" class="input-text" placeholder="请输入公司名称" autocomplete="off" v-model="Name" />
            </div>
        </div>
        <div class="company-linkman company-border">
            <text class="company-left">联系人</text>
            <div class="company-right">
                <input type="text" class="input-text" placeholder="请输入联系人" autocomplete="off" v-model="Contact" />
            </div>
        </div>
        <div class="company-mobile company-border">
            <text class="company-left">联系电话</text>
            <div class="company-right">
                <input type="tel" class="input-text" placeholder="请输入联系电话" autocomplete="off" v-model="Phone" />
            </div>
        </div>
        <div class="company-address company-border">
            <text class="company-left">地址</text>
            <div class="company-right">
                <input type="text" class="input-text" placeholder="请输入地址" autocomplete="off" v-model="Position" />
            </div>
        </div>
        <div class="company-btn">
            <button class="company-button company-btn-submit" @click='submit' :disabled="!(Name&&Contact&&Phone&&Position)">
                <text class="company-submit-text">提交</text>
            </button>
        </div>
        <!--加载动画组件-->
        <goingOn :title="loadingTitle" v-if="isShow"></goingOn>
    </div>
</template>
<style>
    /*.company-name {
        margin-top: 88px;
    }*/
    
    .company-left {
        font-size: 35px;
        color: #333;
    }
    
    .company-right {
        width: 450px;
        height: 72px;
        border-style: solid;
        border-color: #ddd;
        border-width: 2px;
        border-radius: 5px;
        padding-left: 15px;
        padding-right: 15px;
    }
    
    .company-border {
        width: 750px;
        border-bottom-style: solid;
        border-bottom-color: #ddd;
        border-bottom-width: 2px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 750px;
        height: 125px;
        padding-left: 62px;
        padding-right: 62px;
    }
    
    .input-text {
        width: 420px;
        height: 72px;
        border-width: 0;
    }
    
    .company-btn {
        width: 750px;
        height: 101px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 60px;
    }
    
    .company-btn-submit {
        width: 630px;
        height: 80px;
        background-color: rgb(45, 117, 200);
        opacity: 1;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
    }
    
    .company-btn-submit:disabled {
        opacity: 0.6;
    }
    
    .company-btn-submit:active {
        background-color: #3399ff;
    }
    
    .company-submit-text {
        text-align: center;
        color: white;
        font-size: 30px;
    }
</style>

<script>
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');
    var storage = weex.requireModule('storage')
    export default {
        data() {
            return {
                Name: '',
                Phone: '',
                Contact: '',
                Position: '',
                headerTitle: "公司基本信息",
                loadingTitle: '提交中……',
                isShow: false
            }
        },
        methods: {
            submit() {
                var self = this;
                self.isShow = true;
              
                if (self.Name && self.Phone && self.Contact && self.Position) {
                    self._post('/api/user/companyinfo', {
                        Name: self.Name,
                        Contact: self.Contact,
                        Phone: self.Phone,
                        Position: self.Position,
                        UseCompanyId: ""

                    }, (res) => {
                        self.isShow = false;
                        if (res.error) {
                            modal.toast({
                                message: res.error,
                                duartion: 0.3
                            }, function (result) { });
                        } else {
                            modal.toast({
                                message: '申请已提交，请耐心等待审核',
                                duartion: 0.3
                            })
                            storage.setItem('useCompany', this.Name, event => { });
                            self.pageTo('/homepage');
                        }
                    }, () => {
                        modal.toast({
                            message: '内部服务器错误',
                            duration: 0.3
                        });
                    });

                } else {
                    modal.toast({
                        message: '请填写完整信息',
                        duartion: 0.3,
                        okTitle: "确定"
                    }, function (result) { });

                }
            }
        },
        created() {
            console.log(this.user)
        }

    }

</script>