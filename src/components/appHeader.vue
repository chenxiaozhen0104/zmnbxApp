<!--<template>
    <div class="header">
        <div class="header-content">
            <div class="return-img" @click="_back">
                <image class="header-return" src="http://img.zmnbx.com//dist/Images/return1.png" v-if='canBack||back'></image>
            </div>
            <text class="header-text">{{title}}</text>
        </div>
    </div>
</template>

<style>
    .header {
        width: 750px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }
    
    .header-content {
        height: 88px;
        background-color: #0092FC;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
        top: 0;
        left: 0;
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
</style>

<script>
    const modal = weex.requireModule('modal');
    import C from '../store/constants'
    module.exports = {
        name: 'app-header',
       props: ['title', 'canBack','back'],
        methods: {
            _back() {
                    if (this.back) {
                        modal.toast({
                            message: "3",
                            duration: 0.2
                        })
                          this.pageTo(this.back)
                          return
                        // this.pageBack()
                    }
                    modal.toast({
                            message: this.canBack,
                            duration: 0.2
                        })
                      this.$events.emit(C.event.DETAIL_BACK)
                    // this.$events.emit(C.event.DETAIL_BACK)
               
            }
        }
    }

</script>-->
<template>
    <div class="header">
        <div class="header-content">
            <div class="header-img" @click='_back'>
                <image class="header-return" src="http://img.zmnbx.com//dist/Images/return1.png" v-if='canBack||back'></image>
            </div>
            <text class="header-text">{{title}}</text>
        </div>
    </div>
</template>

<style>
    .header {
        width: 750px;
    }

    .header-img {
        width: 88px;
        height: 88px;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
    }
 .header-content {
        height: 88px;
        background-color: #0092FC;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
        top: 0;
        left: 0;
    }
   

    .header-return {
        height: 40px;
        width: 40px;
    }

    .header-text {
        font-size: 40px;
        color: white;
    }
</style>

<script>
    import C from '../store/constants'
    module.exports = {
        name: 'app-header',
        props: ['title', 'canBack','back'],
        methods: {
            _back() {
                if(this.back){
                    this.pageBack()
                    return
                }
                this.$events.emit(C.event.DETAIL_BACK)
            }
        }
    }

</script>