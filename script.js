// Hide password function
function maskPassword(password) {
    let str = "";
    for (let i = 0; i < password.length; i++) {
        str += "*";
    }
    return str;

}
// Copy text to clipboard function
function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
    //   alert("Copied to clipboard: " + txt);
        // Show alert for successful copy
        document.getElementById("alert").style.display = "inline";
        setTimeout(() => {
            document.getElementById("alert").style.display = "none";
        }, 2000); // Hide after 2 seconds
        // document.getElementById("alert").textContent = "Copied: " + txt;
    },
    () => {
      alert("Failed to copy text.");
    }
  );
}

// Delete the password for a specific website
const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  alert("Password deleted successfully!");
  showpasswords();
};

// Logic to fill the table with passwords from localStorage
const showpasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");

  if (data == null) {
    tb.innerHTML = "No Data To Show";
  } else {
    // first reset the table to avoid duplication
    tb.innerHTML = `
    <tr>
          <th>Website</th>
          <th>Username</th>
          <th>Password</th>
          <th>Delete</th>
        </tr>`;

    // parse the data and fill the table
    let arr = JSON.parse(data);
    let str = "";
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      str += `<tr>
                    <td>${element.website} <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'/%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/%3E%3C/svg%3E" 
alt="Copy Icon" onclick="copyText('${element.website}')"  /></td>
                    <td>${element.username} <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'/%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/%3E%3C/svg%3E" 
alt="Copy Icon" onclick="copyText('${element.username}')"  /></td>
                    <td>${maskPassword (element.password)} <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'/%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/%3E%3C/svg%3E" 
alt="Copy Icon" onclick="copyText('${element.password}')" /></td>
                    <td><button class="delete" onclick="deletePassword('${element.website}')">Delete</button></td>
                </tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};

console.log("Working");
showpasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Button clicked");
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password saved successfully!");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password saved successfully!");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showpasswords();
});
