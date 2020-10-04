import React, { useState, useLayoutEffect } from 'react';
import { Container, ImgContainer, LogoContainer, SpanLayers, SpanLayersDiv } from './style';
import { FiRadio } from 'react-icons/fi';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../../store/ducks/_map';

const LeftSidebar = props => {
    const [layers, setLayers] = useState(null);

    useLayoutEffect(() => {
        renderLayers();
        console.log("left side bar updated");
    }, []);

    const renderLayers = (key) => {
        const itemsToReturn = props.map.layers.map((item) => {
            if (item.id === 1) {
                props.MapActions.changeLayer(item.id, true);
                return (
                    <SpanLayers key={item.id} onClick={(e) => handleLabelClick(e, item.id)}><SpanLayersDiv selected={true} />{item.name}</SpanLayers>
                );
            } else {
                props.MapActions.changeLayer(item.id, false);
                return <SpanLayers key={item.id} onClick={(e) => handleLabelClick(e, item.id)}><SpanLayersDiv selected={false} />{item.name}</SpanLayers>
            }
        });
        setLayers(itemsToReturn);
    }

    const handleLabelClick = (e, key) => {
        console.log(key);
        renderLayers(key);
    }

    return (
        <Container>
            <LogoContainer>
                <ImgContainer>
                    <FiRadio size='5rem' color="#fff" />
                </ImgContainer>
                <label>mapa covid</label>
            </LogoContainer>
            {layers}
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