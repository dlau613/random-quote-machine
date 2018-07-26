import React, { Component } from 'react';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';

import QuoteBox from '../quoteBox';
import {setQuote, setColor} from '../../actions'

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
            })
            this.props.setQuote(quote);
            this.props.setColor(colors[colorIndex]);
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
        this.props.setColor(colors[colorIndex]);
    }
    getNewQuote() {
        let quoteIndex = Math.floor(Math.random()*this.state.quotes.length);
        this.props.setQuote(this.state.quotes[quoteIndex]);
    }
    render() {
        if (this.props.quote.quote==='') {
            return null;
        }
        let newPrimaryColor = {...theme.colors,primary: this.props.color.color};
        let uri = encodeURIComponent(this.props.quote.quote);
        let href = "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"') + uri + encodeURIComponent('" - ') + encodeURIComponent(this.props.quote.author)
        return (
            <ThemeProvider theme={{...theme, colors: newPrimaryColor}}>
            <Wrapper>
                <QuoteBox quote={this.props.quote.quote} author={this.props.quote.author} onClick={this.handleClick} href={href}/>
                <Text>by dlau</Text>
            </Wrapper>
            </ThemeProvider>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        author: state.author,
        quote: state.quote,
        color: state.color
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setQuote: (quote) => dispatch(setQuote(quote)),
        setColor: (color) => dispatch(setColor(color))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(RandomQuoteMachine);
