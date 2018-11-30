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
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://s3.us-east-2.amazonaws.com/sdc-gallery/${random}`)
      .then(res => {
        return res.json();
      })
      .then(results => {
        results = results.map(result => {
          result.urls = `https://s3-us-west-2.amazonaws.com/sdc-trailblazer-gallery/img${
            result.photoid
          }.jpg`;
          return result;
        });
        console.log(results, 'this is the results');
        console.log(results[0].urls, 'yup 0 urls');
        console.log(results[1].urls, 'yup 1 urls');
        console.log(results[2].urls, 'yup 2 urls');
        this.setState({
          mainPicture: results[0].urls,
          picture1: results[1].urls,
          picture2: results[2].urls,
          picture3: results[3].urls,
          picture4: results[4].urls,
          pictures: results,
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
