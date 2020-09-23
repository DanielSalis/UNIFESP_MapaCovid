import styled from 'styled-components';

export const Container = styled.div`
    color:#fff;
    min-width:4rem;
    height:70%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    background-color:#C4C4C4;
    margin:0 1rem 0 1rem;

    label{
        margin: 0 10px;
    }

    div{
        margin:0 0 0 6px;
        width:10px;
        height:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:flex-start;
    }
`;
