// Execute in strict mode
"use strict";

// Declare a Controller object for use by the HTML view
var controller;

window.addEventListener("load", () => {
    console.log("page loaded");
    // Create the Tournament_Organiser object for use by the HTML View
    controller = new Tournament_Organiser();
});

function Tournament_Organiser() {
    
// functions to interact with Model data

    // -----login function-----

    function log_user_in(username, password) {

        // get valid login details data to check user input against
        let login_data = user_login_details.data;
        // set a flag for whether user has been logged in or informed
        // of incorrect password
        let login_action_taken = false;
        
        for (let key in login_data) {
            // check whether username and password are correct and
            // if so log user in and move them to the home page 
            if (login_data[key].username == username &&
                    login_data[key].password == password) {
                login_action_taken = true;
                window.location.href = "home.html";
              // check if username is correct (password must be
              // incorrect from prior check) and if so inform user
              // of incorrect password, clear password input, and exit loop
            } else if (login_data[key].username == username) {
                login_action_taken = true;
                document.getElementById("password").value = "";
                alert("password incorrect");
                break;
            }
        }
        // inform user username is incorrect because all valid username
        // and password combinations and usernames have been checked,
        // clear username and password inputs
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
       
        // no need to check whether tournament details exist because if user
        // has not entered any then defaults will be present
        document.getElementById("tournament_name").value = 
            tournament_details_data.tournament_name;
        document.getElementById("tournament_date").value = 
            tournament_details_data.tournament_date;
        document.getElementById("location_name").value =
            tournament_details_data.location_name;
        document.getElementById("location_postcode").value =
            tournament_details_data.location_postcode;
        
    }

    function put_save_tournament_details(
        tournament_name,
        tournament_date,
        location_name,
        location_postcode) {
        
        // get tournament details data which will be updated
        let tournament_details_data = tournament_details.data[0];

        // set tournament details data to user input values
        tournament_details.data[0].tournament_name =
            document.getElementById("tournament_name").value;
        tournament_details.data[0].tournament_date =
            document.getElementById("tournament_date").value;
        tournament_details.data[0].location_name =
            document.getElementById("location_name").value;
        tournament_details.data[0].location_postcode =
            document.getElementById("location_postcode").value;

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

        // no need to check for existance of data because there cannot be
        // fewer than one home ground (possibly shared by participating teams)
        // or dummy data provided on application initialisation

        // for loop to display each home ground in its own table
        for (let i = 0; i < home_ground_details_data.length; i++ ) {
            
            create_home_ground_table(i, home_ground_details_data);

        }
    }

    function put_save_home_ground_details(
        id_number,
        user_input_home_ground_name,
        user_input_home_ground_postcode
        )
        {
        
            // get home ground details data so that it can be updated
            let home_ground_details_data = home_ground_details.data;

            // set flag variable for whether data element exists and is being upadate
            let h_g_d_data_element_exists = false;

            // loop through home ground details data to find if record matcheing the
            // one with user alterations exists
            for (let i = 0; i < home_ground_details_data.length; i++) {
                if (i == id_number -1) {
                    h_g_d_data_element_exists = true;
                }
            }

            // if data element exists update data, else add new data
            if (h_g_d_data_element_exists == true) {
                // loop through home ground details data to find record matcheing the
                // one with user alterations and update it
                for (let i = 0; i < home_ground_details_data.length; i++) {
                    if (i == id_number -1) {
                        home_ground_details_data[i].home_ground_name = 
                            user_input_home_ground_name;
                        home_ground_details_data[i].home_ground_postcode = 
                            user_input_home_ground_postcode;
                        break;
                    }
                }            
            } else {
                // cerate new data object to add to data array
                home_ground_details_data.push({
                    "id": id_number, 
                    "home_ground_name": user_input_home_ground_name,
                    "home_ground_postcode":  user_input_home_ground_postcode
                }) 
            }

            // clear already displayed data so that only re-edited
            // data is displayed
            clear_home_ground_details_page();

            // display data with edited data
            get_home_ground_details();        
        }
    
    function delete_model_home_ground_details(id_number) {
                
        // get home ground details data so that specific item can be deleted
        let home_ground_details_data = home_ground_details.data;
        
        // loop through home ground details data to find record matcheing
        // the one selected by user to delete
        for (let i = 0; i < home_ground_details_data.length; i++) {
            if (home_ground_details_data[i].id == id_number) {
                home_ground_details_data.splice(i, 1);
                break;
            }
        }

        // clear any already displayed data so that only current data is
        // displayed on completion of delete operation
        clear_home_ground_details_page();        
        
        // display data without deleted item
        get_home_ground_details();
        
    }

    // -----coach details functions-----

    function get_coach_details() {

        // get coach details data so that it can be displayed
        let coach_details_data = coach_details.data;


        // for loop to display each home ground in its own table
        for (let i = 0; i < coach_details_data.length; i++ ) {

            create_coach_table(i, coach_details_data);

        }

    }

    function put_save_coach_details(id_number,
        user_input_coach_name,
        user_input_phone_number,
        user_input_email_address,
        user_input_coach_description,
        user_input_coach_photo) {
        
        // get home ground details data so that it can be updated
        let coach_details_data = coach_details.data;

        // set flag variable for whether data element exists and is being upadate
        let c_d_data_element_exists = false;

        // loop through coach details data to find if record matcheing the
        // one with user alterations exists
        for (let i = 0; i < coach_details_data.length; i++) {
            if (i == id_number -1) {
                c_d_data_element_exists = true;
            }
        }

        // if data element exists update data, else add new data
        if (c_d_data_element_exists == true) {
            for (let i = 0; i < coach_details_data.length; i++) {
                if (i == id_number -1) {
                    coach_details_data[i].coach_name = 
                        user_input_coach_name;
                    coach_details_data[i].phone_number =
                        user_input_phone_number;
                    coach_details_data[i].email_address =
                        user_input_email_address;
                    coach_details_data[i].coach_description =
                        user_input_coach_description;

                    // check if photo uploaded and if so save (so
                    // do not lose already saved image if none selected
                    // by overwriting it with undefined)
                    if (user_input_coach_photo != undefined) {
                        coach_details_data[i].coach_photo =
                            user_input_coach_photo;
                    }
                }
            }
        } else {
            coach_details_data.push({
                "id": id_number, 
                "coach_name": user_input_coach_name,
                "phone_number":  user_input_phone_number,
				"email_address": user_input_email_address,
				"coach_description": user_input_coach_description,
				"coach_photo": user_input_coach_photo            
            })
        }

        // clear already displayed data so that only re-edited data is displayed
        clear_coach_details_page();

        // display data with edited data
        get_coach_details();

    }

    function delete_model_coach_details(id_number) {
         
        
        // get home ground details data so that specific item can be deleted
        let coach_details_data = coach_details.data;
        
        // loop through coach details data to find record matcheing the
        // one selected by user to delete
        for (let i = 0; i < coach_details_data.length; i++) {
            if (coach_details_data[i].id == id_number) {
                coach_details_data.splice(i, 1);
                break;
            }
        }

        // clear any already displayed data so that only current data is
        // displayed on completion of delete operation
        clear_coach_details_page();        
        
        // display data without deleted item
        get_coach_details();
        
    }

    // -----team details functions-----

    function get_team_details() {

        // get team, coach, and home groung details data so that it can be displayed
        let team_details_data = team_details.data;
        let coach_details_data = coach_details.data;
        let home_ground_details_data = home_ground_details.data;
        
        // for loop to display each home ground in its own table
        for (let i = 0; i < team_details_data.length; i++ ) {

            create_team_table(
                i,
                team_details_data,
                coach_details_data,
                home_ground_details_data);

        }     

    }

    function put_save_team_details(
        id_number,
        user_input_team_name,
        user_input_coach_name,
        user_input_home_ground_name
        )
    {

        // get team details data so that it can be updated
        let team_details_data = team_details.data;

        
        // set flag variable for whether data element exists and is being upadate
        let team_d_data_element_exists = false;
    
        // loop through team details data to find if record matcheing the
        // one with user alterations exists
        for (let i = 0; i < team_details_data.length; i++) {
            if (i == id_number -1) {
                team_d_data_element_exists = true;
            }
        }
    
        // if data element exists update data, else add new data
        if (team_d_data_element_exists == true) {
            // loop through team details data to find record matcheing the
            // one with user alterations and update it
            for (let i = 0; i < team_details_data.length; i++) {
                if (i == id_number -1) {
                    team_details_data[i].team_name = 
                        user_input_team_name;
                    team_details_data[i].coach_id = 
                        user_input_coach_name;
                    team_details_data[i].home_ground_id = 
                        user_input_home_ground_name;
                    break;
                }
            }
        }  else {
            // cerate new data object to add to data array
            team_details_data.push({
                "id": id_number, 
                "team_name": user_input_team_name,
                "coach_id":  user_input_coach_name,
                "home_ground_id": user_input_home_ground_name
            })
        }
    
        // clear already displayed data so that only re-edited
        // data is displayed
        clear_team_details_page();

        // display data with edited data
        get_team_details();        
    }

    function delete_model_team_details(id_number) {
        
        // get team details data so that specific item can be deleted
        let team_details_data = team_details.data;
        
        // loop through team details data to find record matcheing the
        // one selected by user to delete
        for (let i = 0; i < team_details_data.length; i++) {
            if (team_details_data[i].id == id_number) {
                team_details_data.splice(i, 1);
                break;
            }
        }

        // clear any already displayed data so that only current data is
        // displayed on completion of delete operation
        clear_team_details_page();        
        
        // display data without deleted item
        get_team_details();
        
    }
    

    // functions to interact with View
        
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
        put_save_tournament_details(
            tournament_name,
            tournament_date,
            location_name,
            location_postcode);
    
    }

    // -----home ground details functions-----

    this.populate_home_ground_details = function() {
        
        get_home_ground_details();

    }

    this.save_home_ground_details = function(clicked_id) {

        // get last character of button id to identify DOM elements related to it
        let id_number = clicked_id.substr(clicked_id.length - 1);
        
        // get user input data from DOM
        let user_input_home_ground_name = 
            document.getElementById("home_ground_name" + id_number).value;
        let user_input_home_ground_postcode =
            document.getElementById("home_ground_postcode" + id_number).value;

        // call function to save user input data
        put_save_home_ground_details(
            id_number,
            user_input_home_ground_name,
            user_input_home_ground_postcode
        );
   
    }
    
    this.delete_home_ground_details = function(clicked_id) {

        // get last character of button id to identify DOM
        // elements related to it
        let id_number = clicked_id.substr(clicked_id.length - 1);

        // check that at least one home grounds is stored so that 
        // delete operation can proceed, must be at least one home
        // ground (even if shared by many teams)
        if (document.getElementById("page_content").childElementCount > 1) {
            
            // call function to delete selected home ground details from Model
            delete_model_home_ground_details(id_number);
        
        } else {
            alert("cannot delete - must be at least one home ground");
        }
    }

    this.add_home_ground_details = function() {

        // create new data entry table
        create_home_ground_data_entry_table();

    }

    // -----coach details functions-----

    this.populate_coach_details = function() {

        get_coach_details();

    }

    this.save_coach_details = function(clicked_id) {

        // get last character of button id to identify DOM elements related to it
        let id_number = clicked_id.substr(clicked_id.length - 1);
        
        // get user input data from DOM
        let user_input_coach_name =
            document.getElementById("coach_name" + id_number).value;
        let user_input_phone_number =
            document.getElementById("phone_number" + id_number).value;
        let user_input_email_address =
            document.getElementById("email_address" + id_number).value;
        let user_input_coach_description =
            document.getElementById("coach_description" + id_number).value;
        let user_input_coach_photo = uploaded_img;

        // call function to save user input data
        put_save_coach_details(id_number,
            user_input_coach_name,
            user_input_phone_number, 
            user_input_email_address,
            user_input_coach_description,
            user_input_coach_photo
        );

        // clear global file variable for next upload
        uploaded_img = undefined;
   
    }

    this.delete_coach_details = function(clicked_id) {

        // get last character of button id to identify DOM elements related to it
        let id_number = clicked_id.substr(clicked_id.length - 1);

        // check that at least one coach is stored so that delete operation
        // can proceed, must be at least one coach (even if shared by many teams)
        if (document.getElementById("page_content").childElementCount > 1) {

            // call function to delete selected home ground details from Model
            delete_model_coach_details(id_number);
        
        } else {
            alert("cannot delete - must be at least one coach");
        }
    }

    this.add_coach_details = function() {

        // create new data entry table
        create_coach_data_entry_table();

    }

    // -----team details functions-----

    this.populate_team_details = function() {
        
        get_team_details();

    }

    this.edit_coach_details = function(clicked_id) {

        // get last character of button id to identify DOM elements related to it
        let id_number = clicked_id.substr(clicked_id.length - 1);

        // get coach and home groung details data so that it can be edited
        let coach_details_data = coach_details.data;
        let home_ground_details_data = home_ground_details.data;

        edit_coach_details_display(
            id_number,
            coach_details_data,
            home_ground_details_data
        );

    }

    this.save_team_details = function(clicked_id) {

        // get last character of button id to identify DOM elements related to it
        let id_number = clicked_id.substr(clicked_id.length - 1);

        // get user input data from DOM
        let user_input_team_name = 
            document.getElementById("team_name" + id_number).value;
        let user_input_coach_name =
            document.getElementById("coach_name" + id_number).value;
        let user_input_home_ground_name =
            document.getElementById("home_ground_name" + id_number).value;

        // call function to save user input data
        put_save_team_details(
            id_number,
            user_input_team_name,
            user_input_coach_name, // is coach id
            user_input_home_ground_name // is home ground id
        );
   
    }

    this.delete_team_details = function(clicked_id) {

        // get last character of button id to identify DOM elements related to it
        let id_number = clicked_id.substr(clicked_id.length - 1);

        // check that at least three teams are stored so that delete operation
        // can proceed, must be at least three teams for a tournament
        if (document.getElementById("page_content").childElementCount > 3) {
        
            // call function to delete selected home ground details from Model
            delete_model_team_details(id_number);
        
        } else {
            alert("cannot delete - must be at least three teams");
        }
    }

    this.add_team_details = function() {

        // get coach and home groung details data so that they can be chosen from
        let coach_details_data = coach_details.data;
        let home_ground_details_data = home_ground_details.data;

        // check that fewer than eight teams are stored so that 
        // add operation can proceed, no more than eight teams are
        // allowed by the application
        if (document.getElementById("page_content").childElementCount < 8) {

            // create new data entry table
            create_team_data_entry_table(coach_details_data, home_ground_details_data);

        } else {
            alert("cannot add - cannot have more than eight teams");
        }
    }

}