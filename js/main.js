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
                alarm.innerText = `ALARM: 0${saveHour} : 0${saveMinute}`;
            }else if (saveHour < 10 && saveMinute > 10){
                alarm.innerText = `ALARM: 0${saveHour} : ${saveMinute}`;
            }else if (saveHour > 10 && saveMinute < 10){
                alarm.innerText = `ALARM: ${saveHour} : 0${saveMinute}`;
            }else {
                alarm.innerText = `ALARM: ${saveHour} : ${saveMinute}`;
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
    if (!valueInputHour.value || !valueInputMinute.value || valueInputHour.value <0 || valueInputMinute.value <0) {
        if(!valueInputHour.value || valueInputHour.value <0){
            errorElement(valueInputHour);
        }
        if(!valueInputMinute.value || valueInputMinute.value <0) {
            errorElement(valueInputMinute);
        }else{
            errorElement(valueInputMinute);
            errorElement(valueInputHour);
        }
    }
}

setBtn.onclick = () => {
    saveTime();
    setTime ();
}

valueInputMinute.oninput=() => {
    if(valueInputMinute.value >= 0){
        removeErrorElement(valueInputMinute);
    }
}
valueInputHour.oninput=() => {
    if(valueInputHour.value >= 0){
        removeErrorElement(valueInputHour);
    }
}


// is alarm:
alarmMusic.onpause = () => {
    heandlerAlarmMusic();
    alarmMusic.load();
    setTime ();
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

// MODULE-2
// 
const calculateBtn = document.querySelector('.module-2__button');
const elementManyPeople = document.getElementById('many-people');
const elementBill = document.getElementById('bill-amount');
const elementOptionBill = document.getElementById('module-2-choose');
function tipCalculator(){
    const bill = Number.parseFloat(elementBill.value).toFixed(2);
    const optionBill = Number.parseFloat(elementOptionBill.value).toFixed(2);
    const manyPeople = Number.parseFloat(elementManyPeople.value);
    const tipAmount = document.querySelector('.module-2__tip-about');
    var tip = "0.00";
    if(elementBill.value && elementBill.value >0 && elementOptionBill.value != 0){
        if (isNaN(manyPeople)  || manyPeople === 1) {
            tip = (bill*optionBill).toFixed(2);
        }else if(manyPeople <= 0 || !Number.isInteger(manyPeople)) {
            errorElement(elementManyPeople);
        }else{
            tip = ((bill*optionBill) / manyPeople).toFixed(2);
        }
        manyPeople>1 ? tipAmount.innerText =  `${tip} $/each`:tipAmount.innerText =  `${tip} $`;
    }else {
        if (!elementBill.value || elementBill.value <= 0){
            errorElement(elementBill);
        }
        if (elementOptionBill.value == 0){
            errorElement(elementOptionBill);
        }
        if(manyPeople <= -1) {
            errorElement(elementManyPeople);
        }
    }
    
}

function errorElement (element){
    element.classList.add('active');
}
function removeErrorElement (element){
    element.classList.remove('active');
}
calculateBtn.onclick = () => {
    tipCalculator()
}

elementManyPeople.oninput = () => {
    if (elementManyPeople.value >=0) {
        removeErrorElement(elementManyPeople);
    }
}

elementOptionBill.oninput = () => {
    if (elementOptionBill.value != 0) {
        removeErrorElement(elementOptionBill);
    }
}

elementBill.oninput = () => {
    if (elementBill.value >0) {
        removeErrorElement(elementBill);
    }
}


