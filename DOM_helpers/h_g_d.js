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
    const new_table = document.createElement("table");
    document.getElementById("page_content").appendChild(new_table);
    new_table.setAttribute("id", "table" + h_g_d_id);

    // add row for a table header to separate tables
    const new_row0 = new_table.insertRow(0);
    const new_cell0 = new_row0.insertCell(0);
    const cell_header = "<p>home ground " + (i + 1) + "</p>";
    new_cell0.innerHTML = cell_header;

    // add row for home ground name display / input
    const new_row1 = new_table.insertRow(1);
    const new_cell1 = new_row1.insertCell(0);
    new_cell1.innerHTML = "<input type='text' id='new_cell1' readonly />";
    document.getElementById("new_cell1")
        .setAttribute("id", `home_ground_name${h_g_d_id}`);
    document.getElementById(`home_ground_name${h_g_d_id}`)
        .setAttribute("value", `${h_g_d_name}`);

    // add row for home ground postcode display / input
    const new_row2 = new_table.insertRow(2);
    const new_cell2 = new_row2.insertCell(0);
    new_cell2.innerHTML = "<input type='text' id='new_cell2' readonly />";
    document.getElementById("new_cell2")
        .setAttribute("id", `home_ground_postcode${h_g_d_id}`);
    document.getElementById(`home_ground_postcode${h_g_d_id}`)
        .setAttribute("value", `${h_g_d_postcode}`);
    
    // add row for edit button
    const new_row3 = new_table.insertRow(3);
    const new_cell3 = new_row3.insertCell(0);
    new_cell3.innerHTML = "<button class='edit_button' id='new_cell3'" +
        "onclick='edit_home_ground_details(this.id)'>edit</button>";
    document.getElementById("new_cell3")
        .setAttribute("id", `edit_button${h_g_d_id}`);

    // add row for save button
    const new_row4 = new_table.insertRow(4);
    const new_cell4 = new_row4.insertCell(0);
    new_cell4.innerHTML = "<button class='save_button' id='new_cell4'" +
        "onclick='controller.save_home_ground_details(this.id)''>save</button>";
    document.getElementById("new_cell4")
        .setAttribute("id", `save_button${h_g_d_id}`);

    // add row for delete button
    const new_row5 = new_table.insertRow(5);
    const new_cell5 = new_row5.insertCell(0);
    new_cell5.innerHTML = "<button class='delete_button' id='new_cell5'" +
        "onclick='controller.delete_home_ground_details(this.id)''>delete</button>";
    document.getElementById("new_cell5")
        .setAttribute("id", `delete_button${h_g_d_id}`);    
}

function create_home_ground_data_entry_table() {

    // get id of last displayed home gournd (which must be current highest id) and increase it by 1 to create a new id
    let last_data_element_id = document.getElementById("page_content").lastChild.id;
    let last_data_element_numeric_id = last_data_element_id.substr(last_data_element_id.length - 1);
    let new_data_element_id = parseInt(last_data_element_numeric_id) + 1;

    // get number of currently displayed home grounds to correctly number the new one's header
    let num_displayed_elements = document.getElementById("page_content").childElementCount;

    // create table element for insertion of new data
    const new_table = document.createElement("table");
    document.getElementById("page_content").appendChild(new_table);
    new_table.setAttribute("id", "table" + new_data_element_id);

    // add row for a table header to separate tables
    const new_row0 = new_table.insertRow(0);
    const new_cell0 = new_row0.insertCell(0);
    const cell_header = "<p>home ground " + (num_displayed_elements + 1) + "</p>";
    new_cell0.innerHTML = cell_header;

    // add row for home ground name display / input
    const new_row1 = new_table.insertRow(1);
    const new_cell1 = new_row1.insertCell(0);
    new_cell1.innerHTML = "<input type='text' id='new_cell1' />";
    document.getElementById("new_cell1").setAttribute("id", `home_ground_name${new_data_element_id}`);
    document.getElementById(`home_ground_name${new_data_element_id}`).setAttribute("value", "enter home ground name");

    // add row for home ground postcode display / input
    const new_row2 = new_table.insertRow(2);
    const new_cell2 = new_row2.insertCell(0);
    new_cell2.innerHTML = "<input type='text' id='new_cell2' />";
    document.getElementById("new_cell2").setAttribute("id", `home_ground_postcode${new_data_element_id}`);
    document.getElementById(`home_ground_postcode${new_data_element_id}`).setAttribute("value", "enter home ground postcode");
    
    // add row for edit button
    const new_row3 = new_table.insertRow(3);
    const new_cell3 = new_row3.insertCell(0);
    new_cell3.innerHTML = "<button class='edit_button' id='new_cell3' onclick='edit_home_ground_details(this.id)'>edit</button>";
    document.getElementById("new_cell3").setAttribute("id", `edit_button${new_data_element_id}`);

    // add row for save button
    const new_row4 = new_table.insertRow(4);
    const new_cell4 = new_row4.insertCell(0);
    new_cell4.innerHTML = "<button class='save_button' id='new_cell4' onclick='controller.save_home_ground_details(this.id)''>save</button>"
    document.getElementById("new_cell4").setAttribute("id", `save_button${new_data_element_id}`);

    // add row for delete button
    const new_row5 = new_table.insertRow(5);
    const new_cell5 = new_row5.insertCell(0);
    new_cell5.innerHTML = "<button class='delete_button' id='new_cell5' onclick='controller.delete_home_ground_details(this.id)''>delete</button>"
    document.getElementById("new_cell5").setAttribute("id", `delete_button${new_data_element_id}`);    

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