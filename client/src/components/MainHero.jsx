import React from 'react';
import ReactDOM from 'react-dom';

class MainHero extends React.Component {
  static defaultProps = {
    images: {
      mainPicture: 'https://s3-us-west-1.amazonaws.com/airjld-photos/174db9b0-52f1-4611-a49e-50c160b80534.jpg'
    }
  }

  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props, 'this is props in MainHero')
    return(
      <div className="mainHero">
        <div className="mainImage">
        <img onClick={this.props.press} src={this.props.images.mainPicture} className="img-main" width="1440" height="960"/>
        </div>
      </div>
    )
  }
}

export default MainHero;