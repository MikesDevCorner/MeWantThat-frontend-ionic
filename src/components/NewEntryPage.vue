<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button @click.stop.prevent="goBack"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button>
            <font-awesome-icon icon="power-off" @click="logout" />
          </ion-button>
        </ion-buttons>
        <ion-title>{{title}}: New Entry</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-item class="nameinput">
        <ion-label position="floating">New Entry</ion-label>
        <ion-input type="text" 
                  :value="entryName" 
                  required
                  maxlength="60"
                  @input="entryName=$event.target.value"></ion-input>
      </ion-item>
      <ion-item class="amountinput">
        <ion-label position="floating">Amount</ion-label>
        <ion-input type="number" 
                  required
                  min="0"
                  max="9999"
                  :value="amount" 
                  @input="amount=$event.target.value"></ion-input>
      </ion-item>
      <div class="icenter">
        <ion-button color="light" @click="saveEntry">Save</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: "NewEntryPage",
  props: ["listid", "title"],
  data() {
    return {
      entryName: "",
      amount: 1
    };
  },
  methods: {
    async saveEntry() {
      this.entryName = this.entryName.trim();
      if (this.entryName !== "" && this.amount !== "" && this.amount > 0 && this.amount < 9999) {
        this.showLoading();
        try {
          let response = await this.$api.addEntry(
            this.entryName,
            this.amount,
            this.listid
          );
          if (response.status === 201) {
            this.hideLoading();
            this.$router.replace({
              name: "single-list-view",
              params: { listid: this.listid, title: this.title }
            });
            this.presentToast("Entry created successfully");
          } else if(response.status === 401) {
            this.hideLoading();
            this.$router.replace({name: "login"});
          }
        } catch(e) {
          this.hideLoading();
          this.presentAlert(
            "Error",
            "There was an error creating your entry"
          );
        }
      } else {
        this.presentToast("Please check your input fields: entryname should be shorter"
          + "than 60 characters. amount should be more than 0 and less than 10000.", 6000);
      }
    },
    goBack() {
      this.$router.replace({
        name: "single-list-view",
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nameinput {
  margin-top: 40px;
}
.amountinput {
  margin-bottom: 20px;
}
.icenter {
  text-align: center;
}
</style>