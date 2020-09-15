import React from 'react';
import { Container, ImgContainer, LogoContainer, SpanLayers, SpanLayersDiv } from './style';
import { FiRadio } from 'react-icons/fi';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../../store/ducks/_map';

const LeftSidebar = props => {
    const handleLabelClick = (e, element) => {
        console.log(e.target);
        console.log();
    }

    return (
        <Container>
            <LogoContainer>
                <ImgContainer>
                    <FiRadio size='5rem' color="#fff" />
                </ImgContainer>
                <label>mapa covid</label>
            </LogoContainer>
            <SpanLayers onClick={(e) => handleLabelClick(e)}><SpanLayersDiv selected={true} />layer 1</SpanLayers>
            <SpanLayers onClick={(e) => handleLabelClick(e)}><SpanLayersDiv selected={false} />layer 2</SpanLayers>
            <SpanLayers onClick={(e) => handleLabelClick(e)}><SpanLayersDiv selected={false} />layer 3</SpanLayers>
        </Container>
    );
}

const mapStateToProps = state => ({
    map: state._map
});

const mapDispatchToProps = dispatch => ({
    MapActions: bindActionCreators(MapActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);