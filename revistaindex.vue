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
                                <router-link class="button" :to="'/revista/delete/'+rev.id"><img src="./images/delete.png" style="width:20px"></router-link>
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
        }  
    }
}

</script>