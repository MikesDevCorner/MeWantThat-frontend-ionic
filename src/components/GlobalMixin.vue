<script>
export default {
  data() {
    return {
      loading: false,
      loadScreen: null
    };
  },
  methods: {
    showLoading() {
      let me = this;
      if (this.loading !== true) {
        this.loading = true
        return this.$ionic.loadingController
          .create({
            showBackdrop: false,
            translucent: true,
            //spinner: 'dots',
            cssClass: 'my-loading-class'
          })
          .then(loadScreen => {
            if(me.loading === true) {
              me.loadScreen = loadScreen
              return loadScreen.present()
            } else loadScreen.dismiss()
          });
      }
    },
    hideLoading() {
      this.loading = false;
      if(this.loadScreen) this.loadScreen.dismiss()
    },
    presentAlert(header, message, subtitle, buttons) {
      return this.$ionic.alertController
        .create({
          header: header,
          subHeader: subtitle !== undefined ? subtitle : "",
          message: message,
          buttons: buttons !== undefined ? buttons : ["OK"]
        })
        .then(a => a.present());
    },
    presentToast(message, duration) {
      return this.$ionic.toastController
        .create({
          message: message,
          duration: duration === undefined ? 4000 : duration
        })
        .then(a => a.present())
    }
  }
};
</script>