import React from 'react';
import styled from 'styled-components';

const QuoteAuthor = (props) => {
    return (
        <Wrapper>
            <AuthorText>- {props.author}</AuthorText>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin: ${props => props.theme.margins.sm};
`;

const AuthorText = styled.h3`
    font-size: 24px;
    text-align: right;
    color: ${props => props.theme.colors.primary};
    transition: ${props => props.theme.transitionTime};
`;

export default QuoteAuthor;