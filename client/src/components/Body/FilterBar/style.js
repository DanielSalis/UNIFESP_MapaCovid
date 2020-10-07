import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  hr {
    border-top: 3px solid #bbb;
  }
`;
export const BottomDiv = styled.div`
  background: #1976d252;
  width: -webkit-fill-available;
  padding: 10px 10px;
  border-radius: 10px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  input {
    cursor: pointer;
    margin: 0 10px 0 0;
    border-radius: 50px;
    padding: 0 10px;
  }

  label {
    cursor: pointer;
  }

  div {
    cursor: pointer;
    margin: 0 1.5rem;
  }

  datalist {
    cursor: pointer;
    margin: 0 1rem;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: grey;
  padding-bottom: 2px;
`;

export const UpperDiv = styled.div`
  padding-bottom: 1%;
  height: 45%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const UpperDivLeft = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FilterButton = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  button {
    border-radius: 50px;
    padding: 5px 20px;
    border: none;
    background-color: #1976d2;
    color: #fff;
    /* border: 0.5px solid black; */
  }

  button:focus {
    outline: none;
  }
`;
