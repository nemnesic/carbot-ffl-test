const host = 'https://account.carservicebot.com';
//const host = 'http://localhost:5000';

$(document).ready(function () {
    //$('#pickupTime').datetimepicker({format: 'LT'});
    //$('.datepicker').datetimepicker({format: 'MM/DD/YYYY'});

    $("#submit").on('click', function () {
        console.log("click");
        $('#submit').prop('disabled', true);
        $.ajax({
            url: host + '/webhook/v3/web-lead/save', // url where to submit the request
            type: "POST", // type of action POST || GET
            dataType: 'json', // data type
            data: $("#carbot_main_form").serialize(), // post data || get data
            success: function (result) {
                // you can see the result from the console
                // tab of the developer tools
                console.log(result);
                $("#message").toggle('slow');
                $("#carbot_main_form").toggle('slow');
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });
});

function initAutocomplete() {
    const pickupLocationInput = document.getElementById('pickUpLocation');
    const dropOffLocationInput = document.getElementById('dropOffLocation');

    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    const pickupAddressAutocomplete = new google.maps.places.Autocomplete(pickupLocationInput, {
        componentRestrictions: {country: ["us"]},
        fields: ["address_components", "geometry"],
        types: ["address"],
    });


    google.maps.event.addListener(pickupAddressAutocomplete, 'place_changed', function () {
        const place = pickupAddressAutocomplete.getPlace();
        const addressData = fillInAddress(place)
        console.log(addressData);
        document.getElementById('pickupAddress1').value = addressData.address1;
        document.getElementById('pickupPostcode').value = addressData.postcode;
        document.getElementById('pickupCity').value = addressData.city;
        document.getElementById('pickupState').value = addressData.state;
        document.getElementById('pickupCountry').value = addressData.country;
        document.getElementById('pickupLat').value = addressData.lat;
        document.getElementById('pickupLong').value = addressData.lng;
    });

    const destinationAutocomplete = new google.maps.places.Autocomplete(dropOffLocationInput, {
        componentRestrictions: {country: ["us"]},
        fields: ["address_components", "geometry"],
        types: ["address"],
    });

    google.maps.event.addListener(destinationAutocomplete, 'place_changed', function () {
        const place = destinationAutocomplete.getPlace();
        const addressData = fillInAddress(place)
        console.log(addressData);
        document.getElementById('dropOffAddress1').value = addressData.address1;
        document.getElementById('dropOffPostcode').value = addressData.postcode;
        document.getElementById('dropOffCity').value = addressData.city;
        document.getElementById('dropOffState').value = addressData.state;
        document.getElementById('dropOffCountry').value = addressData.country;
        document.getElementById('dropOffLat').value = addressData.lat;
        document.getElementById('dropOffLong').value = addressData.lng;
    });

}

function fillInAddress(place) {
    // Get the place details from the autocomplete object.
    let address1 = "";
    let city = "";
    let state = "";
    let country = "";
    let postcode = "";
    let lng = place.geometry.location.lng();
    let lat = place.geometry.location.lat();

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    for (const component of place.address_components) {
        // @ts-ignore remove once typings fixed
        const componentType = component.types[0];

        switch (componentType) {
            case "street_number": {
                address1 = `${component.long_name} ${address1}`;
                break;
            }

            case "route": {
                address1 += component.short_name;
                break;
            }

            case "postal_code": {
                postcode = `${component.long_name}${postcode}`;
                break;
            }

            case "postal_code_suffix": {
                postcode = `${postcode}-${component.long_name}`;
                break;
            }

            case "locality":
                city = component.long_name;
                break;

            case "administrative_area_level_1": {
                state = component.short_name;
                break;
            }

            case "country":
                country = component.short_name;
                break;
        }
    }

    return {
        address1: address1,
        postcode: postcode,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
    }
}
