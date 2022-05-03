var mobileZoom = 0
console.log(parent.innerWidth)
if (parent.innerWidth < 600) {
    mobileZoom = 4
}
var options = {
    coords: [51.505, -0.09],
    zoom: 2.5,

}
var ctx = document.getElementById("canvas").getContext("2d");
var myLine

window.chartColors = {/*CNS colors*/
    red: '#990000',
    yellow: '#fbd603',
    grey: '#666666',
    yellowAccent: '#faa916',
    greenAccent: '#8fd694'
};
var map = L.map('map').setView(options.coords, options.zoom);
var markerLayer = new L.LayerGroup();
var osmLayer = new L.TileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWFkaXR0YW1iZSIsImEiOiJja3YxMXNzNjI3c2RhMnFxNnFqajZqdnZwIn0.a9gwkXW78sxu51NyWADROA', {
    id: 'mapbox/light-v10',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
});
map.addLayer(osmLayer);
var legend;
function getColor(d) {
    // console.log(d)
    return d == "Violence" ? '#edad08' :
        d == "Harsh environmental conditions" ? '#73af48' :
            d == "Drowning" ? '#cc503e' :
                d == "Vehicle accident" ? '#38a6a5' :
                    d == "Inadequate healthcare access" ? '#e17c05' :
                        d == "Mixed or unknown" ? '#5f4690' :
                            d == "Accidental death" ? '#94346e' :
                                '#666';
}

function drawLegend() {
    legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            labels = [],
            categories = ["Violence", "Harsh environmental conditions", "Drowning", "Vehicle accident", "Inadequate healthcare access", "Mixed or unknown", "Accidental death"],
            from, to;

        for (var i = 0; i < categories.length; i++) {
            div.innerHTML +=
                labels.push(
                    '<i style="background:' + getColor(categories[i]) + '"></i> ' +
                    (categories[i] ? categories[i] : '+'));
        }

        div.innerHTML = labels.join('<br>');
        return div;
    };

    legend.addTo(map);


}

function allData() {
    d3.csv(`https://raw.githubusercontent.com/aadittambe/migrants/main/data/data.csv`).then(function (data) {
        if (legend) {
            map.removeControl(legend)
        }
        data.forEach((obj) => {
            let dotRadius = obj.number_of_dead
            var marker = L.circleMarker([obj.lat, obj.lon], {
                stroke: true,
                color: "#990000",
                weight: 1,
                opacity: 0.5,
                radius: Math.sqrt(obj.total_number_of_dead_and_missing),
                fill: true,
                fillopacity: 0.4,
                interactive: false
            }).bindPopup(`I am a ${obj}`); // add it to map, give it popup

            markerLayer.addLayer(marker)
            markerLayer.addTo(map)
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            map.zoomControl.remove()
        })
    })
}

function addDataByType() {
    d3.csv(`https://raw.githubusercontent.com/aadittambe/migrants/main/data/data.csv`).then(function (data) {

        data.forEach((obj) => {
            var causeColor
            if (obj.death_cause_clean == "Violence") {
                causeColor = "#edad08"
            } else if (obj.death_cause_clean == "Harsh environmental conditions") {
                causeColor = "#73af48"
            } else if (obj.death_cause_clean == "Drowning") {
                causeColor = "#cc503e"
            } else if (obj.death_cause_clean == "Vehicle accident") {
                causeColor = "38a6a5"
            } else if (obj.death_cause_clean == "Sickness inadequate healthcare access") {
                causeColor = "e17c05"
            } else if (obj.death_cause_clean == "Mixed or unknown") {
                causeColor = "#5f4690"
            } else if (obj.death_cause_clean == "Accidental death") {
                causeColor = "#94346e"
            }
            // console.log(obj)
            var marker = L.circleMarker([obj.lat, obj.lon], {
                stroke: true,
                color: causeColor,
                weight: 1,
                opacity: 0.5,
                radius: Math.sqrt(obj.total_number_of_dead_and_missing),
                fill: true,
                fillopacity: 0.2,
                interactive: false,
            })//.bindPopup(`I am a ${obj}`); // add it to map, give it popup
            markerLayer.addLayer(marker)
            markerLayer.addTo(map)
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            map.zoomControl.remove()
        })
        drawLegend()
    })
}

