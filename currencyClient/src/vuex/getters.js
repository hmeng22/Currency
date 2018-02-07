export default {
  version : state => state.version,
  token : state => state.token,
  userconf : state => state.userconf,
  isloading : state => state.isloading,
  issignin : state => state.issignin,
  issignup : state => state.issignup,

  activePageIndex : state => state.activePageIndex,
  pageStack : state => state.pageStack,
  pageStackProps : state => state.pageStackProps,

  institutions : state => state.institutions,
  currencies : state => state.currencies,
  subscribedIC : state => state.subscribedIC
}
