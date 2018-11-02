import React from 'react';
import ReactDOM from 'react-dom';

class MainHero extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props.images.mainPicture.url, 'this is mainPicture on mainhero')
    return(
      <div className="mainHero">
        <div className="mainImage">
        <img onClick={this.props.press} src={this.props.images.mainPicture.url} alt={this.props.images.mainPicture.alt} className="img-main" width="1440" height="960"/>
        </div>
      </div>
    )
  }
}

export default MainHero;