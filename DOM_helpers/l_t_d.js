// global variable for stroing team goals and points
var team_goals_and_points_array = [];

// global variable for storing league-table ordered team goals and points
var ordered_team_goals_and_points_array = [];

function dom_helper_create_league_table(fixtures_results_details_data) {

    // call helper function to calculate totals of team goals and points
    create_league_table_array(fixtures_results_details_data);

    // call helper function to order created team_goals_and_points_array
    order_team_goals_and_points_array();

    // call helper function to display league table from organised data
    display_league_table();
}

function create_league_table_array(fixtures_results_details_data) {
    
    // get all teams and create an object for them in team_goals_and_points_array
    // by going through all fixtures from first round 
    for(let i = 0; i < fixtures_results_details_data.length; i++) {
        
        if(fixtures_results_details_data[i].round == 1) {
            
            // check for bye team and do not include
            if (fixtures_results_details_data[i].team_1 != "bye team") {
                team_goals_and_points_array.push({
                    "team": fixtures_results_details_data[i].team_1,
                    "goals_scored": 0,
                    "goals_conceded": 0,
                    get goals_difference() {return this.goals_scored - this.goals_conceded},
                    "points": 0
                });
            }
            if (fixtures_results_details_data[i].team_2 != "bye team") {
                
                team_goals_and_points_array.push({
                    "team": fixtures_results_details_data[i].team_2,
                    "goals_scored": 0,
                    "goals_conceded": 0,
                    get goals_difference() {return this.goals_scored - this.goals_conceded},
                    "points": 0
                });
            }
        }
    }

    // add goals and points for each fixture to team_goals_and_points_array
    for(let i = 0; i < fixtures_results_details_data.length; i++) {

        // only include fixtures which do not involve a bye team
        if(fixtures_results_details_data[i].team_1 != "bye team" &&
            fixtures_results_details_data[i].team_2 != "bye team"
        ) 
        {

            // get index of teams in team_goals_and_points_array
            let index_team_1;
            let index_team_2;
            for(let j = 0; j < team_goals_and_points_array.length; j++) {
                if(team_goals_and_points_array[j].team == 
                    fixtures_results_details_data[i].team_1) {
                        index_team_1 = j;
                }
                if(team_goals_and_points_array[j].team == 
                    fixtures_results_details_data[i].team_2) {
                        index_team_2 = j;
                }
            }

            // calculate points for each team from result
            let points_team_1;
            let points_team_2;
            if (fixtures_results_details_data[i].team_1_goals >
                fixtures_results_details_data[i].team_2_goals) {
                    // team one won so gets three points and team two gets no points
                    points_team_1 = 3;
                    points_team_2 = 0;
            } else if (fixtures_results_details_data[i].team_2_goals >
                fixtures_results_details_data[i].team_1_goals) {
                    // team two won so gets three points and team one gets no points
                    points_team_1 = 0;
                    points_team_2 = 3;                    
            } else {
                    // teams drew so both get one point
                    points_team_1 = 1;
                    points_team_2 = 1;
            }

            // add points to team_goals_and_points_array
            team_goals_and_points_array[index_team_1].points += points_team_1;
            team_goals_and_points_array[index_team_2].points += points_team_2;

            // add goals scored and conceded to team_goals_and_points_array
            // team 1
            team_goals_and_points_array[index_team_1].goals_scored +=
                fixtures_results_details_data[i].team_1_goals;
            team_goals_and_points_array[index_team_1].goals_conceded +=
                fixtures_results_details_data[i].team_2_goals;
            // team 2
            team_goals_and_points_array[index_team_2].goals_scored +=
                fixtures_results_details_data[i].team_2_goals;
            team_goals_and_points_array[index_team_2].goals_conceded +=
                fixtures_results_details_data[i].team_1_goals;
        }
    }
}

function order_team_goals_and_points_array() {

    ordered_team_goals_and_points_array = team_goals_and_points_array
        .sort(
            function(a, b) {          
               if (a.points === b.points) {
                  // goals difference ranks teams if points are equal
                  return b.goals_difference - a.goals_difference;
               }
               return b.points > a.points ? 1 : -1;
            }
        )
}

