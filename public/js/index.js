const myModal = new bootstrap.Modal("#exampleModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);
    
    if(!account) {
        alert("Verifique o E-mail e a senha!");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Verifique o E-mail e a senha!");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }

});

//criar conta
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com E-mail válido!");
        return;
    }

    if(password.length < 5) {
        alert("Utilize uma senha com mais de cinco caracteres!");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    })

    myModal.hide();

    alert("Conta criada com sucesso!");

});

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getAccount(key) {
    const account = localStorage.getItem(key);
    if(account) {
        return JSON.parse(account);
    }
    return"";
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}