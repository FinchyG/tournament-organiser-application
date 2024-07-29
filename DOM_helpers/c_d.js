// declare global variable for storage and access of uploaded coach photo
var uploaded_img;

function clear_coach_details_page() {
    
    // create variable to store DOM element and reduce while loop processing
    let page_content_node = document.getElementById("page_content");

    // loop removing elements from page content until all removed
    while(page_content_node.firstChild) {
        page_content_node.removeChild(page_content_node.lastChild);
    }

}

function create_coach_table(i, coach_details_data) {

    // create variables to ease data insertion in following table creation code
    let c_d_id = coach_details_data[i].id;
    let c_d_coach_name = coach_details_data[i].coach_name;
    let c_d_phone_number = coach_details_data[i].phone_number;
    let c_d_email_address = coach_details_data[i].email_address;
    let c_d_coach_photo = coach_details_data[i].coach_photo;
    let c_d_coach_description = coach_details_data[i].coach_description;
    
    // create table element and insert into page_content div
    const c_d_table = document.createElement("table");
    document.getElementById("page_content").appendChild(c_d_table);
    c_d_table.setAttribute("id", "table" + c_d_id);

    // add row for a table header to separate tables
    const header_row = c_d_table.insertRow(-1);
    const header_cell = header_row.insertCell(-1);
    const cell_header = "<p><u>coach " + (i + 1) + "</u></p>";
    header_cell.innerHTML = cell_header;
        
    // add row for coach name display / input
    const name_row = c_d_table.insertRow(-1);
    const name_cell = name_row.insertCell(-1);
    name_cell.innerHTML = "<input type='text' id='name_cell' readonly />";
    document.getElementById("name_cell").setAttribute("id", `coach_name${c_d_id}`);
    document.getElementById(`coach_name${c_d_id}`)
        .setAttribute("value", `${c_d_coach_name}`);
    
    // add row for coach phone number display / input
    const phone_row = c_d_table.insertRow(-1);
    const phone_cell = phone_row.insertCell(-1);
    phone_cell.innerHTML = "<input type='text' id='phone_cell' readonly />";
    document.getElementById("phone_cell").setAttribute("id", `phone_number${c_d_id}`);
    document.getElementById(`phone_number${c_d_id}`)
        .setAttribute("value", `${c_d_phone_number}`);
    
    // add row for coach email address display / input
    const email_row = c_d_table.insertRow(-1);
    const email_cell = email_row.insertCell(-1);
    email_cell.innerHTML = "<input type='text' id='email_cell' readonly />";
    document.getElementById("email_cell").setAttribute("id", `email_address${c_d_id}`);
    document.getElementById(`email_address${c_d_id}`)
        .setAttribute("value", `${c_d_email_address}`);

    // add cell for coach description display / input
    const description_row = c_d_table.insertRow(-1);
    const description_cell = description_row.insertCell(-1);
    description_cell.innerHTML = "<textarea id='description_cell' rows='4' cols='20' readonly></textarea>";
    document.getElementById("description_cell").setAttribute("id", `coach_description${c_d_id}`);
    document.getElementById(`coach_description${c_d_id}`).innerText = `${c_d_coach_description}`;    

    // add row for coach photo display / input
    const photo_row = c_d_table.insertRow(-1);
    const photo_cell = photo_row.insertCell(-1);
    photo_cell.innerHTML = "<img id='photo_cell' alt='coach photo' width='100rem' height='80rem' />";
    document.getElementById("photo_cell").setAttribute("id", `coach_photo${c_d_id}`);
    document.getElementById(`coach_photo${c_d_id}`).setAttribute("src", `${c_d_coach_photo}`);

    // add row for edit button
    const edit_row = c_d_table.insertRow(-1);
    const edit_cell = edit_row.insertCell(-1);
    edit_cell.innerHTML = "<button class='edit_button' id='edit_cell'" +
        "onclick='edit_coach_details(this.id)'>edit</button>";
    document.getElementById("edit_cell").setAttribute("id", `edit_button${c_d_id}`);

    // add row for save button
    const save_row = c_d_table.insertRow(-1);
    const save_cell = save_row.insertCell(-1);
    save_cell.innerHTML = "<button class='save_button' id='save_cell'" +
        "onclick='controller.save_coach_details(this.id)''>save</button>";
    document.getElementById("save_cell").setAttribute("id", `save_button${c_d_id}`);

    // add row for delete button
    const delete_row = c_d_table.insertRow(-1);
    const delete_cell = delete_row.insertCell(-1);
    delete_cell.innerHTML = "<button class='delete_button' id='delete_cell'" +
        "onclick='controller.delete_coach_details(this.id)''>delete</button>";
    document.getElementById("delete_cell").setAttribute("id", `delete_button${c_d_id}`);

}

