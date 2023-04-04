function initMap() {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    let marker = null;
    // initial location of the marker will be based on user location
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
        const ipAddress = data.ip;
        fetch(`http://ip-api.com/json/${ipAddress}`)
            .then(response => response.json())
            .then(data => {
                const lat = data.lat;
                const lon = data.lon;
                const region = data.region;
                const country = data.country;
                const city = data.city;
                const street = data.road;
                marker = L.marker([lat, lon]).addTo(map);
                marker.bindPopup(`Home <strong>${city}, <i>${country}</i></strong>`).openPopup();
            });
        });

    // ok when map is clicked, marker goes poof then new one appears on clicked location
    // this is still wonky sometimes the marker just doesn't show, giving an error
    map.on('click', function(event) {
        
        if (marker !== null) {
        marker.remove();
        }

        const lat = event.latlng.lat; // latitude (x)
        const lng = event.latlng.lng; //longitude (y)
        //API url geonames, to get precise location.
        const apiUrl = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=marsch28`;

        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const countryName = data.geonames[0].countryName || "Unknown Country";
            const regionName = data.geonames[0].adminName1 || "Unknown Region";
            const provinceName = data.geonames[0].adminName2 || "Unknown Province";
            const cityName = data.geonames[0].name || "Unknown City";
            const streetName = data.geonames[0].streetName || "Unknown Street";
            const timezoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=PETSBZ6QV585&format=json&by=position&lat=${lat}&lng=${lng}`;
            fetch(timezoneUrl)
                .then(response => response.json())
                .then(data => {
                    const timezone = data.zoneName || "Unknown Timezone";
                    marker = L.marker([lat, lng]).addTo(map);
                    marker.bindPopup(`<strong>${cityName}, <i>${countryName}</i></strong>`).openPopup();
                
                    document.getElementById("country").innerHTML = `${countryName}`;
                    document.getElementById("region").innerHTML = `${regionName}`;
                    document.getElementById("province").innerHTML = `${provinceName}`;
                    document.getElementById("city").innerHTML = `${cityName}`;
                    document.getElementById("street").innerHTML = `${streetName}`;
                    document.getElementById("timezone").innerHTML = `${timezone}`;
                });
        });
    });
}