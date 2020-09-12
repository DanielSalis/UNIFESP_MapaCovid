import styled from 'styled-components';

export const Container = styled.div`
    width:100%;
    height: 95%;
    display:flex;
    flex-direction:row;
`;

export const LeftDiv = styled.div`
    width:15%;
    height:95%;
    margin: 1em;
    background-color:#fff;
`;

export const RightDiv = styled.div`
    width:85%;
    height:95%;
    margin:1em;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
`;