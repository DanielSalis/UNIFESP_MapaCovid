import React, { Component } from "react";
import Chart from "react-apexcharts";
import api from '../../../API';

class Charts extends Component {
    constructor(props) {
        super(props);

        this.fetchCasesByDate(props.cod);
        this.state = {
            options: {
                chart: {
                    id: 'chart',
                    type: 'area',
                    stacked: false,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                yaxis: {
                    title: {
                        text: 'Casos/óbitos'
                    },
                },
                xaxis: {
                    type: 'datetime',
                },
                tooltip: {
                    shared: true,
                },
            },
            series: []
        };
    }

    fetchCasesByDate = async (codIbge) => {
        api.get(`/api/map/get/casesByDate`, {
            params: { codIbge }
        })
            .then(async (res) => {
                this.prepareData(res.data);
            })
    }

    prepareData = (list) => {
        this.setState({
            series: [
                {
                    name: 'Casos', data: list.map((l) => l.casos)
                },
                {
                    name: 'Óbitos', data: list.map((l) => l.obitos)
                }
            ],
            options: {
                ...this.state.options,
                xaxis: {
                    categories: list.map((l) => l.dt_caso)
                }
            }
        });
    }

    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="area"
                width="350"
            />
        );
    }
}

export default Charts;
