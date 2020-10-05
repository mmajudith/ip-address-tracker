import React, { useState, useRef, useEffect, useCallback }from 'react';
import axios from 'axios';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import pointerIcon from '../customIcon/Icon'
import Arrow   from '../images/icon-arrow.svg';

function Search() {

    // Variables declaration
    const [input, setInput] = useState("");
    const [map , setMap] = useState(undefined)
    const ipRef = useRef(null);
    const ispRef = useRef(null);
    const countryRef = useRef(null);
    const timezoneRef = useRef(null);
    const key = 'at_rnncwFCG5vw4wcvNiSlCNRNu3bbbc';
    const allparams = `apiKey=${key}&ipAddress=${input}&domain=${input}`;
    
    // Http Call function
    const getIpAddress = useCallback(async () =>{
        try{
            const response = await axios.get(`https://geo.ipify.org/api/v1?${allparams}`);
            const data = await response;
            
            return data
        }catch(err){
            console.log(err)
        }
    }, [allparams])

    //Update UI Function
    const UpdateUI = ({data}) =>{

        const { ip, isp, location:{country, timezone, lat, lng} } = data
        
        ipRef.current.textContent = ip;
        ispRef.current.textContent = isp;
        countryRef.current.textContent = country;
        timezoneRef.current.textContent = timezone;

        setMap({lat, lng})

    }

    // Form submit function
    const submit = (e) =>{
        e.preventDefault();
        getIpAddress()
        .then(data => UpdateUI(data))
        .catch(err => console.log(err))
    }

    //Mount once
    useEffect(()=>{
        getIpAddress()
        .then(data => UpdateUI(data))
        .catch(err => console.log(err))
    }, [] );

  return (
    <div>
        
        <div className="search-wrapper">
            <h1>IP Address Tracker</h1>

            <form onSubmit={submit} className="ip-search">
            
                <input type="text" name="ip-address"
                 value={input} placeholder=" Search for any IP address or domain" 
                 onChange={e => setInput(e.target.value)}/>

                <button type="submit"><img src={Arrow} alt="arrow-icon"/></button>
            </form>

            <div className="results-wrapper">

                <div className="address">
                    <p>IP Address</p>
                    <p ref={ipRef} className="ip-output"></p>
                </div>
                    
                <div className="location">
                    <p>Location</p>
                    <p ref={countryRef} className="lo-output"></p>
                </div>
                    
                <div className="time">
                    <p>Timezone</p>
                    <p ref={timezoneRef} className="ti-output"> </p>
                </div>
                    
                <div className="isp">
                    <p>ISP</p>
                    <p ref={ispRef} className="isp-output"></p>
                </div>
                
            </div>
        </div>
        
        {
            map === undefined? <h2>Loading...</h2> :
                <Map id="map" center={map} zoom={10}>
                    <TileLayer 
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW1hanVkaXRoIiwiYSI6ImNrZm1tNDhyazAycDIydW1wbzB1MmRib2kifQ.FzSFSsXaE8rPFBwhrbr5Vg'
                        id= 'mapbox/streets-v11'
                        tileSize={512}
                        zoomOffset={-1}
                        accessToken= 'your.mapbox.access.token'
                            
                    />
                    <Marker position={map} icon={pointerIcon}>
                        <Popup>
                            <span>City where your IP<br></br> address is located.</span>
                        </Popup>
                    </Marker>    
                </Map>
        }
    
    </div>
  )
}

export default Search
