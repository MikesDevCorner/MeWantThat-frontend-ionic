<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button>
            <font-awesome-icon icon="power-off" @click="logout" />
          </ion-button>
        </ion-buttons>
        <ion-title>List: {{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
        <ion-item v-for="(entry, index) in entries" :key="index">
          <font-awesome-icon icon="tag" style="color:#2196f3; margin-right: 35px;" />
          <ion-label>
            <h2>{{entry.entryname}}</h2>
            <ion-note>Amount: {{entry.amount}}x</ion-note>
          </ion-label>
          <ion-button  fill="clear" size="large" slot="end" @click="removeEntry(entry)">
            <font-awesome-icon class="fa-xs" icon="trash" style="color:#777;" />
          </ion-button>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="addEntry">
          <font-awesome-icon class="fa-lg" icon="plus" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import moment from 'moment'

export default {
  name: "SingleListView",
  mounted() {
    this.refreshEntries();
  },
  data() {
    return {
      entries: []
    };
  },
  props: ["listid", "title"],
  methods: {
    async refreshEntries() {
      this.showLoading();
      let response = await this.$api.getEntries(this.listid);
      if(response.status === 401) {
        this.hideLoading();
        this.$router.replace({name: "login"});
      }
      this.entries = response.data;
      this.entries.forEach((entry) => {
          entry.readableDate = moment(entry.updated_at).format("YYYY-MM-DD HH:mm")
      })
      this.hideLoading();
    },
    async removeEntry(entry) {
      this.showLoading();
      let response = await this.$api.removeEntry(entry);
      if (response.status === 200) {
        this.refreshEntries();
        this.presentToast("Deleted successfully.");
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
    },
    addEntry() {
      this.$router.replace({
        name: "new-entry",
        params: { listid: this.listid, title: this.title }
      });
    },
    async logout() {
      await this.$api.logout();
      this.$router.replace({
        name: "login"
      });
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

  ion-header ion-button {
    --padding-end: 15px;
  }
</style>