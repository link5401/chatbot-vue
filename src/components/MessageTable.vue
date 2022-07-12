<template lang="pug">
v-layout(v-resize="onResize" column style="padding-top:50px")
    v-data-table(:headers="headers" :items='items' hide-default-header height="500px"  :class="{mobile: isMobile}" :pagination.sync="pagination" :items-per-page='5')   
        template(v-slot:top)
            v-toolbar(flat)
                v-toolbar-title Intents
                v-divider(class="mx-4" inset vertical)
                v-spacer
                v-dialog(v-model="dialogDelete" max-width='500px')
                    v-card
                        v-card-title.text-h5 Are you sure you want to delete this item?
                        v-card-actions
                            v-spacer
                            v-btn(color='blue darken-1' text @click="closeDelete") Cancel
                            v-btn(color='blue darken-1' text @click="deleteItemConfirm") OK                       
        //- template(v-slot:item.actions="{ item }")
        //-     v-icon(small @click="deleteItem(item)" color="red") mdi-delete
        //- template.header(v-slot:header="{ props }")
        //-     //- th.header-text-color(v-for="head in props.headers") {{head.text}}
        //-     th.header-id {{ props.headers[0].text }}  
        //-     th.header-d {{ props.headers[1].text }}                
        //-     th.header-d {{ props.headers[2].text }}                
        //-     th.header-d {{ props.headers[3].text }}                
        //-     //- th.header-d {{ props.headers[4].text }}
        //-     th.header-actions Actions
        //- template(v-slot:item.UserID="{ item }")
        //-     div.body-data {{ item.UserID }}
        //- template(v-slot:item.Time="{ item }")
        //-     div.body-data {{ item.time }}
        //- template(v-slot:item.InputMessage="{ item }")
        //-     div.body-data {{ item.InputMessage }}
        //- template(v-slot:item.OutputMessage="{ item }")
        //-     div.body-data {{ item.OutputMessage }}       
        template(v-slot:item="{ item }")            
            tr(v-if="!isMobile")
                td.list-item-not-mobile {{ item.UserID}}
                td.list-item-not-mobile {{ item.time }}
                td.list-item-not-mobile {{ item.InputMessage }}
                td.list-item-not-mobile {{ item.OutputMessage }}
                td.list-item-not-mobile
                    v-icon(small @click="deleteItem(item)" color="red") mdi-delete
            tr(v-else)
                td
                    ul.flex-content
                        li.flex-item#id(data-label="ID") {{ item.UserID }}
                        li.flex-item(data-label = "Name")  {{ item.time }}  
                        li.flex-item(data-label="TrainingPhrases") {{ item.InputMessage }}
                        li.flex-item(data-label="Reply") {{ item.OutputMessage }}
                        li.flex-item(data-label="Actions")
                            v-icon(small @click="deleteItem(item)" color="red") mdi-delete

        template.header(v-slot:header="{ props }" v-if="!isMobile")
            th.header-id {{ props.headers[0].text }}  
            th.header-d {{ props.headers[1].text }}                
            th.header-d {{ props.headers[2].text }}                
            th.header-d {{ props.headers[3].text }}                
            th.header-d {{ props.headers[4].text }}

</template> 
<script>
import axios from 'axios'
// import { info } from 'console'
export default {

    name: 'MessageTable',
    data: () => ({
        isMobile: false,
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
        onResize() {
            if (window.innerWidth < 769)
                this.isMobile = true;
            else
                this.isMobile = false;
        },
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
<style scoped lang = "sass" src="@/assets/style/_IntentTable.sass">



</style>