import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

class SelectItem extends Component{
	render(){
		const {type, value, selected, name, _onClick} = this.props;
		return (
			<dd className ={cx({"on":selected})}  type={type} value ={value} onClick = {this._click.bind(this)}>{name}</dd>
			);
	}
	_click(){
		this.props._onClick(this.props.name, this.props.value);
	}

}

SelectItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default SelectItem;