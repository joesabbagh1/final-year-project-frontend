<template>
  <v-card>
    <v-card-title>
      <div>
        Menus
      </div>
      <v-select
        v-model="selectedMenu"
        :items="menusTitles"
        @input="setMenuID"
        dense
        flat
        class="px-10 py-0"
      ></v-select>
    </v-card-title>
    <v-card-text v-if="!loading">
      <v-data-table
        :headers="headers"
        :items="nodes"
        class="elevation-1"
      >
        <template v-slot:[`item.path`]="{ item }">
					<div>
            <span>
              {{ item.mainNodeID1 }} /
            </span>
            <span>
              {{ item.mainNodeID2 }}
            </span>
            <span v-if="item.mainNodeID3">/</span>
            <span>
              {{ item.mainNodeID3 }}
            </span>
            <span v-if="item.mainNodeID4">/</span>
            <span>
              {{ item.mainNodeID4 }}
            </span>
            <span v-if="item.mainNodeID5">/</span>
            <span>
              {{ item.mainNodeID5 }}
            </span>
          </div>
				</template>
        <template v-slot:[`item.access`]="{ item }">
          <v-checkbox
            v-model="item.access"
            @change="checkBox(item)"
          />
				</template>
      </v-data-table>
    </v-card-text>
    <v-card-text v-else>
      <v-container>
        <v-row justify="center" align="center" style="height:70vh">
          <v-col align="center">
            <v-progress-circular
              indeterminate
              color="primary"
              class="text-center fill-height"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {

  data(){
    return{
      selectedMenu: '',
      menuID: null,
      nodeID: '',
      headers: [
        { text: 'path', value: 'path' },
        { text: 'descriptionEN', value: 'nodeDescription1' },
        { text: 'descriptionAR', value: 'nodeDescription2' },
        { text: 'access', value: 'access' },
      ],
    }
  },

  async created(){
    await this.setDataForMenuAccess()
  },

  computed:{
    ...mapGetters({
      nodes : "getNodesForMenuAccess",
      menus: "getMenusForMenuAccess",
      nodesMenuAccess: "getNodesMenuAccess",
      company: "getSelectedCompany",
      loading: "getLoading"
    }),

    menusTitles(){
      return this.menus.map(v => {return v.description})
    },

  },

  methods:{
    ...mapActions({
			setDataForMenuAccess : "setDataForMenuAccess",
      setNodesMenuAccess: "setNodesMenuAccess",
      createMenuAccess: "createMenuAccess",
      deleteMenuAccess: "deleteMenuAccess",
      setLoading: "setLoading",
		}),

    async setMenuID(){
      this.setLoading(true)
      let index = this.menusTitles.indexOf(this.selectedMenu)
      this.menuID = this.menus[index].subVariableCode;
      await this.setNodesMenuAccess(this.menuID)
      this.nodes.forEach((v, i) => {
        v.access = this.nodesMenuAccess[i]
      })
      setTimeout(() => {
        this.setLoading(false)
      }, 500);
    },

    checkBox(val){
      let menuAccess = {}
      menuAccess.nodeID = val.nodeID 
      menuAccess.menuID = parseInt(this.menuID)
      menuAccess.compNo = parseInt(this.company.compNo)
      if (val.access) {
        // create
        this.createMenuAccess(menuAccess)
        console.log(menuAccess);
      }
      else{
        // delete
        console.log(menuAccess);
        this.deleteMenuAccess(menuAccess)
      }
    }
  }

}
</script>

<style>

</style>