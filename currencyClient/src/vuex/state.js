export default {
  // configuration
  version : "0.0.1",
  // authencation token object
  token : {
    access_token: "",
    refresh_token: ""
  },
  // user configuration
  userconf : null,

  // progress indicator
  isloading : false,
  issignin : false,
  issignup : false,

  // tabs
  activePageIndex : 0,
  pageStack : [
    [], [], [], []
  ],
  pageStackProps : [
    {}, {}, {}, {}
  ],

  // data
  institutions : [],
  currencies : [],
  subscribedIC : []
}
