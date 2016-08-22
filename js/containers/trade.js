import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import {fetchPosts, changeType, selectPaytypelog, selectPaytype } from '../actions';
import {FormatMoney, getTime, get2Decimals, getTime1} from '../utils';
import Events from '../utils/Events'
import SelectItem from '../components/SelectItem';

import isEqual from 'lodash/isEqual'

const paytypelogs =[
	{type:"Paytypelog", value:-1, name:"全部操作"},
	{type:"Paytypelog", value:0, name:"购买"},
	{type:"Paytypelog", value:1, name:"赎回"},
	{type:"Paytypelog", value:2, name:"充值"},
	{type:"Paytypelog", value:3, name:"提现"}
]
const paytypes = [
	{type:"paytype", value:-1, name:"全部产品"},
	{type:"paytype", value:0, name:"PP定期"},
	{type:"paytype", value:1, name:"PP活期"}
]
class trade extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'trade';

        this.state = {
            PageIndex:1,
            isLoading:false,
            listItems:[]
        }
    }

    addList(lists){
        this.setState({isLoading:lists.length == 30 ? true:false});
        if(this.state.PageIndex == 1){
            this.setState({listItems:lists});
        }else{
         this.setState({listItems:this.state.listItems.concat(lists)});
        }
    }
    checkButtom(){
        const {paytype, paytypelog, dispatch} = this.props;
        let scrollTop = document.body.scrollTop,
            innerHeight = window.innerHeight,
            scrollHeight = document.body.scrollHeight,
            PageIndex = this.state.PageIndex,
            header = this.props.location.query;
            if(scrollTop + innerHeight >= scrollHeight && this.state.isLoading ){
                PageIndex++;
                this.setState({PageIndex:PageIndex});
                this.props.dispatch(fetchPosts("GetPaywithdrawalList", header,
                    {
                    PageIndex:PageIndex, //页码
                    PageSize:30, //每页条数
                    DateType:12, //时间类型 1 一个月 3三个月 6 六个月 12 12个月
                    PayType:paytype, //产品类型 -2不填写 -1 全部 0 定期 1 活期
                    Paytypelog:paytypelog //操作类型 -2不填写 -1 全部 0 购买 1 赎回 2 充值 3 提现
                }));
            }

    }
    componentWillMount() {
        const {paytype, paytypelog, dispatch} = this.props;
        document.title = "交易记录"
        // url 传递过来 token code
        let header = this.props.location.query;
        let params = {
            PageIndex:1, //页码
            PageSize:30, //每页条数
            DateType:12, //时间类型 1 一个月 3三个月 6 六个月 12 12个月
            PayType:paytype, //产品类型 -2不填写 -1 全部 0 定期 1 活期
            Paytypelog:paytypelog //操作类型 -2不填写 -1 全部 0 购买 1 赎回 2 充值 3 提现
        }
        dispatch(fetchPosts("GetPaywithdrawalList", header, params));
    }
    componentWillReceiveProps(nextProps) {
        const {posts, paytypelog, paytype, dispatch} = this.props;
        let header = this.props.location.query;
        if(paytype != nextProps.paytype || paytypelog != nextProps.paytypelog){
            this.setState({PageIndex:1, listItems:[]})
            let params = {
                PageIndex:this.state.PageIndex, //页码
                PageSize:30, //每页条数
                DateType:12, //时间类型 1 一个月 3三个月 6 六个月 12 12个月
                PayType:nextProps.paytype, //产品类型 -2不填写 -1 全部 0 定期 1 活期
                Paytypelog:nextProps.paytypelog //操作类型 -2不填写 -1 全部 0 购买 1 赎回 2 充值 3 提现
            }
            dispatch(fetchPosts("GetPaywithdrawalList", header, params));
        }
        if(!isEqual(nextProps.posts.List, posts.List)){
            this.addList(nextProps.posts.List);
        }
    }
    componentDidMount() {
        this._scrollListener = Events.on(window, 'scroll', this.checkButtom.bind(this));
     }
    componentWillUnmount() {
        this._scrollListener && this._scrollListener.off();
    }
    renderItems(){

        if(this.state.listItems && this.state.listItems.length > 0 ){
            return(
                <ul className="recordList">
                {this.state.listItems.map((msg) =>(
                    <li key ={Math.random()} >
                        {msg.Color == "1" ? (<div className="red">+{FormatMoney(msg.Money)}</div> ): (<div>-{FormatMoney(msg.Money)}</div>)}
                       <div className="fr">
                        <p>{msg.Typename}({msg.Statusname}) </p>
                        <p>{msg.Createtime}</p>
                       </div>
                    </li>
                    ))}
                </ul>
            )
        }
        return(
            <p className="mt50 Loading">暂无数据</p>
            )
    }
    render() {
    	let selectItmes;
     	const {type, paytypelogText, paytypeText, paytypelog, paytype} = this.props;
    	let Loading = this.state.isLoading ? (<div className="Loading">正在加载更多</div>): null;
        if( type == "paytypelog"){
    		selectItmes = paytypelogs.map((msg) => (<SelectItem type={msg.type} key={msg.value} value={msg.value} name={msg.name}
    												selected = {msg.name == paytypelogText  }
    												_onClick={this._handClick.bind(this)}/>) )
    	}
    	else if( type == "paytype"){
    		selectItmes = paytypes.map((msg) => (<SelectItem type={msg.type} key={msg.value} value={msg.value}  name={msg.name}
    												selected = {msg.name == paytypeText  }
    												_onClick={this._handClick.bind(this)}/>) )
    	}
        return(
            <div>
        	<div className={cx(
                    "select_bar",
                    {"shadow": type != ""})} >
                <ul >
                    <li className = {cx({"cur":type == "paytypelog" })} type="paytypelog" onClick={this.showList.bind(this)} >
                        {paytypelogText}
                    </li>
                    <li className = {cx({"cur":type == "paytype" })} type="paytype" onClick={this.showList.bind(this)} >
                        {paytypeText}
                    </li>
                </ul>
                <div className= {cx("select_pop", 
                				{"cur": type != ""})}>
                    <dl>{selectItmes}</dl>
                </div>
            </div>
                {this.renderItems()}
                {Loading}
        	</div>

        	);
    }
    showList(e){
        // 切换tab
    	if(this.props.type != e.target.type){
            this.props.dispatch(changeType(e.target.type));
	    }else{
            this.props.dispatch(changeType(""));
	    }
    }
    _handClick(name, value){
        // 展示下拉框
    	if(this.props.type == "paytypelog"){
            this.props.dispatch(selectPaytypelog(name, value));
            this.props.dispatch(selectPaytype("全部产品", -2));
    	}else if(this.props.type == "paytype"){
            this.props.dispatch(selectPaytypelog("全部操作", -2));
            this.props.dispatch(selectPaytype(name, value));

		}
    }
}

trade.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi, changeType} = state
  const {
    isFetching,
    items: posts
  } = postsByApi["GetPaywithdrawalList"] || {
    isFetching: false,
    items: []
  }
// 接口原因：操作类型和产品类型两个钟肯定有一个传入-2
// PayType  产品类型 -2不填写 -1 全部 0 定期 1 活期
// Paytypelog 操作类型 -2不填写 -1 全部 0 购买 1 赎回 2 充值 3 提现
  return {
    posts,
    isFetching,
    paytypelog:changeType.paytypelog,
    paytypelogText:changeType.paytypelogText,
    paytypeText:changeType.paytypeText,
    paytype:changeType.paytype,
    type:changeType.type

  }
}
export default connect(mapStateToProps)(trade);








