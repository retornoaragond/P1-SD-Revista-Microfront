<template>
        <div class="container">
        <h1>Revistas</h1>
            <div class="table-responsive">
                <table class="table table-bordered " style="width:100%;">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='rev in this.revistas'>
                            <td>{{rev.name}}</td>
                            <td>
                                <router-link class="button" :to="'/revista/'+rev.id"><img src="./images/font-eye.png" style="width:20px"></router-link>
                                <router-link class="button" :to="'/revista/edit/'+rev.id"><img src="./images/font-edit.png" style="width:20px"></router-link>
                               <button type="button" class="btn btn-primary" v-on:click="deleteRevista(rev.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <router-link class="btn btn-primary" :to="'/revista/create'">Create</router-link>
        </div>
</template>

<script>
module.exports = {
    props:['title'],
    data:function () {
        return {
            revistas:[]
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
            })
        },
        deleteRevista(id){
            console.log('Hola1 '+id);
            const opc = {
                method:"POST",
                headers:{"Content-Type": "application/json"}
            };
            fetch("https://p1-sd-revistas-microservice.herokuapp.com/revista/delete/"+id,opc)
                .then((data) => {
                console.log('Print1: ' + data.name);
            })

        }
    }
}

</script>