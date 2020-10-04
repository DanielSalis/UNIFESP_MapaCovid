import * as React from 'react';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import { fromLonLat } from 'ol/proj';
import OlLayerTile from 'ol/layer/Tile';
import OlLayerVector from 'ol/layer/Vector';
import OlSourceOSM from 'ol/source/OSM';
import OlSourceVector from 'ol/source/Vector';
import OlFeature from 'ol/Feature';
import OlGeomPoint from 'ol/geom/Point';
import OlGeomCircle from 'ol/geom/Circle';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import OlSourceTileWMS from 'ol/source/TileWMS';

import { CircleMenu, SimpleButton } from '@terrestris/react-geo/';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../../../store/ducks/_map';

class Map extends React.Component {

    constructor(props) {

        super(props);

        this.mapDivId = `map-${Math.random()}`;

        const source = new OlSourceVector({
            features: []
        });
        this.sourceFeatures = source;

        this.map = new OlMap({
            view: new OlView({
                center: [
                    -51.1691495,
                    -14.6565482
                ],
                projection: 'EPSG:4326',
                zoom: 4,
            }),
            layers: [
                new OlLayerTile({
                    id: 1,
                    name: 'OSM',
                    source: new OlSourceOSM(),
                    visible: true
                }),
                new OlLayerTile({
                    id: 2,
                    name: 'SRTM30-Colored',
                    minResolution: 0,
                    maxResolution: 10,
                    visible: false,
                    source: new OlSourceTileWMS({
                        url: 'https://ows.terrestris.de/osm/service',
                        params: {
                            'LAYERS': 'SRTM30-Colored'
                        }
                    })
                }),
                new OlLayerVector({
                    id: 3,
                    name: 'features',
                    source: this.sourceFeatures
                })
            ],
        });

        this.map.on('singleclick', evt => {
            console.log(evt)
            const map = evt.map;
            const mapEl = document.getElementById(this.mapDivId);
            const evtPixel = map.getPixelFromCoordinate(evt.coordinate);
            let visibleMap;
            let mapMenuCoords;

            if (map.hasFeatureAtPixel(evtPixel)) {
                visibleMap = true;
                mapMenuCoords = [
                    evtPixel[0] + mapEl.offsetLeft,
                    evtPixel[1] + mapEl.offsetTop,
                ];
            } else {
                visibleMap = false;
            }

            this.setState({
                mapMenuCoords,
                visibleMap
            });
        });

        this.state = {
            mapMenuCoords: [],
            visibleMap: false,
            appliedFilters: this.props.map.appliedFilters,
            filteredData: this.props.map.filteredData
        };
    }

    componentWillMount = async () => {
        await this.props.MapActions.setMap(this.map);
        this.map.setTarget(this.mapDivId);
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.map) {

            if (this.state.appliedFilters != this.props.map.appliedFilters) {
                this.setState({ appliedFilters: this.props.map.appliedFilters });
                const { latitude, longitude } = this.props.map.appliedFilters.city;

                this.map.setView(
                    new OlView({
                        center: fromLonLat([longitude, latitude], 'EPSG:4326'),
                        zoom: 10,
                        projection: 'EPSG:4326'
                    })
                );
            }

            if (this.state.filteredData != this.props.map.filteredData) {
                this.sourceFeatures.clear();
                this.setState({ filteredData: this.props.map.filteredData });
                const casos = this.props.map.filteredData;

                casos.forEach((c) => {
                    const { latitude, longitude } = (!c.codigo_ibge) ? this.state.appliedFilters.city :
                        this.state.appliedFilters.city;

                    const coords = fromLonLat([longitude, latitude], 'EPSG:4326');
                    var feature = new OlFeature({
                        geometry: new OlGeomPoint(coords),
                    });
                    feature.setStyle(new Style({
                        image: new Circle({
                            radius: 10,
                            fill: new Fill({ color: '#1976D2' }),
                        }),
                    }));
                    feature.setProperties(c);
                    this.sourceFeatures.addFeature(feature);
                });

                this.map.getView().fit(this.sourceFeatures.getExtent(), this.map.getSize());
                this.map.getView().setZoom(10);
            }
        }
    }

    render() {
        return (
            <>
                <div style={{
                    width: '100%',
                    height: '90%',
                    backgroundColor: "#def3f6",
                    border: '1px solid black'
                }}>
                    <div
                        id={this.mapDivId}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        {
                            this.state.visibleMap ?
                                <CircleMenu
                                    position={this.state.mapMenuCoords}
                                    diameter={80}
                                    animationDuration={500}
                                    style={{ color: '#1976D2', background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.65) 100%)' }}

                                >
                                    <SimpleButton iconName="line-chart" shape="circle" />
                                    <SimpleButton iconName="bullhorn" shape="circle" />
                                </CircleMenu> :
                                null
                        }
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    map: state._map
});

const mapDispatchToProps = dispatch => ({
    MapActions: bindActionCreators(MapActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
