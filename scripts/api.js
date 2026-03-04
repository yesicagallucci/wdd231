// Function to fetch and display users
async function fetchUsers() {
  try {
    // 1. Make GET request to /users endpoint
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // 2. Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 3. Parse JSON data
    const users = await response.json();

    // 4. Get reference to the UL element
    const userList = document.getElementById('user-list');

    // 5. Loop through users and create LI elements
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} - ${user.email}`;
      userList.appendChild(li);
    });

  } catch (error) {
    // 6. Handle errors gracefully
    console.error('Error fetching users:', error);
    const userList = document.getElementById('user-list');
    userList.innerHTML = `<li style="color:red;">Failed to load users. Please try again later.</li>`;
  }
}

// Call the function when the script loads
fetchUsers();
