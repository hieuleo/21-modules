var options ={};

function clock (options) {
    const elementModule = document.querySelector(options.selectorModule);
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentSecond = currentTime.getSeconds();
    
    //  analogClock
    function analogClock() {
        const secondRatio = currentSecond / 60; // 
        const minuteRatio = (secondRatio + currentMinute) / 60;     // công thêm tỉ lệ của second để có được kết quả ỏe phút khi second ở 0.25 hoặc 0.5;
        const hourRatio = currentHour <=12 ? (minuteRatio + currentHour) / 12 : (minuteRatio + (currentHour - 12)) / 12;
        const elementHourAnalog = elementModule.querySelector(options.selectorHoursAnalog);
        const elementMinuteAnalog = elementModule.querySelector(options.selectorMinutesAnalog);
        const elementSecondAnalog = elementModule.querySelector(options.selectorSecondAnalog);
        setClockRadio(elementHourAnalog, hourRatio);
        setClockRadio(elementMinuteAnalog, minuteRatio);
        setClockRadio(elementSecondAnalog, secondRatio);
    }
    
    function setClockRadio (element, ratio){
        element.style.setProperty('--rotation', ratio *360 + 'deg');
    };

    // smartClock:
    function smartClock () {
        const elementHourSmart = elementModule.querySelector(options.selectorHoursSmart);
        const elementMinuteSmart = elementModule.querySelector(options.selectorMinutesSmart);
        const elementSecondSmart = elementModule.querySelector(options.selectorSecondSmart);
        const elementMiddayTime = elementModule.querySelector(options.selectorMiddayTime);
        setClockNumber(elementHourSmart, currentHour);
        setClockNumber(elementMinuteSmart, currentMinute);
        setClockNumber(elementSecondSmart, currentSecond);
        if (currentHour <= 12) {
            setClockNumber(elementMiddayTime, 'AM');
        }else {
            setClockNumber(elementMiddayTime, 'PM');
        }
    }

    function setClockNumber (element, number){
        if (number<10){
            element.innerText = '0' + number;
        }else{
            element.innerText = number;
        }
    }

    // handleSetTime 
    if (currentHour == saveHour && currentMinute == saveMinute && currentSecond == 0){
        alarmMusic.play();
        heandlerAlarmMusic();
    }

    analogClock();
    smartClock ();

}

setInterval(() => {
    clock(options)
}, 1000);

//--------------------------------------------------------------------------------------------------------------
// Set Time:
const setBtn = document.querySelector('.set');
const alarms = document.querySelectorAll('.alarm');
const valueInputHour = document.querySelector('.set-alarm-input-hour');
const valueInputMinute = document.querySelector('.set-alarm-input-minute');
const alarmMusic = document.querySelector('.alarm-music');
const alarmIcon = document.querySelector('.alarm-icon');
const alarmCloseBtn = document.querySelector('.alarm-close-btn');
const snoozeBtn = document.querySelector('.snooze');
var isAlarm = false;
var saveMinute;
var saveHour;

function setTime (){
    for (let alarm of alarms){
        if(valueInputHour.value && valueInputMinute.value ){
            if (saveHour < 10 && saveMinute < 10) {
                alarm.innerText = `ALARM: 0${saveHour} : 0${saveMinute}`
            }else if (saveHour < 10 && saveMinute > 10){
                alarm.innerText = `ALARM: 0${saveHour} : ${saveMinute}`
            }else if (saveHour > 10 && saveMinute < 10){
                alarm.innerText = `ALARM: ${saveHour} : 0${saveMinute}`
            }else {
                alarm.innerText = `ALARM: ${saveHour} : ${saveMinute}`
            }
            // if (valueInputHour.value.length <2 && valueInputMinute.value.length <2){
            //     alarm.innerText = `ALARM: 0${valueInputHour.value} : 0${valueInputMinute.value}`
            // }else if (valueInputHour.value.length <2  && valueInputMinute.value){
            //     alarm.innerText = `ALARM: 0${valueInputHour.value} : ${valueInputMinute.value}`
            // }else if (valueInputHour.value  && valueInputMinute.value.length <2 ){
            //     alarm.innerText = `ALARM: ${valueInputHour.value} : 0${valueInputMinute.value}`
            // }else{
            //     alarm.innerText = `ALARM: ${valueInputHour.value} : ${valueInputMinute.value}`
            // }
        }
    }
}

function saveTime(){
    saveHour = Number.parseInt(valueInputHour.value);
    saveMinute = Number.parseInt(valueInputMinute.value);
}

setBtn.onclick = () => {
    saveTime()
    setTime ()
}

// is alarm:
alarmMusic.onpause = () => {
    heandlerAlarmMusic();
    alarmMusic.load();
    setTime ()
}

alarmCloseBtn.onclick  = () => {
    alarmMusic.pause();
}

snoozeBtn.onclick = () => {
    alarmMusic.pause();
    if (saveMinute < 59){
        saveMinute = saveMinute + 1;
    }else if (saveMinute == 59) {
        saveHour =saveHour + 1;
        saveMinute = 0;
    }

    if (saveHour == 24 && saveMinute == 59){
        saveHour = 0;
        saveMinute = 0;
    }
}

function heandlerAlarmMusic(){
    isAlarm = !isAlarm;
    alarmIcon.classList.toggle('active', isAlarm);
}