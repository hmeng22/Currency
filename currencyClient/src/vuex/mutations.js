export default {
  UPDATE_TOKEN : (state, token) => {
    if (token && token.access_token) {
      state.token.access_token = token.access_token;
    }
    if (token && token.refresh_token) {
      state.token.refresh_token = token.refresh_token;
    }
  },

  UPDATE_USERCONF : (state, userconf) => {
    state.userconf = userconf;
  },

  UPDATE_ISLOADING : (state, isloading) => {
    state.isloading = isloading;
  },

  UPDATE_ISSIGNIN : (state, issignin) => {
    state.issignin = issignin;
  },

  UPDATE_ISSIGNUP : (state, issignup) => {
    state.issignup = issignup;
  },

  UPDATE_ACTIVEPAGEINDEX : (state, index) => {
    state.activePageIndex = index;
  },

  TAB_GOINDEX : (state, tabindex) => {
    state.pageStack[tabindex].splice(1, state.pageStack[tabindex].length - 1);
  },

  TAB_PUSHSTACK : (state, {tabindex, page}) => {
    state.pageStack[tabindex].push(page);
  },

  PAGE_PROPS : (state, {tabindex, key, value}) => {
    state.pageStackProps[tabindex][key] = value;
  },

  UPDATE_INSTITUTIONS : (state, is) => {
    state.institutions = is;
  },

  UPDATE_CURRENCIES : (state, cs) => {
    state.currencies = cs;
  },

  UPDATE_SUBSCRIBEDIC : (state, ics) => {
    state.subscribedIC = ics;
  },

  ADD_SUBSCRIBEDIC : (state, {institution_swift, ics}) => {
    var length = state.subscribedIC.length;
    for (var i = state.subscribedIC.length - 1; i >= 0; i--) {
      if (state.subscribedIC[i].institution_swift == institution_swift) {
        state.subscribedIC.splice(i, 1);
      }
    }
    state.subscribedIC.push.apply(state.subscribedIC, ics);
  }
}
