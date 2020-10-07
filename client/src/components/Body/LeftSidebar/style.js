import styled from "styled-components";

export const Container = styled.div`
  box-shadow: 2px 2px #00000052;
  border-radius: 10px;
  width: 15%;
  height: 95%;
  margin: 1em;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const SpanLayers = styled.div`
  margin: 0 0 0.5rem 0;
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const SpanLayersDiv = styled.div`
  width: 2%;
  height: 100%;
  background-color: ${(props) => (props.selected ? "#1976D2" : "transparent")};
  margin: 0 0.2rem 0 0;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 10rem 0;

  label {
    font-weight: 500;
    font-size: 1rem;
  }
`;

export const ImgContainer = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #1976d2;
  border-radius: 5px;
`;