function create_coach_data_entry_table() {

    // get id of last displayed home gournd (which must be current highest id) and
    // increase it by 1 to create a new id
    let last_data_element_id =
        document.getElementById("page_content").lastChild.id;
    let last_data_element_numeric_id =
        last_data_element_id.substr(last_data_element_id.length - 1);
    let new_data_element_id =
        parseInt(last_data_element_numeric_id) + 1;

    // get number of currently displayed coaches to correctly number
    // the new one's header
    let num_displayed_elements =
        document.getElementById("page_content").childElementCount;

    // create table element and insert into page_content div
    const c_d_table = document.createElement("table");
    document.getElementById("page_content").appendChild(c_d_table);
    c_d_table.setAttribute("id", "table" + new_data_element_id);

    // add row for a table header to separate tables
    const header_row = c_d_table.insertRow(0);
    const header_cell = header_row.insertCell(0);
    const cell_header = "<p><u>coach " + (num_displayed_elements + 1) + "</u></p>";
    header_cell.innerHTML = cell_header;
        
    // add row for coach name display / input
    const name_row = c_d_table.insertRow(1);
    const name_cell = name_row.insertCell(0);
    name_cell.innerHTML = "<input type='text' id='name_cell' />";
    document.getElementById("name_cell")
        .setAttribute("id", `coach_name${new_data_element_id}`);
    document.getElementById(`coach_name${new_data_element_id}`)
        .setAttribute("value", "enter coach name");
    
    // add row for coach phone number display / input
    const phone_row = c_d_table.insertRow(2);
    const phone_cell = phone_row.insertCell(0);
    phone_cell.innerHTML = "<input type='text' id='phone_cell' />";
    document.getElementById("phone_cell")
        .setAttribute("id", `phone_number${new_data_element_id}`);
    document.getElementById(`phone_number${new_data_element_id}`)
        .setAttribute("value", "enter phone number");
    
    // add row for coach email address display / input
    const email_row = c_d_table.insertRow(3);
    const email_cell = email_row.insertCell(0);
    email_cell.innerHTML = "<input type='text' id='email_cell' />";
    document.getElementById("email_cell")
        .setAttribute("id", `email_address${new_data_element_id}`);
    document.getElementById(`email_address${new_data_element_id}`)
        .setAttribute("value", "enter email address");

    // add cell for coach description display / input
    const description_row = c_d_table.insertRow(4);
    const description_cell = description_row.insertCell(0);
    description_cell.innerHTML = "<textarea id='description_cell' rows='4'" +
        "cols='20'>enter coach description</textarea>";
    document.getElementById("description_cell")
        .setAttribute("id", `coach_description${new_data_element_id}`);
    
    // add row for coach photo display / input
    const photo_row = c_d_table.insertRow(5);
    const photo_cell = photo_row.insertCell(0);
    photo_cell.innerHTML = "<div><p>upload new photo:</p>" +
        "<input type='file' id='img_upld_btn' onchange='image_file_upload()'" +
        "accept='image/png, image/jpeg'></div>";

    // add row for edit button
    const edit_row = c_d_table.insertRow(6);
    const edit_cell = edit_row.insertCell(0);
    edit_cell.innerHTML =
        "<button class='edit_button' id='edit_cell' onclick='edit_coach_details(this.id)'>edit</button>";
    document.getElementById("edit_cell")
        .setAttribute("id", `edit_button${new_data_element_id}`);

    // add row for save button
    const save_row = c_d_table.insertRow(7);
    const save_cell = save_row.insertCell(0);
    save_cell.innerHTML = "<button class='save_button' id='save_cell'" +
        "onclick='controller.save_coach_details(this.id)''>save</button>";
    document.getElementById("save_cell")
        .setAttribute("id", `save_button${new_data_element_id}`);

    // add row for delete button
    const delete_row = c_d_table.insertRow(8);
    const delete_cell = delete_row.insertCell(0);
    delete_cell.innerHTML = "<button class='delete_button' id='delete_cell'" +
        "onclick='controller.delete_coach_details(this.id)''>delete</button>";
    document.getElementById("delete_cell")
        .setAttribute("id", `delete_button${new_data_element_id}`);    

    // move user to bottom of page where new data entry table will appear
    window.scrollTo(0, document.body.scrollHeight);

}

function edit_coach_details(clicked_id) {

    // get last character of button id to identify DOM elements related to it
    let id_number = clicked_id.substr(clicked_id.length - 1);

    // get table to be edited as a variable to ease insertion of img input elements
    let editing_table = document.getElementById("table" + id_number);
    
    // remove readonly status from input elements of matching id number to allow user alterations
    document.getElementById("coach_name" + id_number).removeAttribute("readonly");
    document.getElementById("phone_number" + id_number).removeAttribute("readonly");
    document.getElementById("email_address" + id_number).removeAttribute("readonly");
    document.getElementById("coach_description" + id_number).removeAttribute("readonly");

    // insert file input element 
    const new_row_input = editing_table.insertRow(6);
    const new_cell_input = new_row_input.insertCell(0);
    new_cell_input.innerHTML = "<div><p>upload new photo:</p><input type='file'" +
        "id='img_upld_btn' onchange='image_file_upload()' accept='image/png, image/jpeg'>" +
        "</div>";
}

// functions for image file uploads (input button then drag and drop)

function image_file_upload () {

    var file = document.getElementById("img_upld_btn").files[0];
    function getbase64(file) {
      var reader = new FileReader();
      // call readAsDataURL method of FileReader to convert file to a base64 encoded string
      reader.readAsDataURL(file);
      reader.onload = function () {
      uploaded_img = reader.result;
      };
      reader.onerror = function (error) {
        // report any error which has occurred
        console.log('Error: ', error);
      };
    }
    getbase64(file);

}