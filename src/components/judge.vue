<template>
    <div class="import">
        <input class="import-code" type="text" placeholder="请输入验证码" value={{a}} />
    </div>
</template>

<style>
    .import {
        position: relative;
        width: 650px;
        height: 70px;
        display: flex;
        justify-content: space-between;
        border-style: solid;
        border-width: 1px;
        border-color: rgb(162, 162, 162);
        margin-top: 20px;
    }
    
    .import-code {
        position: absolute;
        left: 50px;
        top: 0;
        height: 70px;
        width: 650px;
        border: none;
    }
</style>
<script>
    module.exports = {
        name: 'judge',
        data: function () {
            return {
                value: null
            }
        },
        methods: {
            judge: function () {
                if (a == null) {
                    alert('请输入验证码')
                }
            }
        }
    }

</script>