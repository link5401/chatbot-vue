<template lang="pug">
div
    //- .background2
    .background1
        #cube-text CUBE SYSTEM VIETNAM CO.,LTD. © 2022
    //- v-container#container
        //- div#group05-wave
        //- img#group311-circle-lines(src='../assets/img/group311-cricle-lines.png')
        img#group310-circle-lines(src='../assets/img/group310-circle-lines.png')
        img#group9-triangle(src='../assets/img/group9-triangle.png')
        img#group08-spiral(src='../assets/img/group08-spiral.png')
    
        //- img#group313-chatbot-logo(src='../assets/img/group313-chatbot-logo.png')
        //- img#bx-message-details(src='../assets/img/bx_message-detail.png')
    <slot/>
</template>


<style lang="css" src="@/assets/style/_background.css">


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