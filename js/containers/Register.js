import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'
import TextInput from "../components/TextInput"
import Toast from "../components/Toast"

import {reset, show_error, fetchPosts, _submitForm } from '../actions'


function getRegisterState(){
    return{
        errMsg:RegisterStore.getInfor().msg,
        errVisible:RegisterStore.getInfor().state,
        tickState:RegisterStore.getTickState(),
        ToastShow:RegisterStore.getToastState()
    }
}

class Register extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		  disable:true, // 按钮是否置灰
		  tickState:0, // 倒计时状态，0：没点击时 ，1：倒计时， 2 倒计时结束
		  second:10, // 倒计时
		  ToastShow:false, //Toast 隐藏
		  };
	}

    componentWillMount() {
        document.title = "注册";
        console.log("componentWillMount");
	    this.props.dispatch(reset("Regist"));

    }
    tick() {
        if(this.state.second == 0){
            this.setState({
                second:10,
                tickState:2
            });
        clearInterval(this.timer);
        }else{
            this.setState({second: this.state.second -1});
        }

    }
    componentWillUnmount() {
    	 // console.log("componentWillUnmount");
         clearInterval(this.timer);
         this.setState({errVisible:false});

    }
	componentWillReceiveProps(nextProps) {
		// console.log("componentWillReceiveProps",nextProps);
		if(nextProps.postsForm){
	        this.setState({ToastShow:false});
	        if(nextProps.postsForm.Code == 0){
	        	this.setState({tickState:1})
	        	this.timer= setInterval(this.tick.bind(this), 1000);
	        }
		}
	if(nextProps.posts && nextProps.posts.Code === 0){
      	setCookie("code", nextProps.code)
      	setCookie("token", nextProps.posts.Body.Token)
      	hashHistory.push("/")
      }

	}
	render(){
        let tMsg;
        console.log("render")
        if(this.state.tickState == 1 ){
            tMsg = this.state.second+"秒";
        }else if(this.state.tickState == 2){
            tMsg = "重新获取";
        }else{
            tMsg = "发送验证码";
        }

        let ToastShow =  this.state.ToastShow;
		const {posts, postsForm} = this.props;
		let Toop;
		if(postsForm && posts.Msg && postsForm.Code != 0){
			Toop = <div className ="errToop">{postsForm.Msg}</div>
		}else if(posts && posts.Msg && posts.Code != 0){
			Toop = <div className ="errToop">{posts.Msg}</div>
		}
		else{
			Toop = <div className ="errToop hide"></div>
		}
		return(
			<div>
			<Toast text="发送验证码..."  show={ToastShow} auto={false}/>
			<div className="header">
				<ul>
					<li ><Link to="Login">登录</Link></li>
					<li className="on"><Link to="register">注册</Link></li>

				</ul>
			</div>
			{Toop}
			<div className="input-Container">
				<div className="inputBox">
					<i></i>
					<TextInput
					name="phone"
					className="textInput"
					ref="phone"
					type="tel"
					maxLength="11"
					placeholder="请输入手机号"
					changeHandle={this.setable.bind(this)}
					validate={this.show.bind(this)}/>
				</div>
				<div className="inputBox codeBox">
					<i className="pw"></i>
					<TextInput
					name="code"
					className="textInput"
					ref="code"
					type="number"
					placeholder="请输入短信验证码"
					changeHandle={this.setable.bind(this)}
					validate={this.show.bind(this)}/>
					<button className={
					classnames("vailBtn",
					 			{disabled:this.state.tickState == 1})}
						 onClick={this._send.bind(this)}>{tMsg}</button>
				</div>
				<div className="inputBox">
					<i className="cw"></i>
					<TextInput
					name="password"
					className="textInput"
					ref="password"
					type="password"
					maxLength="16"
					placeholder="请输入6-16位数字、字母组合登录密码"
					changeHandle={this.setable.bind(this)}
					validate={this.show.bind(this)}/>
				</div>
			</div>
			{this.state.disable ?
			<button className= "Btn disabledBtn">注册</button>:
			<button className= "Btn " onClick={this._submit.bind(this)}>注册</button>
		    }
			<p className="proText">我已阅读和同意<Link to="Protocol">《用户注册服务协议》</Link></p>
		     <ul className="bottomLink">
		     	<li className="green"><Link to="/" >返回首页</Link></li>
		     </ul>
			</div>
			)
	}
	show(e) {
	    this.props.dispatch(show_error("Regist", e));
	    this.props.dispatch(show_error("RegCode"));//移除获取验证码的错误提示
	}
	setable(){
		let input1 = ReactDOM.findDOMNode(this.refs.phone).value,
		    input2 = ReactDOM.findDOMNode(this.refs.code).value,
			input3 = ReactDOM.findDOMNode(this.refs.password).value;
		if(input1 !== "" && input2 !== "" && input3 !== ""){
			this.setState({disable:false})
		}else{
			this.setState({disable:true})
		}
	}
	_send(){
	    if(this.state.tickState !=1){
	        var phone = ReactDOM.findDOMNode(this.refs.phone).value;
	        if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone)) ){
	    		this.props.dispatch(show_error("Regist", {Msg:"手机号码格式错误"}));
	        }else{
	    		this.props.dispatch(show_error("Regist", ""));
	           	this.props.dispatch(_submitForm("RegCode", {"Phone":phone}));
	           	this.setState({ToastShow:true})
	        }
	    }
	}
	_submit(){
		if(!this.state.errVisible){
		let phone = ReactDOM.findDOMNode(this.refs.phone).value,
		    code = ReactDOM.findDOMNode(this.refs.code).value,
		    pwd = ReactDOM.findDOMNode(this.refs.password).value;
		let data = {"Phone":phone, "Pwd":pwd, "Code":code};
	        this.props.dispatch(_submitForm("Regist", data));
		}
	}


}

function mapStateToProps(state) {
  const { postsByApi } = state
  const {
    isFetching,
    items: posts,
    code:code
  } = postsByApi["Regist"] || {
    isFetching: false,
    items: "",
    code:""
  }
  const {
    items:postsForm
  } = postsByApi["RegCode"] || {
    items:""
  }
  return {
    posts,
    isFetching,
    code,
    postsForm

  }
}

export default connect(mapStateToProps)(Register)

