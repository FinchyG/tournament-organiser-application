// declare global variables for coach details and home ground details arrays
var coach_array = [];
var home_ground_array = [];

// two helper functions to create arrays for dynamically populating input select options
function create_coach_array(coach_details_data){
    
    for (index in coach_details_data) {
        coach_array[coach_details_data[index].id] =
            coach_details_data[index].coach_name;
    }
}

function create_home_ground_array(home_ground_details_data){
    
    for (index in home_ground_details_data) {
        home_ground_array[home_ground_details_data[index].id] =
            home_ground_details_data[index].home_ground_name;
    }
}

function create_team_table(
    i, 
    team_details_data,
    coach_details_data,
    home_ground_details_data
    ) {

    // create variables to ease data insertion in following table creation code
    let team_d_id = team_details_data[i].id;
    let team_d_team_name = team_details_data[i].team_name;
    let team_d_coach_id = team_details_data[i].coach_id;
    let team_d_home_ground_id = team_details_data[i].home_ground_id;
    let team_coach_name;
    let team_home_ground_name;

    // create array of coach details for populating of select options
    // create_coaches_array(coach_details_data);

    // get team coach name
    for (let i = 0; i < coach_details_data.length; i++ ) {
        if (team_d_coach_id == coach_details_data[i].id) {
            team_coach_name = coach_details_data[i].coach_name;
            break;
        }
    }

    // get team home ground name
    for (let i = 0; i < home_ground_details_data.length; i++ ) {
        if (team_d_home_ground_id == home_ground_details_data[i].id) {
            team_home_ground_name = home_ground_details_data[i].home_ground_name;
            break;
        }
    }

    // create table element and insert into page_content div
    const team_table = document.createElement("table");
    document.getElementById("page_content").appendChild(team_table);
    team_table.setAttribute("id", "table" + team_d_id);

    // add row for a table header to separate tables
    const header_row = team_table.insertRow(-1);
    const header_cell = header_row.insertCell(-1);
    const cell_header = "<p><u>team " + (i + 1) + "</u></p>";
    header_cell.innerHTML = cell_header;
    
    // add row for team name display / input
    const t_n_row = team_table.insertRow(-1);
    const t_n_cell = t_n_row.insertCell(-1);
    t_n_cell.innerHTML = "<input type='text' id='t_n_cell' readonly />";
    document.getElementById("t_n_cell").setAttribute("id", `team_name${team_d_id}`);
    document.getElementById(`team_name${team_d_id}`)
        .setAttribute("value", `${team_d_team_name}`);    

    // add rows for team coach display
    const c_n_header_row = team_table.insertRow(-1);
    const c_n_header_cell = c_n_header_row.insertCell(-1);
    c_n_header_cell.innerHTML = "<p>team coach</p>";    

    const c_n_row = team_table.insertRow(-1);    
    const c_n_cell = c_n_row.insertCell(-1);    
    c_n_cell.innerHTML = "<input type='text' id='c_n_cell' readonly />";
    document.getElementById("c_n_cell").setAttribute("id", `coach_name${team_d_id}`);
    document.getElementById(`coach_name${team_d_id}`)
        .setAttribute("value", team_coach_name);

    // add rows for team home ground display
    const t_g_n_header_row = team_table.insertRow(-1);
    const t_g_n_header_cell = t_g_n_header_row.insertCell(-1);
    t_g_n_header_cell.innerHTML = "<p>team home ground</p>";    

    const h_g_n_row = team_table.insertRow(-1);    
    const h_g_n_cell = h_g_n_row.insertCell(-1);    
    h_g_n_cell.innerHTML = "<input type='text' id='h_g_n_cell' readonly />";
    document.getElementById("h_g_n_cell")
        .setAttribute("id", `home_ground_name${team_d_id}`);
    document.getElementById(`home_ground_name${team_d_id}`)
        .setAttribute("value", team_home_ground_name);

    // add row for edit button
    const edit_row = team_table.insertRow(-1);
    const edit_cell = edit_row.insertCell(-1);
    edit_cell.innerHTML = "<button class='edit_button' id='edit_cell'" +
        "onclick='controller.edit_coach_details(this.id)'>edit</button>";
    document.getElementById("edit_cell").setAttribute("id", `edit_button${team_d_id}`);

    // add row for save button
    const save_row = team_table.insertRow(-1);
    const save_cell = save_row.insertCell(-1);
    save_cell.innerHTML = "<button class='save_button' id='save_cell'" +
        "onclick='controller.save_team_details(this.id)''>save</button>";
    document.getElementById("save_cell").setAttribute("id", `save_button${team_d_id}`);

    // add row for delete button
    const delete_row = team_table.insertRow(-1);
    const delete_cell = delete_row.insertCell(-1);
    delete_cell.innerHTML = "<button class='delete_button' id='delete_cell'" +
        "onclick='controller.delete_team_details(this.id)''>delete</button>";
    document.getElementById("delete_cell").setAttribute("id", `delete_button${team_d_id}`);

}

