import React, { Component, PropTypes, contextTypes, mixins  } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TextInput from "../components/TextInput";
import {reset, show_error, fetchPosts, _submitForm } from '../actions';
import { hashHistory } from 'react-router';
import {setCookie, getCookie} from '../utils';

class Login extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	disable:true
	  };
	}
    componentWillMount() {
        document.title = "登录"
	    this.props.dispatch(reset("Login"));
    };
    componentWillReceiveProps(nextProps) {
      if(nextProps.posts && nextProps.posts.Code === 0){
      	setCookie("code", nextProps.code);
      	setCookie("token", nextProps.posts.Body.Token);
      	hashHistory.push("/");
      };
    };
	render(){
		const {posts} = this.props;
		
		let Toop =  (posts && posts.Msg)?(<div className = "errToop">{posts.Msg}</div>):(<div className ="errToop hide"></div>)
		return(
			<div>
			<div className="header">
				<ul>
					<li className="on"><Link to="Login">登录</Link></li>
					<li ><Link to="register">注册</Link></li>
				</ul>
			</div>
			{Toop}
			<div className="input-Container">
				<div className="inputBox">
					<i></i>
					<TextInput
					name ="phone"
					className="textInput"
					ref="phone"
					type="tel"
					maxLength="11"
					placeholder="请输入手机号"
					changeHandle={this.setable.bind(this)}
					validate={this.show.bind(this)}/>
				</div>
				<div className="inputBox">
					<i className="pw"></i>
					<TextInput
					name="password"
					className="textInput"
					ref="password"
					type="password"
					placeholder="请输入登录密码"
					maxLength="16"
					changeHandle={this.setable.bind(this)}
					validate={this.show.bind(this)}/>
				</div>
			</div>
			{this.state.disable ?
			<button className= "Btn disabledBtn">登录</button>:
			<button className= "Btn " onClick={this._submit.bind(this)}>登录</button>
		    }
		    <ul className="bottomLink">
		     	<li className="green"><Link to="/" >返回首页</Link></li>
		     </ul>
			</div>
			)
	}
	show(e) {
	    this.props.dispatch(show_error("Login", e));
	}
	setable(){
		let input1 = ReactDOM.findDOMNode(this.refs.phone).value,
			input2 = ReactDOM.findDOMNode(this.refs.password).value;
		if(input1 !== "" && input2 !== ""){
			this.setState({disable:false})
		}else{
			this.setState({disable:true})
		}
	}
	_submit(){
		if(!this.state.errVisible){
		let phone = ReactDOM.findDOMNode(this.refs.phone).value,
		    pwd = ReactDOM.findDOMNode(this.refs.password).value;
		let params = {"Phone":phone, "Pwd":pwd};
		this.props.dispatch(_submitForm("Login", params));
		}
	}
}
Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};
Login.PropTypes = {
  errVisible: React.PropTypes.bool.isRequired,
  errMsg: React.PropTypes.string.isRequired,
  able: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { postsByApi } = state
  const {
    isFetching,
    items: posts,
    code:code
  } = postsByApi["Login"] || {
    isFetching: false,
    items: "",
    code:""
  }
  return {
    posts,
    isFetching,
    code
  }
}

export default connect(mapStateToProps)(Login);
