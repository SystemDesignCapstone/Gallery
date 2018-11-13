import React from 'react';
import ReactDOM from 'react-dom';
import MainHero from './MainHero.jsx';
import Responsive from 'react-responsive';

class SideBar1 extends React.Component {
  static defaultProps = {
    images: {
      picture1: 'https://s3-us-west-1.amazonaws.com/airjld-photos/photo-1508004842-763773906651.jpg',
      picture2: 'https://s3-us-west-1.amazonaws.com/airjld-photos/photo-1499960789818-652a2fff0c84.jpg'
    }
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('yo')
  }

  render() {
    console.log(this.props, 'this is props on sidebar1')
    return (
    <div className="sidebar-one">
      <div className="image-holder">
        <img onClick={this.props.press} src={this.props.images.picture1} className="img-fluid img-animation"/>
      </div>
      <div className="image-holder">
        <img onClick={this.props.press} src={this.props.images.picture2} className="img-fluid img-animation"/>
      </div>
    </div>
    )
  }
}

export default SideBar1


// import React from 'react';
// import ReactDOM from 'react-dom';
// import MainHero from './MainHero.jsx';
// import Responsive from 'react-responsive';

// class SideBar1 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this)
//   }

//   handleClick() {
//     console.log('yo')
//   }

//   render() {
//     console.log(this.props, 'this is props on sidebar1')
//     return (
//     <div className="sidebar-one">
//       <div className="image-holder">
//         <img onClick={this.props.press} src={this.props.images.picture1.url} alt={this.props.images.picture1.alt} onClick={() => {this.handleClick(this)}} className="img-fluid img-animation"/>
//       </div>
//       <div className="image-holder">
//         <img onClick={this.props.press} src={this.props.images.picture2.url} alt={this.props.images.picture2.alt} className="img-fluid img-animation"/>
//       </div>
//     </div>
//     )
//   }
// }

// export default SideBar1