function edit_coach_details_display(
    id_number,
    coach_details_data,
    home_ground_details_data
    ) {

    // store table to be edited in variable for more concise later code
    let editing_table =  document.getElementById("table" + id_number);

    // remove readonly status from team name input element of matching id number to
    // allow user alterations
    document.getElementById("team_name" + 
        id_number).removeAttribute("readonly");
    
    // remove coach name and home ground name rows
    editing_table.deleteRow(3);
    editing_table.deleteRow(4);
    
    // insert select inputs for coach name and home ground name
    const new_select_row = editing_table.insertRow(3);
    const new_select_cell = new_select_row.insertCell(0); 
    new_select_cell.innerHTML = "<select id='new_select_cell'>" +
        "<option value='unselected'>unselected</option></select>";
    document.getElementById("new_select_cell")
        .setAttribute("id", `coach_name${id_number}`);
        
    const new_select_row1 = editing_table.insertRow(5);
    const new_select_cell1 = new_select_row1.insertCell(0); 
    new_select_cell1.innerHTML = "<select id='new_select_cell1'>" + 
    "<option value='unselected'>unselected</option></select>";
    document.getElementById("new_select_cell1")
        .setAttribute("id", `home_ground_name${id_number}`);

    // call helper functions to dynamically create arrays to populate select options
    create_coach_array(coach_details_data);
    create_home_ground_array(home_ground_details_data);

    // populate coach select options with saved coaches
    let coach_select = document.getElementById(`coach_name${id_number}`);
    for(index in coach_array) {
        coach_select.options[coach_select.options.length] = new Option(coach_array[index], index);
    }

    // populate coach select options with saved coaches
    let home_ground_select = document.getElementById(`home_ground_name${id_number}`);
    for(index in home_ground_array) {
        home_ground_select.options[home_ground_select.options.length] =
            new Option(home_ground_array[index], index);
    }

    // reset array variables to prevent duplicate data building up
    // on multiple edits
    coach_array = [];
    home_ground_array = [];
}

