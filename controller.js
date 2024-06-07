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
    
// functions to interact with Model data

    // -----login function-----

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

    // -----tournament details functions-----

    function get_tournament_details() {
        
        // get tournament details data so that it can be displayed
        let tournament_details_data = tournament_details.data[0];
       
        // check whether tournament details exist and if so display them
        if ( tournament_details.data.length == 1) {
            document.getElementById("tournament_name").value = tournament_details_data.tournament_name;
            document.getElementById("tournament_date").value = tournament_details_data.tournament_date;
            document.getElementById("location_name").value = tournament_details_data.location_name;
            document.getElementById("location_postcode").value = tournament_details_data.location_postcode;
        }
    }

    function put_save_tournament_details(tournament_name, tournament_date, location_name, location_postcode) {
        
        // get tournament details data which will be updated
        let tournament_details_data = tournament_details.data[0];

        // set tournament details data to user input values
        tournament_details.data[0].tournament_name = document.getElementById("tournament_name").value;
        tournament_details.data[0].tournament_date = document.getElementById("tournament_date").value;
        tournament_details.data[0].location_name = document.getElementById("location_name").value;
        tournament_details.data[0].location_postcode = document.getElementById("location_postcode").value;

        // return input elements to a readonly state
        document.getElementById("tournament_name").setAttribute("readonly", true);
        document.getElementById("tournament_date").setAttribute("readonly", true);
        document.getElementById("location_name").setAttribute("readonly", true);
        document.getElementById("location_postcode").setAttribute("readonly", true);
    }

    // -----home ground details functions-----

    function get_home_ground_details() {
        
        // get home ground details data so that it can be displayed
        let home_ground_details_data = home_ground_details.data;
         
        console.log(home_ground_details_data);
        for (let i = 0; i < home_ground_details_data.length; i++ ) {
            let h_g_d_id = home_ground_details_data[i].id;
            let h_g_d_home_ground_name = home_ground_details_data[i].home_ground_name;
            let h_g_d_home_ground_postcode = home_ground_details_data[i].home_gruond_postcode;
            
            create_home_ground_table(i, home_ground_details_data);
        }
    }

    function put_save_home_ground_details(id_number, user_input_home_ground_name, user_input_home_ground_postcode) {
        
        // get home ground details data so that it can be updated
        let home_ground_details_data = home_ground_details.data;

        // loop through home ground details data to find record matcheing the one with user alterations
        for (let i = 0; i < home_ground_details_data.length; i++) {
            if (i == id_number -1) {
                home_ground_details_data[i].home_ground_name = user_input_home_ground_name;
                home_ground_details_data[i].home_ground_postcode = user_input_home_ground_postcode;
            }

        // return input elements to a readonly state
        document.getElementById("home_ground_name" + id_number).setAttribute("readonly", true);
        document.getElementById("home_ground_postcode" + id_number).setAttribute("readonly", true);

        }
    }

    // functions to interact with controller
        
    // ------login funcion-----

    this.login_to_app = function () {
        
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        log_user_in(username, password);
    
    };

    // -----tournament details functions-----

    this.populate_tournament_details = function() {
        
        get_tournament_details();
    
    };    

    this.save_tournament_details = function() {

        // get user input data from DOM
        let tournament_name = document.getElementById("tournament_name").value;
        let tournament_date = document.getElementById("tournament_date").value;
        let location_name = document.getElementById("location_name").value;
        let location_postcode = document.getElementById("location_postcode").value;

        // call function to save user input data
        put_save_tournament_details(tournament_name, tournament_date, location_name, location_postcode);
    
    };

    // -----home ground details functions-----

    this.populate_home_ground_details = function() {
        
        get_home_ground_details();

    }

    this.save_home_ground_details = function(clicked_id) {

        // get last character of button id to identify DOM elements related to it
        let id_number = clicked_id.substr(clicked_id.length - 1);
        
        // get user input data from DOM
        let user_input_home_ground_name = document.getElementById("home_ground_name" + id_number).value;
        let user_input_home_ground_postcode = document.getElementById("home_ground_postcode" + id_number).value;

        // call function to save user input data
        put_save_home_ground_details(id_number, user_input_home_ground_name, user_input_home_ground_postcode);
   
    }
}