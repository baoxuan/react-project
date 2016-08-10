import React, { Component, PropTypes }from 'react'
import ReactSwipe from 'react-swipe';

const  bannerData = [
	{key:"ba1", imgUrl:"./public/images/pg1.jpg"},
	{key:"ba2", imgUrl:"./public/images/pg2.jpg"}
];
const banners = bannerData.map(function (e){
  return(
      <div key={e.key}><img src={e.imgUrl}/></div>
      );
    });
const paginations = bannerData.map(function(e, t){
  return (
    <li key={e.key} className= {0===t ? "on":""}></li>
    );
});

class download extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'download';
        this.state = {
        	isShow:false
        }
    }
    render() {
    	const {continuous, auto} =this.props;
		var display = this.state.isShow ? "block" :"none";
        return (
        <div>
        <a className="weixin-tip" style={{display:display}} onClick={this.hideHandler.bind(this)}>
		        <p>
		            <img src="./public/images/showToop.png" alt="微信打开"/>
		        </p>
		    </a>
        <div className="wrapper">
            <ReactSwipe className="carousel" 
            swipeOptions={{
            	continuous: this.props.continuous,
            	auto:this.props.auto,
                callback:this.swipeCallback.bind(this)
           }}>
            	 {banners}
            </ReactSwipe>
            <ul className="pagination" ref="pagination">
		       {paginations}
		    </ul>
		 </div>
		 <button className="btngreen" onClick={this.downhandler.bind(this)}>点击下载</button>
		 <p className="copy">PP基金 版权所有 ©2014-2020</p>
		 </div>
        );
    }
	swipeCallback(e, t){
	     var n = this.refs.pagination.getElementsByTagName("li");
	     for(var i=0;i<n.length;i++){
	      n[i].className = "";
	     }
	      n[e % n.length].className = "on";
	}
	downhandler(){
		var ua = navigator.userAgent.toLowerCase();
	  	if (ua.match(/MicroMessenger/i) == "micromessenger"){
	  		this.setState({isShow:true});
	  	}else{
	  		var u = navigator.userAgent;
	            if( u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
	                    window.location.href = "https://www.ppjijin.com/android/PP20.apk";
	            } //android终端或者uc浏览器
	   			else if( !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
	                window.location.href = "https://itunes.apple.com/cn/app/pp-ji-jin-zhuan-qian-shen/id982416928?mt=8";
	  	}
	  }
	}
	hideHandler(){
	  	e.preventDefault();
	  	this.setState({isShow:false});
	}
}

export default download;
