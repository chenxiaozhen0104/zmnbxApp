<template>
    <div @getuiReceiveMessageData="" @getuiReceiveClientId="" @getuiFeedbackResult="">
        <button class="button" @click="qrcode"><text>扫描二维码</text></button>
        <button class="button" @click="pickImage"><text>打开图片选择</text></button>
        <button class="button" @click="camera"><text>打开相机，并获取图片地址</text></button>
        <button class="button" @click="call"><text>拨打 15558122641 电话</text></button>
        <button class="button" @click="setTag"><text>设置个推标签</text></button>
        <button class="button" @click="uploadImage"><text>上传图片按钮</text></button>
        <div>
            <image :src="pic" class="test-image" />
            <text>{{progress}}</text>
        </div>
        <div>
            <input v-model="qrcodeContent" type="text" />
        </div>
    </div>
</template>
<style>
    .button {
        height: 80px;
        width: 600px;
        background-color: #ddd;
        border-bottom: 1px solid #333;
        border-top: 1px solid #333;
        border-left: 1px solid #333;
        border-right: 1px solid #333;
        margin: 10px;
    }
    
    .test-image {
        background-color: #ddd;
        width: 300px;
        height: 300px;
    }
</style>
<script>
    import config from 'config'
    var qrcodeModule = weex.requireModule('QRCodeModule')
    var getuiModule = weex.requireModule('GetuiModule')
    var modal = weex.requireModule('modal')
    var photoPick = weex.requireModule('PhotoPickModule')
    var camera = weex.requireModule('CameraModule')
    var communication = weex.requireModule('Communication')
    var fileModule = weex.requireModule('FileModule')

    export default {
        data() {
            return {
                pic: '',
                qrcodeContent: '',
                progress: 0
            }
        },
        methods: {
            getuiReceiveMessageData(res) {
                modal.toast({
                    message: JSON.stringify(res),
                    duration: 0.2
                })
            },
            uploadImage() {
                if (!this.pic) {
                    modal.toast({
                        message: '请先选择图片',
                        duration: 0.2
                    })
                    return
                }
                fileModule.upload(`${config.server}/api/upload/uploadimg`, this.pic, done => {
                    modal.toast({
                        message: JSON.stringify(done),
                        duration: 0.2
                    })
                }, res => {
                    this.progress = res.progress
                }, res => {
                    modal.toast({
                        message: JSON.stringify(res.error),
                        duration: 0.2
                    })
                })
            },
            getuiFeedbackResult(res) {
                modal.toast({
                    message: JSON.stringify(res),
                    duration: 0.2
                })
            },
            getuiReceiveClientId(res) {
                modal.toast({
                    message: 'clientid=>' + res.clientid,
                    duration: 0.2
                })
            },
            setTag() {
                getuiModule.setTag('1', res => {
                    modal.toast({
                        message: res.error || res.status,
                        duration: 0.2
                    })
                })
            },
            qrcode() {
                qrcodeModule.showQRCode(res => {
                    this.qrcodeContent = res
                    modal.toast({
                        message: res,
                        duration: 0.2
                    })
                })
            },
            call() {
                communication.call('15558122641')
            },
            pickImage() {
                photoPick.open(res => {
                    modal.toast({
                        message:res.path,
                        duration:0.2
                    })
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        this.pic = res.path
                    }
                })
            },

            camera() {
                camera.open(res => {
                    this.pic = res.path
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        this.pic = res.path
                    }
                })
            }
        }
    }

</script>