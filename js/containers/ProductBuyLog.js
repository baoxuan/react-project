import React,{Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from '../actions';
import {FormatMoney, getTime} from '../utils';
import Events from '../utils/Events'

import isEqual from 'lodash/isEqual'

class ProductBuyLog extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProductBuyLog';
        this.state = {
        	PageIndex:1,
        	isLoading:false,
        	listItems:[]
        };
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
        let scrollTop = document.body.scrollTop,
            innerHeight = window.innerHeight,
            scrollHeight = document.body.scrollHeight,
            PageIndex = this.state.PageIndex,
            query = this.props.location.query;
            if(scrollTop + innerHeight >= scrollHeight && this.state.isLoading ){
                PageIndex++;
                this.setState({PageIndex:PageIndex});
	            this.props.dispatch(fetchPosts("GetProductBuyLog","",
	                  {
	                  	ProductId:query.ProductId,
	                    PageIndex:PageIndex,
	                    RecordPerPage:30
	                  })
	              )
            }

    }
    componentWillMount() {
    	let ProductId = this.props.location.query.ProductId;
    	// ProductId 2 活期 5 6 7 分别是 三月 一月 九月
    	if(ProductId == 6){
    		document.title="一个月定期购买记录";
    	}else if(ProductId == 5){
    		document.title="三个月定期购买记录";
    	}else if(ProductId == 7){
    		document.title="九个月定期购买记录";
    	}else{
    		document.title="活期购买记录";
    	}
    	// url 传递过来 ProductId

    	let params = {
    		ProductId:ProductId,
    		PageIndex:1,
    		RecordPerPage:30
    	}
    	this.props.dispatch(fetchPosts("GetProductBuyLog","",params));
    }
    componentWillReceiveProps(nextProps) {
		if(!isEqual(nextProps.posts.BuyLogInfor, this.props.posts.BuyLogInfor)){
			this.addList(nextProps.posts.BuyLogInfor);
		}
    }
    componentDidMount() {
        console.log("componentDidMount");
        this._scrollListener = Events.on(window, 'scroll', this.checkButtom.bind(this));
     }
    componentWillUnmount() {
        console.log("componentWillUnmount");
        this._scrollListener && this._scrollListener.off();
    }
    renderItems(){
    	const { posts } = this.props;
    	if(this.state.listItems){
    		return(
    		this.state.listItems.map((msg)=>(
    			<li key={msg.createtime}>
    				<span>{msg.iphone}</span>
    				<span>{getTime(msg.createtime)}</span>
    				<span>{msg.money}</span>
    			</li>
    			)))
    	}
    }
    render() {
    	const { posts } = this.props;
    	let Loading = this.state.isLoading ? (<div className="Loading">正在加载更多</div>): null;
    	if(posts){
	        return (
	        		<div className="striList">
	        			<ul>
	        				<li>
	        					<span>用户</span>
	        					<span>时间</span>
	        					<span>金额(元)</span>
	        				</li>
	                       {this.renderItems()}
	        			</ul>
	        			 {Loading}
	        		</div>
			);
		}
    	return(
    		<div className="Loading">暂无数据</div>
    	)

    }
}

ProductBuyLog.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: posts
  } = postsByApi["GetProductBuyLog"] || {
    isFetching: false,
    items: []
  }
  return {
    posts,
    isFetching
  }
}
export default connect(mapStateToProps)(ProductBuyLog);
