<template>
    <div class="wrapper-container">
        <div class="header-content" v-if="!_isWeixin()">
            <div class="return-img" @click="clickBack">
                <image class="header-return" src="http://img.zmnbx.com//dist/Images/return1.png"></image>
            </div>
            <text class="header-text">选择企业</text>
        </div>
        <div class="wrapper">
            <div class="group">
                <text class="group-button group-btn1" @click="pageTo('/addCompany')">加入已有企业</text>
            </div>
            <div class="group">
                <text class="group-button group-btn2" @click="pageTo('/company')">注册企业</text>
            </div>
        </div>
    </div>

</template>

<style scoped>
    .wrapper-container {
        width: 750px;
    }
    
    .header-content {
        height: 88px;
        background-color: #0092FC;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    
    .return-img {
        height: 88px;
        width: 88px;
        position: absolute;
        left: 0;
        top: 0;
    }
    
    .header-return {
        height: 40px;
        width: 40px;
        position: absolute;
        left: 25px;
        top: 24px;
    }
    
    .header-text {
        font-size: 40px;
        color: white;
    }
    
    .wrapper {
        margin-top: 390px;
        flex-direction: column;
        justify-content: center;
        width: 750px;
    }
    
    .group {
        flex-direction: row;
        justify-content: center;
        margin-bottom: 50px;
        align-items: center;
    }
    
    .group-button {
        font-size: 36px;
        width: 380px;
        color: white;
        text-align: center;
        padding-top: 25px;
        padding-bottom: 25px;
        margin-bottom: 30px;
    }
    
    .group-btn1 {
        background-color: rgb(114, 133, 148);
    }
    
    .group-btn2 {
        background-color: #3879d9;
    }
</style>
<script>
    const storage = weex.requireModule('storage');
    export default {
        methods: {
            clickBack() {
                storage.setItem('token', "", event => {
                    storage.setItem('tokenCompany', "", event => {
                        this.pageTo('/login')
                    });
                });
            }
        }
        // created() {
        //     this._post("/api/user/Info", {}, (res) => {
        //         if (res.useCompany) {
        //             this.pageTo('/homepage');
        //         }
        //     });

        // }

    }

</script>