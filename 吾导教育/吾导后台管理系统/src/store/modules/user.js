import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import api from '@/api/power'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, code, verify_id } = userInfo
    return new Promise((resolve, reject) => {
      // localStorage.setItem('userInfo','qqq',{expires:1})
      // const data = {token: "admin-token"}
      // commit('SET_TOKEN', data.token)
      // setToken(data.token)
      // resolve()
      api.login({ account: username.trim(), password: password ,verify: code , verify_id:verify_id }).then(response => {
        console.log(response)
        if(response.data.code == 200){
          localStorage.setItem('WuDaoeducation',JSON.stringify(response.data.data),{expires:1})
          const data = {token: "admin-token"}
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }else{
          alert(response.data.data)
          reject(response.data.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


