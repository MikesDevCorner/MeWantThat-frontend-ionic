<template>
  <ion-page>
    <ion-content color="primary">
      <ion-grid>
        <ion-row color="primary" class="ion-justify-content-center">
          <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
            <div class="ion-text-center hl">
              <img v-if="register===false" alt="Logo" src="../assets/logosm.png" style="width: 60%; margin-top: 40px;">
              <h4 v-if="register===true">Sign up for <b>ME WANT THAT</b> and create an account</h4>
            </div>
            <div class="ion-padding" style="margin: 4px;">
              <ion-item v-if="register">
                <ion-label position="floating">Name</ion-label>
                <ion-input type="text" 
                          :value="name"
                          inputmode="text"
                          @ionInput="name=$event.target.value"></ion-input>
              </ion-item>
              <ion-note class="form-error">{{nameError}}</ion-note>
              <ion-item>
                <ion-label position="floating">E-Mail</ion-label>
                <ion-input type="email"
                          autofocus="true"
                          :value="email"
                          inputmode="email"
                          @ionInput="email=$event.target.value"></ion-input>
              </ion-item>
              <ion-note class="form-error">{{emailError}}</ion-note>
              <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input type="password"
                          :value="password"
                          inputmode="text"
                          @ionInput="password=$event.target.value"></ion-input>
              </ion-item>
              <ion-note class="form-error">{{passwordError}}</ion-note>
              <ion-item v-if="register">
                <ion-label position="floating">Password again</ion-label>
                <ion-input type="password"
                          :value="passwordconfirm"
                          inputmode="text"
                          @ionInput="passwordconfirm=$event.target.value"></ion-input>
              </ion-item>
              <ion-note class="form-error">{{password2Error}}</ion-note>
              <div class="lbutton">
                <ion-button expand="block" :disabled="!formValid" @click="doValidate">{{ register ? 'Register' : 'Login' }}</ion-button>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="changeToRegister">
          <font-awesome-icon class="fa-lg" v-if="register" icon="arrow-left" />
          <font-awesome-icon class="fa-lg" v-if="!register" icon="user-plus" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
  name: "LoginView",
  data() {
    return {
      register: false,
      email: "",
      password: "",
      passwordconfirm: "",
      name: "",
      validate: false
    };
  },
  computed: {
    nameError() {
      if(this.validate === true) {
        const re = /^[a-zA-Z0-9üÜäÄöÖß_ ]*$/
        if(re.test(this.name)) {
          if(this.name.length > 60) return "Reduce name to less than 60 characters"
          else if(this.name.length === 0) return "Name should not be empty"
          else return ""
        }
        else return "Only characters and digits are allowed"
      }
      else return ""
    },
    emailError() {
      if(this.validate === true) {
        if(this.email.length !== 0) {
          const re = /\S+@\S+\.\S+/;
          if(re.test(String(this.email).toLowerCase())) return ""
          else return "Enter valid Email"
        }
        else return "E-Mail should not be empty"
      }
      else return ""
    },
    passwordError() {
      if(this.validate === true) {
        if(this.password.length < 8) return "Password should at least be 8 characters"
        else if(this.password.length === 0) return "Password should not be empty"
        else return ""
      }
      else return ""
    },
    password2Error() {
      if(this.validate === true) {
        if(this.password != this.passwordconfirm) return "Passwords do not match"
        else return ""
      }
      else return ""
    },
    formValid() {
      if(this.validate === false || (this.nameError == "" && this.emailError == "" && this.passwordError == "" && this.password2Error == "")) return true
      else return false
    }
  },
  methods: {
    doValidate() {
      if(this.register === true) this.validate = true
      this.$nextTick(() => {
        if(this.formValid === true) this.login()
        else this.presentToast("Please check your input fields")
      })
    },
    changeToRegister() {
      this.register = !this.register
      if(this.register === false) this.validate = false
    },
    async login() {
      this.validate = false
      this.email = this.email.trim();      
      this.showLoading();
      try {
        let response = null
        if(this.register === true) {
          response = await this.$api.register(
            this.name,
            this.email,
            this.password,
            this.passwordconfirm
          )
        } else {
          response = await this.$api.login(
            this.email,
            this.password
          )
        }
        if (response.status === 202) {
          this.$router.replace({name: "all-lists"});
          this.presentToast("Login successful")
        } else if(response.status === 201) {
          this.$router.replace({name: "all-lists"});
          this.presentToast("Registered successful and logged in")
        } else if(response.status === 401) {
          this.presentToast("Please check E-Mail and Password and try again");
        }
        this.hideLoading()
      } catch(e) {
        this.hideLoading();
        this.presentToast("Something went wrong on contacting the API: "+e.message);
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

  ion-content{
    --ion-background-color:#2a628f;
  }

  .lbutton {
    margin: -2px;
    margin-top: 30px;
  }

  ion-button {
    --background: #13293d;
  }

  ion-item {
      margin-bottom: 5px;
      --background: #transparent;
      --color: #fcf9ed;      
      --highlight-color-focused	: #13293d;
      --padding-end: 0px;
      --padding-start: 0px;
      --highlight-height: 1px;
      /*--show-full-highlight: true;*/
  }

  .hl {
    margin-bottom: 40px;
    padding: 0px 32px;
  }

  .hl > h1 {
    font-size: 43px;
    font-weight: normal;
    text-align: center;
    margin-top: 40px;
  }

  .hl > h3 {
    font-size: 30px;
    font-weight: normal;
    text-align: left;
  }



</style>