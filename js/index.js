import 'babel-polyfill'
import "../public/css/pp2015.css"
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

import contribute from './containers/contribute' //升级规则
import Protocol from './containers/Protocol' //投资协议
import myPlatform from './containers/myPlatform' //我的活期资产
import myDreg from './containers/myDreg' //我的定期资产
import platform from './containers/platform'// 活期债权组合
import dregform from './containers/dregform'// 定期债权组合
import buyProtocol from './containers/buyProtocol' // 购买协议
import NoticesDetail from './containers/NoticesDetail' // 公告详情页
import Share from './containers/Share' // 邀请好友
import download from './containers/download' // 下载页
import ProductBuyLog from './containers/ProductBuyLog'// 产品购买记录
import trade from './containers/trade'// 购买记录
import introduction from './containers/introduction'// 优惠卷介绍


import configureStore from './stores/configureStore'

const store = configureStore();
render(
  <Provider store={store}>
    <Router history={hashHistory}  >
	    <Route path="/contribute" component={contribute} />
	    <Route path="/Protocol" component={Protocol} />
	    <Route path="/buyProtocol" component={buyProtocol} />
	    <Route path="/myPlatform" component={myPlatform} />
	    <Route path="/myDreg" component={myDreg} />
	    <Route path="/platform" component={platform} />
	    <Route path="/dregform" component={dregform} />
	    <Route path="/NoticesDetail" component={NoticesDetail} />
	    <Route path="/Share" component={Share} />
	    <Route path="/download" component={download} />
	    <Route path="/ProductBuyLog" component={ProductBuyLog} />
	    <Route path="/trade" component={trade} />
	    <Route path="/introduction" component={introduction} />


    </Router>
    </Provider>,
  document.getElementById('root')
)
