<template>
    <div class="track-rcol">
		<div class="track-list">
			<div class="time-style">
				<text class="time">2017-03-10 15:11:14</text>
				<text class="txt">安排工作人员:张某某为您服务，联系电话：1380000002</text>
			</div>
			<image class="time-circle" src="http://img.zmnbx.com//dist/Images/ciricleBlue.png"></image>
		</div>
		
		<div class="track-list">
			<div class="time-style">
				<text class="time">2017-03-10 15:11:14</text>
				<text class="txt">创建新工单</text>
			</div>
			<image class="time-circle" src="http://img.zmnbx.com//dist/Images/circleGray.png"></image>
		</div>
		<div class="track-list">
			<div class="time-style">
				<text class="time">2017-03-10 15:07:36</text>
				<text class="txt">工单已下发，等待派单</text>
			</div>
			<image class="time-circle" src="http://img.zmnbx.com//dist/Images/circleGray.png"></image>
		</div>
	</div>
</template>

<style>
    .track-rcol{
		width: 750px; 
	}
    .track-list{
		 padding-left: 40px; 
		 position: relative
	}
    .time-style{
		padding-top:5px;
		padding-left:40px;
		padding-right:30px;
		padding-bottom:30px;
		line-height: 18px; 
		border-left-style:solid;
		border-left-color: #d6d6d6;
		border-left-width:2px;
		color: #728594;
		font-size: 26px;
	}
	.time-circle{
		position:absolute;
		left:26px;
		top:0;
		height:30px;
		width:30px;
	}
	.time,.txt{
		margin-right: 20px; 
		padding-bottom:10px;
		color:#c0c0c0;
	}


</style>

<script>
	 module.exports = {
        name: 'TimeLine',
    }

</script>