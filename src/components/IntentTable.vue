<template lang="pug">
v-layout(v-resize="onResize" column style="padding-top:50px")
    v-data-table(:headers="headers" :items='items' hide-default-header height="500px"  :class="{mobile: isMobile}" :pagination.sync="pagination" :items-per-page='5')   
        template(v-slot:top)
            v-toolbar(flat)
                v-toolbar-title Intents
                v-divider(class="mx-4" inset vertical)
                v-spacer
                v-dialog(v-model="dialog" max-width="500px")
                    template(v-slot:activator="{ on, attrs }") 
                        v-btn#createBtn(color="#848DE3" dark class="mb-2" v-bind="attrs" v-on="on") + Create
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


        template(v-slot:item="{item}")            
            tr(v-if="!isMobile")
                td.list-item-not-mobile {{item.id}}
                td.list-item-not-mobile {{item.IntentName}}
                td.list-item-not-mobile {{item.TrainingPhrases}}
                td.list-item-not-mobile {{item.Reply.message_content}}
                td.list-item-not-mobile {{item.Prompts.PromptQuestion}}
                td.list-item-not-mobile
                    v-icon(small class="mr2" @click="editItem(item)" style="text-align: center;") mdi-pencil
                    v-icon(small @click="deleteItem(item)" color="red") mdi-delete
            tr(v-else)
                td
                    ul.flex-content
                        li.flex-item#id(data-label="ID") {{item.id}}
                        li.flex-item(data-label = "Name")  {{item.IntentName}}  
                        li.flex-item(data-label="TrainingPhrases") {{item.TrainingPhrases}}
                        li.flex-item(data-label="Reply") {{item.Reply.message_content}}
                        li.flex-item#prompt(data-label="Prompts")  {{item.Prompts.PromptQuestion}}
                        li.flex-item(data-label="Actions")
                            v-icon(small class="mr2" @click="editItem(item)") mdi-pencil
                            v-icon(small @click="deleteItem(item)" color="red") mdi-delete
                     
        template.header(v-slot:header="{ props }" v-if="!isMobile")
            th.header-id {{ props.headers[0].text }}  
            th.header-d {{ props.headers[1].text }}                
            th.header-d {{ props.headers[2].text }}                
            th.header-d {{ props.headers[3].text }}                
            th.header-d {{ props.headers[4].text }}
            th.header-actions Actions

</template> 
<script>
import axios from 'axios'
// import { info } from 'console'
export default {

    name: 'IntentTable',
    data: () => ({

        headers: [

            {
                text: 'ID',
                sortable: true,
                value: 'id',
                class: "v-data-table-header"
                // class: "white--text v-data-table-header",
            },
            {
                text: 'Name',
                value: 'IntentName',
            },
            {
                text: 'Training Phrases',
                value: 'TrainingPhrases',
            },
            {
                text: 'Reply',
                value: 'Reply.message_content',
            },
            {
                text: 'Prompts',
                value: 'Prompts.PromptQuestion',
                id: 'header-prompts',
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false,
            }
        ],
        trainingPhrase: null,
        dialog: false,
        editedIndex: -1,
        dialogDelete: false,

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
        isMobile: false,
    }
    ),
    methods: {
        onResize() {
            if (window.innerWidth < 769)
                this.isMobile = true;
            else
                this.isMobile = false;
        },
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
<style lang="sass" scoped src="@/assets/style/_IntentTable.sass">
</style>