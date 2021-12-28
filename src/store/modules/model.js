import { getAction } from '@api/manage'

const model = {
  state: {
    case_source: [],
    case_type: [],
    case_business_type: []
  },
  mutations: {
    SET_CASE_SOURCE: (state, case_source) => {
      state.case_source = case_source
    },
    SET_CASE_TYPE: (state, case_type) => {
      state.case_type = case_type
    },
    SET_CASE_BUSINESS_TYPE: (state, case_business_type) => {
      state.case_business_type = case_business_type
    },
  },
  actions: {
    updateCaseSource({ commit }, url) {
      return new Promise((resolve, reject) => {
        getAction(url)
          .then((response) => {
            console.log(response)
            if (response.success) {
              commit('SET_CASE_SOURCE', response.result)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateCaseType({ commit }, url) {
      return new Promise((resolve, reject) => {
        getAction(url)
          .then((response) => {
            console.log(response)
            if (response.success) {
              commit('SET_CASE_TYPE', response.result)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateCaseBusinessType({ commit }, url) {
      return new Promise((resolve, reject) => {
        getAction(url)
          .then((response) => {
            console.log(response)
            if (response.success) {
              commit('SET_CASE_BUSINESS_TYPE', response.result)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default model