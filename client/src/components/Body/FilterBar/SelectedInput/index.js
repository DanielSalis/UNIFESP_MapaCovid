
import React from 'react';
import { Container } from './style';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../../../store/ducks/_map';

const SelectedInput = props => {
    const clearInput = (e, local) => {
        if (local === "states") {
            props.MapActions.setState("");
        } else if (local === "cities") {
            props.MapActions.setCity("");
        }
    }

    return (
        <>
            {props.text !== "" &&
                <Container>
                    <label>{props.text}</label>
                    <div>
                        <label onClick={(e) => clearInput(e, props.local)}>x</label>
                    </div>
                </Container>
            }
            {props.text === "" &&
                <></>
            }
        </>
    );
}

const mapStateToProps = state => ({
    map: state._map
});

const mapDispatchToProps = dispatch => ({
    MapActions: bindActionCreators(MapActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedInput);