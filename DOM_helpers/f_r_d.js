function create_fixtures_results_table(fixtures_results_details_data) {

    // check whether there are saved fixture details and set flag variable
    let fixtures_results_data_exists = true;
    if (fixtures_results_details_data.length == 0) {
        fixtures_results_data_exists = false;
    }

    // if fixtures / results data exists then display it 
    if (fixtures_results_data_exists) {

        // create header for table
        const table_header = document.createElement("h3");
        document.getElementById("page_content").appendChild(table_header);
        table_header.innerHTML = "<u>Fixtures / Results Table</u>";

        // create table element and insert into page_content div
        const f_r_table = document.createElement("table");
        document.getElementById("page_content").appendChild(f_r_table);
        f_r_table.setAttribute("id", "f_r_table");

        // loop through fixtures / results data creating a new row for
        // each fixture / result
        for (let i = 0; i < fixtures_results_details_data.length; i++ ) {
            
            // create row for fixture / result
            const new_row = f_r_table.insertRow(-1);

            // add round information
            const round_cell = new_row.insertCell(-1);
            round_cell.innerHTML = "<input type='text' id='round_cell'" +
            "class='round_display' readonly />";
            document.getElementById("round_cell").setAttribute("id", `round_cell${i}`);
            document.getElementById(`round_cell${i}`)
                .setAttribute("value", `Round ${fixtures_results_details_data[i].round}`);
                
            // add team one information
            const team_1_cell = new_row.insertCell(-1);
            team_1_cell.innerHTML = "<input type='text' id='team_1_cell'" +
            "class='team_display' readonly />";
            document.getElementById("team_1_cell").setAttribute("id", `team_1_cell${i}`);
            document.getElementById(`team_1_cell${i}`)
                .setAttribute("value", fixtures_results_details_data[i].team_1);
            
            // add team one goals information
            const team_1_goals_cell = new_row.insertCell(-1);
            team_1_goals_cell.innerHTML = "<input type='text' id='team_1_goals_cell'" +
                "class='goals_display' readonly />";
            document.getElementById("team_1_goals_cell")
                .setAttribute("id", `team_1_goals_cell${i}`);
            // ensure undefined goals data is displayed as a blank input cell
            if (fixtures_results_details_data[i].team_1_goals == undefined) {
                document.getElementById(`team_1_goals_cell${i}`)
                    .setAttribute("value", "");
            } else{
            document.getElementById(`team_1_goals_cell${i}`)
                .setAttribute("value", fixtures_results_details_data[i].team_1_goals);
            }
            
            // add team two goals information
            const team_2_goals_cell = new_row.insertCell(-1);
            team_2_goals_cell.innerHTML = "<input type='text' id='team_2_goals_cell'" +
                "class='goals_display' readonly />";
            document.getElementById("team_2_goals_cell")
                .setAttribute("id", `team_2_goals_cell${i}`);
            // ensure undefined goals data is displayed as a blank input cell
            if (fixtures_results_details_data[i].team_2_goals == undefined) {
                document.getElementById(`team_2_goals_cell${i}`)
                    .setAttribute("value", "");
            } else{
            document.getElementById(`team_2_goals_cell${i}`)
                .setAttribute("value", fixtures_results_details_data[i].team_2_goals);
            }

            // add team two information
            const team_2_cell = new_row.insertCell(-1);
            team_2_cell.innerHTML = "<input type='text' id='team_2_cell'" +
            "class='team_display' readonly />";
            document.getElementById("team_2_cell").setAttribute("id", `team_2_cell${i}`);
            document.getElementById(`team_2_cell${i}`)
                .setAttribute("value", fixtures_results_details_data[i].team_2);

        }

        // create table element to centrally display edit and save buttons
        const e_d_table = document.createElement("table");
        document.getElementById("page_content").appendChild(e_d_table);
        e_d_table.setAttribute("id", "e_d_table");

        // add row for edit button
        const edit_button_row = e_d_table.insertRow(-1);
        const edit_button_cell = edit_button_row.insertCell(-1);
        edit_button_cell.innerHTML = "<button class='edit_button' id='edit_button_cell'" +
            "onclick='edit_scores()'>edit scores</button>";
                
        // add row for save button
        const save_row = e_d_table.insertRow(-1);
        const save_cell = save_row.insertCell(-1);
        save_cell.innerHTML = "<button class='save_button' id='save_cell'" +
            "onclick='controller.save_scores()'>save scores</button>";
        
    }

}

function shuffleTeams(teams) {
    for (var i = teams.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = teams[i];
        teams[i] = teams[j];
        teams[j] = temp;
    }
}

function dom_helper_create_fixtures(
    team_details_data)
{

    // variable to store teams to create fixtures for
    let teams_arr = [];

    // variable to keep track of fixtures rounds
    let round_count = 1;

    // loop through teams data to get all teams
    for(index in team_details_data){
        teams_arr.push(team_details_data[index].team_name);
    }

    // call helper function to randomly shuffle team order to create random fixtures list
    shuffleTeams(teams_arr);

    // for odd number of teams add a bye team to complete fixtures for each round
    if (teams_arr.length % 2 == 1) {
        teams.push("bye team");
    }

    // Create fixtures with one fewer rounds than number of teams
    for (let i = 0; i < teams_arr.length - 1; i++) {
        
        // pair first team with last team, second with penultimate, etc...
        for (let j = 0; j < teams_arr.length / 2; j++) {
            fixtures_results_details.data.push(
                {
                    "round": round_count,
                    "team_1": teams_arr[j],
                    "team_1_goals": "",
                    "team_2_gaols": "",
                    "team_2": teams_arr[teams_arr.length - 1 - j]
                }
            );
        }
        
        // increase round count at conclusion of fixture round
        if(i != teams_arr.length - 2){
            round_count++;
        }
        
        // Move last array team to second array position to create new fixtures  
        let lastTeam = teams_arr.pop();
        teams_arr.splice(1, 0, lastTeam);
    }
}

function clear_fxitures_results_page() {
    
    // create variables to store DOM elements and reduce while loop processing
    let page_content_node = document.getElementById("page_content");
    
    // loop removing elements from page content until all removed
    while(page_content_node.firstChild) {
        page_content_node.removeChild(page_content_node.lastChild);
    }
}


function edit_scores() {

    // loop through fixtures / results removing readonly attribute from each goals
    // input to allow editing
    for (let i = 0; i < f_r_table.rows.length; i++ ) {
        document.getElementById(`team_1_goals_cell${i}`).removeAttribute("readonly");
        document.getElementById(`team_2_goals_cell${i}`).removeAttribute("readonly");
    }

}