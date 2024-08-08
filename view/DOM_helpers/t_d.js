function edit_tournament_details() {

    // remove readonly status from input elements to allow user alterations
    document.getElementById("tournament_name").removeAttribute("readonly");
    document.getElementById("tournament_date").removeAttribute("readonly");
    document.getElementById("location_name").removeAttribute("readonly");
    document.getElementById("location_postcode").removeAttribute("readonly");

}