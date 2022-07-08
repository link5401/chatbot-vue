<template lang="pug">
.dataTable
    v-data-table(:headers='headers' :items='items' hide-default-header :items-per-page='5')   
        template(v-slot:top)
            v-toolbar(flat)
                v-toolbar-title Intents
                v-divider(class="mx-4" inset vertical)
                v-spacer
                v-dialog(v-model="dialog" max-width="500px")
                    template(v-slot:activator="{ on, attrs }") 
                        v-btn(color="primary" dark class="mb-2" v-bind="attrs" v-on="on") CREATE+
                    v-card
                        v-card-title
                            span(class="text-h5") {{ cardTitle }}
                        v-card-text
                            v-container
                                v-row
                                    v-col(cols="12",sm="6",md="4")
                                        v-text-field(v-model="editedItem.IntentName" label="Intent Name")
                                    v-col(cols="12",sm="6",md="4")
                                        v-text-field(v-model="editedItem.TrainingPhrases" label="Training Phrases")
                                    v-col(cols="12",sm="6",md="4")
                                        v-text-field(v-model="editedItem.Reply.message_content" label="Reply")
                                    v-col(cols="12",sm="6",md="4")
                                        v-text-field(v-model="editedItem.Prompts.PromptQuestion" label="Prompts")
                        v-card-actions
                            v-spacer
                            v-btn(color='blue darken-1' text='' @click='close') Cancel
                            v-btn(color='blue darken-1' text='' @click='save') Save
                v-dialog(v-model="dialogDelete" max-width='500px')
                    v-card
                        v-card-title.text-h5 Are you sure you want to delete this item?
                        v-card-actions
                            v-spacer
                            v-btn(color='blue darken-1' text @click="closeDelete") Cancel
                            v-btn(color='blue darken-1' text @click="deleteItemConfirm") OK                       
        template(v-slot:item.actions="{ item }")
            v-icon(small class="mr2" @click="editItem(item)") mdi-pencil
            v-icon(small @click="deleteItem(item)" color="red") mdi-delete
        template.header(v-slot:header="{ props }")
            //- th.header-text-color(v-for="head in props.headers") {{head.text}}
            th.header-id {{ props.headers[0].text }}  
            th.header-d {{ props.headers[1].text }}                
            th.header-d {{ props.headers[2].text }}                
            th.header-d {{ props.headers[3].text }}                
            th.header-d {{ props.headers[4].text }}
            th.header-actions Actions
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
// import { info } from 'console'
export default {

    name: 'DataTable',
    data: () => ({
        trainingPhrase: null,
        dialog: false,
        editedIndex: -1,
        dialogDelete: false,

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
            { text: 'Prompts', value: 'Prompts.PromptQuestion', id: 'header-prompts' },
            { text: 'Actions', value: 'actions', sortable: false }
        ],

        items: [
        ],
        editedItem: {
            IntentName: "",
            TrainingPhrases: [],
            Reply: {
                message_content: "",
            },
            Prompts: { PromptQuestion: [] },
        },
        defaultItem: {
            IntentName: "",
            TrainingPhrases: [],
            Reply: {
                message_content: "",
            },
            Prompts: { PromptQuestion: [] },
        },


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
        },
        // createFormData(arr){
        //     const bodyFormData = new FormData();
        //     arr.forEach((item) => {
        //         bodyFormData.append('arr[]',item);
        //     })
        //     return bodyFormData
        // },
        editItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)

            // console.log(item)
            this.dialog = true
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        deleteItem(item) {
            this.editedIndex = this.items.indexOf(item)

            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.items.splice(this.editedIndex, 1)

            axios
                .delete("http://localhost:3000/intents/deleteIntent",
                    {
                        headers: {
                            token: this.$store.state.token
                        },

                        data: {
                            intentName: this.editedItem.IntentName
                        }
                    }
                )
            this.closeDelete()
        },



        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.items[this.editedIndex], this.editedItem)
            } else {
                if (this.editedItem.Prompts.PromptQuestion.length == 0) {
                    axios
                        .post("http://localhost:3000/intents/addIntent", {
                            IntentName: this.editedItem.IntentName,
                            trainingPhrases: this.editedItem.TrainingPhrases.split(","),
                            reply: {
                                message_content: this.editedItem.Reply.message_content,
                                userID: this.$store.state.username
                            },
                            prompts: {
                                PromptQuestion: this.editedItem.Prompts.PromptQuestion
                            },

                        }, { headers: { 'token': this.$store.state.token } })
                        .then(response => {
                            console.log(response)
                        })
                } else {
                    axios
                        .post("http://localhost:3000/intents/addIntent", {

                            IntentName: this.editedItem.IntentName,
                            trainingPhrases: this.editedItem.TrainingPhrases.split(","),
                            prompts: {
                                PromptQuestion: this.editedItem.Prompts.PromptQuestion.split(",")
                            },


                        }, { headers: { 'token': this.$store.state.token } })
                        .then(response => {
                            console.log(response)
                        })
                }
                this.items.push(this.editedItem)
            }
            this.close()
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

    },
    computed: {
        cardTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    created() {
        this.getIntentList()
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

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
.header-actions
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