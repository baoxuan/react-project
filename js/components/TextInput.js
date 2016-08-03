import React, { Component, PropTypes } from 'react';

class TextInput extends Component{
	render(){
		const {maxLength, name, type, className, placeholder, value, changeHandle, validate} = this.props;
		return (
			<input
      maxLength={maxLength}
			name ={name}
			className = {className}
			type={type}
			placeholder={placeholder}
			value = {value}
			onChange={this._onChange.bind(this)}
			onBlur ={this._onBlur.bind(this)}/>
			);
	}
	_onChange(event) {
	    this.setState({
	      value: event.target.value
	    });
      this.props.changeHandle();
  	}
  _onBlur(e){
  		let value= e.target.value;
  		let name = e.target.name;
      this.props.validate(handlerValidate(value, name));
  	}

}

function handlerValidate(value, name){
  switch (name){
    case "phone":
      return valiPhone(value);
    case "password":
      return valiPassword(value);
    case "code":
      return valiCode(value);
    default:

  }
}
function valiPhone(e){
        if (!(/^1[3|4|5|7|8]\d{9}$/.test(e))) {
            return{
            	Msg:"手机号码格式错误"
            };
        }
       return "";
}

function valiPassword(e){
        if (e.length < 6 || e.length > 16) {
            return{
              Msg:"密码为6-16为数字和字母组合",
            };
        }
        return "";
}
function valiCode(e){
        if (e.length !== 6) {
            return{
              Msg:"6位数验证码"
            };
        }
       return "";
}

TextInput.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired
};
export default TextInput;