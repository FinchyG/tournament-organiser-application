// Execute in strict mode
"use strict";

// Declare a Controller object for use by the HTML view
var controller;

window.addEventListener("load", () => {
    console.log("page loaded");
    // Create the Tournament_Organiser object for use by the HTML view
    controller = new Tournament_Organiser();
});

function Tournament_Organiser() {
    
// functions to interact with REST API web service

    function log_user_in(username, password) {

        // get valid login details data to check user input against
        let login_data = user_login_details.data;
        // set a flag for whether user has been logged in or informed of incorrect password
        let login_action_taken = false;
        
        for (let key in login_data) {
            // check whether username and password are correct and if so log user in and 
            // move them to the home page 
            if (login_data[key].username == username && login_data[key].password == password) {
                login_action_taken = true;
                window.location.href = "home.html";
              // check if username is correct (password must be incorrect from prior check) and if 
              // so inform user of incorrect password, clear password input,  and exit loop
            } else if (login_data[key].username == username) {
                login_action_taken = true;
                document.getElementById("password").value = "";
                alert("password incorrect");
                break;
            }
        }
        // inform user username is incorrect because all valid username and password
        // combinations and usernames have been checked, clear username and password
        // inputs
        if (login_action_taken == false) {
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            alert("username is incorrect");
        }
    }

    function get_tournament_details() {
        
        function onSuccess(data){
            document.getElementById("tournament_name").value = data.data[0].tournament_name;
            document.getElementById("tournament_date").value = data.data[0].tournament_date;
            document.getElementById("location_name").value = data.data[0].location_name;
            document.getElementById("location_postcode").value = data.data[0].location_postcode;
        }

        $.ajax(tournament_details_url, { type: "GET", success: onSuccess });
    }

    function put_save_tournament_details(tournament_name, tournament_date, location_name, location_postcode) {
        
        function onSuccess(data){
            document.getElementById("tournament_name").setAttribute("readonly", true);
            document.getElementById("tournament_date").setAttribute("readonly", true);
            document.getElementById("location_name").setAttribute("readonly", true);
            document.getElementById("location_postcode").setAttribute("readonly", true);
        }

        let put_tournament_details_url = tournament_details_url + "1";
        $.ajax(put_tournament_details_url, { type: "PUT", data: {tournament_name: tournament_name, 
            tournament_date: tournament_date, location_name: location_name, location_postcode:
            location_postcode}, success: onSuccess });
    }

    // functions to interact with controller
        
    this.login_to_app = function () {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        log_user_in(username, password);
    };

    this.populate_tournament_details = function() {
        get_tournament_details();
    }    

    this.edit_tournament_details = function() {
        document.getElementById("tournament_name").removeAttribute("readonly");
        document.getElementById("tournament_date").removeAttribute("readonly");
        document.getElementById("location_name").removeAttribute("readonly");
        document.getElementById("location_postcode").removeAttribute("readonly");
    }

    this.save_tournament_details = function() {
        let tournament_name = document.getElementById("tournament_name").value;
        let tournament_date = document.getElementById("tournament_date").value;
        let location_name = document.getElementById("location_name").value;
        let location_postcode = document.getElementById("location_postcode").value;

        put_save_tournament_details(tournament_name, tournament_date, location_name, location_postcode);
    }

}