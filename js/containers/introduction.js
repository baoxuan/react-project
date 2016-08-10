import React,{Component, PropTypes}from 'react';
import Tabs from '../components/Tabs';
import TabsItem from '../components/TabsItem';
class introduction extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'introduction';
    }
    render() {
        return(
         <div>
           <Tabs>
            <TabsItem eventKey="1" title="红包说明">
		         <ul>
                    <li>
                        <h3><i>Q1</i>如何获得红包</h3>
                        <p> 回答内容回答内容回答内容回答内容回答内容回答内容</p>
                    </li>
                     <li>
                        <h3><i>Q2</i>如何获得红包</h3>
                        <p> 回答内容回答内容回答内容回答内容回答内容回答内容</p>
                    </li>
                     <li>
                        <h3 ><i>Q3</i>如何获得红包</h3>
                        <p> 回答内容回答内容回答内容回答内容回答内容回答内容</p>
                    </li>
                 </ul>
            </TabsItem>
            <TabsItem eventKey="2" title="加息券说明">
                <ul>
                    <li>
                        <h3><i>Q1</i>如何获得加息券</h3>
                        <p> 回答内容回答内容回答内容回答内容回答内容回答内容</p>
                    </li>
                     <li>
                        <h3><i>Q2</i>如何获得加息券</h3>
                        <p> 回答内容回答内容回答内容回答内容回答内容回答内容</p>
                    </li>
                     <li>
                        <h3 ><i>Q3</i>如何获得加息券</h3>
                        <p> 回答内容回答内容回答内容回答内容回答内容回答内容</p>
                    </li>
                 </ul>
              </TabsItem>
          </Tabs>
         </div>);
    }
}

export default introduction;
