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
                :value="node.nodeDescription1"
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
                Application Path
              </v-subheader>
            </v-col>
            <v-col class="py-0">
              <v-text-field
                v-model="node.applicationPath"
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
                v-model="node.reportName"
                class="py-0"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" align="center">
              <v-checkbox
                dense
                class="black--text"
                label="Active"
              ></v-checkbox>
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
                    v-model="node.treeMenuLevel01"
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
                    v-model="node.treeMenuLevel02"
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
                    v-model="node.treeMenuLevel03"
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
                    v-model="node.treeMenuLevel04"
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
                    v-model="node.treeMenuLevel05"
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
                color="black"
								dark
                class="mx-8"
              >
                Delete node
              </v-btn>
              <v-btn
                color="black"
								dark
                @click="updateNodeWithId"
              >
                Save changes
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
      btnClicked: false
    }
  },

  computed: {
    ...mapGetters(
		{
			nodes: "getNodes",
      node: "getSelectedNode",
			loading: "loading"
		}),
  },

  methods: {
    ...mapActions({
      getNodeById: "getNodeById",
			createNode: "createNode",
			updateNode: "updateNode",
			deleteNode: "deleteNode",
		}),

    updateNodeWithId(){
      this.node
      updateNode
    }
  },

}
</script>

<style>

</style>