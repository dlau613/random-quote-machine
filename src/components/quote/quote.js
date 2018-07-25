import React from 'react';
import styled from 'styled-components';
import {FaQuoteLeft} from 'react-icons/lib/fa';

const Quote = (props) => {
    return (
        <Wrapper>
            <QuoteText><FaQuoteLeft/>{props.quote}</QuoteText>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin: ${props => props.theme.margins.sm};
`;

const QuoteText = styled.h2`
  font-size: 36px;
  text-align: center;
  color: ${props => props.theme.colors.primary};
  transition: ${props => props.theme.transitionTime};
`;
export default Quote;