<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-container fluid class="pt-10">
          <v-row align="">
            <v-col cols="3" >
              <v-subheader class="text-subtitle-1 black--text px-0">
                Node ID
              </v-subheader>
            </v-col>
            <v-col class="py-0">
              <v-text-field
                v-model="nodeID"
                class="py-0"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="3" class="py-0">
              <v-subheader class="text-subtitle-1 black--text px-0">
                Application Name
              </v-subheader>
            </v-col>
            <v-col class="py-0">
              <v-text-field
                v-model="node.fileName"
                class="py-0"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center	">
            <v-col cols="3" class="py-0">
              <v-subheader class="text-subtitle-1 black--text px-0">
                Application Desc EN
              </v-subheader>
            </v-col>
            <v-col class="py-0">
              <v-text-field
                v-model="node.nodeDescription1"
                class="py-0"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="3" class="py-0">
              <v-subheader class="text-subtitle-1 black--text px-0">
                Application Desc AR
              </v-subheader>
            </v-col>
            <v-col class="py-0">
              <v-text-field
                v-model="node.nodeDescription2"
                class="py-0"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="3" class="py-0">
              <v-subheader class="text-subtitle-1 black--text px-0">
                Report Name
              </v-subheader>
            </v-col>
            <v-col class="py-0">
              <v-text-field
                v-model="node.CRReportName"
                class="py-0"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-divider></v-divider>
      <v-tabs
        v-model="tab"
      >
        <v-tab>
          Main
        </v-tab>
        <v-tab>
          Queries
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-container fluid class="pt-10">
              <v-row align="start">
                <v-col cols="3" class="py-0">
                  <v-subheader class="text-subtitle-1 black--text px-0">
                    SQL Query
                  </v-subheader>
                </v-col>
                <v-col>
                  <v-textarea
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" >
                  <v-subheader class="text-subtitle-1 black--text px-0">
                    Tree Menu Level 01
                  </v-subheader>
                </v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="node.mainNodeID1"
                    :label="node.mainNodeID1"
                    :items="descriptions[0]"
                    @input="setVarCode(0, node.mainNodeID1)"
                    single-line
                  ></v-select>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="3" class="py-0">
                  <v-subheader class="text-subtitle-1 black--text px-0">
                    Tree Menu Level 02
                  </v-subheader>
                </v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="node.mainNodeID2"
                    :label="node.mainNodeID2"
                    :items="descriptions[1]"
                    @input="setVarCode(1, node.mainNodeID2)"
                    single-line
                  ></v-select>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="3" class="py-0">
                  <v-subheader class="text-subtitle-1 black--text px-0">
                    Tree Menu Level 03
                  </v-subheader>
                </v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="node.mainNodeID3"
                    :label="node.mainNodeID3"
                    :items="descriptions[2]"
                    @input="setVarCode(2, node.mainNodeID3)"
                    single-line
                  ></v-select>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="3" class="py-0">
                  <v-subheader class="text-subtitle-1 black--text px-0">
                    Tree Menu Level 04
                  </v-subheader>
                </v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="node.mainNodeID4"
                    :label="node.mainNodeID4"
                    :items="descriptions[3]"
                    @input="setVarCode(3, node.mainNodeID4)"
                    single-line
                  ></v-select>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="3" class="py-0">
                  <v-subheader class="text-subtitle-1 black--text px-0">
                    Tree Menu Level 05
                  </v-subheader>
                </v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="node.mainNodeID5"
                    :label="node.mainNodeID5"
                    :items="descriptions[4]"
                    @input="setVarCode(4, node.mainNodeID5)"
                    single-line
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>

          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card-text>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col align="right">
            <template v-if="!btnClicked">
              <v-btn
                color="black"
								dark
                class="mx-8"
                @click="createNode2"
              >
                Create new node
              </v-btn>
              <v-btn
                color="black"
								dark
                @click="getNodeById(nodeID)"
              >
                Get node by Id
              </v-btn>
            </template>
            <template>
              <v-btn
                @click="updateNode2()"
                color="black"
                dark
                class="mx-8"
              >
                Save changes
              </v-btn>
              <v-btn
                @click="deleteNode(nodeID)"
                color="black"
								dark
              >
                Delete node
              </v-btn>
            </template>
          </v-col>
        </v-row>
      </v-container> 
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  data() {
    return {
      nodeID: '',
      tab: "",
      editedNode:{
        // nodeID:'',
        // nodeDescription1:'',
        // nodeDescription2:'',
        // reportName:'',
        mainNodeID1: null,
        mainNodeID2: null,
        mainNodeID3: null,
        mainNodeID4: null,
        mainNodeID5: null,
      },
      descriptions: [],
      codes: [],
      btnClicked: false,
    }
  },

  async created(){
    await this.nodesDescriptions()
    let description1 = this.nodesDescriptionsLevels[0].map(v => {return v.description})
    let description2 = this.nodesDescriptionsLevels[1].map(v => {return v.description})
    let description3 = this.nodesDescriptionsLevels[2].map(v => {return v.description})
    let description4 = this.nodesDescriptionsLevels[3].map(v => {return v.description})
    let description5 = this.nodesDescriptionsLevels[4].map(v => {return v.description})
    this.descriptions = [ description1, description2, description3, description4, description5 ]

    let code1 = this.nodesDescriptionsLevels[0].map(v => {return v.subVariableCode})
    let code2 = this.nodesDescriptionsLevels[1].map(v => {return v.subVariableCode})
    let code3 = this.nodesDescriptionsLevels[2].map(v => {return v.subVariableCode})
    let code4 = this.nodesDescriptionsLevels[3].map(v => {return v.subVariableCode})
    let code5 = this.nodesDescriptionsLevels[4].map(v => {return v.subVariableCode})
    this.codes = [ code1, code2, code3, code4, code5 ]
  },

  computed: {
    ...mapGetters(
		{
			nodes: "getNodes",
      node: "getSelectedNode",
			loading: "loading",
      nodesDescriptionsLevels: "getNodeDescriptions"
		}), 

  },

  methods: {
    ...mapActions({
      getNodeById: "getNodeById",
			createNode: "createNode",
			updateNode: "updateNode",
			deleteNode: "deleteNode",
      nodesDescriptions: "setNodesDescriptions",
      setMenu: "getUsersMenus"
		}),

    updateNode2(){
      this.node.nodeID = this.nodeID
      this.node.mainNodeID1 = this.editedNode.mainNodeID1
      this.node.mainNodeID2 = this.editedNode.mainNodeID2
      this.node.mainNodeID3 = this.editedNode.mainNodeID3
      this.node.mainNodeID4 = this.editedNode.mainNodeID4
      this.node.mainNodeID5 = this.editedNode.mainNodeID5
      this.updateNode(this.node)
    },
    createNode2(){
      this.node.nodeID = this.nodeID
      this.node.mainNodeID1 = this.editedNode.mainNodeID1
      this.node.mainNodeID2 = this.editedNode.mainNodeID2
      this.node.mainNodeID3 = this.editedNode.mainNodeID3
      this.node.mainNodeID4 = this.editedNode.mainNodeID4
      this.node.mainNodeID5 = this.editedNode.mainNodeID5
      this.createNode(this.node)
      this.setMenu()
    },
    setVarCode(level, description){
      let index = this.descriptions[level].indexOf(description)
      switch (level) {
        case 0:
          this.editedNode.mainNodeID1 = this.codes[level][index]
          break;
        case 1:
          this.editedNode.mainNodeID2 = this.codes[level][index]
          break;
        case 2:
          this.editedNode.mainNodeID3 = this.codes[level][index]
          break;
        case 3:
          this.editedNode.mainNodeID4 = this.codes[level][index]
          break;
        case 4:
          this.editedNode.mainNodeID5 = this.codes[level][index]
          break;
        
        default:
          break;
      }
    }
  },

}
</script>

<style>

</style>