function display_league_table() {

    // create table for league display and add to DOM
    const league_table = document.createElement("table");
    document.getElementById("page_content").appendChild(league_table);
    league_table.setAttribute("id", "league_table");

    // add header row for column names
    const header_row = league_table.insertRow(-1);

    // add cell for team header
    const team_header_cell = header_row.insertCell(-1);
    team_header_cell.innerHTML = "<input type='text' id='team_header_cell'" +
    "class='team_display' readonly />";
    document.getElementById("team_header_cell")
        .setAttribute("value", "team");

    // add cell for goals scored header
    const g_s_header_cell = header_row.insertCell(-1);
    g_s_header_cell.innerHTML = "<input type='text' id='g_s_header_cell'" +
        "class='goals_totals_display' readonly />";
        document.getElementById("g_s_header_cell")
        .setAttribute("value", "GS");

    // add cell for goals conceded header
    const g_c_header_cell = header_row.insertCell(-1);
    g_c_header_cell.innerHTML = "<input type='text' id='g_c_header_cell'" +
        "class='goals_totals_display' readonly />";
        document.getElementById("g_c_header_cell")
        .setAttribute("value", "GC");

    // add cell for points header
    const points_header_cell = header_row.insertCell(-1);
    points_header_cell.innerHTML = "<input type='text' id='g_d_header_cell'" +
        "class='goals_totals_display' readonly />";
        document.getElementById("g_d_header_cell")
        .setAttribute("value", "GD");

    // add cell for goals difference header
    const g_d_header_cell = header_row.insertCell(-1);
    g_d_header_cell.innerHTML = "<input type='text' id='points_header_cell'" +
        "class='goals_totals_display' readonly />";
        document.getElementById("points_header_cell")
        .setAttribute("value", "P");

        // loop through ordered_team_goals_and_points_array creating a new row for
        // each team position ranked on points and goal difference
        for (let i = 0; i < ordered_team_goals_and_points_array.length; i++ ) {
            
            // create row for team position
            const position_row = league_table.insertRow(-1);

            // add cell for team name
            const team_name_cell = position_row.insertCell(-1);
            team_name_cell.innerHTML = "<input type='text' id='team_name_cell'" +
            "class='team_display' readonly />";
            document.getElementById("team_name_cell").setAttribute("id", `team_name_cell${i}`);
            document.getElementById(`team_name_cell${i}`)
                .setAttribute("value", ordered_team_goals_and_points_array[i].team);            

            // add cell for team goals scored
            const t_g_s_cell = position_row.insertCell(-1);
            t_g_s_cell.innerHTML = "<input type='text' id='t_g_s_cell'" +
                "class='goals_totals_display' readonly />";
            document.getElementById("t_g_s_cell").setAttribute("id", `t_g_s_cell${i}`);
            document.getElementById(`t_g_s_cell${i}`)
                .setAttribute("value", ordered_team_goals_and_points_array[i].goals_scored);

            // add cell for team goals conceded
            const t_g_c_cell = position_row.insertCell(-1);
            t_g_c_cell.innerHTML = "<input type='text' id='t_g_c_cell'" +
                "class='goals_totals_display' readonly />";
            document.getElementById("t_g_c_cell").setAttribute("id", `t_g_c_cell${i}`);
            document.getElementById(`t_g_c_cell${i}`)
                .setAttribute("value", ordered_team_goals_and_points_array[i].goals_conceded);

            // add cell for team goals difference
            const t_g_d_cell = position_row.insertCell(-1);
            t_g_d_cell.innerHTML = "<input type='text' id='t_g_d_cell'" +
                "class='goals_totals_display' readonly />";
            document.getElementById("t_g_d_cell").setAttribute("id", `t_g_d_cell${i}`);
            document.getElementById(`t_g_d_cell${i}`)
                .setAttribute("value", ordered_team_goals_and_points_array[i].goals_difference);

            // add cell for team points
            const t_p_cell = position_row.insertCell(-1);
            t_p_cell.innerHTML = "<input type='text' id='t_p_cell'" +
                "class='goals_totals_display' readonly />";
            document.getElementById("t_p_cell").setAttribute("id", `t_p_cell${i}`);
            document.getElementById(`t_p_cell${i}`)
                .setAttribute("value", ordered_team_goals_and_points_array[i].points);

        }

}

