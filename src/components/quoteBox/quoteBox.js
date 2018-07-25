import React from 'react';
import styled from 'styled-components';

import Quote from '../quote';
import QuoteAuthor from '../quoteAuthor';
import {Button, TweetButton} from '../buttons';
const QuoteBox = (props) => {
    return (
        <Wrapper>
            <Quote quote={props.quote}/>
            <QuoteAuthor author={props.author}/>
            <ButtonWrapper>
                <TweetButton href={props.href}/>
                <Button onClick={props.onClick}>New Quote</Button>
            </ButtonWrapper>
        </Wrapper>
    );
}

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
export default QuoteBox;