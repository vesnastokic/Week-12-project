$(document).ready(function() {
    function getEntities() {
      $.get("https://mockapi.io/projects/:projectId/entities", function(data) {
        // Process the data and update the UI
      });
    }
    
    
    getEntities();
  });


  function displayEntities() {
    $.get("https://mockapi.io/projects/:projectId/entities", function(data) {

      // Clear the existing table content
      $("#entityTable tbody").empty();
  
      // Iterate through the fetched data and append rows to the table
      data.forEach(function(entity) {
    
        $("#entityTable tbody").append(
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
      // Append a new row to the table body


  // Call the displayEntities function when the page loads
  $(document).ready(function() {
    displayEntities();
  });

  $("#createForm").submit(function(event) {      // Prevent the default form submission behavior
 
    event.preventDefault();
  
    // Get the form data
    var formData = {
      name: $("#name").val(),
      description: $("#description").val()
    };
  
   
    $.post("https://mockapi.io/projects/:projectId/entities", formData, function(data) {
      // Display a success message
      alert("Entity created successfully!");
  
      // Clear the form fields
      $("#name").val("");
      $("#description").val("");
  
      // Refresh the displayed entities
      displayEntities();
    });
  }); 