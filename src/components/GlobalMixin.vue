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
        this.loading = true;
        return this.$ionic.loadingController
          .create({
            showBackdrop: false,
            translucent: true,
            //spinner: 'dots',
            cssClass: 'my-loading-class'
          })
          .then(loadScreen => {
            me.loadScreen = loadScreen;
            return loadScreen.present();
          });
      }
    },
    hideLoading() {
      this.loading = false;
      this.loadScreen.dismiss();
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
    presentToast(message) {
      return this.$ionic.toastController
        .create({
          message: message,
          duration: 2000
        })
        .then(a => a.present());
    }
  }
};
</script>