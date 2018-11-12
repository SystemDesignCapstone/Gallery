import React from 'react';
import ReactDOM from 'react-dom';
import MainHero from './MainHero.jsx';
import Responsive from 'react-responsive';

class SideBar2 extends React.Component {
  static defaultProps = {
    images: {
      picture3: 'https://s3-us-west-1.amazonaws.com/airjld-photos/photo-1451849832267-fe29dcdc785b.jpg',
      picture4: 'https://s3-us-west-1.amazonaws.com/airjld-photos/photo-1511449923494-cf6b1028e9d7.jpg'
    }
  }

  render() {
    console.log(this.props, 'this is props on sidebar2')
    return (
    <div className="sidebar-two">
      <div className="image-holder">
        <img onClick={this.props.press} src={this.props.images.picture3} className="img-fluid img-animation"/>
      </div>
      <div className="image-holder">
        <img onClick={this.props.press} src={this.props.images.picture4} className="img-fluid img-animation"/>
      </div>
    </div>
    )
  }
}

export default SideBar2

// import React from 'react';
// import ReactDOM from 'react-dom';
// import MainHero from './MainHero.jsx';
// import Responsive from 'react-responsive';

// class SideBar2 extends React.Component {
//   render() {
//     console.log(this.props, 'this is props on sidebar2')
//     return (
//     <div className="sidebar-two">
//       <div className="image-holder">
//         <img onClick={this.props.press} src={this.props.images.picture3.url} alt={this.props.images.picture3.alt} className="img-fluid img-animation"/>
//       </div>
//       <div className="image-holder">
//         <img onClick={this.props.press} src={this.props.images.picture4.url} alt={this.props.images.picture4.alt} className="img-fluid img-animation"/>
//       </div>
//     </div>
//     )
//   }
// }

// export default SideBar2