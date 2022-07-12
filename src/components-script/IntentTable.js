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
        newName: "",
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
                axios
                    .patch("http://localhost:3000/intents/modifyIntent", {
                        IntentName: this.items[this.editedIndex].IntentName,
                        newName: this.editedItem.IntentName,
                        trainingPhrases: this.editedItem.TrainingPhrases.toString().split(","),
                        reply: {
                            message_content: this.editedItem.Reply.message_content,
                            userID: this.$store.state.username
                        },
                        prompts: {
                            PromptQuestion: this.editedItem.Prompts.PromptQuestion.toString().split(",")
                        },

                    }, {
                        headers: {
                            'token': this.$store.state.token
                        }
                    }).then(response => {
                        console.log(response)
                        this.newName = ""
                    })
                Object.assign(this.items[this.editedIndex], this.editedItem)
            } else {

                axios
                    .post("http://localhost:3000/intents/addIntent", {
                        IntentName: this.editedItem.IntentName,
                        trainingPhrases: this.editedItem.TrainingPhrases.toString().split(","),
                        reply: {
                            message_content: this.editedItem.Reply.message_content,
                            userID: this.$store.state.username
                        },
                        prompts: {
                            PromptQuestion: this.editedItem.Prompts.PromptQuestion.toString().split(",")
                        },

                    }, { headers: { 'token': this.$store.state.token } })
                    .then(response => {
                        console.log(response)
                    })

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