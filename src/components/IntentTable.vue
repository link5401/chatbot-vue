<template lang="pug">
v-layout(v-resize="onResize" column style="padding-top:50px")
    v-data-table(:headers="headers" :items='items' hide-default-header height="500px"  :class="{ mobile: isMobile }" :pagination.sync="pagination" :items-per-page='5')   
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


        template(v-slot:item="{ item }")            
            tr(v-if="!isMobile")
                td.list-item-not-mobile {{ item.id }}
                td.list-item-not-mobile {{ item.IntentName }}
                td.list-item-not-mobile {{ item.TrainingPhrases }}
                td.list-item-not-mobile {{ item.Reply.message_content }}
                td.list-item-not-mobile {{ item.Prompts.PromptQuestion }}
                td.list-item-not-mobile
                    v-icon(small class="mr2" @click="editItem(item)" style="text-align: center;") mdi-pencil
                    v-icon(small @click="deleteItem(item)" color="red") mdi-delete
            tr(v-else)
                td
                    ul.flex-content
                        li.flex-item#id(data-label="ID") {{ item.id }}
                        li.flex-item(data-label = "Name")  {{ item.IntentName }}  
                        li.flex-item(data-label="TrainingPhrases") {{ item.TrainingPhrases }}
                        li.flex-item(data-label="Reply") {{ item.Reply.message_content }}
                        li.flex-item#prompt(data-label="Prompts")  {{ item.Prompts.PromptQuestion }}
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
<script src="@/scripts/IntentTable">

</script>
<style lang="sass" scoped src="@/assets/style/_IntentTable.sass">
</style>