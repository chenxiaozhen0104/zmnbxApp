<template>
    <div class="loading-bg">
        <image class="loading-img" src="http://img.zmnbx.com//dist/Images/loading.gif"></image>
        <text class="loading-text">{{title}}</text>
    </div>
</template>
<style>
    .loading-img {
        height: 100px;
        width: 100px;
    }
    
    .loading-bg {
        height: 200px;
        width: 200px;
        background-color:rgba(40,40,40,0.8);
        justify-content: center;
        align-items: center;
        position:absolute;
        left:275px;
        top:565px;
    }
    
    .loading-text {
        padding-top: 20px;
        font-size: 26px;
        color:white;
    }
</style>

<script>
    module.exports = {
        name: 'Loading',
        props:['title']
    }

</script>