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
                <label for="idInput">Id:</label>
                <input type="text" class="form-control" readonly name="id" v-model='id'>
            </div>
        <router-link class="btn btn-primary" :to="'/revista'">Back</router-link>
        <a class="btn btn-primary" v-on:click="createRevista()">Create</a>
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
            id:0
        }
    },
    created () {
        this.getRevistas()
    },
    methods: {
        getRevistas(){
            fetch('https://p1-sd-revistas-microservice.herokuapp.com/revista',{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.revistas = data;
                this.id = this.getNextId(this.revistas);
                
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
        getilustrator(id){
            if(id === -1){
            this.ilustrator= {id:0,name:'No Definido'};
            }else{
            fetch('https://p1-sd-ilustrador-microservice.herokuapp.com/ilustrador/'+id,{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.ilustrator = data;
                console.log('Print: ' + this.ilustrator.name);
            })
            .catch(function (error) {
                console.log('Error f1: ' + error);
            }) 
            }
           
        },
        createRevista(){
            this.revista.id = this.id;
            let ilus = this.revista;
            console.log(JSON.stringify(ilus));
            const opc = {
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(ilus)
            };
            fetch("https://p1-sd-revistas-microservice.herokuapp.com/revista",opc)
                .then((data) => {
                console.log('Print1: ' + data.name);
                router.push('/revista');
            })
            //console.log(opc);
        }
    }
}

</script>