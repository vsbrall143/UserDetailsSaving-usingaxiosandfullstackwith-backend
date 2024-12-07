// Function to handle form submission



function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form from submitting and refreshing the page

  // Retrieve values from input fields
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // Check if the input fields are not empty
  if (username && email && phone) {
    // Create a user object
    const userDetails = {
      username: username,
      email: email,
      phone: phone
    };

    axios.post("http://localhost:2000/user/add-user", userDetails)
      .then((res) => {
        console.log(res);
        // Display the updated users list
        displayUsers();
      })
      .catch((err) => console.log(err));
    
    // Clear input fields after submission
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
  }
}

// Function to display users on the page
function displayUsers() {
  // Get the user list element (ul) from the DOM
  const userList = document.getElementById('user-list');

  // Clear the existing list to avoid duplication
  userList.innerHTML = '';

  axios.get("http://localhost:2000/user/get-users")
    .then((res) => {
      console.log(res.data.allUsers);
      for (let i = 0; i < res.data.allUsers.length; i++) {
        const user = res.data.allUsers[i];
        // console.log(res);
        
        // Create a list item for each user
        const listItem = document.createElement('li');
        listItem.textContent = `id: ${user.id}, Username: ${user.username}, Email: ${user.email}, Phone: ${user.phone}`;

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';

        // Add event listener to delete the user when the button is clicked
        deleteButton.addEventListener('click', function() {
 
          console.log("hello");
          axios.delete(`http://localhost:2000/user/delete-users/${user.id}`)
            .then((res) => {
              console.log('Deleted:', res);
              // Remove the list item from the DOM
              listItem.remove();
            })
            .catch((err) => console.log(err));
        });

        // Create an edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.style.marginLeft = '10px';

        // Add event listener to edit the user when the button is clicked
        editButton.addEventListener('click', function() {
          // Populate the form fields with existing user dataf
          document.getElementById('username').value = user.username;
          document.getElementById('email').value = user.email;
          document.getElementById('phone').value = user.phone;

          // Optionally, delete the old user entry after populating form to edit
          axios.delete(`http://localhost:2000/user/delete-users/${user.id}`)
          .then((res)=> console.log(res))
          .catch((err)=>console.log(err));
        })
        // Append the delete and edit buttons to the list item
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);

        // Append the list item to the ul
        userList.appendChild(listItem);
      }
    })
    .catch((err) => console.log(err));
}

// Initialize the users list display when the page loads
// window.onload = displayUsers;
displayUsers();


// const userroutes = require('./routes/user');

// app.use(userroutes);