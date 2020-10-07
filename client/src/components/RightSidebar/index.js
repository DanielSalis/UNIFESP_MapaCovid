import React from 'react';
import { Container, TopContainer, MidContainer } from './style';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../store/ducks/_map';

const RightSidebar = (props) => {
    let history = useHistory();

    const handleClick = (e) => {
        props.MapActions.setSidebarOpen(false);
    }

    return (
        <Container open={props.map.sidebarOpen}>
            <TopContainer>
                <FiArrowLeft onClick={(e) => handleClick(e)} color="#1890ff" size={'1.5rem'} />
            </TopContainer>
            <MidContainer>
                <span onClick={(e) => { history.push('/'); props.MapActions.setTitle('Home') }}>Home</span>
                <span onClick={(e) => { history.push('/about'); props.MapActions.setTitle('About Us') }}>Sobre Nós</span>
                <span>Configurações</span>
            </MidContainer>
        </Container>
    );
}

const mapStateToProps = state => ({
    map: state._map
});

const mapDispatchToProps = dispatch => ({
    MapActions: bindActionCreators(MapActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);