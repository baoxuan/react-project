// 公告详情页
import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from '../actions';
import {FormatMoney} from '../utils';

class NoticesDetail extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'NoticesDetail';
    }
    componentWillMount() {
    	document.title="详情";
    	let params = this.props.location.query;
    	this.props.dispatch(fetchPosts("GetNoticesDetailByID", "", params));
    }
    render() {
    	const {posts} = this.props;
    	if(posts){
    		if(posts.type == 2){
    			document.title = posts.title ;
    			return  this.renderActivityDetail(posts);
    		}else if(posts.type == 0){
    			document.title = "公告详情";
    			return  this.renderNoticeDetail(posts);
    		}
        return(
            <div className="QuestionContainer">
                <div className = "content" dangerouslySetInnerHTML={{__html:posts.context}}></div>
             </div>
        	);
    }}
    renderNoticeDetail(posts){
        return(
            <div className="NoticeContainer">
                <div className ="NoticeTitle">{posts.title}</div>
                <div className = "createtime">{posts.time}</div>
                <div className = "content" dangerouslySetInnerHTML={{__html:posts.context}}></div>
                <div className = "footer">PP基金运营团队</div>
             </div>
            )
    }
    renderActivityDetail(posts){
        return(
            <div className="activityContainer">
                <img src = {posts.title_pic_url} />
                <div className ="title">{posts.title}</div>
                <div className = "content" dangerouslySetInnerHTML={{__html:posts.context}}></div>
             </div>
            )
    }
}
NoticesDetail.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: posts
  } = postsByApi["GetNoticesDetailByID"] || {
    isFetching: false,
    items: []
  }
  return {
    posts,
    isFetching
  }
}
export default connect(mapStateToProps)(NoticesDetail);
