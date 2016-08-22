/*ajax
*/
export function getAPI(ApiName){
    var reqDic = [
              {name:'GetAccountInfor', url:'/ppapi/Account/GetAccountInfor'},
              {name:'GetSignInfor', url:'/ppapi/Trade/GetSignInfor'},
              {name:'PlatformList_User', url:'/ppapi/Project/PlatformList_User'},
              {name:'PlatformListDreg_User', url:'/ppapi/Project/PlatformListDreg_User'},
              {name:'PlatformList', url:'/ppapi/Project/PlatformList_v3_0'},
              {name:'GetCard', url:'/ppapi/Account/GetCard'},
              {name:'GetNoticesDetailByID', url:'/ppapi/Sys/GetNoticesDetailByID_v2_5'},
              {name:'InvitorInfo', url:'/ppapi/AD/InvitorInfo'},
              {name:'GetProductBuyLog', url:'/ppapi/Product/GetProductBuyLog'},
              {name:'GetPaywithdrawalList', url:'/ppapi/Paywithdrawal/GetPaywithdrawalList_2'},
              {name:'Regist', url:'/ppapi/Users/Regist'},
              {name:'RegCode', url:'/ppapi/Sms/RegCode'}
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
  // return "http://testppapi.taijishuo.com";
  return "";
}


