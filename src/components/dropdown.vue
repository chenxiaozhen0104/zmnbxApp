<template>
	<div class="select-container wx-select-container">
		<div class="device-tab wx-device-tab">
			<div class="device-common" @click="tabActive('area')">
				<text class="device-txt" :style="{'color':selectTab=='area'?'red':'#000'}">{{selectData.area.name||'全部区域'}}</text>
				<image class="device-img" :src="imgUrl" ref="imgRotates"></image>
			</div>
			<div class="category device-common" @click="tabActive('category')">
				<text class="device-txt" :style="{'color':selectTab=='category'?'red':'#000'}">{{selectData.category.name||'全部类目'}}</text>
				<image class="device-img" :src="imgUrl" ref="imgRotates1"></image>
			</div>
			<div class="brand device-common" @click="tabActive('brand')">
				<text class="device-txt" :style="{'color':selectTab=='brand'?'red':'#000'}">{{selectData.brand.name||'全部品牌'}}</text>
				<image class="device-img" :src="imgUrl" ref="imgRotates2"></image>
			</div>
		</div>
		<list ref="arear" class="select-list" v-if="selectShow">
			<cell @click="selectTabItem(item)" v-for="item in tabItems" class="select-item">
				<!--<text :style="{'color':selectData[selectTab].id===item.id?'red':'#000'}">{{item.name}}</text>-->
				<text class="select-text" :style="{'color':selectData[selectTab].id===item.id?'red':'#000'}">{{item.name}}</text>
			</cell>
		</list>
	</div>
	<!-- weex not support  z-index -->
</template>

<style scoped>
	/*tab切换部分样式*/
	
	.select-container {
		width:750px;
	}
	
	.device-tab {
		background-color: #FFFFFF;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #ddd;
		flex-direction: row;
	}
	
	.device-common {
		flex: 1;
		height: 100px;
		justify-content: center;
		align-items: center;
		font-size: 80px;
		flex-direction: row;
	}
	
	.device-txt {
		font-size: 30px;
		color: #000;
	}
	
	.device-txt-active {
		color: red;
	}
	
	.device-img {
		height: 30px;
		width: 30px;
		margin-left: 5px;
		margin-top: 3px;
	}
	
	.select-list {
		width: 750px;
		height:800px;
	}
	
	.select-item {
		padding-left: 20px;
		height: 100px;
		background-color: #fff;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #ddd;
		justify-content: center;
	}
	.select-text {
		font-size: 26px;
	}

</style>


<script>
	import { _getDeviceInitData } from '../store/fecth.js';
	const animation = weex.requireModule('animation');
	const modal = weex.requireModule('modal');

	export default {
		data() {
			return {
				tabItems: [],
				selectTab: 0,
				selectData: {
					area: '',
					brand: '',
					category: '',
				},
				imgUrl: 'http://img.zmnbx.com//dist/Images/down.png',
				initData: {},
				imgRotate: false,
				imgRotate1:false,
				imgRotate2:false,
				selectShow:false
			}
		},
		created() {
			_getDeviceInitData().then((res) => {
				this.initData = res;
				this.initData.area.unshift({ name: '全部区域', id: '' })
				this.initData.category.unshift({ name: '全部类目', id: '' })
				this.initData.brand.unshift({ name: '全部品牌', id: '' })
			}).catch((res) => {
				if (res.error) {
					modal.toast({
						message: res.error,
						duration: 0.2
					})
				}
			});
		},
		methods: {
			tabActive(tab) {
				
				if(tab=="area"){
					this.imgRotate = !this.imgRotate 
					
				}
				if(tab=="category"){
					this.imgRotate1 = !this.imgRotate1 
					
				}
				if(tab=="brand"){
					this.imgRotate2 = !this.imgRotate2 
				}
				if(this.selectTab==tab){
						this.selectShow = !this.selectShow;
				}else{
					this.selectShow =true;
				}
				this.tabItems = this.initData[tab]
				this.selectTab = tab;
				// var arear = this.$refs.arear;
				// animation.transition(arear, {
				// 	styles: {
				// 		height: this.initData[tab] ? `700px` : '1px',
				// 	},
				// 	duration: 300,
				// 	timingFunction: 'linear'
				// })
				this.imgTab(tab)
			},
			selectTabItem(item) {
				this.selectData[this.selectTab] = item
				this.$emit('dropdownselect', this.selectTab, item.id)
				this.tabActive(0)
				this.selectShow = false;
			},
			imgTab(tab) {
				if (tab== "area") {
					var imgRotate = this.$refs.imgRotates;
					animation.transition(imgRotate, {
						styles: {
							transform: this.imgRotate ? 'rotate(180deg)' : 'rotate(0)',
							transformOrigin: 'center center'
						},
						duration: 500,
						timingFunction: 'ease',
						delay: 0
					})
				}
				if(tab=="category"){
					var imgRotate1 = this.$refs.imgRotates1;
					animation.transition(imgRotate1, {
						styles: {
							transform: this.imgRotate1 ? 'rotate(180deg)' : 'rotate(0)',
							transformOrigin: 'center center'
						},
						duration: 500,
						timingFunction: 'ease',
						delay: 0
					})
				}
				if(tab=="brand"){
					var imgRotate2 = this.$refs.imgRotates2;
					animation.transition(imgRotate2, {
						styles: {
							transform: this.imgRotate2 ? 'rotate(180deg)' : 'rotate(0)',
							transformOrigin: 'center center'
						},
						duration: 500,
						timingFunction: 'ease',
						delay: 0
					})
				}
			}
		}
	}

</script>