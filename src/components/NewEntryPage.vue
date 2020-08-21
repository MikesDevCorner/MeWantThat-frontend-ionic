<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button @click.stop.prevent="goBack"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-menu-button menu="first" >
            <font-awesome-icon class="fa-xs" icon="bars"/>
          </ion-menu-button>
        </ion-buttons>
        <ion-title>{{title}}: New Entry</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="gpadding">
        <ion-item class="nameinput">
          <ion-label position="floating">Entryname</ion-label>
          <ion-input type="text" 
                    :value="entryName" 
                    autofocus="true"
                    @ionInput="entryName=$event.target.value"></ion-input>
        </ion-item>
        <ion-note class="form-error">{{nameError}}</ion-note>
        <ion-item class="amountinput">
          <ion-label position="floating">Amount</ion-label>
          <ion-input type="number" 
                    required="true"
                    inputmode="numeric"
                    min="0"
                    max="9999"
                    step="1.0"
                    :value="amount"
                    @ionInput="amount=$event.target.value"></ion-input>
        </ion-item>
        <ion-note class="form-error amountnote">{{amountError}}</ion-note>
        <div class="icenter">
          <ion-button :disabled="!formValid" color="tertiary" expand="block" @click="doValidate">Save</ion-button>
        </div>
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
      amount: 1,
      validate: false
    };
  },
  mounted() {
    this.$root.$emit('menu-on')
  },
  computed: {
    nameError() {
      if(this.validate === true) {
        const re = /^[a-zA-Z0-9üÜäÄöÖß_ ]*$/
        if(re.test(this.entryName)) {
          if(this.entryName.length > 60) return "Reduce name to less than 60 characters"
          else if(this.entryName.length === 0) return "Name should not be empty"
          else return ""
        }
        else return "Only characters and digits are allowed"
      }
      else return ""
    },
    amountError() {
      if(this.amount > 9999) return "value should be less than 9999"
      else if(this.amount < 0) return "value should be positive"
      else return ""
    },
    formValid() {
      if(this.validate === false || (this.nameError === "" && this.amountError === "")) return true
      else return false
    }
  },
  methods: {
    doValidate() {
      this.validate = true
      this.$nextTick(() => {
        if(this.formValid === true) this.saveEntry()
        else this.presentToast("Please check your input fields")
      })
    },
    async saveEntry() {
      this.validate = false
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nameinput {
  margin-top: 40px;
}
.amountnote {
  margin-bottom: 20px;
}

.icenter {
  padding-top: 15px;
}

.gpadding {
  margin: 30px;
}

ion-item {
    margin-bottom: 5px;
    --padding-end: 0px;
    --padding-start: 0px;
    --highlight-height: 1px;
}
</style>