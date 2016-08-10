import React,{Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import SelectItem from '../components/SelectItem';
const paytypelogs =[
	{type:"Paytypelog", value:"-1",name:"全部操作"},
	{type:"Paytypelog", value:"0",name:"购买"},
	{type:"Paytypelog", value:"1",name:"赎回"},
	{type:"Paytypelog", value:"2",name:"充值"},
	{type:"Paytypelog", value:"3",name:"提现"}
]
const paytypes = [
	{type:"paytype", value:"-1",name:"全部产品"},
	{type:"paytype", value:"0",name:"PP定期"},
	{type:"paytype", value:"1",name:"PP活期"}
]
class trade extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'trade';
        this.state = {
        	type:"",
        	paytypelogText:"全部操作",
        	paytypeText:"全部产品",
        	paytypelog:"-1",
        	paytype:"-1"
        }
    }
    render() {
    	let selectItmes;
     	const { paytypelogText,paytypeText,paytypelog,paytype} = this.state;
    	if(this.state.type == "paytypelog"){
    		selectItmes = paytypelogs.map((msg) => (<SelectItem type={msg.type} key={msg.value} value={msg.value} name={msg.name}
    												selected = {msg.name == paytypelogText && msg.value == paytypelog }
    												_onClick={this._handClick.bind(this)}/>) )
    	}
    	else if(this.state.type == "paytype"){
    		selectItmes = paytypes.map((msg) => (<SelectItem type={msg.type} key={msg.value} value={msg.value}  name={msg.name}
    												selected = {msg.name == paytypeText && msg.value == paytype }
    												_onClick={this._handClick.bind(this)}/>) )
    	}
        return(
        	<div >
            <ul className="select_bar">
                <li className = {cx({"cur":this.state.type == "paytypelog" })} type="paytypelog" onClick={this.showList.bind(this)} >
                    {this.state.paytypelogText}<i></i>
                </li>
                <li className = {cx({"cur":this.state.type == "paytype" })} type="paytype" onClick={this.showList.bind(this)} >
                    {this.state.paytypeText}<i></i>
                </li>
            </ul>
            <div className= {cx("select_pop" ,
            				{"cur":this.state.type != ""})}>
            <dl>{selectItmes}</dl>
            </div>
        	</div>

        	);
    }
    showList(e){
    	if(this.state.type != e.target.type){
	    	this.setState({type:e.target.type});
	    }else{
	    	this.setState({type:""});
	    }
    }
    _handClick(name,value){
    	if(this.state.type == "paytypelog"){
    		this.setState({
	    	    	paytypelogText:name,
	    	    	paytypelog:value
	    	    	})
    	}else if(this.state.type == "paytype"){
		this.setState({
	    	paytypeText:name,
	    	paytype:value
	    })
		}
		this.setState({type:""});
    }
}


export default trade;







