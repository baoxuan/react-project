import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {reset, show_error, fetchGETParams, _submitForm } from '../actions'
import TextInput from "../components/TextInput"
import Toast from "../components/Toast"
import { hashHistory } from 'react-router'
import classnames from 'classnames'

class Share extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Share';
        this.state ={
        	height:window.innerHeight,
        	disable:true, // 按钮是否置灰
		 	tickState:0, // 倒计时状态，0：没点击时 ，1：倒计时， 2 倒计时结束
		    second:60, // 倒计时
		  	ToastShow:false //Toast 隐藏
        }
    }
    componentWillMount() {
	    document.title="邀请好友";
	    let params = this.props.location.query;
	    this.props.dispatch(reset("Regist"));
	    this.props.dispatch(fetchGETParams("InvitorInfo", params))
    }
    tick() {
        if(this.state.second == 0){
            this.setState({
                second:60,
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
      	hashHistory.push("/download")
      }

	}    renderTop(){
    	const { user } = this.props;
    	if(user && user.Phone){
    		 let phone = user.Phone.substring(0, 3)+'****'+user.Phone.substring(7);
    		return(
				<p style={{marginTop:this.state.height/2}}>您的好友{phone}已注册{user.RegDate}天</p>
			)
    	}
    }
    render() {
    	let tMsg;
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
		if(postsForm && postsForm.Msg && postsForm.Code != 0){
			Toop = <div className ="errMsg">{postsForm.Msg}</div>
		}else if(posts && posts.Msg && posts.Code != 0){
			Toop = <div className ="errMsg">{posts.Msg}</div>
		}
		else{
			Toop = <div className ="errMsg hide"></div>
		}
        return(
			<div className="yellowbg">
				<Toast text="发送验证码..."  show={ToastShow}/>
				<div className="sharebg" style={{height:this.state.height}}>
					{this.renderTop()}
					<div className="inviteBox">
						<div className="inputBox">
							<div className="input phoneInput">
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
							<button className={ classnames("valiBtn",
					 			{disabled:this.state.tickState == 1})}
						 onClick={this._send.bind(this)}>{tMsg}</button>
						</div>
						<div className="inputBox">
							<div className="input">
							<TextInput
								name="code"
								className="textInput"
								ref="code"
								type="number"
								placeholder="请输入短信验证码"
								changeHandle={this.setable.bind(this)}
								validate={this.show.bind(this)}/>
							</div>
						</div>
						<div className="inputBox">
							<div className="input">
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
						{Toop}
						{this.state.disable ?
						<button className= "Btn disabledBtn">注册</button>:
						<button className= "Btn " onClick={this._submit.bind(this)}>注册</button>
					    }
					</div>

				</div>
			</div>
        	);
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
		    pwd = ReactDOM.findDOMNode(this.refs.password).value,
		    FromId = this.props.location.query.userid;
		let data = {"Phone":phone, "Pwd":pwd, "Code":code, "FromId":FromId};
	        this.props.dispatch(_submitForm("Regist", data));
		}
	}
}


function mapStateToProps(state) {
  const { postsByApi } = state
  const {
    items: user
  } = postsByApi["InvitorInfo"] || {
    items: ""
  }
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
    user,
    posts,
    isFetching,
    code,
    postsForm

  }
}

export default connect(mapStateToProps)(Share)

