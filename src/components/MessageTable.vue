<template lang="pug">
.dataTable
    v-data-table(:headers='headers' :items='items' hide-default-header :items-per-page='5')   
        template(v-slot:top)
            v-toolbar(flat)
                v-toolbar-title Intents
                v-divider(class="mx-4" inset vertical)
                v-spacer
                v-dialog(v-model="dialog" max-width="500px")
                    v-card
                        v-card-title
                            span(class="text-h5") {{ cardTitle }}
                        v-card-text
                            v-container
                                v-row
                                    v-col(cols="12",sm="6",md="4")
                                        v-text-field(v-model="editedItem.UserID" label="Input Message")
                                    v-col(cols="12",sm="6",md="4")
                                        v-text-field(v-model="editedItem.Time" label="Output Message")
                                    v-col(cols="12",sm="6",md="4")
                                        v-text-field(v-model="editedItem.InputMessage" label="Time")
                                    v-col(cols="12",sm="6",md="4")
                                        v-text-field(v-model="editedItem.OutputMessage" label="User ID")
                v-dialog(v-model="dialogDelete" max-width='500px')
                    v-card
                        v-card-title.text-h5 Are you sure you want to delete this item?
                        v-card-actions
                            v-spacer
                            v-btn(color='blue darken-1' text @click="closeDelete") Cancel
                            v-btn(color='blue darken-1' text @click="deleteItemConfirm") OK                       
        template(v-slot:item.actions="{ item }")
            v-icon(small @click="deleteItem(item)" color="red") mdi-delete
        template.header(v-slot:header="{ props }")
            //- th.header-text-color(v-for="head in props.headers") {{head.text}}
            th.header-id {{ props.headers[0].text }}  
            th.header-d {{ props.headers[1].text }}                
            th.header-d {{ props.headers[2].text }}                
            th.header-d {{ props.headers[3].text }}                
            //- th.header-d {{ props.headers[4].text }}
            th.header-actions Actions
        template(v-slot:item.UserID="{ item }")
            div.body-data {{ item.UserID }}
        template(v-slot:item.Time="{ item }")
            div.body-data {{ item.time }}
        template(v-slot:item.InputMessage="{ item }")
            div.body-data {{ item.InputMessage }}
        template(v-slot:item.OutputMessage="{ item }")
            div.body-data {{ item.OutputMessage }}            

</template> 
<script>
import axios from 'axios'
// import { info } from 'console'
export default {

    name: 'MessageTable',
    data: () => ({
        trainingPhrase: null,
        dialog: false,
        editedIndex: -1,
        dialogDelete: false,

        headers: [


            {
                text: 'User ID',
                align: 'start',
                sortable: true,
                value: 'UserID',
            },
            { text: 'time', value: 'Time' },
            { text: 'Input Message', value: 'InputMessage' },
            { text: 'Output Message', value: 'OutputMessage', id: 'header-prompts' },
            { text: 'Actions', value: 'actions', sortable: false }
        ],

        items: [
        ],
        editedItem: {
            UserID: "",
            Time: "",
            InputMessage: "",
            OutputMessage: "",
        },
        defaultItem: {
            UserID: "",
            Time: "",
            InputMessage: "",
            OutputMessage: "",
        },


    }),
    methods: {
        getMessageLog() {
            console.log(this.$store.state.token)
            axios
                .get('http://localhost:3000/intents/getMLog', {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'token': this.$store.state.token
                    }
                })
                .then(response => {
                    console.log(response.data.messageLog)
                    for (const m of response.data.messageLog) {
                        this.items.push(m);
                    }
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
        this.getMessageLog()
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
    border-radius: 20px 0px 0px 0px
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
    border-radius: 0px 20px 0px 0px

    font-family: 'Inter'
    font-style: normal
    font-weight: 700
    font-size: 14px
    line-height: 17px


    color: #FFFFFF
#createBtn
    box-shadow: 0px 1px 10px 1px rgba(132, 141, 227, 0.5)
    border-radius: 16px
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