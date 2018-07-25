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
  background: ${props => props.theme.colors.primary};
  overflow:hidden;
  transition: ${props => props.theme.transitionTime};
`;

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

class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quotes: [],
      quote: '',
      author: '',
      color: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.getNewQuote = this.getNewQuote.bind(this);
    this.getNewColor = this.getNewColor.bind(this);
  }
  componentDidMount() {
    return fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
   .then((response) => response.json())
   .then((responseJson) => {
     let quoteIndex = Math.floor(Math.random()*responseJson.quotes.length);
     let quote = responseJson.quotes[quoteIndex];
     let colorIndex = Math.floor(Math.random()*colors.length);
     this.setState({
       quotes: responseJson.quotes,
       quote: quote.quote,
       author: quote.author,
       color: colors[colorIndex],
     })
   })
   .catch((error) => {
     console.error(error);
   });
  }
  handleClick() {
    this.getNewQuote();
    this.getNewColor();
  }
  getNewColor() {
    let colorIndex = Math.floor(Math.random()*colors.length);
    this.setState({
      color: colors[colorIndex]
    });
  }
  getNewQuote() {
    let quoteIndex = Math.floor(Math.random()*this.state.quotes.length);
    this.setState({
      quote: this.state.quotes[quoteIndex].quote,
      author: this.state.quotes[quoteIndex].author,
    });
  }
  render() {
    if (this.state.quote==='') {
      return null;
    }
    let newPrimaryColor = {...theme.colors,primary: this.state.color};
    let uri = encodeURIComponent(this.state.quote);
    let href = "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"') + uri + encodeURIComponent('" - ') + encodeURIComponent(this.state.author)
    return (
      <ThemeProvider theme={{...theme, colors: newPrimaryColor}}>
        <Wrapper>
          <QuoteBox quote={this.state.quote} author={this.state.author} onClick={this.handleClick} href={href}/>
          <Text>by dlau</Text>
        </Wrapper>
      </ThemeProvider>
    );
  }
};

class App extends Component {
  render() {
    return (
      <RandomQuoteMachine/>
    );
  }
}

export default App;
