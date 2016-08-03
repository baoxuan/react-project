import React, { Component, PropTypes } from 'react';


class Toast extends Component{
	render(){
		const {text, show} = this.props;
		let s = show ? "toast":"toast none";
		return (
				<div className={s}>{text}</div>
			);
	}

}

Toast.propTypes = {
  text: PropTypes.string.isRequired
};

export default Toast;