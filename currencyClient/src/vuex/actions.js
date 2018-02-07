import axios from 'axios'

export default {

  LOAD_TOKEN : ({dispatch, commit, state}) => {
    var token = localStorage.getItem('token') || "{}";
    commit('UPDATE_TOKEN', JSON.parse(token));
  },

  SAVE_TOKEN : ({
    commit,
    state
  }, token) => {
    if (token && !token.refresh_token) {
      token.refresh_token = state.token.refresh_token;
    }
    localStorage.setItem('token', JSON.stringify(token));
    commit('UPDATE_TOKEN', token);
  },

  SIGNOUT : ({commit, state}) => {
    state.token = {};
    state.userconf = {};
    localStorage.setItem('token', JSON.stringify({}));
    localStorage.setItem('userconf', JSON.stringify({}));

    commit('UPDATE_ISSIGNIN', true);
    commit('UPDATE_ACTIVEPAGEINDEX', 0);
  },

  LOAD_LOCALDATABASE : ({
    dispatch,
    commit,
    state
  }, updateFlag) => {
    if (updateFlag) {
      axios.get('/v1/configuration').then((res) => {
        var result = res.data;
        commit('UPDATE_USERCONF', result.configuration.userconf);
        commit('UPDATE_INSTITUTIONS', result.configuration.institutions);
        commit('UPDATE_CURRENCIES', result.configuration.currencies);
        commit('UPDATE_SUBSCRIBEDIC', result.configuration.subscribedIC);

        return dispatch('SAVE_LOCALDATABASE');
      });
    } else {
      var userconf = JSON.parse(localStorage.getItem('userconf'));
      var institutions = JSON.parse(localStorage.getItem('institutions'));
      var currencies = JSON.parse(localStorage.getItem('currencies'));
      var subscribedIC = JSON.parse(localStorage.getItem('subscribedIC'));
      commit('UPDATE_USERCONF', userconf);
      commit('UPDATE_INSTITUTIONS', institutions);
      commit('UPDATE_CURRENCIES', currencies);
      commit('UPDATE_SUBSCRIBEDIC', subscribedIC);
    }
  },

  SAVE_LOCALDATABASE : ({dispatch, commit, state}) => {
    localStorage.setItem('userconf', JSON.stringify(state.userconf));
    localStorage.setItem('institutions', JSON.stringify(state.institutions));
    localStorage.setItem('currencies', JSON.stringify(state.currencies));
    localStorage.setItem('subscribedIC', JSON.stringify(state.subscribedIC));

    axios.post('/v1/configuration', {
      userconf: state.userconf,
      subscribedIC: state.subscribedIC
    }).then((res) => {
      console.log("SAVE_LOCALDATABASE() : Update configuration info successfully.");
    }).catch((err) => {
      console.log("SAVE_LOCALDATABASE() : ", err);
    });
  },

  TAB_GOINDEX : ({
    dispatch,
    commit,
    state
  }, tabindex) => {
    commit('TAB_GOINDEX', tabindex);
  },

  PAGE_PROPS : ({
    dispatch,
    commit,
    state
  }, {tabindex, key, value}) => {
    commit('PAGE_PROPS', {tabindex, key, value});
  },

  UPDATE_SUBSCRIBEDIC : ({
    dispatch,
    commit,
    state
  }, ics) => {
    commit('UPDATE_SUBSCRIBEDIC', ics);
    commit('TAB_GOINDEX', 0);
  },

  ADD_SUBSCRIBEDIC : ({
    dispatch,
    commit
  }, {institution_swift, ics}) => {
    commit('ADD_SUBSCRIBEDIC', {institution_swift, ics});
    commit('TAB_GOINDEX', 0);
    dispatch('SAVE_LOCALDATABASE');
  }
}
