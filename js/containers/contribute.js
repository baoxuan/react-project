import React,{Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import {fetchGET} from '../actions';



class contribute extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'contribute';
    }
    componentWillMount() {
    document.title="升级规则";
    let params = this.props.location.query;
    console.log(params)
    this.props.dispatch(fetchGET("GetAccountInfor", params))
    }
    componentWillReceiveProps(nextProps) {
      console.log("componentWillReceiveProps",nextProps);
    }
    render() {
    	const {posts} = this.props;
    	if(posts){
        return(
        	<div className = "bgf" >
            <div className = "contriContainer" >
                <img src={posts.LevelImg}/>
                <h3> 个人活期剩余额度(元)</h3>
		        <p>{posts.InvestibleMoney}</p>
            </div>
            <div className="p10">
            <p className="red center">满足A、B任意一项即可升级</p>
             <table className="viptable">
                <tbody>
                    <tr>
                        <th>升级</th>
                        <th>升级规则</th>
                        <th>活期额度</th>
                    </tr>
                    <tr>
                        <td><p>会员</p></td>
                        <td><p>注册成功</p></td>
                        <td><p className="red">5万</p></td>
                    </tr>
                    <tr>
                        <td><p className="pt25">会员<br/>升至<br/>VIP1</p></td>
                        <td>
                            <p>A.邀请3位好友，且每人累计购买定期1000元(含)以上；<br/>或<br/>B.购买PP定期（1月定期10万(含)以上，3月定期5万(含)以上，9月定期3万(含)以上）</p></td>
                        <td><p className="pt40 red">10万</p></td>
                    </tr>
                    <tr>
                        <td><p className="pt25">VIP1<br/>升至<br/>VIP2</p></td>
                        <td>
                            <p>A.邀请5位好友，且每人累计购买定期3000元(含)以上；<br/>或<br/> B.购买PP定期（3月定期10万(含)以上，9月定期5万(含)以上）</p></td>
                        <td><p className="pt40 red">15万</p></td>
                    </tr>
                    <tr>
                        <td><p className="pt25">VIP2<br/>升至<br/>VIP3</p></td>
                        <td>
                        <p>A.邀请7位用户，且每人累计购买3月或9月的定期5000元(含)以上；<br/>或<br/>B.购买PP定期(3月20万(含)以上，9月定期15万(含)以上）</p></td>
                        <td><p className="pt40 red">30万</p></td>
                    </tr>
                </tbody>
             </table>
             <p className="red center">土财主们满足以下规则可直升至VIP3</p>
            <table className="viptable">
                <tbody>
                    <tr>
                        <th>升级</th>
                        <th>升级规则</th>
                        <th>活期额度</th>
                    </tr>
                    <tr>
                        <td><p className="pt40">会员<br/>直升<br/>VIP3</p></td>
                        <td>
                            <p>A. 邀请至少15位新用户，且至少3位累计购买定期1000元(含)以上，至少5位累计购买定期3000元(含)以上，至少7位累计购买3月或9月定期5000元(含)以上<br/>或<br/>B. 购买PP定期（3月定期35万(含)以上，9月定期23万(含)以上）</p>
                            </td>
                        <td><p className="pt55 red">30万</p></td>
                    </tr>
                </tbody>
             </table>
             </div>
             </div>
        	)
        }
    }
}
contribute.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: posts
  } = postsByApi["GetAccountInfor"] || {
    isFetching: false,
    items: []
  }
  return {
    posts,
    isFetching
  }
}


export default connect(mapStateToProps)(contribute);

