import React,{Component, PropTypes}from 'react';
import cx from 'classnames'
class TabsItem extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'TabsItem';
    }
    render() {
        return <div className={cx(
        	"Tabcontent",
        	{"active":this.props.active})}>{this.props.children}</div>;
    }
}


TabsItem.propTypes = {
  active: PropTypes.bool
};

export default TabsItem;