import React, { Component, PropTypes }from 'react';
import ReactSwipe from 'react-swipe';

const  bannerData = [
	{key:"ba1", imgUrl:"./public/images/banner1.jpg"},
	{key:"ba2", imgUrl:"./public/images/banner2.jpg"},
	{key:"ba3", imgUrl:"./public/images/banner3.jpg"}
];

const banners = bannerData.map(function (e){
  return(
      <div key={e.key}><img src={e.imgUrl}/></div>
      );
    });
const paginations = bannerData.map(function(e, t){
  return (
    <li key={e.key} className= {0===t ? "on":""}></li>
    );
});

class Slider extends Component {
    render() {
    	const {continuous, auto} =this.props;

        return (
        <div className="wrapper">
            <ReactSwipe className="carousel" 
            swipeOptions={{
            	continuous: this.props.continuous,
            	auto:this.props.auto,
              callback:this.swipeCallback.bind(this)
           }}>
            	 {banners}
            </ReactSwipe>
            <ul className="pagination" ref="pagination">
		       {paginations}
		    </ul>
		 </div>
        );
    }
swipeCallback(e, t){
     var n = this.refs.pagination.getElementsByTagName("li");
     for(var i=0;i<n.length;i++){
      n[i].className = "";
     }
      n[e % n.length].className = "on";
}
}
Slider.propTypes = {
  continuous: PropTypes.bool.isRequired,
  auto:PropTypes.number.isRequired
};
export default Slider;