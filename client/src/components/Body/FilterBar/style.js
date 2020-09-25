import styled from 'styled-components';

export const Container = styled.div`
    width:100%;
    height:12%;
    background-color:#fff;
    display:flex;
    flex-direction:column;
    justify-content:center;

    hr {
        border-top: 3px solid #bbb;
    }
`;
export const BottomDiv = styled.div`
    width:100%;
    height:50%;
    background-color:#fff;
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;

    input{
        cursor:pointer;
        margin:0 1rem;
    }

    label{
        cursor:pointer;
    }

    div{
        cursor:pointer;
        margin:0 1rem;
    }

    datalist{
        cursor:pointer;
        margin:0 1rem;
    }
`;

export const Divider = styled.div`
    width:100%;
    height:2px;
    background-color:#C4C4C4;
    margin:0.2rem 0 0.2rem;
`;

export const UpperDiv = styled.div`
    height:45%;
    display:flex;
    flex-direction: row;
    align-items:center;
`;

export const UpperDivLeft = styled.div`
    height:100%;
    width:50%;
    display:flex;
    flex-direction: row;
    align-items:center;
`;

export const UpperDivRight = styled.div`
    height:100%;
    width:50%;
    display:flex;
    flex-direction: row;
    align-items:center;
    justify-content:flex-end;

    button{
        margin:0 0.5rem 0 0 ;
        background-color:#1890ff;
        color:#fff;
        /* border: 0.5px solid black; */
    }

    button:focus{
        outline:none;
    }
`;
