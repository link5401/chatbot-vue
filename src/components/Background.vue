<template>
    <div id="Background">
        <v-container id="container">
            <img id="group05-wave" src="../assets/group05-wave.png">

            <img id="group311-circle-lines" src="../assets/group311-cricle-lines.png">
            <img id="group310-circle-lines" src="../assets/group310-circle-lines.png">
            <img id="group9-triangle" src="../assets/group9-triangle.png">
            <img id="group08-spiral" src="../assets/group08-spiral.png">
            <div id="cube-text">CUBE SYSTEM VIETNAM CO.,LTD. © 2022</div>
            <img id="group313-chatbot-logo" src="../assets/group313-chatbot-logo.png">
            <img id="bx-message-details" src="../assets/bx_message-detail.png">
        </v-container>
    </div>
</template>


<style>
div[data-app='true'] {
    background: url('../assets/gradient-background.png') no-repeat center center !important;

    background-size: cover;
    background-position: absolute;
    
    overflow: hidden;

}

#container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
}

#group05-wave {
    position: absolute;
    top: -480px;
    left: 165px;
    max-width: 100%;
    width: 313.49px;
    height: 80px;
}

#group311-circle-lines {
    position: absolute;
    width: 337.33px;
    height: 349.15px;
    max-width: 100%;
    left: 1405px;
    top: 165px;

}

#group310-circle-lines {
    position: absolute;
    max-width: 100%;

    width: 337.11px;
    height: 348.93px;
    left: 1405px;
    top: -500px;
}

#group9-triangle {
    position: absolute;
    max-width: 100%;

    left: 43px;
    top: -320px;
}

#group08-spiral {
    position: absolute;
    max-width: 100%;

    left: 43px;
    top: 295px;
}

#cube-text {
    position: absolute;

    font-family: 'Lato';
    font-style: thin;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    top: 445px;
    left: 720px;
}

#group313-chatbot-logo {
    position: absolute;
    width: 212px; 
    height: 261px; 
    left: 789px;
    top: -425px;
}

#bx-message-details {
    position: absolute;

    left:480px;
    top:120px;
}
</style>
<script>
export default {
    name: 'BackGround'
};
</script>