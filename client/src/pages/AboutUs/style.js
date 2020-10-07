import styled from 'styled-components';

export const Container = styled.div`
    width:100%;
    height:95%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    overflow:auto;
    padding-top:12%;

    h3{
        font-weight:bolder;
        font-size:1.9rem;
    }
`;

export const DesciptionContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    h2{
        font-weight:bolder;
        width:30%;
        margin: 1.5rem 0;
    }

    h3{
        font-weight:bolder;
        font-size:3rem;
    }
`;

export const InfoContainer = styled.div`
    display:flex;
    flex-direction:row;
    max-width:60%;

    img{
        max-width:45%;
        max-width:50%;
        border-radius:10px;
    }

    h3{
        font-weight:bolder;
        font-size:1.9rem;
    }

    margin:0 0 2rem 0;
`;


export const InfoContainerRight = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    height:100%;
    margin:0 0 0 2.5rem;
`;

export const TechnologiesContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    width:100%;
    height:8rem;
    background:#1890ff;
    span{
        color: #fff;
        font-size:2.5rem;
        font-weight:bolder;
        margin: 0 1rem;
    }

    margin:0 0 2.5rem 0;
`;

export const TechSubItem = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100%;

    label{
        font-size: 1.2rem;
        color: #fff;
        margin-bottom:1rem;
    }

    div{
        svg{
            margin: 0 0.5rem;
        }
        display:flex;
        flex-direction:row;
    }
`;


export const TeamContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-bottom: 5rem;

    div{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:flex-start;
        margin:0 2rem;
        border: 2px solid #1890ff;
        border-radius: 5px;
        padding: 0.5rem;
    }

    div:hover{
        background:#1890ff;
        color: #fff;
        cursor:pointer;
    }
`;