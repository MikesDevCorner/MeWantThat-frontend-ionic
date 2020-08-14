import 'capacitor-secure-storage-plugin'
import { Plugins } from '@capacitor/core'
import axios from 'axios'

const { SecureStoragePlugin } = Plugins;

export default {
    _token: null,
    setToken: async function(val) {
        this._token = val
        await SecureStoragePlugin.set({
            key: 'token', 
            value: val
        })
        if(val !== null) axios.defaults.headers.common = {'Authorization': `Bearer ${val}`, 'Accept': 'application/json'}
        else axios.defaults.headers.common = {'Accept': 'application/json'}
    },
    getToken: function() {
        return this._token
    },
    init: async function() {
        let t = {value: null};
        try {
            t = await SecureStoragePlugin.get({ key: 'token'})
        } catch(e) {
            console.log('no token read from storage')
        }
        if(t.value !== null && t.value !== 'null' && t.value !== undefined && t.value !== 'undefined') {
            this._token = t.value
            axios.defaults.headers.common = {'Authorization': `Bearer ${t.value}`, 'Accept': 'application/json'}
        }
    },
    checkUnauthenticated(e) { //Error goes in here. Checks if Unauthenticated or other error
        if(e.response && e.response.status === 401) {
            this.setToken(null)
            return e.response
        } else throw e
    }
 }