import {SHOW_ERROR,
        REQUEST_POSTS,
        RECEIVE_POSTS,
        REQUEST_FORM,
        RECEIVE_FORM,
        SAVE_COOKIE,
        RESET} from '../constants';


function posts(state = {
  //是否正在获取最新
  isFetching: false,
  //内容
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      })
    case SHOW_ERROR:
    case REQUEST_FORM:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      })
    case RECEIVE_FORM:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        code:action.header.code
      })
    case RESET:
      return Object.assign({}, state, {
        isFetching: false,
        items:[],
        code:""
      })
    default:
      return state
  }
}
//废弃、接收到、开始接受新闻后，将state.postsByReddit设为相关参数
export default function postsByApi(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case SHOW_ERROR:
    case REQUEST_FORM:
    case RECEIVE_FORM:
    case RESET:
      return Object.assign({}, state, {
        [action.ApiName]: posts(state[action.ApiName], action)
      })
    default:
      return state
  }
}