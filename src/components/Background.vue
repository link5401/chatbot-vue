<template lang="pug">
.background
    v-container#container
        v-container.bg
        img#group05-wave(src='../assets/img/group05-wave.png')
        img#group311-circle-lines(src='../assets/img/group311-cricle-lines.png')
        img#group310-circle-lines(src='../assets/img/group310-circle-lines.png')
        img#group9-triangle(src='../assets/img/group9-triangle.png')
        img#group08-spiral(src='../assets/img/group08-spiral.png')
        #cube-text CUBE SYSTEM VIETNAM CO.,LTD. © 2022
        img#group313-chatbot-logo(src='../assets/img/group313-chatbot-logo.png')
        img#bx-message-details(src='../assets/img/bx_message-detail.png')
</template>


<style lang="sass">
.background
    background: linear-gradient(293.09deg, #9772FB 0%, #5C6AE4 100%)
    height: 100vh
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    position: relative
   


#group05-wave 
    position: absolute
    top: -480px
    left: 165px
    max-width: 100%
    width: 313.49px
    height: 80px


#group311-circle-lines 
    position: absolute
    width: 337.33px
    height: 349.15px
    max-width: 100%
    left: 1405px
    top: 215px



#group310-circle-lines 
    position: absolute
    max-width: 100%

    width: 337.11px
    height: 348.93px
    left: 1405px
    top: -500px


#group9-triangle 
    position: absolute
    max-width: 100%

    left: 43px
    top: -320px


#group08-spiral 
    position: absolute
    max-width: 100%

    left: 43px
    top: 295px


#cube-text 
    position: absolute

    font-family: 'Lato'
    font-style: thin
    font-size: 18px
    line-height: 22px
    color: #FFFFFF
    top: 445px
    left: 720px


#group313-chatbot-logo 
    position: absolute
    width: 212px
    height: 261px
    left: 789px
    top: -425px


#bx-message-details 
    position: absolute

    left: 480px
    top: 120px

</style>
<script>
export default {
    name: 'BackGround',
    data() {
        return {
            image: "@/assets/background.png",
        };
    },
};
</script>