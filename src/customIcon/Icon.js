import L from 'leaflet'

const pointerIcon = new L.Icon({
    iconUrl: require('../images/icon-location.svg'),
    iconRetinaUrl: require('../images/icon-location.svg'),
    iconAnchor: [5, 55],
    popupAnchor: [10, -44]
})


export default pointerIcon