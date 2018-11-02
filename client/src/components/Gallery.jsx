import React from 'react';
import ReactDOM from 'react-dom';
import MainHero from './MainHero.jsx';
import Responsive from 'react-responsive';
import SideBar1 from './SideBar1.jsx';
import SideBar2 from './SideBar2.jsx';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props, 'from Gallery')
    return (
      <div className="hero-header">
        <Desktop>
          <MainHero images={this.props.props} press={this.props.press} />
          <SideBar1 images={this.props.props} press={this.props.press} />
          <SideBar2 images={this.props.props} press={this.props.press} />
        </Desktop>
        <Tablet>
          <MainHero images={this.props.props} press={this.props.press} />
          <SideBar1 images={this.props.props} press={this.props.press} />
        </Tablet>
        <Mobile>
          <MainHero images={this.props.props} press={this.props.press} />
        </Mobile>
      </div>
    )
  }
}

export default Gallery;