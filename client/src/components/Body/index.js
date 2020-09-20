import React from 'react';
import { Container, RightDiv } from './style';
import FilterBar from './FilterBar';
import MapInfo from './MapInfo';
import LeftSidebar from './LeftSidebar';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../store/ducks/_map';

const Body = props => {
    return (
        <Container>
            <LeftSidebar />
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