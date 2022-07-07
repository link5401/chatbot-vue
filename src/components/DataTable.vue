<template lang="pug">
.dataTable
    v-data-table(:headers='headers' :items='items' hide-default-header :items-per-page='5')   
        CreateIntent
        template.header(v-slot:header="{ props }")
            //- th.header-text-color(v-for="head in props.headers") {{head.text}}
            th.header-id {{ props.headers[0].text }}  
            th.header-d {{ props.headers[1].text }}                
            th.header-d {{ props.headers[2].text }}                
            th.header-d {{ props.headers[3].text }}                
            th.header-prompt {{ props.headers[4].text }}        
        template(v-slot:item.id="{ item }")
            div.body-data {{ item.id }}
        template(v-slot:item.IntentName="{ item }")
            div.body-data {{ item.IntentName }}
        template(v-slot:item.TrainingPhrases="{ item }")
            div.body-data {{ item.TrainingPhrases }}
        template(v-slot:item.Reply.message_content="{ item }")
            div.body-data {{ item.Reply.message_content }}
        template(v-slot:item.Prompts.PromptQuestion="{ item }")
            div.body-data {{ item.Prompts.PromptQuestion }}            

</template> 
<script>
import axios from 'axios'
import CreateIntent from '../components/CreateIntent.vue'
// import { info } from 'console'
export default {

    name: 'DataTable',
    data: () => ({
        dialog: false,
        headers: [
            {
                text: 'ID',
                align: 'start',
                sortable: true,
                value: 'id',
            },
            { text: 'Name', value: 'IntentName' },
            { text: 'Training Phrases', value: 'TrainingPhrases' },
            { text: 'Reply', value: 'Reply.message_content' },
            { text: 'Prompts', value: 'Prompts.PromptQuestion', id: 'header-prompts' }
        ],
        items: [
        ]

    }),
    methods: {

        getIntentList() {
            console.log(this.$store.state.token)
            axios
                .get('http://localhost:3000/intents/listIntent', {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'token': this.$store.state.token
                    }
                })
                .then(response => {
                    console.log(response.data.intentList)
                    for (const i of response.data.intentList) {
                        this.items.push(i);
                    }
                })
        }
    },
    created() {
        this.getIntentList()
    },
    components:{
        CreateIntent
    }
}
</script>
<style scoped lang = "sass">
$bg-header: linear-gradient(180deg, #848DE3 0%, #CAB8FD 100%)

.header-id
    background: $bg-header
    // border-radius: 20px 0px 0px 0px
    height: 70px
    
    font-family: 'Inter'
    font-style: normal
    font-weight: 700
    font-size: 14px
    line-height: 17px


    color: #FFFFFF

.header-d
    height: 70px
    background: $bg-header

    font-family: 'Inter'
    font-style: normal
    font-weight: 700
    font-size: 14px
    line-height: 17px


    color: #FFFFFF
.header-prompt
    height: 70px
    background: $bg-header
    // border-radius: 0px 20px 0px 0px

    font-family: 'Inter'
    font-style: normal
    font-weight: 700
    font-size: 14px
    line-height: 17px


    color: #FFFFFF
#head
    font-family: 'Inter'
    font-style: normal
    font-weight: 700
    font-size: 14px
    line-height: 17px
th
    text-align: center
    vertical-align: middle   
.body-data
    vertical-align: middle
    text-align: center
.dataTable
    background: $__dashboard_bg

</style>