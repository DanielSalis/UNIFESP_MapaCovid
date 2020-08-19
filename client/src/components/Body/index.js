import React from 'react';
import { Container, LeftDiv, RightDiv } from './style';
import FilterBar from './FilterBar';
import MapInfo from './MapInfo';

const Body = props => {
    return (
        <Container>
            <LeftDiv></LeftDiv>
            <RightDiv>
                <FilterBar />
                <MapInfo />
            </RightDiv>
        </Container>
    );
}

export default Body;