import React from 'react';
import { Container, MapDiv } from './style';
import CircleMenuExample from './Map/CircleMenuExample';

const MapInfo = props => {
    return (
        <Container>
            <span>Map info</span>
            <MapDiv>
                <CircleMenuExample></CircleMenuExample>
            </MapDiv>
        </Container>
    );
}

export default MapInfo;