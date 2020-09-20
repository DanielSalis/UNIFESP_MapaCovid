import * as React from 'react';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';
import OlSourceTileWMS from 'ol/source/TileWMS';
import OlLayerGroup from 'ol/layer/Group';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as MapActions } from '../../../../store/ducks/_map';
import Item from 'antd/lib/list/Item';

class Map extends React.Component {

    constructor(props) {

        super(props);

        this.mapDivId = `map-${Math.random()}`;

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
                    name: 'OSM-Overlay-WMS',
                    minResolution: 0,
                    maxResolution: 200,
                    visible: false,
                    source: new OlSourceTileWMS({
                        url: 'https://ows.terrestris.de/osm/service',
                        params: {
                            'LAYERS': 'OSM-Overlay-WMS'
                        }
                    })
                }),
                new OlLayerTile({
                    id: 3,
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
                })
            ],
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

        console.log("mudou");
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
            <div style={{
                width: '100%',
                height: '90%'
            }}>
                <div
                    id={this.mapDivId}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </div>
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
