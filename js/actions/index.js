import fetch from 'isomorphic-fetch';
import {getAPI, getBaseUrl} from "../utils/Api";
import {getRandomCode, getCookie} from "../utils";
import merge from 'lodash/merge'

import {REQUEST_POSTS,
        RECEIVE_POSTS,
        SHOW_ERROR,
        RESET,
        REQUEST_FORM,
        RECEIVE_FORM} from '../constants';

//开始获取新闻action
function requestPosts(ApiName) {
  return {
    type: REQUEST_POSTS,
    ApiName
  };
}
//获取新闻成功的action
function receivePosts(ApiName, json) {
  return {
    type: RECEIVE_POSTS,
    ApiName: ApiName,
    posts: json.Body
  };
}

//获取，先触发requestPosts开始获取action，完成后触发receivePosts获取成功的action
export function fetchPosts(ApiName, header, params) {
  var header = merge({"Content-Type":"application/json"},header);
  // (原来cookie获取)var header = {"Content-Type":"application/json", "code":getCookie("code"), "token":getCookie("token")};
  // 使用fetch。部分浏览器不兼容，改用reqwest。
  return dispatch => {
    dispatch(requestPosts(ApiName));
    return fetch(getBaseUrl()+ getAPI(ApiName),
      {
        method: 'POST',
        headers: header,
        body:  JSON.stringify(params)
      })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(ApiName, json)));
  };
}
//获取，先触发requestPosts开始获取action，完成后触发receivePosts获取成功的action
export function fetchGET(ApiName, params) {
  var header = {"Content-Type":"application/json", "code":params.code, "token":params.token};
  return dispatch => {
    dispatch(requestPosts(ApiName));
    return fetch(getBaseUrl()+ getAPI(ApiName),
      {
        method: 'GET',
        headers: header
      })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(ApiName, json)));
  };
}
//导出提交表单的方法
export function _submitForm(ApiName, params) {
  var header = {"Content-Type":"application/json", "code":getRandomCode()};
    return dispatch => {
      dispatch(fetchPostsByForm(ApiName, header, params));
  };
}
//导出前端检测的方法
export function show_error(ApiName, params) {
  return {
    type: SHOW_ERROR,
    ApiName: ApiName,
    posts:params
  };
}

export function reset(ApiName) {
  return {
    type: RESET,
    ApiName
  };
}


//开始获取表单action
function requestForm(ApiName) {
  return {
    type: REQUEST_FORM,
    ApiName
  };
}


//获取表单的action
function receiveForm(ApiName, header, json) {
  if(json.Code !== 0){
    return{
      type:SHOW_ERROR,
      ApiName:ApiName,
      posts:json
    };
  }
  return {
      type: RECEIVE_FORM,
      ApiName:ApiName,
      posts:json,
      header:header
  };


}

export function fetchPostsByForm(ApiName, header, params) {
  // 使用fetch。部分浏览器不兼容，改用reqwest。
  return dispatch => {
    dispatch(requestForm(ApiName));
    return fetch(getBaseUrl()+ getAPI(ApiName),
      {
        method: 'POST',
        headers: header,
        body:  JSON.stringify(params)
      })
      .then(response => response.json())
      .then(json => dispatch(receiveForm(ApiName, header, json)));
  };

}

//这些方法都导出,在其他文件导入时候,使用import * as actions 就可以生成一个actions对象包含所有的export


