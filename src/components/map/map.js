import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

const ACCESS_TOKEN = "pk.eyJ1IjoicXV2YWtpIiwiYSI6ImNsZ2ozdTFrNDBjdmkzbnB6NzZueDV5NTYifQ.rM1LSJG_BGZtn3x_mWS0cA";
mapboxgl.accessToken = ACCESS_TOKEN;

export const initMap = () => {
    const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [37.617698, 55.755864],
        zoom: 11,
    });

    let metroData = null;
    const getMetroData = async () => {
        metroData = await fetch("../../src/components/map/metro.msk.json")
            .then((data) => data.json())
            .then((metro) => metro);
        map.on("load", () => {
            metroData.forEach((metro) => {
                getMetroLine(metro);
            });
        });
    };
    getMetroData();

    const getMetroLine = (metro) => {
        const coordinatesStation = [];
        metro.stations.map((station) => {
            coordinatesStation.push([station.lng, station.lat]);
            buildLocationList(station, metro.hex_color);
        });
        const points = {
            type: "FeatureCollection",
            features: metro.stations.map((station) => ({
                type: "Feature",
                properties: {
                    description: `<strong>${station.name}</strong>
                    <p>${station.district}</p>      
                    <p>${station.admArea}</p> 
                    <p>${station.status}</p>             
`,
                },
                geometry: {
                    type: "Point",
                    coordinates: [station.lng, station.lat],
                },
            })),
        };
        map.addSource(`${metro.name}`, {
            type: "geojson",
            data: points,
        });
        map.addLayer({
            id: `${metro.name}`,
            type: "circle",
            source: `${metro.name}`,
            paint: {
                "circle-color": `#${metro.hex_color}`,
                "circle-radius": 8,
            },
        });

        map.on("click", `${metro.name}`, (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on("mouseenter", `${metro.name}`, () => {
            map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", `${metro.name}`, () => {
            map.getCanvas().style.cursor = "";
        });

        map.addSource(`${metro.name}-line`, {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: coordinatesStation,
                },
            },
        });

        map.addLayer({
            id: `${metro.name}-line`,
            type: "line",
            source: `${metro.name}-line`,
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-color": `#${metro.hex_color}`,
                "line-width": 4,
            },
        });
    };

    const filterPoints = (value) => {
        const filteredMetroData = metroData.filter((metro) => {
            return metro.stations.some((station) => {
                return station.name.toLowerCase().includes(value.toLowerCase());
            });
        });
        const layersToHide = metroData
            .filter((metro) => !filteredMetroData.includes(metro))
            .map((metro) => `${metro.name}`);
        const layersToShow = filteredMetroData.map((metro) => `${metro.name}`);
        layersToHide.forEach((layer) => {
            map.setLayoutProperty(layer, "visibility", "none");
        });
        layersToShow.forEach((layer) => {
            map.setLayoutProperty(layer, "visibility", "visible");
        });
    };

    const createInputSearch = () => {
        const heading = document.querySelector(".heading");
        const inputSearch = document.createElement("INPUT");
        heading.appendChild(inputSearch);
        inputSearch.setAttribute("type", "text");
        inputSearch.addEventListener("input", (e) => {
            filterPoints(e.target.value);
        });
    };
    createInputSearch();
    const buildLocationList = (station, color) => {
        const listings = document.getElementById("listings");
        const listing = listings.appendChild(document.createElement("div"));
        listing.id = `listing-${station.name}`;
        listing.className = "item";
        const linkWrapper = listing.appendChild(document.createElement("div"));
        linkWrapper.className = "link-wrapper";
        const circle = linkWrapper.appendChild(document.createElement("div"));
        circle.className = "circle";
        circle.style.backgroundColor = `#${color}`;
        const link = linkWrapper.appendChild(document.createElement("a"));
        link.href = "#";
        link.className = "title";
        link.style.color = `#${color}`;
        link.style.textDecoration = "none";
        link.id = `${station.lng}-${station.lat}`;
        link.innerHTML = `${station.name}`;
        /* Add details to the individual listing. */
        const district = listing.appendChild(document.createElement("div"));
        district.innerHTML = `Округ: ${station.district}`;
        const status = listing.appendChild(document.createElement("div"));
        status.innerHTML = `Статус: ${station.status}`;

        link.addEventListener("click", function (e) {
            console.log(e.target.id);
            const [lng, lat] = e.target.id.split("-");
            flyToStore([lng, lat]);

            const activeItem = document.getElementsByClassName("active");
            if (activeItem[0]) {
                activeItem[0].classList.remove("active");
            }

            this.parentNode.classList.add("active");
        });
    };

    const flyToStore = (currentFeature) => {
        map.flyTo({
            center: currentFeature,
            zoom: 15,
        });
    };
};
