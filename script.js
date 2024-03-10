// Function to display entities
function displayEntities() {
    $.get("https://65eb6eee43ce16418933d902.mockapi.io/post/", function (data) {
        // Clear the existing table content
        $("#entityTable").empty();
        console.log(`This is inside the Entities function after the get`, data);
        // Iterate through the fetched data and append rows to the table
        data.forEach((entity) => {
            $("#entityTable").append(
                `<tr>
                    <td>${entity.name}</td>
                    <td>${entity.description}</td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-btn" data-id="${entity.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${entity.id}">Delete</button>
                    </td>
                </tr>`
            );
        });
    });
}

// Event listener for delete button clicks
$(document).on("click", ".delete-btn", function () {
    // Get the ID of the entity to be deleted
    let entityId = $(this).data("id");

    // Confirm with the user before deleting
    if (confirm("Are you sure you want to delete this entity?")) {
        // Perform delete request
        $.ajax({
            url: "https://65eb6eee43ce16418933d902.mockapi.io/post/" + entityId,
            type: "DELETE",
            success: function (result) {
                // Display a success message
                alert("Entity deleted successfully!");

                // Refresh the displayed entities
                displayEntities();
            }
        });
    }
});

// Event listener for edit button clicks
$(document).on("click", ".edit-btn", function () {
    let entityId = $(this).data("id");

    // Retrieve entity data from the API
    $.get("https://65eb6eee43ce16418933d902.mockapi.io/post/" + entityId, function (entity) {
        // Fill the form fields with entity data
        $("#editId").val(entity.id);
        $("#editName").val(entity.name);
        $("#editDescription").val(entity.description);

        // Show the edit form
        $("#editForm").show();
    });
});

// Event listener for edit form submission
$("#editForm").submit(function (event) {
    event.preventDefault();

    let formData = {
        name: $("#editName").val(),
        description: $("#editDescription").val(),
    };

    let entityId = $("#editId").val();

    // Send PUT request to update the entity
    $.ajax({
        url: "https://65eb6eee43ce16418933d902.mockapi.io/post/" + entityId,
        type: "PUT",
        data: formData,
        success: function (result) {
            alert("Entity updated successfully!");
            $("#editForm").hide();
            displayEntities(); // Refresh displayed entities
        }
    });
});

// Event listener for cancel edit button
$("#cancelEdit").click(function () {
    $("#editForm").hide();
});

// Call the displayEntities function when the page loads
$(document).ready(function () {
    displayEntities();
});

// Event listener for form submission
$("#createForm").submit(function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form data
    let formData = {
        name: $("#name").val(),
        description: $("#description").val(),
    };

    // Perform POST request to create new entity
    $.post("https://65eb6eee43ce16418933d902.mockapi.io/post/", formData, function (data) {
        // Display a success message
        alert("Entity created successfully!");

        // Clear the form fields
        $("#name").val("");
        $("#description").val("");

        // Refresh the displayed entities
        displayEntities();
    });
});
