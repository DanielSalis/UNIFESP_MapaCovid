import React from 'react';
import { Container, MapDiv } from './style';
import Map from './Map';

const MapInfo = props => {
    return (
        <Container>
            <span>Map info</span>
            <MapDiv>
                <Map></Map>
            </MapDiv>
        </Container>
    );
}

export default MapInfo;