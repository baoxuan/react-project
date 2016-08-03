// 设置cookie
export function setCookie(name, value){
    document.cookie = name +"="+value;
}
// 获取cookie
export function getCookie(name){
    if(document.cookie.length>0){
      var pp_start = document.cookie.indexOf(name + "=");
      if(pp_start !=-1){
        pp_start += name.length+1;
       var  pp_end = document.cookie.indexOf(';', pp_start);
        if(pp_end == -1) pp_end = document.cookie.length;
        return  document.cookie.substring(pp_start, pp_end);
      }
    }
    return "";
}

// 获取随机数
export function getRandomCode(){
   var result = [];
    for(var i=0;i<20;i++){
      var t = Math.floor(Math.random()*10);
      result+=t;
    }
    return result;
}


export function FormatMoney(s) {
      var s = (s!== void 0 && s!== null) && s.toString();
        if (/[^0-9\.]/.test(s)) return "";
        s = s.replace(/^(\d*)$/, "$1.");//对一个匹配的数字后面加.
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
            s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        return  s.replace(/^\./, "0.");
}
 export function get2Decimals(decimal){
    var decimal = (Math.floor(decimal*10000)/100).toString();
    var index = decimal.indexOf(".");
    if(index < 0){
      decimal += ".00";
    };
    while(decimal.length <= index+2){
      decimal +="0";
    };
    return decimal;
  }//取两位小数
 export function getTime(t){
       t = t &&  t.substring(0, 10)+ " "+ t.substring(11, 16);
        return t;
    }
 export function getTime1(t){
       t = t &&  t.substring(0, 10);
        return t;
    }