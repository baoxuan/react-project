import React, {Component, PropTypes}from 'react';
import TabsItem from './TabsItem';
import cx from 'classnames'


class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Tabs';
        this.state = {
        	activeKey:1
        }
    }
  handleClick(key){
  	var activeKey = this.state.activeKey;
  	if(key !== activeKey){
  		this.setState({
  			activeKey:key
  		})
  	}


  }
  renderNav() {
  	var activeKey = this.state.activeKey;
  	return(
  			this.props.children.map((child)=>(
  				<li className={cx({on:child.props.eventKey == activeKey})}
  					key ={child.props.eventKey}
  					onClick={this.handleClick.bind(this, child.props.eventKey )}>
  					{child.props.title}
  				</li>
  				))

  	)
  }
  renderTabPanels() {
  	var activeKey = this.state.activeKey;
  	return(
  	this.props.children.map((child)=>(
  		<TabsItem active={child.props.eventKey == activeKey}
  		key ={child.props.eventKey}>
  		{child.props.children}
  		</TabsItem>))
  	)

  }
    render() {
    if(this.props.children.length >1){
        return (
        	<div>
        	<div className="head">
	        	<ul>
	        	{this.renderNav()}
			    </ul>
		    </div>
        	{this.renderTabPanels()}
        	</div>);
    }

	return(<div>格式错误</div>)
}
}

export default Tabs;




