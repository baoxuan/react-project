import React,{Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from '../actions';
import {FormatMoney} from '../utils';
import Events from '../utils/Events'

import isEqual from 'lodash/isEqual'

class myDreg extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'myDreg';
        this.state = {
        	PageIndex:1,
        	isLoading:false,
        	listItem:[]
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
            query = this.props.location.query,
    		header = {
    			token: query.token,
    			code: query.code
    		};
            if(scrollTop + innerHeight >= scrollHeight && this.state.isLoading ){
                PageIndex++;
                this.setState({PageIndex:PageIndex});
	            this.props.dispatch(fetchPosts("PlatformListDreg_User",header,
	                  {
	                    PageIndex:PageIndex,
	                    RecordPerPage:30
	                  })
	              )
            }

    }
    componentWillMount() {
    	document.title="我的定期资产组合";
    	// url 传递过来 token code,还有产品类型 ProductId
    	let header = this.props.location.query;
    	let params = {
    		PageIndex:1,
    		RecordPerPage:30
    	}
    	this.props.dispatch(fetchPosts("PlatformListDreg_User", header,params));
    }
    componentWillReceiveProps(nextProps) {
		if(!isEqual(nextProps.posts.ProjectList, this.props.posts.ProjectList)){
			this.addList(nextProps.posts.ProjectList);
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
    renderList(){
    	const { posts } = this.props;
    	if(this.state.listItems){
    		return(
    		this.state.listItems.map((msg)=>(
    			<div className="myPlatList" key={msg.id}>
					<div className="proTitle" >
						{msg.name}
					</div>
					<div className="container">
						<dl>
							<dt>持有资金(元)</dt>
							<dd className="red">{msg.UserMoney < 0.01 ? "小于0.01" : FormatMoney(msg.UserMoney)}</dd>
						</dl>
						<dl className="bghui">
							<dt>资产类型</dt>
							<dd>{msg.debttype}</dd>
						</dl>
						<dl className="bghui">
							<dt>资产方</dt>
							<dd>{msg.platform}</dd>
						</dl>
					</div>
				</div>
    			)))
    	}
    }
    render() {
    	const { posts } = this.props;
    	let Loading = this.state.isLoading ? (<div className="Loading">正在加载更多</div>): null;
    	if(posts){
	        return (
	        	<div>
		        	<div className="myPlat">
						<h3>定期在投总金额(元)</h3>
						<p>{FormatMoney(posts.UserDregMoney)}</p>
						<h3>资产总数（<span className="red">{posts.InvestCount}</span>）</h3>
					</div>
					{this.renderList()}
					{Loading}
			</div>
			);
		}
    	return(
    		<div className="Loading">暂无数据</div>
    	)

    }
}

myDreg.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: posts
  } = postsByApi["PlatformListDreg_User"] || {
    isFetching: false,
    items: []
  }
  return {
    posts,
    isFetching
  }
}
export default connect(mapStateToProps)(myDreg);
