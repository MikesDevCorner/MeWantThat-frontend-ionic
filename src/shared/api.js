import axios from "axios";

const url = "https://masterthesis.mikesdevcorner.com";

export default {
  install: function(Vue) {
    Vue.prototype.$api = {
      async getLists() {
        let response = await axios.get(url + "/api/lists");
        return Promise.resolve(response);
      },
      async addList(name) {
        let response = await axios.post(url + "/api/list", {
          listenname: name
        });
        return Promise.resolve(response);
      },
      async removeList(list) {
        let response = await axios.delete(url + "/api/list/" + list.id);
        return Promise.resolve(response);
      },
      async getEntries(listId) {
        let response = await axios.get(url + "/api/entries/" + listId);
        return Promise.resolve(response);
      },
      async addEntry(name, amount, listId) {
        let response = await axios.post(url + "/api/entry", {
          postenname: name,
          anzahl: amount,
          einkaufsliste_id: listId
        });
        return Promise.resolve(response);
      },
      async removeEntry(entry) {
        let response = await axios.delete(url + "/api/entry/" + entry.id);
        return Promise.resolve(response);
      }
    };
  }
};
