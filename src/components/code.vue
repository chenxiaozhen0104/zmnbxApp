<!-- 封装的验证码的组件 -->
<template>
	<div>
		<button class="get-code" :disabled="btnCodeDisabled" @click="getCode">
          <text class="text">{{ btnCodeText }}</text>
    	</button>
	</div>
</template>

<style>
	.get-code {
		height: 60px;
		border-color: rgb(44, 97, 208);
		border-style: solid;
		border-width: 1px;
		justify-content: center;
		background-color: transparent;
		opacity: 1;
		padding-left:10px;
		padding-right:10px;
	}
	
	.get-code:disabled {
		opacity: 0.5;
	}
	
	.text {
		color: rgb(44, 97, 208);
		font-size: 28px;
		text-align: center;
	}
</style>

<script>
	var modal = weex.requireModule('modal')
	module.exports = {
		name: 'code',
		props: ['mobile','verifyUser'],
		data: function () {
			return {
				btnCodeText: '获取验证码',
				btnCodeDisabled: false
			}
		},
		methods: {
			getCode: function () {
				var time = 60;
				if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.mobile))) {
                    modal.toast({
                        message: '手机格式不正确',
                        duration: 0.2
                    })
					return
                }
				this._get('/api/common/sendverifycode',
					{ mobile: this.mobile,verifyUser:!!this.verifyUser }, (res) => {
						if (res.error) {
							modal.toast({
								message: '发送失败,请检测手机号是否有误',
								duration: 0.2
							})
						} else {
							this.btnCodeDisabled = true
							let clearId = setInterval(() => {
								if (time > 0) {
									this.btnCodeText = `${time}s 后重试`
									time--
								} else {
									this.btnCodeText = `获取验证码`
									clearInterval(clearId)
									this.btnCodeDisabled = false
								}
							}, 1000)
						}
					})
			}
		}
	}

</script>