import React, { Component } from 'react';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';

import './App.css';

import QuoteBox from './components/quoteBox';

injectGlobal`
  html {
    overflow: hidden;
  },
  // body {
  //   height: 100%;
  //   width: 100%;
  // }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: ${props => props.background || 'blue'};
  overflow:hidden;
  transition: 1s;
  `;
  // background: ${props => props.theme.colors.primary};
  // transition: ${props => props.theme.transitionTime};

const Text = styled.p`
  color: ${props => props.theme.colors.secondary};
`;
const colors = [
  '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"
];
const theme = {
  colors: {
    primary: '#16a085',
    secondary: 'white',
  },
  margins: {
    sm: '10px',
  },
  fontSize: {
    h1: '48px',
    h2: '36px',
    h3: '24px',
    h4: '18px',
    p: '12px'
  },
  transitionTime: '1s',
}

class RandomQuoteMachine extends Component {
  constructor(props) {
    super(props);
    let colorIndex = Math.floor(Math.random()*colors.length);
    this.state = {
      color: ''
    }
    this.getUpdatedColor = this.getUpdatedColor.bind(this);
  }

  componentDidMount() {
    let colorIndex = Math.floor(Math.random()*colors.length);
    this.setState({
      color: colors[colorIndex]
    })
  }
  getUpdatedColor(newColor) {
    console.log(newColor);
    this.setState({
      color: newColor
    })
  }
  render() {
    if (this.state.color === '') {
      return null;
    }
    return (
      <Wrapper background={this.state.color}>
        <QuoteBox updateColor={this.getUpdatedColor} color={this.state.color} theme={theme}/>
      </Wrapper>
    );
  }
}

class App extends Component {
  render() {
    return (
      <RandomQuoteMachine/>
    );
  }
}

export default App;
