<template>
  <div v-if="!loading">
    <div>
      {{this.usersMenus}}
    </div>
    <div class="pa-10">
      {{this.completeMenu}}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      usersMenus: [],
      usersMenus1: [],
      usersMenus2: [],
      usersMenus3: [],
      MenusDescription1: [],
      MenusDescription2: [],
      MenusDescription3: [],
      completeMenu: [],
      loading: true
    }
  },

  async created(){
    await this.getMenusDescription1()
    await this.getMenusDescription2()
    await this.getMenusDescription3()
    await this.getUsersMenus(1)
    // await this.getMenusFinal()
    this.loading = false
  },


  methods: {
    async getUsersMenus(id){
      axios.get(`http://localhost:5290/api/UsersMenusAccess/${id}`)
      .then((Response)=>{
        this.usersMenus1= Response.data.map(e => {
          return e.mainNodeID1
        })

        this.usersMenus1.forEach((e1, i, a) => {
          this.MenusDescription1.forEach(e2 => {
            if (e1 == e2.subVariableCode) {
              a[i] = e2.description
            }
          })
        })

        this.usersMenus2= Response.data.map(e => {
          return e.mainNodeID2
        })

        this.usersMenus2.forEach((e1, i, a) => {
          this.MenusDescription2.forEach(e2 => {
            if (e1 == e2.subVariableCode) {
              a[i] = e2.description
            }
          })
        })

        this.usersMenus3= Response.data.map(e => {
          return e.mainNodeID3
        })

        this.usersMenus3.forEach((e1, i, a) => {
          this.MenusDescription3.forEach(e2 => {
            if (e1 == e2.subVariableCode) {
              a[i] = e2.description
            }
          })
        })
        
        this.usersMenus1.forEach((e,i) => {
          let a = [ e, this.usersMenus2[i], this.usersMenus3[i]]
          this.usersMenus.push(a)
        })

        this.usersMenus.forEach(v => {
          v.forEach((v2,i2,a2) => {
            if(!(this.completeMenu.some((v3,i3,a3) => { return v2 === v3.title })) && i2 == 0) {
              let obj = { title: v2, subTitles: []}
              this.completeMenu.push(obj)
            }
          })
        })
        this.usersMenus.forEach((v,i,a) => {
          v.forEach((v2,i2,a2)=>{
            if (this.completeMenu.length === 0) {
              let obj = { title: v2, subTitles: []}
              this.completeMenu.push(obj)
            }
            if(this.completeMenu.some((v3,i3,a3) => { return v2 === v3.title })){
              let obj = {title: a2[i2+1]}
              let index = this.completeMenu.findIndex(
                element => element.title === v2
              )
              this.completeMenu[index].subTitles.push(obj)
            }
          })
        })
      });
    },
  
    async getMenusDescription1(){
      await axios.get(`http://localhost:5290/api/UsersMenusAccess/api/UsersMenusAccess/menusDescription/1`)
      .then((Response)=>{
        this.MenusDescription1 = Response.data
      });
    },
    async getMenusDescription2(){
      await axios.get(`http://localhost:5290/api/UsersMenusAccess/api/UsersMenusAccess/menusDescription/2`)
      .then((Response)=>{
        this.MenusDescription2 = Response.data
      });
    },
    async getMenusDescription3(){
      await axios.get(`http://localhost:5290/api/UsersMenusAccess/api/UsersMenusAccess/menusDescription/3`)
      .then((Response)=>{
        this.MenusDescription3 = Response.data
      });
    },

    async getMenusFinal(){
      
      return values
    }
  },
  
}
</script>
