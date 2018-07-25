import React from 'react';
import styled from 'styled-components';

import {FaTwitter} from 'react-icons/lib/fa';

export const Button = styled.button`
    margin:10px;
    background: ${props => props.theme.colors.primary};
    height:36px;
    font-size:24px;
    border-radius: 5px;
    outline: none;
    transition: ${props => props.theme.transitionTime};


    color: ${props => props.theme.colors.secondary};
`;

export const TweetButton = (props) => {
    return (
        <LinkWrapper target='_blank' href={props.href}>
            <TwitterIcon/>
        </LinkWrapper>
    );
}

const TwitterIcon = styled(FaTwitter)`
    color: ${props => props.theme.colors.secondary};
`
const LinkWrapper = styled.a`
  margin:10px;
  background: ${props => props.theme.colors.primary};
  height: 36px;
  font-size:24px;
  border-radius: 5px;
  outline: none;
  transition: ${props => props.theme.transitionTime};  
  
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;