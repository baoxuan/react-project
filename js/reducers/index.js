import { combineReducers } from 'redux'
import postsByApi from './postsByApi'
import changeType from './changeType'
//将两个reducer合并成一个reducer,也就将全局的state加上postsByReddit,selectedReddit两个属性，每个属性都有自己的state
const rootReducer = combineReducers({
  postsByApi,
  changeType
})

export default rootReducer
