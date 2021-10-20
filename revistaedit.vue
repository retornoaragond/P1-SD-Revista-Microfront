<template>
    <div class="container" style="text-align: justify;">
        <h1>Comic Create</h1>
        <form>
            <div class="form-group">
                <label for="nameInput">Name:</label>
                <input type="text" class="form-control" name="name" v-model='revista.name'>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="editionInput">Edition:</label>
                    <input type="text" class="form-control" name="edition" v-model='revista.edition'>
                </div>
                <div class="form-group col-md-6">
                    <label for="LanguageInput">Language:</label>
                    <input type="text" class="form-control" name="language" v-model='revista.language'>
                </div>
            </div>
        </form>
        <div class="form-group">
            <label for="Input">Ilustrator:</label>
            <!-- <input type="text" class="form-control" readonly name="id" v-model='id'> -->
            <select v-model="selected" class="form-control sl">
                <option v-for="option in ilustrator" v-bind:value="option.id">{{ option.name }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="idInput">Id:</label>
            <input type="text" class="form-control" readonly name="id" v-model='revista.id'>
        </div>
        <div class="form-row">
                <div class="form-group col-md-6">
                    <h1>Characters:</h1>
                </div>
                <div class="form-group col-md-6">
                    <button class="btn btn-primary" id="show-modal" @click="showModal = true">Assign Characters</button>
                </div>
            </div>            
            <table class="table table-sm text-left">
                <thead>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cha in this.revista.characters">                       
                        <td>
                            <li><a :href="'https://characters-p1-sd.netlify.app/#/personaje/'+cha.id">{{cha.name}}</li>
                            <!-- Cambiar por el microfront end -->
                        </td>
                    </tr>                  
                </tbody>
            </table>
        <router-link class="btn btn-primary" :to="'/revista'">Back</router-link>
        <button class="btn btn-primary" v-on:click="updateRevista()">Create</button>
        <div v-if="showModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Assign Characters</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showModal = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <!-- -->
                                    <table class="table table-sm text-left">
                                        <thead>
                                            <tr>
                                                <td>Name</td>
                                                <td>Name</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="comic in this.personajes">  
                                                <td>{{comic.name}}</td>                     
                                                <td>
                                                   <button type="button" class="btn btn-primary" v-on:click="addCharacters(comic.id,comic.name)">Add</button>
                                                </td>
                                            </tr>                  
                                        </tbody>
                                    </table>
                                    <!-- -->
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>

    




</template>

<script>
module.exports = {
    props:['title'],
    data:function () {
        return {
            revista:{id:"",name:"",edition:"",language:"",ilustrador_id:-1,characters:[]},
            ilustrator:[],
            revistas:[],
            personajes:[],
            selected:'',
            cha:[],
            showModal:false
        }
    },
    created () {
        this.getRevistas(app.$route.params.id),
        this.getilustrator(),
        this.getCharacters()
    },
    methods: {
        getRevistas(id){
            fetch('https://p1-sd-revistas-microservice.herokuapp.com/revista/'+id,{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.revista = data;
                this.cha = this.revista.characters;
            })
            .catch(function (error) {
                console.log('Error f1: ' + error);
            })
        },
        getNextId(obj) {
            return (Math.max.apply(Math, obj.map(function(o) {
                return o.id;
            })) + 1);
        },
        getilustrator(){
            fetch('https://p1-sd-ilustrador-microservice.herokuapp.com/ilustrador',{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.ilustrator = data;
                //console.log('Print: ' + this.ilustrator.name);
            })
            .catch(function (error) {
                console.log('Error f1: ' + error);
            }) 
        },
        getCharacters(){
            fetch('https://p1-sd-personajes-microservice.herokuapp.com/personaje',{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.personajes = data;
                //console.log('Print: ' + this.ilustrator.name);
            })
            .catch(function (error) {
                console.log('Error f1: ' + error);
            }) 
        },
        updateRevista(){
            let ilus = this.revista;
            ilus.ilustrador_id = this.selected;
            ilus.characters = this.cha;
            console.log(JSON.stringify(ilus));
            const opc = {
                method:"PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(ilus)
            };
            fetch("https://p1-sd-revistas-microservice.herokuapp.com/revista/"+ilus.id,opc)
                .then((data) => {
                console.log('Print1: ' + data.name);
                router.push('/revista');
            })
            console.log(opc);
        },
        addCharacters(id,name){
            let c = [];
            c = this.revista.characters;
            let iden = id;
            console.log(iden);
            let nam = name;
            console.log(name);
            c.push({character_id:iden,character_name:nam});
            this.revista.characters = c;
            console.log(c);
            this.showModal = false;
        }
    }
}
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>