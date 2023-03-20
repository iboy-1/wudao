const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  permission_routes: state => state.permission.routes,
  websock: state => state.websocketStore.websock,
  eventlist: state => state.websocketStore.eventlist,
  newMsg: state => state.websocketStore.newMsg,
}
export default getters
