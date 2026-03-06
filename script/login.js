document.getElementById("loginBtn").
addEventListener("click",function(){
    const userInput = document.getElementById("input-user");
    const userName = userInput.value;
    console.log(userName);

    const passInput = document.getElementById("input-pass");
    const UserPass = passInput.value;
    console.log(UserPass);

    if(userName == "admin" && UserPass == "admin123"){
        alert("log in success");
        window.location.assign("./main.html");
    }else{
        alert("wrong username or password");
    }
})