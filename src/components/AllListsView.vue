<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="end">
          <ion-menu-button menu="first" >
            <font-awesome-icon class="fa-xs" icon="bars"/>
          </ion-menu-button>
        </ion-buttons>
        <ion-title>Shopping Lists</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <div v-if="lists.length === 0" class="img-cont">
        <div class="empty handwritten">vast emptyness</div>
        <img alt="Hint" src="../assets/first_list_hint.png" class="hint">
      </div>
      <ion-list v-if="lists.length > 0">
        <ion-item button v-for="(list, index) in lists" :key="index">
          <ion-ripple-effect></ion-ripple-effect>
          <font-awesome-icon class="text-color-primary list-icon" icon="list" />
          <ion-label @click="openList(list)">
            <h2>{{list.listname}}</h2>
            <ion-note>{{list.readableDate}}</ion-note>
          </ion-label>
          <ion-button fill="clear" size="large" slot="end" @click="removeList(list)">
            <font-awesome-icon class="fa-xs text-alt-color" icon="trash" />
          </ion-button>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="addList">
          <font-awesome-icon class="fa-lg" icon="plus" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import { Plugins } from '@capacitor/core'
import moment from 'moment'

export default {
  name: "AllListsView",
  mounted() {
    this.$root.$emit('menu-on')
    this.refreshList();
    if(this.alreadySubscribed === false) {
      Plugins.App.addListener('backButton', function() { 
        Plugins.App.exitApp();
      });
      this.alreadySubscribed = true;
    }
  },
  data() {
    return {
      lists: [],
      alreadySubscribed: false
    };
  },
  methods: {
    async refreshList() {
      this.showLoading();
      let response = await this.$api.getLists();
      if(response.status === 401) {
        this.hideLoading();
        this.$router.replace({name: "login"});
      }
      this.lists = response.data;
      this.lists.forEach((list) => {
          list.readableDate = moment(list.updated_at).format("YYYY-MM-DD HH:mm")
      })
      this.hideLoading();
    },
    openList(list) {
      this.$router.push({
        name: "single-list-view",
        params: { listid: list.id, title: list.listname }
      });
    },
    addList() {
      this.$router.push({ name: "new-list" });
    },
    async removeList(list) {
      this.showLoading();
      let response = await this.$api.removeList(list);
      if (response.status === 200) {
        this.refreshList();
        this.presentToast("Deleted successfully");
      } else if(response.status === 401) {
        this.hideLoading();
        this.$router.replace({name: "login"});
      } else {
        this.hideLoading();
        this.presentAlert(
          "Error",
          "Some error occured during deletion"
        );
      }
    }
  }
};
</script>


<style scoped>
  .sc-ion-label-md-s h2 {
    font-size: 18px;
    font-weight: 500;
  }

  ion-list ion-button {
    --padding-end: 5px;
  }

  .img-cont {
    position:relative; 
    height: 100%;
  }

  .empty {
    text-align: center; 
    font-size: 30px; 
    padding: 1.5em; 
    color: #d5d5d5;
  }

  .list-icon {
    margin-right: 35px;
  }

  .hint {
    display: block; 
    max-height: 40%; 
    position: absolute; 
    bottom: 50px; 
    right: 30px;
  }
</style>