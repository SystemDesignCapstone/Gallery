import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery.jsx';
import Lightbox from './Lightbox.jsx';

class Site extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'header',
      mainPicture: [],
      picture1: [],
      picture2: [],
      picture3: [],
      picture4: [],
      pictures: [],
    };
    this.onPhotoPress = this.onPhotoPress.bind(this);
    this.onClosePress = this.onClosePress.bind(this);
  }

  grabPhotos() {
    fetch('http://localhost:1128/listings')
      .then(res => {
        return res.json();
      })
      .then(result => {
        console.log(result, 'this is the result');
        console.log(result[0].urls, 'yup 0 urls');
        console.log(result[1].urls, 'yup 1 urls');
        console.log(result[2].urls, 'yup 2 urls');
        this.setState({
          mainPicture: result[0].urls,
          picture1: result[1].urls,
          picture2: result[2].urls,
          picture3: result[3].urls,
          picture4: result[4].urls,
          pictures: result,
        });
      });
  }

  randomList() {
    let random = Math.floor(Math.random() * 599) + 1;
    return random;
  }

  onPhotoPress() {
    this.setState({
      view: 'lightbox',
    });
  }

  onClosePress() {
    this.setState({
      view: 'header',
    });
  }

  componentWillMount() {
    this.grabPhotos();
  }

  renderView() {
    if (this.state.view === 'header') {
      return <Gallery props={this.state} press={this.onPhotoPress} />;
    } else if (this.state.view === 'lightbox') {
      return <Lightbox props={this.state} close={this.onClosePress} />;
    }
  }

  render() {
    return <div>{this.renderView()}</div>;
  }
}

export default Site;
