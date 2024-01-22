
const url = "http://localhost:7000"

function registerUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const profileImage = document.getElementById("profileImage").files[0];

    if (username) {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profileImage", profileImage);

        fetch(`${url}/register`, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error("Error:", error));
    }
}