function create_team_data_entry_table(coach_details_data, home_ground_details_data) {

    // get id of last displayed home gournd (which must be current highest id) and
    // increase it by 1 to create a new id
    let last_data_element_id =
        document.getElementById("page_content").lastChild.id;
    let last_data_element_numeric_id =
        last_data_element_id.substr(last_data_element_id.length - 1);
    let new_data_element_id =
        parseInt(last_data_element_numeric_id) + 1;
    
    // get number of currently displayed teams to correctly number
    // the new one's header
    let num_displayed_elements =
        document.getElementById("page_content").childElementCount; 
        
    // create table element and insert into page_content div
    const team_table = document.createElement("table");
    document.getElementById("page_content").appendChild(team_table);
    team_table.setAttribute("id", "table" + new_data_element_id);
    
    // add row for a table header to separate tables
    const header_row = team_table.insertRow(0);
    const header_cell = header_row.insertCell(0);
    const cell_header = "<p><u>team " + (num_displayed_elements + 1) + "</u></p>";
    header_cell.innerHTML = cell_header;

    // add row for team name display / input
    const t_n_row = team_table.insertRow(1);
    const t_n_cell = t_n_row.insertCell(0);
    t_n_cell.innerHTML = "<input type='text' id='t_n_cell' />";
    document.getElementById("t_n_cell")
        .setAttribute("id", `team_name${new_data_element_id}`);
    document.getElementById(`team_name${new_data_element_id}`)
        .setAttribute("value", "enter team name");

    // insert select inputs for coach name and home ground name

    const c_n_header_row = team_table.insertRow(2);
    const c_n_header_cell = c_n_header_row.insertCell(0);
    c_n_header_cell.innerHTML = "<p>team coach</p>"; 

    const new_select_row = team_table.insertRow(3);
    const new_select_cell = new_select_row.insertCell(0); 
    new_select_cell.innerHTML = "<select id='new_select_cell'>" +
        "<option value='unselected'>unselected</option></select>";
    document.getElementById("new_select_cell")
        .setAttribute("id", `coach_name${new_data_element_id}`);

    const t_g_n_header_row = team_table.insertRow(4);
    const t_g_n_header_cell = t_g_n_header_row.insertCell(0);
    t_g_n_header_cell.innerHTML = "<p>team home ground</p>"; 
        
    const new_select_row1 = team_table.insertRow(5);
    const new_select_cell1 = new_select_row1.insertCell(0); 
    new_select_cell1.innerHTML = "<select id='new_select_cell1'>" + 
    "<option value='unselected'>unselected</option></select>";
    document.getElementById("new_select_cell1")
        .setAttribute("id", `home_ground_name${new_data_element_id}`);

    // add row for edit button
    const edit_row = team_table.insertRow(6);
    const edit_cell = edit_row.insertCell(0);
    edit_cell.innerHTML = "<button class='edit_button' id='edit_cell'" +
        "onclick='controller.edit_coach_details(this.id)'>edit</button>";
    document.getElementById("edit_cell")
        .setAttribute("id", `edit_button${new_data_element_id}`);

    // add row for save button
    const save_row = team_table.insertRow(7);
    const save_cell = save_row.insertCell(0);
    save_cell.innerHTML = "<button class='save_button' id='save_cell'" +
        "onclick='controller.save_team_details(this.id)''>save</button>";
    document.getElementById("save_cell")
        .setAttribute("id", `save_button${new_data_element_id}`);

    // add row for delete button
    const delete_row = team_table.insertRow(8);
    const delete_cell = delete_row.insertCell(0);
    delete_cell.innerHTML = "<button class='delete_button' id='delete_cell'" +
        "onclick='controller.delete_team_details(this.id)''>delete</button>";
    document.getElementById("delete_cell")
        .setAttribute("id", `delete_button${new_data_element_id}`);

    // call helper functions to dynamically create arrays to populate select options
    create_coach_array(coach_details_data);
    create_home_ground_array(home_ground_details_data);



    // populate coach select options with saved coaches
    let coach_select = document.getElementById(`coach_name${new_data_element_id}`);
    for(index in coach_array) {
        coach_select.options[coach_select.options.length] = new Option(coach_array[index], index);
    }

    // populate coach select options with saved coaches
    let home_ground_select = document.getElementById(`home_ground_name${new_data_element_id}`);
    for(index in home_ground_array) {
        home_ground_select.options[home_ground_select.options.length] =
            new Option(home_ground_array[index], index);
    }

    // reset array variables to prevent duplicate data building up
    // on multiple team adds
    coach_array = [];
    home_ground_array = [];

    // move user to bottom of page where new data entry table will appear
    window.scrollTo(0, document.body.scrollHeight);
}

function clear_team_details_page() {

    // create variable to store DOM element and reduce while loop processing
    let page_content_node = document.getElementById("page_content");

    // loop removing elements from page content until all removed
    while(page_content_node.firstChild) {
        page_content_node.removeChild(page_content_node.lastChild);
    }

}