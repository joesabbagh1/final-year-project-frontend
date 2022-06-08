import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    username: '',
    password: '',
    userID: null,
    menuID: null,
    authenticated: false,
    loggedIn: false,
    userCompanies: [],
    selectedCompany:{},
    completeMenu: [],
    loading: false
  },
  getters: {
    getUsers: state => state.users,
    getUsername: state => state.username,
    getPassword: state => state.password,
    getAuthentication: state => state.authenticated,
    getUserID: state => state.userID,
    getMenuID: state => state.menuID,
    getUserCompanies: state => state.userCompanies,
    getCompleteMenu: state => state.completeMenu,
    loading: state => state.loading
  },
  mutations: {
    setUsers(state, payload){
      state.users = payload;
    },
    setUserName(state, payload){
      state.username = payload;
    },
    setPassword(state, payload){
      state.password = payload;
    },
    setUserId(state, payload){
      state.userID = payload;
    },
    setMenuId(state, payload){
      state.menuID = payload;
    },
    setAuthentication(state, payload){
      state.authenticated = payload;
    },
    setUsersCompanies(state, payload){
      state.userCompanies = payload;
    },
    setSelectedCompany(state, payload){
      state.selectedCompany = payload;
    },
    setCompleteMenu(state, payload) {
      state.completeMenu = payload;
    },
    setMenuDescription1(state, payload) {
      state.MenusDescription1 = payload;
    },
    setMenuDescription2(state, payload) {
      state.MenusDescription2 = payload;
    },
    setMenuDescription3(state, payload) {
      state.MenusDescription3 = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    
  },
  actions: {

    async getUsers(context){
      context.commit("setLoading", true)
      await axios.get("http://localhost:5290/api/users")
      .then((Response)=>{
        context.commit("setUsers", Response.data)
        context.commit("setLoading", false)
      });
    },

    login(context, data) {
      if(data.username != "" && data.password != "") {
          context.state.users.some(user => {
            if(user.username === data.username && user.password === data.password){
              context.commit("setUserName", user.username)
              context.commit("setUserId", user.userID)
              context.commit("setMenuId", user.menuID)
              // axios.put(`http://localhost:5290/api/Users/${context.state.userID}`)
              
            }
          }) 
      } else {
        console.log("A username and password must be present");
      }

    },

    async setUserCompanies(context){
      await axios.get(`http://localhost:5290/api/UsersCompaniesAccess/${context.state.userID}`)
      .then((Response)=>{
        context.commit("setUsersCompanies", Response.data)
        context.commit("setLoading", false)
      });
    },
  
    async getUsersMenus(context){
      let usersMenus = [], usersMenus1 = [], usersMenus2 = [], usersMenus3 = [], usersMenus4 = [], usersMenus5 = [], menusContent = [], completeMenu = []

      await axios.get(`http://localhost:5290/api/UsersMenusAccess/${context.state.menuID}/${context.state.selectedCompany.compNo}`)
      .then((Response)=>{
        usersMenus1= Response.data.map(e => {
          return e.description1
        })

        usersMenus2= Response.data.map(e => {
          return e.description2
        })

        usersMenus3= Response.data.map(e => {
          return e.description3
        })
        
        usersMenus4= Response.data.map(e => {
          return e.description4
        })
        
        usersMenus5= Response.data.map(e => {
          return e.description5
        })
        
        menusContent= Response.data.map(e => {
          return e.nodeDescription
        })

        usersMenus1.forEach((e,i) => {
          let a = [ e, usersMenus2[i], usersMenus3[i], usersMenus4[i], usersMenus5[i], menusContent[i]]
          usersMenus.push(a)
        })
        usersMenus.forEach(v => {
          v.forEach((v2,i2,a2) => {
            let index = completeMenu.findIndex(
              element => element.title === a2[0]
            )
            if(i2 == 0 && !(completeMenu.some((v3,i3,a3) => { return v2 === v3.title }))) {
              let obj = { title: v2, subTitles: []}
              completeMenu.push(obj)
            }
            if(i2 == 1) {
              {
                
                if (!(completeMenu[index].subTitles.some((v3,i3,a3) => { return v2 === v3.title }))) {
                  let obj = {}
                  if (a2[2]) {
                    obj = { title: v2, subTitles: []}
                  }
                  else{
                    obj = {title: v2, content: []}
                  }
                  completeMenu[index].subTitles.push(obj)
                }
              }
            }

            if(i2 == 2 && v2) {
              let obj = { title: v2}

              let index2 = completeMenu[index].subTitles.findIndex((e,i,a) => {
                  return e.title === a2[1] && e.subTitles
              })
              
              completeMenu[index].subTitles[index2].subTitles.push(obj)
            }

            if (i2 == 5) {
              let obj = { title: v2}
              let index2 = completeMenu[index].subTitles.findIndex((e,i,a) => {
                return e.title === a2[1]
              })
              // console.log(index2);
              completeMenu[index].subTitles[index2].content.push(obj)
            }
          })
        })
        // context.commit("setCompleteMenu", Response.data)
        context.commit("setCompleteMenu", completeMenu)

      })
    },

    async setSelectedCompany(context, data){
      context.commit("setSelectedCompany", data)
    },
    async setAuthenticationFalse(context){
      context.commit("setAuthentication", false)
    },

    async setAuthenticationTrue(context){
      context.commit("setAuthentication", true)
    },
  },
  modules: {},
});
