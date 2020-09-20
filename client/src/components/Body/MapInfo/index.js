import React from 'react';
import { Container } from './style';
import Map from './Map';

const MapInfo = props => {
    return (
        <Container>
            <span>Map info</span>
            <Map props={props}></Map>
        </Container>
    );
}

export default MapInfo;