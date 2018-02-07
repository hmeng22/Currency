<template>
<v-ons-page>
  <transition name="fade">
    <v-ons-row v-show='isloading' class="loadingbg">
      <v-ons-progress-circular indeterminate class="loading"></v-ons-progress-circular>
    </v-ons-row>
  </transition>

  <v-ons-tabbar :index="activePageIndex" @update:index='updateActivePageIndex'>
    <template slot="pages">
      <tab1></tab1>
      <tab2></tab2>
      <tab3></tab3>
      <tab4></tab4>
    </template>

    <v-ons-tab v-for="(tab, index) in tabs" :icon="tabs[index].icon" :label="tabs[index].label" :key="index"></v-ons-tab>
  </v-ons-tabbar>

  <signin></signin>
  <signup></signup>

</v-ons-page>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import tab1 from './tabs/tab1'
import tab2 from './tabs/tab2'
import tab3 from './tabs/tab3'
import tab4 from './tabs/tab4'

import signin from './components/signin.vue'
import signup from './components/signup.vue'

export default {
  name: 'app',

  data() {
    return {
      tabs: [{
        icon: null,
        label: '关注'
      }, {
        icon: null,
        label: '银行'
      }, {
        icon: null,
        label: '货币'
      }, {
        icon: null,
        label: '我'
      }]
    }
  },

  computed: {
    ...mapGetters([
      'token',
      'isloading',
      'activePageIndex'
    ])
  },

  beforeMount() {
    this.axios.interceptors.request.use((config) => {
      this.$store.commit('UPDATE_ISLOADING', true);
      config.headers.common['Authorization'] = "JWT " + this.token.access_token;
      return config;
    }, (error) => {
      this.$store.commit('UPDATE_ISLOADING', false);
      return Promise.reject(error);
    });

    this.axios.interceptors.response.use((response) => {
      this.$store.commit('UPDATE_ISLOADING', false);
      return response;
    }, (error) => {
      this.$store.commit('UPDATE_ISLOADING', false);
      if (!error.config.__isRetryRequest && error.response.status == "401" && error.response.statusText == "Unauthorized") {
        error.config.__isRetryRequest = true;
        return this.axios.post('/refreshtoken', {
          refresh_token: this.token.refresh_token
        }).then((res) => {
          var result = res.data;
          if (!result.success) {
            this.$ons.notification.toast('Please sign in.', {
              animation: 'fall',
              timeout: 3000,
              class: 'toastclass'
            });
            this.$store.commit('UPDATE_ISSIGNIN', true);
          } else {
            this.$store.commit('UPDATE_TOKEN', {
              access_token: result.access_token
            });

            return this.axios(error.config);
          }
        }).catch((err) => {
          this.$store.commit('UPDATE_ISSIGNIN', true);
        });
      }
      return Promise.reject(error);
    });
  },

  mounted() {
    this.$store.dispatch('LOAD_TOKEN').then(() => {
      return this.axios.post('/refreshtoken', {
        refresh_token: this.token.refresh_token
      })
    }).then((res) => {
      var result = res.data;
      if (!result.success) {
        throw new Error();
      } else {
        this.$store.dispatch('SAVE_TOKEN', result.token).then(() => {
          this.$store.commit('UPDATE_ISSIGNIN', false);
          this.$store.commit('UPDATE_ISSIGNUP', false);
          this.$store.dispatch('LOAD_LOCALDATABASE', false);
        });
      }
    }).catch((err) => {
      this.$ons.notification.toast('Please sign in.', {
        animation: 'fall',
        timeout: 3000,
        class: 'toastclass'
      });
      this.$store.commit('UPDATE_ISSIGNIN', true);
    });
  },

  beforeDestroy() {
    this.$store.dispatch('SAVE_LOCALDATABASE');
  },

  destroyed() {

  },

  methods: {
    ...mapActions([
      'LOAD_TOKEN',
      'LOAD_LOCALDATABASE',
      'SAVE_LOCALDATABASE',
      'UPDATE_ISLOADING',
      'UPDATE_ACTIVEPAGEINDEX'
    ]),

    updateActivePageIndex(i) {
      this.$store.commit('UPDATE_ACTIVEPAGEINDEX', i);

      setTimeout(1);
    }
  },

  components: {
    tab1,
    tab2,
    tab3,
    tab4,
    signin,
    signup
  }
}
</script>

<style scoped>
.loadingbg {
  z-index: 5000;
  background-color: #2f2f2f;
  opacity: 0.8;
  width: 100%;
  height: 100%;
  position: fixed;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
