const routes = [
    { path: '/revista', component: httpVueLoader('revistaindex.vue'), props: true },
    { path: '/revista/create', component: httpVueLoader('revistacreate.vue'), props: { create: true } },
    { path: '/revista/:id', component: httpVueLoader('revistadetails.vue'), props: { show: true } },
    { path: '/revista/edit/:id', component: httpVueLoader('revistaedit.vue'), props: { show: true } },
    { path: '/revista/delete/:id', component: httpVueLoader('polldetails.vue'), props: { show: true } }
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router,
    el: "#app",
    data: {
        titulo: "Proyecto #1: Esteban Espinoza & Marco Murillo"
    }
}).$mount('#app')