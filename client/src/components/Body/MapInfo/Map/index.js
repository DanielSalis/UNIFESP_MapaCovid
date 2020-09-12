import * as React from 'react';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';

export default class Map extends React.Component {

    constructor(props) {

        super(props);

        this.mapDivId = `map-${Math.random()}`;

        const osmLayer = new OlLayerTile({
            source: new OlSourceOSM()
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
                osmLayer,
            ],
        });

        this.state = {
            mapMenuCoords: [],
            visibleMap: false
        };
    }

    componentDidMount() {
        this.map.setTarget(this.mapDivId);
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
