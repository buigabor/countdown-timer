let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000
    dispalyTimeLeft(seconds)
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        dispalyTimeLeft(secondsLeft);
    }, 1000)
}

function dispalyTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const displayTime = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
    timerDisplay.textContent = displayTime;
    document.title = displayTime;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at: ${hours}:${minutes < 10 ? "0" : ""}${minutes}  `

}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach((buttons) => {
    buttons.addEventListener("click", startTimer)
})
document.customForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});