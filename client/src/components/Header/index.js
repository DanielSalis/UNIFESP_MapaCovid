import React from 'react';
import { Container } from './style';
import { FiMenu } from 'react-icons/fi'

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../store/ducks/_map';

const Header = (props) => {
    const handleClick = (e) => {
        props.MapActions.setSidebarOpen(!props.map.sidebarOpen);
    }

    return (
        <Container>
            <h2>{props.map.title}</h2>
            <div>
                <FiMenu onClick={(e) => handleClick(e)} size={'1.5rem'} color='#1976D2' />
            </div>
        </Container>
    );
}


const mapStateToProps = state => ({
    map: state._map
});

const mapDispatchToProps = dispatch => ({
    MapActions: bindActionCreators(MapActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);