function usMexico(markerYear) {
    d3.csv(`https://raw.githubusercontent.com/aadittambe/migrants/main/data/mexico_to_us.csv`).then(function (data) {
        if (legend) {
            map.removeControl(legend)
        }

        data.forEach((obj) => {
            if (markerYear == "all") {
                var marker = L.circleMarker([obj.lat, obj.lon], {
                    stroke: true,
                    color: "#990000",
                    weight: 1,
                    opacity: 0.5,
                    radius: Math.sqrt(obj.total_number_of_dead_and_missing),
                    fill: true,
                    fillOpacity: 0.4,
                    interactive: false,
                })//.bindPopup(`I am a ${obj}`); // add it to map, give it popup

                markerLayer.addLayer(marker)
                markerLayer.addTo(map)
                map.dragging.disable();
                map.touchZoom.disable();
                map.doubleClickZoom.disable();
                map.scrollWheelZoom.disable();
                map.boxZoom.disable();
                map.keyboard.disable();
                map.zoomControl.remove()
            }
            if (obj.incident_year == markerYear) {
                // console.log(obj)
                var marker = L.circleMarker([obj.lat, obj.lon], {
                    stroke: true,
                    color: "#990000",
                    weight: 1,
                    opacity: 0.5,
                    radius: Math.sqrt(obj.total_number_of_dead_and_missing),
                    fill: true,
                    fillOpacity: 0.4,
                    interactive: false,
                })//.bindPopup(`I am a ${obj}`); // add it to map, give it popup

                markerLayer.addLayer(marker)
                markerLayer.addTo(map)
                map.dragging.disable();
                map.touchZoom.disable();
                map.doubleClickZoom.disable();
                map.scrollWheelZoom.disable();
                map.boxZoom.disable();
                map.keyboard.disable();
                map.zoomControl.remove()
            }
        })
    })
}

function europe(euFilter) {
    d3.csv(`https://raw.githubusercontent.com/aadittambe/migrants/main/data/europe.csv`).then(function (data) {

        data.forEach((obj) => {
            if (legend) {
                map.removeControl(legend)
            }
            if (euFilter == "biggest") {
                if (obj.main_id == "2015.MMP00108") {
                    // console.log(obj)
                    var marker = L.circleMarker([obj.lat, obj.lon], {
                        stroke: true,
                        color: "#990000",
                        weight: 1,
                        opacity: 0.5,
                        radius: Math.sqrt(obj.total_number_of_dead_and_missing),
                        fill: true,
                        fillopacity: 0.4,
                        interactive: false
                    }).bindPopup(`I am a ${obj}`); // add it to map, give it popup

                    markerLayer.addLayer(marker)
                    markerLayer.addTo(map)
                    marker.options.interactive = false;
                    map.dragging.disable();
                    map.touchZoom.disable();
                    map.doubleClickZoom.disable();
                    map.scrollWheelZoom.disable();
                    map.boxZoom.disable();
                    map.keyboard.disable();
                    map.zoomControl.remove()
                }
            }
            if (euFilter == "more_than_100") {
                if (legend) {
                    map.removeControl(legend)
                }
                if (obj.total_number_of_dead_and_missing > 100) {
                    // console.log(obj)
                    var marker = L.circleMarker([obj.lat, obj.lon], {
                        stroke: true,
                        color: "#990000",
                        weight: 1,
                        opacity: 0.5,
                        radius: Math.sqrt(obj.total_number_of_dead_and_missing),
                        fill: true,
                        fillopacity: 0.4,
                        interactive: false
                    }).bindPopup(`I am a ${obj}`); // add it to map, give it popup

                    markerLayer.addLayer(marker)
                    markerLayer.addTo(map)
                    marker.options.interactive = false;
                    map.dragging.disable();
                    map.touchZoom.disable();
                    map.doubleClickZoom.disable();
                    map.scrollWheelZoom.disable();
                    map.boxZoom.disable();
                    map.keyboard.disable();
                    map.zoomControl.remove()
                }
            }
            if (euFilter == "all") {
                if (legend) {
                    map.removeControl(legend)
                }
                // console.log(obj)
                var marker = L.circleMarker([obj.lat, obj.lon], {
                    stroke: true,
                    color: "#990000",
                    weight: 1,
                    opacity: 0.5,
                    radius: Math.sqrt(obj.total_number_of_dead_and_missing),
                    fill: true,
                    fillopacity: 0.4,
                    interactive: false
                }).bindPopup(`I am a ${obj}`); // add it to map, give it popup

                markerLayer.addLayer(marker)
                markerLayer.addTo(map)
                marker.options.interactive = false;
                map.dragging.disable();
                map.touchZoom.disable();
                map.doubleClickZoom.disable();
                map.scrollWheelZoom.disable();
                map.boxZoom.disable();
                map.keyboard.disable();
                map.zoomControl.remove()
            }
        })
    })
}

