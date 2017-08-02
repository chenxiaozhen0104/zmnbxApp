<template>
    <div class="homepage-container">
        <image class="homepage-background" src="http://img.zmnbx.com//dist/Images/home.png"></image>
        <div class="homepage-header" v-if="!_isWeixin()">
            <text class="homepage-title">啄木鸟</text>
        </div>
        <div class="homepage-img">
            <image class="homepage-image wx-homepage-image" src="http://img.zmnbx.com//dist/Images/repair-bg.png" @click="sms"></image>
        </div>
        <!--提示更新组件-->
        <VersionUpdate></VersionUpdate>
       <!--固定底部-->
        <Footer :active="0"></Footer>
    </div>
</template>
<style>
    .homepage-container {
        flex: 1;
    }
    
    .homepage-background {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1334px;
        width: 750px;
    }
    
    .homepage-header {
        width: 750px;
        height: 100px;
        border-bottom-width: 3px;
        border-bottom-color: white;
        border-bottom-style: solid;
        align-items: center;
        justify-content: center;
        z-index: 100;
    }
    
    .homepage-title {
        font-size: 40px;
        color: white;
    }
    
    .homepage-center {
        position: relative;
    }
    
    .homepage-img {
        justify-content: center;
        align-items: center;
        height: 1000px;
        width: 750px;
    }
    
    .homepage-image {
        width: 550px;
        height: 550px;
        z-index: 100;
        /*position: absolute;
        left: 100px;
        top: 292px;*/
    }
</style>
<script>
    import VersionUpdate from '../components/versionUpdate.vue'
    var modal = weex.requireModule('modal')
    const qrCodeModule = weex.requireModule('QRCodeModule')
    const file = weex.requireModule('FileModule');
    export default {
        components: { VersionUpdate },
        data() {
            return {
                showBorder: true
            }
        },
        methods: {
            sms() {
                qrCodeModule.showQRCode((result) => {

                    result = result.substr(result.lastIndexOf('/') + 1);
                    this._post('/api/device/exist', { qrcode: result }, (res) => {
                        // if (res) {
                        //     this.pageTo(`/repair/${result}`)
                        // } else {
                        //     modal.toast({
                        //         message: '该二维码未注册',
                        //         duration: 0.2
                        //     })
                        // }
                        if (res) {
                            if (res.error) {
                                modal.toast({
                                    message: res.error,
                                    duration: 0.2
                                })
                            } else {
                                this.pageTo(`/repair/${result}`)
                            }

                        } else {
                            modal.toast({ message: '该二维码未注册', duration: 0.3 })
                        }
                    })

                })
            }
        },
        created() {

        }

    }

</script>