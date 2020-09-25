import * as React from 'react';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlLayerVector from 'ol/layer/Vector';
import OlSourceOSM from 'ol/source/OSM';
import OlSourceVector from 'ol/source/Vector';
import OlFeature from 'ol/Feature';
import OlGeomPoint from 'ol/geom/Point';
import OlStyleStyle from 'ol/style/Style';
import OlStyleCircle from 'ol/style/Circle';
import OlStyleFill from 'ol/style/Fill';
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

        const featureLayer = new OlLayerVector({
            id: 3,
            visible: true,
            source: new OlSourceVector({
                features: [new OlFeature({
                    geometry: new OlGeomPoint([
                        0.0,
                        0.0
                    ])
                })]
            }),
            style: new OlStyleStyle({
                image: new OlStyleCircle({
                    radius: 10,
                    fill: new OlStyleFill({
                        color: '#C62148'
                    })
                })
            })
        });

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
                featureLayer
            ],
        });

        this.map.on('singleclick', evt => {
            console.log(evt)
            const map = evt.map;
            const mapEl = document.getElementById(this.mapDivId);
            const pixel = map.getPixelFromCoordinate([0.1691495, 0.6565482]);
            const evtPixel = map.getPixelFromCoordinate(evt.coordinate);
            let visibleMap;
            let mapMenuCoords;

            if (map.hasFeatureAtPixel(evtPixel)) {
                visibleMap = true;
                mapMenuCoords = [
                    pixel[0] + mapEl.offsetLeft,
                    pixel[1] + mapEl.offsetTop,
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
            visibleMap: false
        };
    }

    componentWillMount = async () => {
        await this.props.MapActions.setMap(this.map);
        // console.log(this.map.getLayers().getArray());

        // const layerD = this.map.getLayers().getArray()[2];
        // console.log(layerD);
        // layerD.setVisible(false);

        // console.log(this.map.getLayers());
        this.map.setTarget(this.mapDivId);
    }

    componentDidUpdate = async (prevProps, prevState) => {

        //console.log("mudou");
        if (this.map) {
            this.map.getLayers().getArray().forEach((item, index) => {
                if ((item.getProperties().id === this.props.map.layers[index].id) && this.props.map.layers[index].visible === true) {
                    item.setVisible(true);
                } else {
                    item.setVisible(false);
                }
            });
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
                                >
                                    <SimpleButton iconName="pencil" shape="circle" />
                                    <SimpleButton iconName="line-chart" shape="circle" />
                                    <SimpleButton iconName="link" shape="circle" />
                                    <SimpleButton iconName="thumbs-o-up" shape="circle" />
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
