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

import { CircleMenu, SimpleButton } from '@terrestris/react-geo/';

export default class CircleMenuExample extends React.Component {

    constructor(props) {

        super(props);

        this.mapDivId = `map-${Math.random()}`;

        const osmLayer = new OlLayerTile({
            source: new OlSourceOSM()
        });
        const featureLayer = new OlLayerVector({
            source: new OlSourceVector({
                features: [new OlFeature({
                    geometry: new OlGeomPoint([
                        -51.1691495,
                        -14.6565482
                    ])
                })]
            }),
            style: new OlStyleStyle({
                image: new OlStyleCircle({
                    radius: 6,
                    fill: new OlStyleFill({
                        color: '#000'
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
                osmLayer,
                featureLayer
            ],
            interactions: []
        });

        this.map.on('singleclick', evt => {
            const map = evt.map;
            const mapEl = document.getElementById(this.mapDivId);
            const pixel = map.getPixelFromCoordinate([-51.1691495, -14.6565482]);
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

    componentDidMount() {
        this.map.setTarget(this.mapDivId);
    }

    render() {
        const {
            mapMenuCoords,
            visibleMap
        } = this.state;

        return (
            <div>
                <div
                    id={this.mapDivId}
                    style={{
                        width: '100%',
                        height: '41rem'
                    }}
                />
                {
                    visibleMap ?
                        <CircleMenu
                            position={mapMenuCoords}
                            diameter={100}
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
        );
    }
}
