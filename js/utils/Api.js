/*ajax
*/
export function getAPI(ApiName){
    var reqDic = [
              {name:'GetAccountInfor',url:'ppapi/Account/GetAccountInfor',type:"GET"},
              {name:'GetSignInfor', url:'ppapi/Trade/GetSignInfor', type:"POST"},
              {name:'PlatformList_User', url:'ppapi/Project/PlatformList_User', type:"POST"},
              {name:'PlatformListDreg_User', url:'ppapi/Project/PlatformListDreg_User', type:"POST"},
              {name:'PlatformList', url:'ppapi/Project/PlatformList_v3_0', type:"POST"},
              {name:'GetCard', url:'ppapi/Account/GetCard', type:'GET'},
              {name:'GetNoticesDetailByID', url:'ppapi/Sys/GetNoticesDetailByID_v2_5', type:'POST'},
              {name:'InvitorInfo', url:'ppapi/AD/InvitorInfo', type:"GET"},
              {name:'GetProductBuyLog', url:'ppapi/Product/GetProductBuyLog', type:"POST"},


              {'name':'ProductList', 'url':'ppapi/Product/ProductList_v3_0'},
              {'name':'CurrentInfor', 'url':'ppapi/Product/CurrentInfor_v3_0'},
              {'name':'RegularInfor', 'url':'ppapi/Product/RegularInfor_v3_0'},
              {'name':'Login', 'url':'ppapi/Users/Login', 'type':'POST'},
              {'name':'Regist', 'url':'ppapi/Users/Regist', 'type':'POST'},
              {'name':'RegCode', 'url':'ppapi/Sms/RegCode', 'type':"POST"},
              {'name':'QueryUserProfit', 'url':'ppapi/FundFlow/QueryUserProfit_3_0', 'type':'POST'}, //
              {'name':'QueryUserDregularList', 'url':'ppapi/FundFlow/QueryUserDregularList_v3_0', 'type':'POST'}, //定期记录
              {'name':'GetUserWealthWeiXin', 'url':'ppapi/WeChat/GetUserWealthWeiXin', 'type':"POST"}, //微信端我的资产接口
              {'name':'GetAgentDetails', 'url':'ppapi/WeChat/GetAgentDetails',  'type':"POST"}, //获取经纪人详细信息
              {'name':'GetCommissionLog', 'url':'ppapi/WeChat/GetCommissionLog', 'type':"POST"}, //获取佣金记录
              ];

    for(var i in reqDic){
      if(reqDic[i].name == ApiName){
        return reqDic[i].url;
      }
    }
  };

  function setToken(){
    return {"code":localStorage.getItem("code"), "token":localStorage.getItem("token"), "terminal":2,  "channel":30}
  };
export  function getBaseUrl(){
  return "http://ppapi.ppjijin.com/";
}


