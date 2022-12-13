const btnStart = document.querySelector('.start')
const inputMins = document.getElementById('inputMin')
const inputSeconds = document.getElementById('inputSec')
const settings = document.querySelector('.settings')
const settingsIcon = document.querySelector('.settings img')

let interval = null;
let minutes = +inputMins.value
let seconds = +inputSeconds.value

function timer() {
    if (seconds == 00 && minutes != 00) {
        seconds = 59;
        minutes--;
    } else if (seconds > 0) {
        seconds--;
    } else if (seconds == 00 && minutes == 00) {
        document.querySelector('.ring').classList.toggle('ending')
        clearInterval(interval);

        alert("Time's up!")

        setTimeout(() => {
            btnStart.innerHTML = 'start'
            document.querySelector('.ring').classList.toggle('ending')
            inputMins.value = 15
        }, 500);
    }

    appendZero();

    inputMins.value = minutes;
    inputSeconds.value = seconds
}

function onStart() {
    if (settingsIcon.src.includes("images/gear.svg")) {
        btnStart.innerHTML = btnStart.innerHTML === 'start' ? 'pause' : 'start'
        if (btnStart.innerHTML === 'start') {
            clearInterval(interval);
        } else {
            interval = setInterval(timer, 1000);
        }
    }
}

function onSettings() {
    const isGearIcon = settingsIcon.src.includes("images/gear.svg")
    const toggleIcon = isGearIcon ? "images/check.svg" : "images/gear.svg"
    settingsIcon.src = toggleIcon

    if (isGearIcon) {
        inputMins.disabled = false
        inputSeconds.disabled = false
    } else {
        inputMins.disabled = true
        inputSeconds.disabled = true
    }

    appendZero()
}

function appendZero() {
    if (seconds < 10)
        seconds = '0' + seconds;
    if (minutes < 10)
        minutes = "0" + minutes;
}


btnStart.addEventListener('click', onStart)
settings.addEventListener('click', onSettings)

inputMins.addEventListener('change', function () {
    minutes = +inputMins.value
})

inputSeconds.addEventListener('change', function () {
    seconds = +inputSeconds.value
})