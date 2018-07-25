import React from 'react';
import styled, {ThemeProvider} from 'styled-components';

import Quote from '../quote';
import QuoteAuthor from '../quoteAuthor';
import {Button, TweetButton} from '../buttons';

const Wrapper = styled.div`
  padding: 30px;
  width: 500px;
  background: ${props => props.theme.colors.secondary};
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

const colors = [
    '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"
  ];
class QuoteBox extends React.Component {
    constructor(props) {
        super(props);

        this.theme = props.theme || theme;

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

                let color = '';
                if (this.props.color) {
                    color = this.props.color;
                }
                else {
                    let colorIndex = Math.floor(Math.random()*colors.length);
                    color = colors[colorIndex];   
                }

                this.setState({
                    quotes: responseJson.quotes,
                    quote: quote.quote,
                    author: quote.author,
                    color: color,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleClick() {
        let quote = this.getNewQuote();
        this.setState({
            quote: quote.quote,
            author: quote.author,
            color: this.getNewColor()
        });
    }
    getNewColor() {
        let colorIndex = Math.floor(Math.random()*colors.length);
        let color = colors[colorIndex];  
        if (this.props.updateColor) {
            this.props.updateColor(color);
        } 
        return color;

    }
    getNewQuote() {
        let quoteIndex = Math.floor(Math.random()*this.state.quotes.length);
        return this.state.quotes[quoteIndex]
    }

    render() {
        if (this.state.quote==='') {
            return null;
        }
        let newPrimaryColor = {...this.theme.colors,primary: this.state.color};
        let uri = encodeURIComponent(this.state.quote);
        let href = "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"') + uri + encodeURIComponent('" - ') + encodeURIComponent(this.state.author)
        return (
            <ThemeProvider theme={{...this.theme, colors: newPrimaryColor}}>
                <Wrapper>
                    <Quote quote={this.state.quote}/>
                    <QuoteAuthor author={this.state.author}/>
                    <ButtonWrapper>
                        <TweetButton href={href}/>
                        <Button onClick={this.handleClick}>New Quote</Button>
                    </ButtonWrapper>
                </Wrapper>
            </ThemeProvider>
        );
    }
};

export default QuoteBox;