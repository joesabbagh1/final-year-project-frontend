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
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="nodes"
        class="elevation-1"
      >
        <template v-slot:[`item.path`]="{ item }">
					<div>
            <span>
              {{item.mainNodeID1}} / 
            </span>
            <span>
              {{item.mainNodeID2}} 
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
        <template v-slot:[`item.access`]="{ item, i }">
          <div>
            <v-checkbox
              @click="setNodeID(item,i)"
            >
            </v-checkbox>
          </div>
				</template>
      </v-data-table>
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
      menus: "getMenusForMenuAccess"
    }),

    menusTitles(){
      return this.menus.map(v => {return v.description})
    }
  },

  methods:{
    ...mapActions({
			setDataForMenuAccess : "setDataForMenuAccess"
		}),

    setMenuID(){
      this.menuID = this.menusTitles.indexOf(this.selectedMenu)
    },

    setNodeID(node,i){
      console.log(i);
      this.nodeID = node.nodeID
    }
  }

}
</script>

<style>

</style>