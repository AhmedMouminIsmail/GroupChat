//variables / Essentials
let username = 'None'
const URL = `https://683c2a7f28a0b0f2fdc65cc4.mockapi.io/chat`

//autoLoadUserName

function autoLoadName() {
    let userType = document.getElementById("userbar");
    if (localStorage.getItem("username")) {
        userType.value = `${localStorage.getItem("username")}`
        username = localStorage.getItem("username")
        document.getElementById("userCurrent").innerText = username
    }
}

//Title Animation
document.addEventListener("DOMContentLoaded", () => {
        autoLoadName()
        setInterval(() => {
            let title = document.getElementById("titleTab");
            setTimeout(() => {
                title.innerText = 'G----------'
            }, 0);
            setTimeout(() => {
                title.innerText = '-e---------'
            }, 300);
            setTimeout(() => {
                title.innerText = '--n--------'
            }, 600);
            setTimeout(() => {
                title.innerText = '---e-------'
            }, 900);
            setTimeout(() => {
                title.innerText = '----r------'
            }, 1200);
            setTimeout(() => {
                title.innerText = '-----a-----'
            }, 1500);
            setTimeout(() => {
                title.innerText = '------l----'
            }, 1800);
            setTimeout(() => {
                title.innerText = '-------C---'
            }, 2100);
            setTimeout(() => {
                title.innerText = '--------h--'
            }, 2400);
            setTimeout(() => {
                title.innerText = '---------a-'
            }, 2700);
            setTimeout(() => {
                title.innerText = '----------t'
            }, 3000);
            setTimeout(() => {
                title.innerText = 'GeneralChat'
            }, 3300);
        }, 5000);
    })
    // Animation

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("deviceType").showModal()
})


//phone Mode
function phoneStyle() {
    let head = document.getElementById("head");
    document.getElementById("deviceType").close()
    head.innerHTML += '<link rel="stylesheet" href="./phone.css">'
    document.getElementById("use").showModal()

}

//computerMode
function computerStyle() {
    let head = document.getElementById("head");
    document.getElementById("deviceType").close()
    head.innerHTML += '<link rel="stylesheet" href="./computer.css">'
    document.getElementById("use").showModal()

}


//chooses Unername
function CHOOSE() {
    let userType = document.getElementById("userbar");

    if (userType.value.trim() === "") {
        return;
    } else if (userType.value.length > 20) {
        return;
    } else {
        localStorage.setItem("username", `${userType.value}`)
        username = userType.value;
        document.getElementById("userCurrent").innerText = username
    }

    const modal = document.getElementById("use");
    modal.close();
    modal.style.display = "none";
}


//send online

function send() {
    let typingBar = document.getElementById("typingBar");
    if (typingBar.value.trim() != "") {
        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: username,
                msg: typingBar.value,
                status: "new"
            })
        }).catch(err => console.log(err))
        typingBar.value = ''
        chat.innerHTML += `\n${username}: ${typingBar.value}`;
    } else { console.log("The message should say something :(") }
}

// fetch the messages

setInterval(() => {
    let chat = document.getElementById("Chat");
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.forEach(message => {
                if (message.status === "new") {
                    chat.innerHTML += `\n${message.user}: ${message.msg}`;
                    chat.scrollTop = chat.scrollHeight;
                    fetch(URL + `/${message.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: "fetched" })
                    })
                }
            });
        })
}, 1000);

//ENTER
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        send()
    }
})