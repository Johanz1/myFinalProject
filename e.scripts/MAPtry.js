function initMap() {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    let marker = null;
    // initial location will be based on user location
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
        const ipAddress = data.ip;
        fetch(`http://ip-api.com/json/${ipAddress}`)
            .then(response => response.json())
            .then(data => {
                const lat = data.lat;
                const lon = data.lon;
                const country = data.country;
                const city = data.city;
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
            const countryName = data.geonames[0].countryName;
            const regionName = data.geonames[0].regionName;
            const cityName = data.geonames[0].name;
            const streetName = data.geonames[0].streetName;
            marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(`<strong>${cityName}, <i>${countryName}</i></strong>`).openPopup();

            document.getElementById("country").innerHTML = `Country: ${countryName}`;
            document.getElementById("region").innerHTML = `Region: ${regionName}`;
            document.getElementById("city").innerHTML = `City: ${cityName}`;
            document.getElementById("street").innerHTML = `Street: ${streetName}`;
        });
    });
}