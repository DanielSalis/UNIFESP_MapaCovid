import React, { useEffect, useState } from 'react';
import SelectedInputs from './SelectedInput';
import { Container, BottomDiv, Divider, UpperDiv } from './style';
import api from '../../API';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../../store/ducks/_map';

const FilterBar = props => {
    const [allStates, setAllStates] = useState(null);
    const [citiesByState, setCitiesByState] = useState(null);

    useEffect(() => {
        async function fetchDataStates() {
            if (!allStates) {
                await api.get('/api/map/get/states')
                    .then(async (res) => {
                        setAllStates(res.data);
                        setCitiesByState(null);
                    })
            }
        }

        fetchDataStates();
    }, [allStates, citiesByState]);

    const fetchDataCities = async (state) => {
        if (state && !citiesByState) {
            await api.get('/api/map/get/cities', {
                params: {
                    state: state
                }
            })
                .then(async (res) => {
                    setCitiesByState(res.data);
                })
        }
    }

    const handleInputCheck = (e) => {
        e.target.previousSibling.click()
    }

    const handleDatalistChange = async (e, place) => {
        if (place === "states") {
            props.MapActions.setState(e.target.value);
            setCitiesByState(null);
            fetchDataCities(e.target.value);
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
            </UpperDiv>
            <Divider />
            <BottomDiv>
                <div>
                    <input onClick={e => props.MapActions.setCountry(!props.map.country)} type="checkbox"></input>
                    <label onClick={(e) => handleInputCheck(e)}>Brasil</label>
                </div>

                <input onChange={(e) => handleDatalistChange(e, "states")} type="text" name="States" placeholder="Estados" list="exampleList" />
                <datalist style={{}} onChange={(e) => handleDatalistChange(e, "states")} id="exampleList">
                    {allStates ? allStates.map(item => { return <option key={item.codigo_uf} value={item.nome} /> }) : null}
                </datalist>

                <input onChange={(e) => handleDatalistChange(e, "cities")} type="text" name="Cities" placeholder="Cidades" list="dataListCidades" />
                <datalist id="dataListCidades">
                    {citiesByState ? citiesByState.map(item => { return <option key={item.codigo_ibge} value={item.nome} /> }) : null}
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