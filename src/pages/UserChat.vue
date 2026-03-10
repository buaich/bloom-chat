<template>
  <div>
    <input type="text" v-model="userName" placeholder="userName" />
    <button @click="getAll">get all relations</button>
    <p>{{ data }}</p>
  </div>
</template>

<script lang="js">
import { mapActions, mapState } from 'vuex';

export default{
    name:"UserChat",

    data(){
        return {
            userName:""
        }
    },

    computed:{
        ...mapState("relationStore",["data"])
    },

    methods:{
        ...mapActions("relationStore",["getAllRelations"]),

        getAll(){
            console.log("<pages/UserChat.vue>:getAll() execute");

            this.getAllRelations({userName:this.userName})
        }
    }
}
</script>

<style scoped></style>
