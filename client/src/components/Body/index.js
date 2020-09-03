import React from 'react';
import { Container, LeftDiv, RightDiv } from './style';
import FilterBar from './FilterBar';
import MapInfo from './MapInfo';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../store/ducks/_map';

const Body = props => {
    return (
        <Container>
            {/* Substituir por LeftSidebar */}
            <LeftDiv></LeftDiv>
            <RightDiv>
                <FilterBar />
                <MapInfo />
            </RightDiv>
        </Container>
    );
}

const mapStateToProps = state => ({
    map: state._map
});

const mapDispatchToProps = dispatch => ({
    MapActions: bindActionCreators(MapActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);