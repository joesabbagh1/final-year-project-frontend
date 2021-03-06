import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    variableDetails: [],
    nodes: [],
    selectedNode: {},
    username: '',
    fullname: '',
    password: '',
    userID: null,
    menuID: null,
    authenticated: false,
    loggedIn: false,
    userCompanies: [],
    selectedCompany:{},
    completeMenu: [],
    titleSelectedContent: [],
    nodeDescriptions: [],
    nodesForMenuAccess: [],
    menusForMenuAccess: [],
    nodesMenuAccess: [],
    usersAccess: [],
    accessTitlesBranch: [],
    accessTitlesSalesRepGroups: [],
    salesReps: [],
    variableDetailsTitles: [],
    variableDetailsByCode: [],
    loading: false
  },
  getters: {
    getUsers: state => state.users,
    getVariableDetails: state => state.variableDetails,
    getUsername: state => state.username,
    getFullname: state => state.fullname,
    getPassword: state => state.password,
    getNodes: state => state.nodes,
    getSelectedNode: state => state.selectedNode,
    getAuthentication: state => state.authenticated,
    getUserID: state => state.userID,
    getMenuID: state => state.menuID,
    getUserCompanies: state => state.userCompanies,
    getSelectedCompany: state => state.selectedCompany,
    getCompleteMenu: state => state.completeMenu,
    getTitleSelectedContent: state => state.titleSelectedContent,
    getNodeDescriptions: state => state.nodeDescriptions,
    getNodesForMenuAccess: state => state.nodesForMenuAccess,
    getMenusForMenuAccess: state => state.menusForMenuAccess,
    getNodesMenuAccess: state => state.nodesMenuAccess,
    getUsersAccess: state => state.usersAccess,
    getUsersAccessTitlesBranch: state => state.accessTitlesBranch,
    getUsersAccessTitlesSalesRepGroups: state => state.accessTitlesSalesRepGroups,
    getSalesReps: state => state.salesReps,
    getVariableDetailsTitles: state => state.variableDetailsTitles,
    getVariableDetailsByCode: state => state.variableDetailsByCode,
    getLoading: state => state.loading
  },
  
  mutations: {
    setUsers(state, payload){
      state.users = payload;
    },
    setVariableDetails(state, payload){
      state.variableDetails = payload
    },
    setUserName(state, payload){
      state.username = payload;
    },
    setFullName(state, payload){
      state.fullname = payload;
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
    setTitleSelectedContent(state, payload){
      state.titleSelectedContent = payload
    },
    createUser(state, payload){
      state.users.push(payload) 
    },
    updateUser(state, payload){
      Object.assign(state.users[payload.editedIndex], payload.editedItem)
    },
    deleteUser(state, payload){
      state.users.splice(payload, 1)
    },
    setNodes(state, payload){
      state.nodes.push(payload)
    },
    getNodeById(state, payload){
      state.selectedNode = payload
    },
    createNode(state, payload){
      state.nodes.push(payload) 
    },
    updateNode(state, payload){
      Object.assign(state.nodes[payload.editedIndex], payload.editedItem)
    },
    deleteNode(state, payload){
      state.nodes.splice(payload, 1)
    },
    setNodeDescriptions1(state, payload){
      state.nodeDescriptions[0] = payload
    },
    setNodeDescriptions2(state, payload){
      state.nodeDescriptions[1] = payload
    },
    setNodeDescriptions3(state, payload){
      state.nodeDescriptions[2] = payload
    },
    setNodeDescriptions4(state, payload){
      state.nodeDescriptions[3] = payload
    },
    setNodeDescriptions5(state, payload){
      state.nodeDescriptions[4] = payload
    },
    setNodesForMenuAccess(state, payload){
      state.nodesForMenuAccess = payload
    },
    setMenusForMenuAccess(state, payload){
      state.menusForMenuAccess = payload
    },
    setNodesMenuAccess(state, payload){
      state.nodesMenuAccess = payload
    },
    checkUsersAccess(state, payload){
      state.usersAccess = payload
    },
    setUserAccessTitlesBranch(state, payload){
      state.accessTitlesBranch = payload
    },
    setUserAccessTitlesSalesRepGroups(state, payload){
      state.accessTitlesSalesRepGroups = payload
    },
    setSalesReps(state, payload){
      state.salesReps = payload
    },
    setVariableHeadersTitles(state, payload){
      state.variableDetailsTitles = payload
    },
    setVariableDetailsByCode(state, payload){
      state.variableDetailsByCode = payload
    }
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
              context.commit("setFullName", user.fullname)
              context.commit("setUserId", user.userID)
              context.commit("setMenuId", user.menuID)
              // axios.put(`http://localhost:5290/api/Users/${context.state.userID}`)
              
            }
          }) 
      } else {
        console.log("A username and password must be present");
      }

    },

    async setLoading(context, data){
      context.commit("setLoading", data)
    },

    async setUserCompanies(context){
      await axios.get(`http://localhost:5290/api/UsersCompaniesAccess/${context.state.userID}`)
      .then((Response)=>{
        context.commit("setUsersCompanies", Response.data)
        context.commit("setLoading", false)
      });
    },

    async setVariableDetails(context){
      axios.get('http://localhost:5290/api/VariablesDetails')
      .then((Response) => {
        context.commit("setVariableDetails", Response.data)
      })
    },
  
    async getUsersMenus(context){
      let usersMenus = [], usersMenus1 = [], usersMenus2 = [], usersMenus3 = [], usersMenus4 = [], usersMenus5 = [], menusContent = [], nodeId = [], completeMenu = []
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

        nodeId= Response.data.map(e => {
          return e.nodeID
        })
        usersMenus1.forEach((e,i) => {
          let a = [ e, usersMenus2[i], usersMenus3[i], usersMenus4[i], usersMenus5[i], menusContent[i], nodeId[i]]
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

            // if(i2 == 2 && v2) {
            //   let obj = { title: v2}

            //   let index2 = completeMenu[index].subTitles.findIndex((e,i,a) => {
            //       return e.title === a2[1] && e.subTitles
            //   })
              
            //   completeMenu[index].subTitles[index2].subTitles.push(obj)
            // }

            if (i2 == 5) {
              let obj = { title: v2, nodeId: a2[6]}
              let index2 = completeMenu[index].subTitles.findIndex((e,i,a) => {
                return e.title === a2[1]
              })
              completeMenu[index].subTitles[index2].content.push(obj)
            }
          })
        })
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

    async setTitleSelectedContent(context, data){
      let content = context.state.completeMenu[data[0]].subTitles[data[1]].content
      context.commit("setTitleSelectedContent", content)
    },

    async createUser(context, data){
      data.userID = 0
      await axios.post(`http://localhost:5290/api/Users/`, data)
      context.commit("createUser", data)
    },

    async updateUser(context, data){
      await axios.put(`http://localhost:5290/api/Users/${data.editedItem.userID}`, data.editedItem)
      context.commit("updateUser", data)
    },

    async deleteUser(context, data){
      await axios.delete(`http://localhost:5290/api/Users/${context.state.users[data].userID}`)
      context.commit("deleteUser", data)
    },
    // async createUser(context, data){
    //   data.userID = 0
    //   await axios.post(`http://localhost:5290/api/Users/`, data)
    //   context.commit("createUser", data)
    // },

    // async updateUser(context, data){
    //   await axios.put(`http://localhost:5290/api/Users/${data.editedItem.userID}`, data.editedItem)
    //   context.commit("updateUser", data)
    // },

    // async deleteUser(context, data){
    //   await axios.delete(`http://localhost:5290/api/Users/${context.state.users[data].userID}`)
    //   context.commit("deleteUser", data)
    // },

    async getNodes(context){
      await axios.get("http://localhost:5290/api/nodes")
      .then((Response)=>{
        context.commit("setNodes", Response.data)
      });
    },

    async getNodeById(context, id){
      await axios.get(`http://localhost:5290/api/nodes/${id}`)
      .then((Response)=>{
        context.commit("getNodeById", Response.data)
      });
    },
    
    async createNode(context, data){
      await axios.post(`http://localhost:5290/api/nodes/`, data)
      context.commit("createNode", data)
    },
    

    async updateNode(context, data){
      await axios.put(`http://localhost:5290/api/nodes/${data.nodeID}`, data)
      context.commit("updateNode", data)
    },

    async deleteNode(context, data){
      await axios.delete(`http://localhost:5290/api/nodes/${data}`)
      context.commit("deleteNode", data)
    },

    async setNodesDescriptions(context){
      await axios.get(`http://localhost:5290/api/VariablesDetails/nodes/1`)
      .then((Response)=>{
        context.commit("setNodeDescriptions1", Response.data)
      })
      await axios.get(`http://localhost:5290/api/VariablesDetails/nodes/2`)
      .then((Response)=>{
        context.commit("setNodeDescriptions2", Response.data)
      })
      await axios.get(`http://localhost:5290/api/VariablesDetails/nodes/3`)
      .then((Response)=>{
        context.commit("setNodeDescriptions3", Response.data)
      })
      await axios.get(`http://localhost:5290/api/VariablesDetails/nodes/4`)
      .then((Response)=>{
        context.commit("setNodeDescriptions4", Response.data)
      })
      await axios.get(`http://localhost:5290/api/VariablesDetails/nodes/5`)
      .then((Response)=>{
        context.commit("setNodeDescriptions5", Response.data)
      })
    },

    async setDataForMenuAccess(context){
      await axios.get('http://localhost:5290/api/Nodes/decriptions')
      .then((Response) => {
        context.commit("setNodesForMenuAccess", Response.data)
      })
      await axios.get('http://localhost:5290/api/UsersMenusAccess/main')
      .then((Response) => {
        context.commit("setMenusForMenuAccess", Response.data)
      })
    },

    async setNodesMenuAccess(context, data){
      await axios.get(`http://localhost:5290/api/MenuAccess/${context.state.selectedCompany.compNo}/${data}`)
      .then((Response) => {
        context.commit("setNodesMenuAccess", Response.data)
      })
    },

    async createMenuAccess(context, data){
      axios.post('http://localhost:5290/api/MenuAccess', data)
      context.commit("setNodes", data)
    },

    async deleteMenuAccess(context, data){
      axios.delete(`http://localhost:5290/api/MenuAccess/${data.nodeID}/${data.menuID}/${data.compNo}`)
      context.dispatch("getNodes")
    },

    async setSalesReps(context){
      axios.get('http://localhost:5290/api/SalesReps')
      .then((Response) => {
        context.commit("setSalesReps", Response.data)
      })
    },

    async checkUsersAccess(context, data){
      await axios.get(`http://localhost:5290/api/UsersAccess/${data.accessType}/${data.accessVariable}`)
      .then((Response) => {
        context.commit("checkUsersAccess", Response.data)
      })
    },

    async createUserAccess(context, data){
      await axios.post('http://localhost:5290/api/UsersAccess/', data)
    },

    async deleteUserAccess(context, data){
      await axios.delete(`http://localhost:5290/api/UsersAccess/${data.userID}/${data.accessType}/${data.accessVariable1}/${data.compNo}`)
    },

    async setUserAccessTitlesBranch(context){
      await axios.get(`http://localhost:5290/api/VariablesDetails/0/BR01`)
      .then((Response) => {
        context.commit("setUserAccessTitlesBranch", Response.data)
      })
    },

    async setUserAccessTitlesSalesRepGroups(context){
      await axios.get(`http://localhost:5290/api/VariablesDetails/${context.state.selectedCompany.compNo}/UTYP01`)
      .then((Response) => {
        context.commit("setUserAccessTitlesSalesRepGroups", Response.data)
      })
    },

    async setVariableHeadersTitles(context, data){
      await axios.get(`http://localhost:5290/api/VariableHeaders/titles/${data}`)
      .then((Response) => {
        context.commit("setVariableHeadersTitles", Response.data)
      })
    },

    async setVariableDetailsByCode(context, data){
      await axios.get(`http://localhost:5290/api/VariablesDetails/${data.compNo}/${data.variableCode}`)
      .then((Response) => {
        context.commit("setVariableDetailsByCode", Response.data)
      })
    },

    async createVariable(context, data){
      await axios.post('http://localhost:5290/api/VariablesDetails', data)
      context.dispatch("setVariableDetails")
    },

    async updateVariable(context, data){
      await axios.put(`http://localhost:5290/api/VariablesDetails/${data.compNo}/${data.variableCode}/${data.subVariableCode}`, data)
      context.dispatch("setVariableDetails")
    },

    async deleteVariable(context, data){
      await axios.delete(`http://localhost:5290/api/VariablesDetails/${data.compNo}/${data.variableCode}/${data.subVariableCode}`)
      context.dispatch("setVariableDetails")
    }
  },

  modules: {},  
});
