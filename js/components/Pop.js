import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

class Pop extends Component{
	render(){
		const {text, show, callbackParent} = this.props;
		return (
			<div className={classnames(
				"pop_bg",
				{"show":show}
				)}>
				<div className="pop_container">
					<h3><div className="colsed" onClick ={this._click.bind(this)}></div><div className="title">提示</div></h3>
					<p>下载PP基金APP,进行{text}操作</p>
					<Link to="/Download">去下载</Link>
				</div>
			</div>
			);
	}
	_click(){
		this.props.callbackParent(false);
	}

}

Pop.propTypes = {
  text: PropTypes.string.isRequired
};

export default Pop;