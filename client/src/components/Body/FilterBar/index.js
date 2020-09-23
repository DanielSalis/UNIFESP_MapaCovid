import React from 'react';
import SelectedInputs from './SelectedInput';
import { Container, BottomDiv, Divider, UpperDiv } from './style';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../../store/ducks/_map';

const FilterBar = props => {
    const handleInputCheck = (e) => {
        e.target.previousSibling.click()
    }

    const handleDatalistChange = (e, place) => {
        if (place === "states") {
            props.MapActions.setState(e.target.value);

        }

        if (place === "cities") {
            props.MapActions.setCity(e.target.value);
        }
    }

    return (
        <Container>
            <UpperDiv>
                {props.map.state ? <SelectedInputs local="states" text={props.map.state} /> : <></>}
                {props.map.city ? <SelectedInputs local="cities" text={props.map.city} /> : <></>}
                {/* <SelectedInputs local="cities" text={props.map.city} /> */}
            </UpperDiv>
            <Divider />
            <BottomDiv>
                <div>
                    <input onClick={e => props.MapActions.setCountry(!props.map.country)} type="checkbox"></input>
                    <label onClick={(e) => handleInputCheck(e)}>Brasil</label>
                </div>

                <input onChange={(e) => handleDatalistChange(e, "states")} type="text" name="States" placeholder="Estados" list="exampleList" />
                <datalist onChange={(e) => handleDatalistChange(e, "states")} id="exampleList">
                    <option value="São Paulo" />
                    <option value="Minas Gerais" />
                </datalist>

                <input onChange={(e) => handleDatalistChange(e, "cities")} type="text" name="Cities" placeholder="Cidades" list="dataListCidades" />
                <datalist id="dataListCidades">
                    <option value="Barretos" />
                    <option value="São José dos Campos" />
                </datalist>

            </BottomDiv>
        </Container>
    );
}

const mapStateToProps = state => ({
    map: state._map
});

const mapDispatchToProps = dispatch => ({
    MapActions: bindActionCreators(MapActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);