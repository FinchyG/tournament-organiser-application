function clear_home_ground_details_page() {
    
    // create variable to store DOM element and reduce while loop processing
    let page_content_node = document.getElementById("page_content");

    // loop removing elements from page content until all removed
    while(page_content_node.firstChild) {
        page_content_node.removeChild(page_content_node.lastChild);
    }

}

function create_home_ground_table(i, home_ground_details_data) {
    
    // create variables to ease data insertion in following table creation code
    let h_g_d_id = home_ground_details_data[i].id;
    let h_g_d_name = home_ground_details_data[i].home_ground_name;
    let h_g_d_postcode = home_ground_details_data[i].home_ground_postcode;
    
    // create table element and insert into page_content div
    const h_g_d_table = document.createElement("table");
    document.getElementById("page_content").appendChild(h_g_d_table);
    h_g_d_table.setAttribute("id", "table" + h_g_d_id);

    // add row for a table header to separate tables
    const header_row = h_g_d_table.insertRow(-1);
    const header_cell = header_row.insertCell(-1);
    const cell_header = "<p><u>home ground " + (i + 1) + "</u></p>";
    header_cell.innerHTML = cell_header;

    // add row for home ground name display / input
    const h_g_name_row = h_g_d_table.insertRow(-1);
    const h_g_name_cell = h_g_name_row.insertCell(-1);
    h_g_name_cell.innerHTML = "<input type='text' id='h_g_name_cell' readonly />";
    document.getElementById("h_g_name_cell")
        .setAttribute("id", `home_ground_name${h_g_d_id}`);
    document.getElementById(`home_ground_name${h_g_d_id}`)
        .setAttribute("value", `${h_g_d_name}`);

    // add row for home ground postcode display / input
    const h_g_h_g_postcode_row = h_g_d_table.insertRow(-1);
    const h_g_h_g_postcode_cell = h_g_h_g_postcode_row.insertCell(-1);
    h_g_h_g_postcode_cell.innerHTML = "<input type='text' id='h_g_h_g_postcode_cell' readonly />";
    document.getElementById("h_g_h_g_postcode_cell")
        .setAttribute("id", `home_ground_postcode${h_g_d_id}`);
    document.getElementById(`home_ground_postcode${h_g_d_id}`)
        .setAttribute("value", `${h_g_d_postcode}`);
    
    // add row for edit button
    const edit_button_row = h_g_d_table.insertRow(-1);
    const edit_button_cell = edit_button_row.insertCell(-1);
    edit_button_cell.innerHTML = "<button class='edit_button' id='edit_button_cell'" +
        "onclick='edit_home_ground_details(this.id)'>edit</button>";
    document.getElementById("edit_button_cell")
        .setAttribute("id", `edit_button${h_g_d_id}`);

    // add row for save button
    const save_button_row = h_g_d_table.insertRow(-1);
    const save_button_cell = save_button_row.insertCell(-1);
    save_button_cell.innerHTML = "<button class='save_button' id='save_button_cell'" +
        "onclick='controller.save_home_ground_details(this.id)''>save</button>";
    document.getElementById("save_button_cell")
        .setAttribute("id", `save_button${h_g_d_id}`);

    // add row for delete button
    const delete_button_row = h_g_d_table.insertRow(-1);
    const delete_button_cell = delete_button_row.insertCell(-1);
    delete_button_cell.innerHTML = "<button class='delete_button' id='delete_button_cell'" +
        "onclick='controller.delete_home_ground_details(this.id)''>delete</button>";
    document.getElementById("delete_button_cell")
        .setAttribute("id", `delete_button${h_g_d_id}`);    
}

function create_home_ground_data_entry_table() {

    // get id of last displayed home gournd (which must be current highest id)
    // and increase it by 1 to create a new id
    let last_data_element_id =
        document.getElementById("page_content").lastChild.id;
    let last_data_element_numeric_id =
        last_data_element_id.substr(last_data_element_id.length - 1);
    let new_data_element_id =
        parseInt(last_data_element_numeric_id) + 1;

    // get number of currently displayed home grounds to correctly number
    // the new one's header
    let num_displayed_elements =
        document.getElementById("page_content").childElementCount;

    // create table element for insertion of new data
    const h_g_d_table = document.createElement("table");
    document.getElementById("page_content").appendChild(h_g_d_table);
    h_g_d_table.setAttribute("id", "table" + new_data_element_id);

    // add row for a table header to separate tables
    const header_row = h_g_d_table.insertRow(-1);
    const header_cell = header_row.insertCell(-1);
    const cell_header =
        "<p><u>home ground " + (num_displayed_elements + 1) + "</u></p>";
    header_cell.innerHTML = cell_header;

    // add row for home ground name display / input
    const h_g_name_row = h_g_d_table.insertRow(-1);
    const h_g_name_cell = h_g_name_row.insertCell(-1);
    h_g_name_cell.innerHTML = "<input type='text' id='h_g_name_cell' />";
    document.getElementById("h_g_name_cell")
        .setAttribute("id", `home_ground_name${new_data_element_id}`);
    document.getElementById(`home_ground_name${new_data_element_id}`)
        .setAttribute("value", "enter home ground name");

    // add row for home ground postcode display / input
    const h_g_h_g_postcode_row = h_g_d_table.insertRow(-1);
    const h_g_h_g_postcode_cell = h_g_h_g_postcode_row.insertCell(-1);
    h_g_h_g_postcode_cell.innerHTML = "<input type='text' id='h_g_h_g_postcode_cell' />";
    document.getElementById("h_g_h_g_postcode_cell")
        .setAttribute("id", `home_ground_postcode${new_data_element_id}`);
    document.getElementById(`home_ground_postcode${new_data_element_id}`)
        .setAttribute("value", "enter home ground postcode");
    
    // add row for edit button
    const edit_button_row = h_g_d_table.insertRow(-1);
    const edit_button_cell = edit_button_row.insertCell(-1);
    edit_button_cell.innerHTML =
        "<button class='edit_button' id='edit_button_cell'" +
        "onclick='edit_home_ground_details(this.id)'>edit</button>";
    document.getElementById("edit_button_cell")
        .setAttribute("id", `edit_button${new_data_element_id}`);

    // add row for save button
    const save_button_row = h_g_d_table.insertRow(-1);
    const save_button_cell = save_button_row.insertCell(-1);
    save_button_cell.innerHTML = "<button class='save_button' id='save_button_cell'" +
        "onclick='controller.save_home_ground_details(this.id)''>save</button>"
    document.getElementById("save_button_cell")
        .setAttribute("id", `save_button${new_data_element_id}`);

    // add row for delete button
    const delete_button_row = h_g_d_table.insertRow(-1);
    const delete_button_cell = delete_button_row.insertCell(-1);
    delete_button_cell.innerHTML = "<button class='delete_button' id='delete_button_cell'" +
        "onclick='controller.delete_home_ground_details(this.id)''>delete</button>"
    document.getElementById("delete_button_cell")
        .setAttribute("id", `delete_button${new_data_element_id}`);    

    // move user to bottom of page where new data entry table will appear
    window.scrollTo(0, document.body.scrollHeight);

}

function edit_home_ground_details(clicked_id) {

    // get last character of button id to identify DOM elements related to it
    let id_number = clicked_id.substr(clicked_id.length - 1);
    
    // remove readonly status from input elements of matching id number to
    // allow user alterations
    document.getElementById("home_ground_name" + 
        id_number).removeAttribute("readonly");
    document.getElementById("home_ground_postcode" +
         id_number).removeAttribute("readonly");
    
}