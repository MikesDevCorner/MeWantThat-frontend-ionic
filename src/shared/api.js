import axios from "axios"
import auth from "./auth.js"

const url = "https://me-want-that.com/api"

export default {
  isAuthenticated: false,
  install: function(Vue) {
    Vue.prototype.$api = {
      async login(email, password) {
        let response = null;
        try {
          response = await axios.post(url + "/login", {
            email: email,
            password: password
          });
          if(response.status === 202) {
            await auth.setToken(response.data.success.token)
          }
          return response
        } catch(e) {
          if(auth.checkUnauthenticated(e)) return e.response
        }
      },
      async logout() {
        let response = await axios.post(url + "/logout")
        auth.setToken(null)
        return response
      },
      async unregister() {
        let response = await axios.post(url + "/unregister")
        auth.setToken(null)
        return response
      },
      async register(name, email, password, password_confirmation) {
        try {
          let response = await axios.post(url + "/register", {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            name: name          
          });
          if(response.status === 201) {
            await auth.setToken(response.data.success.token)
          }
          return response
        } catch(e) {
          if(auth.checkUnauthenticated(e)) return e.response
        }
      },
      async getLists() {
        try {
          let response = await axios.get(url + "/lists")
          return response
        } catch(e) {
          if(auth.checkUnauthenticated(e)) return e.response
        }
      },
      async addList(name) {
        try {
          let response = await axios.post(url + "/list", {
            listname: name
          })
          return response
        } catch(e) {
          if(auth.checkUnauthenticated(e)) return e.response
        }
      },
      async removeList(list) {
        try {
          let response = await axios.delete(url + "/list/" + list.id);
          return Promise.resolve(response)
        } catch(e) {
          if(auth.checkUnauthenticated(e)) return e.response
        }
      },
      async getEntries(listId) {
        try {
          let response = await axios.get(url + "/list/" + listId + "/entries");
          return Promise.resolve(response)
        } catch(e) {
          if(auth.checkUnauthenticated(e)) return e.response
        }
      },
      async addEntry(name, amount, listId) {
        try {
          let response = await axios.post(url + "/list/"+listId+"/entry", {
            entryname: name,
            amount: amount
          });
          return Promise.resolve(response)
        } catch(e) {
          if(auth.checkUnauthenticated(e)) return e.response
        }
      },
      async removeEntry(entry) {
        try {
          let response = await axios.delete(url + "/entry/" + entry.id)
          return Promise.resolve(response)
        } catch(e) {
          if(auth.checkUnauthenticated(e)) return e.response
        }
      }
    };
  }
};