function europeAllFiltered() {
    d3.csv(`https://raw.githubusercontent.com/aadittambe/migrants/main/data/europe.csv`).then(function (data) {

        data.forEach((obj) => {
            var causeColor
            if (obj.death_cause_clean == "Violence") {
                causeColor = "#edad08"
            } else if (obj.death_cause_clean == "Harsh environmental conditions") {
                causeColor = "#73af48"
            } else if (obj.death_cause_clean == "Drowning") {
                causeColor = "#cc503e"
            } else if (obj.death_cause_clean == "Vehicle accident") {
                causeColor = "#38a6a5"
            } else if (obj.death_cause_clean == "Sickness inadequate healthcare access") {
                causeColor = "#e17c05"
            } else if (obj.death_cause_clean == "Mixed or unknown") {
                causeColor = "#5f4690"
            } else if (obj.death_cause_clean == "Accidental death") {
                causeColor = "#94346e"
            }
            // console.log(obj)
            var marker = L.circleMarker([obj.lat, obj.lon], {
                stroke: true,
                color: causeColor,
                weight: 1,
                opacity: 0.7,
                radius: Math.sqrt(obj.total_number_of_dead_and_missing),
                fill: true,
                fillopacity: 0.5,
                interactive: false,
            })//.bindPopup(`I am a ${obj}`); // add it to map, give it popup
            markerLayer.addLayer(marker)
            markerLayer.addTo(map)
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            map.zoomControl.remove()
        })
        drawLegend()
    })
}

// scrollama
// Credit: Adapted from https://github.com/calibro/scrollama-boilerplate */


// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response, id) {
    console.log(response.index)
    if (response.index == 0) {
        mobileZoom = 0;
        if (parent.innerWidth < 600) {
            mobileZoom = 2
        }
        // mobileZoom = 2;
        options = {
            coords: [0, 0],
            zoom: 2.5 - mobileZoom,
        }
        markerLayer.clearLayers();
        map.flyTo(options.coords, options.zoom, { animation: true })
        allData();

    }
    if (response.index == 1) {
        mobileZoom = 0;
        if (parent.innerWidth < 600) {
            mobileZoom = 2
        }
        options = {
            coords: [0, 0],
            zoom: 2.5 - mobileZoom,


        }
        markerLayer.clearLayers();
        map.flyTo(options.coords, options.zoom, { animation: true })
        addDataByType();

    }
    // if (response.index == 2) {
    //     options = {
    //         coords: [29.7434877, -105.9591008],
    //         zoom: 6 - mobileZoom,
    //         radius: 5,

    //     }
    //     markerLayer.clearLayers();
    //     map.flyTo(options.coords, options.zoom, { animation: true })
    //     usMexico(2014);
    // }
    // if (response.index == 3) {
    //     options = {
    //         coords: [29.7434877, -105.9591008],
    //         zoom: 6 - mobileZoom,
    //         radius: 5,

    //     }
    //     markerLayer.clearLayers();
    //     map.flyTo(options.coords, options.zoom, { animation: true })
    //     usMexico(2015);
    // }
    // if (response.index == 4) {
    //     options = {
    //         coords: [29.7434877, -105.9591008],
    //         zoom: 6 - mobileZoom,
    //         radius: 5,

    //     }
    //     markerLayer.clearLayers();
    //     map.flyTo(options.coords, options.zoom, { animation: true })
    //     usMexico(2016);
    // }
    // if (response.index == 5) {
    //     options = {
    //         coords: [29.7434877, -105.9591008],
    //         zoom: 6 - mobileZoom,
    //         radius: 5,

    //     }
    //     markerLayer.clearLayers();
    //     map.flyTo(options.coords, options.zoom, { animation: true })
    //     usMexico(2017);
    // }
    // if (response.index == 6) {
    //     options = {
    //         coords: [29.7434877, -105.9591008],
    //         zoom: 6 - mobileZoom,
    //         radius: 5,

    //     }
    //     markerLayer.clearLayers();
    //     map.flyTo(options.coords, options.zoom, { animation: true })
    //     usMexico(2018);
    // }
    // if (response.index == 7) {
    //     options = {
    //         coords: [29.7434877, -105.9591008],
    //         zoom: 6 - mobileZoom,
    //         radius: 5,

    //     }
    //     markerLayer.clearLayers();
    //     map.flyTo(options.coords, options.zoom, { animation: true })
    //     usMexico(2019);
    // }
    // if (response.index == 8) {
    //     options = {
    //         coords: [29.7434877, -105.9591008],
    //         zoom: 6 - mobileZoom,
    //         radius: 5,

    //     }
    //     markerLayer.clearLayers();
    //     map.flyTo(options.coords, options.zoom, { animation: true })
    //     usMexico(2020);
    // }
    // if (response.index == 9) {
    //     options = {
    //         coords: [29.7434877, -105.9591008],
    //         zoom: 6 - mobileZoom,
    //         radius: 5,

    //     }
    //     markerLayer.clearLayers();
    //     map.flyTo(options.coords, options.zoom, { animation: true })
    //     usMexico(2021);
    // }
    if (response.index == 2) {
        options = {
            coords: [29.7434877, -105.9591008],
            zoom: 5 - mobileZoom,
            radius: 5,
        }
        // console.log(options.zoom)
        markerLayer.clearLayers();
        map.flyTo(options.coords, options.zoom, { animation: true })
        usMexico("all");
    }
    if (response.index == 3) {
        options = {
            coords: [32.5380366, 15.3389586],
            zoom: 4 - mobileZoom,

        }
        // console.log(options.zoom)
        markerLayer.clearLayers();
        map.flyTo(options.coords, options.zoom, { animation: true })
        europe("all");
    }
    if (response.index == 4) {
        options = {
            coords: [32.5380366, 15.3389586],
            zoom: 4 - mobileZoom,

        }
        // console.log(options.zoom)
        markerLayer.clearLayers();
        map.flyTo(options.coords, options.zoom, { animation: true })
        europeAllFiltered();
    }

    if (response.index == 5) {
        options = {
            coords: [32.5380366, 15.3389586],
            zoom: 6 - mobileZoom,

        }
        // console.log(options.zoom)
        markerLayer.clearLayers();
        map.flyTo(options.coords, options.zoom, { animation: true })
        europe("biggest");
    }
    if (response.index == 6) {
        options = {
            coords: [32.5380366, 15.3389586],
            zoom: 5 - mobileZoom,
        }
        // console.log(options.zoom)
        markerLayer.clearLayers();
        map.flyTo(options.coords, options.zoom, { animation: true })
        europe("more_than_100");
    }




    d3.csv("https://raw.githubusercontent.com/aadittambe/migrants/main/data/month_and_cause.csv").then(function (loadedData) {
        console.log(loadedData)
        let chartLabels = []
        let l_accidental_death = [];
        let l_drowning = [];
        let l_harsh_environmental_conditions = [];
        let l_mixed_or_unknown = [];
        let l_sickness_inadequate_healthcare_access = [];
        let l_vehicle_accident = [];
        let l_violence = [];
        for (let i = 0; i < loadedData.length; i++) {
            let date = loadedData[i].month_year;
            chartLabels.push(date);
            let accidental_death = loadedData[i]["Accidental death"];
            l_accidental_death.push(accidental_death);
            let drowning = loadedData[i]["Drowning"];
            l_drowning.push(drowning);
            let harsh_environmental_conditions = loadedData[i]["Harsh environmental conditions"];
            l_harsh_environmental_conditions.push(harsh_environmental_conditions);
            let mixed_or_unknown = loadedData[i]["Mixed or unknown"];
            l_mixed_or_unknown.push(mixed_or_unknown);
            let sickness_inadequate_healthcare_access = loadedData[i]["Inadequate healthcare access"];
            l_sickness_inadequate_healthcare_access.push(sickness_inadequate_healthcare_access);
            let vehicle_accident = loadedData[i]["Vehicle accident"];
            l_vehicle_accident.push(vehicle_accident);
            let violence = loadedData[i]["Violence"];
            l_violence.push(violence);
        }
        let options = {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: "Accidental death",
                        backgroundColor: "#94346e",
                        borderColor: "#94346e",
                        data: l_accidental_death,
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        borderWidth: 3,
                    },

                ]
            },
            options: {
                events: [],
                responsive: true,
                aspectRatio: 1.5,
                title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                },
                tooltips: {
                    enabled: false,
                    mode: 'label'
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                elements: {
                    line: {
                        tension: 0.5
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        gridLines: {
                            zeroLineWidth: 20
                        },
                        weight: 10,
                        max: 1800,
                        min: 0,
                        stacked: true,
                        grid: {
                            display: false
                        }
                    }
                }
            }
        };
        if (response.index == 7) {
            if (!myLine) {
                myLine = new Chart(ctx, options);
                $(window).bind('beforeunload', function () {
                    // console.log('reload');
                    myLine.update()
                });
            } else if (myLine.data.datasets[1]) {
                myLine.data.datasets[1].data = ""
                myLine.update();
            } else if (myLine.data.datasets[2]) {
                myLine.data.datasets[2].data = ""
                myLine.update();
            }
        }
        // console.log(myLine)
        if (response.index == 8) {
            // console.log(myLine.data.datasets[0])
            let sickness = {
                label: "Sickness",
                backgroundColor: "#e17c05",
                borderColor: "#e17c05",
                data: l_sickness_inadequate_healthcare_access,
                pointRadius: 1,
            }
            if (myLine) {
                myLine.data.datasets[1] = sickness;
                myLine.update();
            }
            if (myLine.data.datasets[2]) {
                myLine.data.datasets[2].data = ""
                myLine.update();
            }
        }
        if (response.index == 9) {
            let violence = {
                label: "Violence",
                backgroundColor: "#edad08",
                borderColor: "#edad08",
                data: l_violence,
                pointRadius: 1,
            }
            if (myLine) {
                myLine.data.datasets[2] = violence;
                myLine.update();
            }
            if (myLine.data.datasets[3]) {
                myLine.data.datasets[3].data = ""
                myLine.update();
            }
        }
        if (response.index == 10) {
            let envir = {
                label: "Harsh environmental condition",
                backgroundColor: "#73af48",
                borderColor: "#73af48",
                data: l_harsh_environmental_conditions,
                pointRadius: 1,
            }
            if (myLine) {
                myLine.data.datasets[3] = envir;
                myLine.update();
            }
            if (myLine.data.datasets[4]) {
                myLine.data.datasets[4].data = ""
                myLine.update();
            }
        }


        if (response.index == 11) {
            let vehicle = {
                label: "Vehicle accident",
                backgroundColor: "#38a6a5",
                borderColor: "#38a6a5",
                data: l_vehicle_accident,
                pointRadius: 1,
            }
            if (myLine) {
                myLine.data.datasets[4] = vehicle;
                myLine.update();
            }
            if (myLine.data.datasets[5]) {
                myLine.data.datasets[5].data = ""
                myLine.update();
            }
        }
        if (response.index == 12) {
            let mixed = {
                label: "Mixed or unknown",
                backgroundColor: "#5f4690",
                borderColor: "#5f4690",
                data: l_mixed_or_unknown,
                pointRadius: 1,
            }
            if (myLine) {
                myLine.data.datasets[5] = mixed;
                myLine.update();
            }
            if (myLine.data.datasets[6]) {
                myLine.data.datasets[6].data = ""
                myLine.update();
            }
        }
        if (response.index == 13) {
            let drown = {
                label: "Drowing",
                backgroundColor: "#cc503e",
                borderColor: "#cc503e",
                data: l_drowning,
                pointRadius: 1,
            }
            if (myLine) {
                myLine.data.datasets[6] = drown;
                myLine.update();
            }
            if (myLine.data.datasets[7]) {
                myLine.data.datasets[7].data = ""
                myLine.update();
            }
        }
    })

    // myLine.data.datasets[3] = x;

    // console.log('reched')

    if (response.index == 11) {
        // myLine.data.datasets[1] = l_drowning;
        // myLine.update();
        // myLine.destroy();
    }



    // response = { element, direction, index }

    // update graphic based on step
    d3.selectAll(id + ' .scroll-graphic-tab').attr('class', function (d, i) {
        // console.log(d3.select(this))
        if (d3.select(this).attr('data-step') == 1 && response.index <= 6) {
            return 'scroll-graphic-tab d-block'
        } else if (d3.select(this).attr('data-step') == 2 && response.index <= 18) {
            // console.log('hi!')
            return 'scroll-graphic-tab d-block'
        } else if (d3.select(this).attr('data-step') == response.index + 1) {
            return 'scroll-graphic-tab d-block'
        }
        else { return 'scroll-graphic-tab d-none' }
    })
}

function handleContainerEnter(response) {
    // response = { direction }
}

function handleContainerExit(response) {
    // response = { direction }
}


function init() {
    //setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
        container: '#scroll',
        graphic: '#scroll .scroll-graphic',
        step: '#scroll .scroll-text .step',
        debug: false,
        offset: 0.50,
    })
        .onStepEnter(function (response) {
            return handleStepEnter(response, '#scroll')
        }
        )
    // .onContainerEnter(handleContainerEnter)
    // .onContainerExit(handleContainerExit);


    // setup resize event
    window.addEventListener('resize', handleResize);
}

// kick things off
init();



// Built with the Scrollama.js library: https://github.com/russellgoldenberg/scrollama