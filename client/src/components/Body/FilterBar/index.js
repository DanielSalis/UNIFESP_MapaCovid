import React, { useEffect, useState } from 'react';
import SelectedInputs from './SelectedInput';
import { Container, BottomDiv, Divider, UpperDiv, UpperDivLeft, UpperDivRight } from './style';
import api from '../../API';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../../store/ducks/_map';

const FilterBar = props => {
    const [country, setCountry] = useState(props.map.country);
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
        const validState = allStates.find(item => item.nome === state);
        console.log(validState);
        if (validState) {
            await api.get('/api/map/get/cities', {
                params: {
                    state: state
                }
            })
                .then(async (res) => {
                    setCitiesByState(res.data);
                })
        } else {
            setCitiesByState(null);
        }
    }

    const handleInputCheck = (e) => {
        props.MapActions.setCountry(!props.map.country);
        setCountry(!props.map.country);

        props.MapActions.setState(null);
        props.MapActions.setCity(null);
    }

    const handleLabelCheckClick = e => {
        e.target.previousSibling.click();

    }

    const handleDatalistChange = async (e, place) => {
        if (place === "states") {
            props.MapActions.setState(e.target.value);
            fetchDataCities(e.target.value);
        }

        if (place === "cities") {
            props.MapActions.setCity(e.target.value);
        }
    }

    const handleApllyFiltersClick = async () => {
        const { state, city, country } = props.map;

        let stateData = null;
        let cityData = null;
        let obj = {};

        if (!state) {
            return alert(`Pesquisa Inválida`);
        }

        else {
            stateData = allStates.filter(item => item.nome === state);
            if (state && city) {
                cityData = citiesByState.filter(item => item.nome === city);

                alert(`Você Buscou pelo estado de ${state} e cidade ${city}. Coordenadas (${cityData[0].latitude}, ${cityData[0].longitude})`)
                console.log(stateData[0], cityData[0]);

                obj = {
                    'state': stateData[0],
                    'city': cityData[0]
                }
                //props.MapActions.setAppliedFilters(obj);
                
            } else {
                obj = {
                    'state': stateData[0]
                }
                
                //props.MapActions.setAppliedFilters(obj);                
                alert(`Você Buscou pelo estado de ${state} . Coordenadas (${stateData[0].latitude}, ${stateData[0].longitude})`)
            }
            fetchDataCases(obj);
        }
    }

    const fetchDataCases = async (obj) => {
        const params = { id: (obj.city == null) ? obj.state.codigo_uf: obj.city.codigo_ibge };
        const endpoint = (obj.city == null) ? 'casesByState' : 'casesByCity';

        api.get(`/api/map/get/${endpoint}`, {
            params: params
        })
            .then(async (res) => {
                debugger;
                props.MapActions.setFilteredData(res.data);
            })         
    }
    return (
        <Container>
            <UpperDiv>
                <UpperDivLeft>
                    {props.map.state ? <SelectedInputs local="states" text={props.map.state} /> : <></>}
                    {props.map.city ? <SelectedInputs local="cities" text={props.map.city} /> : <></>}
                </UpperDivLeft>
                <UpperDivRight>
                    <button onClick={() => handleApllyFiltersClick()}>Aplicar Filtros</button>
                </UpperDivRight>
            </UpperDiv>
            <Divider />
            <BottomDiv>
                <div>
                    <input onClick={e => { handleInputCheck() }} type="checkbox"></input>
                    <label onClick={(e) => handleLabelCheckClick(e)}>Brasil</label>
                </div>

                <input onChange={(e) => handleDatalistChange(e, "states")} disabled={country === true} type="text" name="States" placeholder="Estados" list="exampleList" />
                <datalist onChange={(e) => handleDatalistChange(e, "states")} id="exampleList">
                    {allStates && country === false ? allStates.map(item => { return <option key={item.codigo_uf} value={item.nome} /> }) : <option value={""} />}
                </datalist>

                <input onChange={(e) => handleDatalistChange(e, "cities")} disabled={country === true || props.map.state === null || props.map.state === ""} type="text" name="Cities" placeholder="Cidades" list="dataListCidades" />
                <datalist id="dataListCidades">
                    {citiesByState && country === false ? citiesByState.map((item, index) => { return <option key={index} codigo={item.codigo_ibge} value={item.nome} /> }) : null}
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