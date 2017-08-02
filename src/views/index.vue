<template>
    <div class="update-version">
        <div class="update-prompt" v-if="isShow">
            <div class="update-content">
                <image class="update-logo" src="http://gl.zmnbx.com/Areas/H5/Content/dist/images/login_logo.png"></image>
                <text class="update-title">版本更新</text>
                <text class="update-text">{{describe}}</text>
            </div>
            <div class="update-btn">
                <text class="cancel" @click="cancel">稍后再说</text>
                <text class="ensure" @click="ensure">立即下载</text>
            </div>
        </div>
        <text>{{progress}}</text>
        <div class="progress" v-if="progressShow">
            <div class="progress-bg">
                <div class="progress-line" :style="{width:progress}"></div>
            </div>
        </div>
    </div>
</template>

<style>
    .update-version{
        position: relative;
    }
     .update-prompt {
        margin-left: 125px;
        margin-top: 380px;
        height: 400px;
        width: 500px;
        background-color: #dedede;
        align-items: center;
    }
    
    .update-content {
        width: 500px;
        padding-bottom: 50px;
        align-items: center;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #f9f9f9;
    }
    
    .update-logo {
        margin-top: 20px;
        height: 120px;
        width: 120px;
    }
    
    .update-text,
    .update-title {
        margin-top: 30px;
        font-size: 30px;
    }
    
    .update-btn {
        flex-direction: row;
        justify-content: space-around;
    }
    
    .cancel,.ensure {
        width: 250px;
        text-align: center;
        padding-top: 25px;
        padding-bottom: 25px;
        color: #059eee;
        font-size: 30px;
    }
    
    .cancel {
        border-right-style: solid;
        border-right-color: #f9f9f9;
        border-right-width: 1px;
    }

    /*进度条样式*/
     .progress{
         position:absolute;
         left:15px;
         top:580px;
        justify-content: center;
        align-items:center;
    }
   .progress-bg{
       width:700px;
       height:50px;
       border-radius:100px;
       background-color:#3D3C3A;
   }
    .progress-line{
        height:50px;
        border-radius:100px;
        background-color:green;
        width:0px;
    }
</style>

<script>
    const file = weex.requireModule('FileModule');
    var modal = weex.requireModule('modal');
    export default {
        data() {
            return {
                currentSize: 0,
                totalSize: 0,
                progress: 0,
                filePath: '',
                // appVersion: weex.config.env.appVersion,
                // platform: weex.config.env.platform,
                downloadUrl: '',
                outVersion: '',
                describe: '',
                isShow: false,
                progressShow:false
            }
        },
        methods: {
            cancel() {
                this.isShow = false;
            },
            ensure() {
                this.progressShow = true;
                file.download(
                    this.downloadUrl,
                    filePath => {
                        this.filePath = filePath
                        modal.toast({
                            message: filePath,
                            duration: 0.2
                        })
                        file.install(filePath)
                    },
                    data => {
                        // this.currentSize = data.currentSize;
                        // this.totalSize = data.totalSize;
                        if(data.progress==1){
                            this.progressShow = false;
                        }else{
                             this.progress = data.progress*700+"px";
                        }
                        this.isShow = false;
                        //data.networkSpeed
                    },
                    res => {
                        res.error
                    }
                )
            }
        },
        created() {

            if (!weex.config.env) {
                return;
            }
            if (weex.config.env.platform !== 'android') {
                return;
            }
            this._get("/api/common/checkversion", { terminalType: 2, appType: 1, version: 1 }, (res) => {
                modal.toast({
                    message: res.DownloadUrl,
                    duration: 0.2
                });
                this.describe = res.Describe;
                this.downloadUrl = res.DownloadUrl;
                if (weex.config.env.appVersion == res.outVersion) {
                    // 如果版本相同，则跳转到某个页面；
                } else {
                    this.isShow = true;
                    // file.download(
                    //     res.DownloadUrl,
                    //     filePath => {
                    //         this.filePath = filePath
                    //         modal.toast({
                    //             message: filePath,
                    //             duration: 0.2
                    //         })
                    //         file.install(filePath)
                    //     },
                    //     data => {
                    //         this.currentSize = data.currentSize;
                    //         this.totalSize = data.totalSize;
                    //         this.progress = data.progress;
                    //         //data.networkSpeed
                    //     },
                    //     res => {
                    //         res.error
                    //     }
                    // )
                }
            });
        }
    }

</script>