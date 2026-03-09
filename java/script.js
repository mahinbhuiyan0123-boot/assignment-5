// console.log("mahin")
document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "admin" && password === "admin123") {
        window.location.href = "./html/main.html"
    }
    else { alert("incorrect value") }






})