<template>
    <div class="update-version" v-if="modelShow">
        <div class="progress" v-if="progressShow">
            <div class="progress-bg">
                <div class="progress-line" :style="{width:progress}"></div>
            </div>
        </div>
    </div>
</template>

<style>
    .update-version {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }
 
    /*进度条样式*/
    
    .progress {
        position: absolute;
        left: 15px;
        top: 580px;
        justify-content: center;
        align-items: center;
    }
    
    .progress-bg {
        width: 700px;
        height: 30px;
        border-radius: 100px;
        background-color: #3D3C3A;
    }
    
    .progress-line {
        height: 30px;
        border-radius: 100px;
        background-color: green;
        width: 0px;
    }
</style>

<script>
    const file = weex.requireModule('FileModule');
    var modal = weex.requireModule('modal');
    module.exports = {
        name: 'VersionUpdate',
        data() {
            return {
                progress: 0,
                downloadUrl: '',
                outVersion: '',
                describe: '',
                progressShow: false,
                modelShow: false
            }
        },
        methods: {
            ensure() {
                this.progressShow = true;
                file.download(
                    this.downloadUrl,
                    filePath => {
                        this.progressShow = false;
                        this.modelShow = false;
                        file.install(filePath)
                    },
                    data => {
                        this.progress = data.progress * 700 + "px";
                    },
                    res => {
                        modal.toast({
                            message:"网络连接不稳定，下载失败!",
                            duration:0.2,
                        });
                        this.progressShow = false;
                        this.modelShow = false;
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
            this._get("/api/common/checkversion", { terminalType: 2, appType: 1, version: 2 }, (res) => {
                var describe = res.Describe.split('|');
                this.downloadUrl = res.DownloadUrl;
                let okTitle = '马上更新'
                if (weex.config.env.appVersion == res.OutVersion) {
                    return;
                } else {
                    modal.confirm({
                        message: `最新版本v${res.OutVersion}，是否更新?
- ${describe.join('\r\n- ')}`,
                        okTitle: okTitle,
                        cancelTitle: '拒绝',
                    }, result => {
                        if (result == okTitle) {
                            this.ensure()
                            this.modelShow = true;
                        } else {
                            this.modelShow = false;
                        }
                    })
                }
            });
        }
    }

</script>