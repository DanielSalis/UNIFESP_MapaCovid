
import styled, { keyframes } from 'styled-components';


const fade = keyframes`
  from {
    width: 0%;
  }

  to {
    width: 8%;
  }
`;

export const Container = styled.div`
    width:${props => props.open ? '9%' : '0'};
    height:100%;
    background-color: #fff;
    display:${props => props.open ? 'flex' : 'none'};
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    position:fixed;
    top:0;
    right:0;
    z-index:9;

    animation: ${fade} 0.2s linear;
`;

export const TopContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
    height:10%;
    width:100%;

    svg{
        cursor:pointer;
    }
`;

export const MidContainer = styled.div`
    height:90%;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    span{
        margin: 0 0 0.5rem 0;
        cursor:pointer;
    }
`;