import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from '../actions';
import {FormatMoney, getTime, get2Decimals, getTime1} from '../utils';
import Events from '../utils/Events'

import isEqual from 'lodash/isEqual'

class dregform extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'dregform';
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
	            this.props.dispatch(fetchPosts("PlatformListDreg_User", header,
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
    	this.props.dispatch(fetchPosts("PlatformListDreg_User", header, params));
    }
    componentWillReceiveProps(nextProps) {
		if(!isEqual(nextProps.posts.ProjectList, this.props.posts.ProjectList)){
			this.addList(nextProps.posts.ProjectList);
		}
    }
    componentDidMount() {
        this._scrollListener = Events.on(window, 'scroll', this.checkButtom.bind(this));
     }
    componentWillUnmount() {
        this._scrollListener && this._scrollListener.off();
    }
    renderList(){
    	if(this.state.listItems){
    		return(
    		this.state.listItems.map((msg)=>(
                <div key = {msg.projectid+Math.random()} >
                <div className="proTitle" >
                    <span className="fr">{msg.platform}</span>
                    <div className="header">{msg.name}</div>
                </div>
                    <div className="proContainer">
                        <dl>
                            <dt>资产类型：</dt>
                            <dd>{msg.debttype}</dd>
                        </dl>
                        <dl>
                            <dt>原始收益率：</dt>
                            <dd>{get2Decimals(msg.initrate)}%</dd>
                        </dl>
                        <dl className="bghui">
                            <dt>还款：</dt>
                            <dd>{msg.repayment}</dd>
                        </dl>
                        <dl className="bghui">
                            <dt>风险准备金率：</dt>
                            <dd>{get2Decimals(msg.riskrate)}%</dd>
                        </dl>
                        <dl>
                            <dt>计息日期：</dt>
                            <dd>{getTime1(msg.begintime)}</dd>
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
               <div className="platContaniner">
                    <h3>平台在投金额(元)</h3>
                     <p>{FormatMoney(posts.Money)}</p>
                     <small>{getTime(posts.UpdateTime)} 更新</small>
                </div>
                <div className="platAll">
                    <dl className="all">
                        <dt>资产数</dt>
                        <dd>{posts.InvestCount}</dd>
                    </dl>
                </div>
                <p className="platMsg">*以下资产由杭州百耳通信息技术服务公司提供</p>
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

dregform.propTypes = {
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
export default connect(mapStateToProps)(dregform);
