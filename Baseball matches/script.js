// for test purposes, assign a default set of allowable characters
var date = []; //this will contain [year,month,day]
let gamePk = "";
var homeTeam = "";
var awayTeam = "";
let counter1 = 0;
let counter2 = 0;
let hl_video_url = 0;
//DOM
const retrive = document.querySelector(".btn1");
const homeText = document.querySelector(".textbox1");
const awayText = document.querySelector(".textbox2");
const highlightText = document.querySelector(".textbox3");
const next_btn = document.querySelector(".next-btn");
const previous_btn = document.querySelector(".previous-btn");
const next_hl_btn = document.querySelector(".nexthl-btn");
const previous_hl_btn = document.querySelector(".previoushl-btn");
const run_hl_btn = document.querySelector(".runhl-btn");
// find out what type of browser we have by using the window.navigator.userAgent
var isIE11 = window.navigator.userAgent.indexOf("Trident") !== -1;
var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
var isSafari = window.navigator.userAgent.indexOf("Safari") !== -1;

// Cross browser code to filter data entry on numeric fields
// (not including Firefox)
// The window.event.keyCode is the character that is generated
// with every keystroke
function filterText(ref) {
  // choose the value of filterSet based
  // on the text box that sent the character
  if (ref.id === "txtNums") filterSet = nums;
  else if (ref.id === "txtAlphas") filterSet = alphas;

  // IE11 uses the .preventDefault() to discard the last key typed
  if (isIE11) {
    if (window.event.keyCode === 13) alert("You pressed the enter key");
    else if (!nCharOK(window.event.keyCode)) window.event.preventDefault();
  } else {
    // Chrome, Edge and Safari use returnValue to discard the last key typed
    // set window.event.returnValue to null and the character is discarded
    if (window.event.keyCode === 13) alert("You pressed the enter key");
    else if (!nCharOK(window.event.keyCode)) window.event.returnValue = null;
  }
}

// filter the currently entered character to see that it is part
// of the acceptable character set
function nCharOK(c) {
  var ch = String.fromCharCode(c);
  ch = ch.toUpperCase();

  // if the current character is not found in the set of all numbers
  // set the flag variable to fail
  if (filterSet.indexOf(ch) !== -1) return true;
  else return false;
}

function initialize() {
  const yearPulldown = document.querySelector("#yearPulldown");
  const monthPulldown = document.querySelector("#monthPulldown");
  const dayPulldown = document.querySelector("#dayPulldown");
  yearPulldown.options.length = 0;
  monthPulldown.options.length = 0;
  dayPulldown.options.length = 0;

  // this is how you add a new item (option) to the pulldown list
  yearPulldown.options[0] = new Option("2019", 1);
  yearPulldown.options[1] = new Option("2020", 2);
  yearPulldown.options[2] = new Option("2021", 3);
  yearPulldown.options[3] = new Option("2022", 4);
  yearPulldown.options[4] = new Option("2023", 5);

  for (let i = 0; i < 12; i++) {
    monthPulldown.options[i] = new Option(`${i + 1}`, i);
  }

  for (let i = 0; i < 31; i++) {
    dayPulldown.options[i] = new Option(`${i + 1}`, i);
  }
  //Default values for the selectors:
  date[0] = yearPulldown.options[0].text;
  date[1] = monthPulldown.options[0].text;
  date[2] = dayPulldown.options[0].text;
}

// event handler attached to <select> control
// the ref parameter is a reference to the <select> control called "selPulldown"
// and corresponds to "this"
function selectionMade(ref) {
  // we can get a reference to <select> this way as well
  var ref1 = document.getElementById("myCombo");
  // ref is identical to ref1;

  // get the "text" of the selected item
  var selectedText = ref.options[ref.selectedIndex].text;
  // alert("You selected " + selectedText);
  var selectedId = event.target.id;
  console.log(selectedId);
  if (selectedId == "yearPulldown") {
    date[0] = selectedText;
  } else if (selectedId == "monthPulldown") {
    date[1] = selectedText;
  } else if (selectedId == "dayPulldown") {
    date[2] = selectedText;
  }
  // this forces a selected item to be set
  // ... in this case it will be the first option in the list
  // ref.selectedIndex = 0;
}

// event handler is attached to all radio buttons
// the ref parameter is a reference to any of the radio controls
// and corresponds to "this"
function noticeRadClick(ref) {
  alert(ref.id + " " + ref.checked);

  // the .checked property will always be true or false
  // notice as well that radio buttons are always grouped together
  // based on the "name" property (a single radio button would be pointless)
}

// event handler is attached to all checkboxes
// the ref parameter is a reference to any of the check box controls
// and corresponds to "this"
function noticeChkClick(ref) {
  alert(ref.id + " " + ref.checked);

  // the .checked property will always be true or false
  // check boxes are not grouped as each one can be meaningful by itself
}

// event handler is attached to the internal link called "lnkInternal"

//retrive and display the game data
function displayGame() {
  fetch(
    `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${date[0]}-${date[1]}-${date[2]}&endDate=${date[0]}-${date[1]}-${date[2]}`
  )
    .then((res) => res.json())
    .then((data) => {
      jsObj = data;
      gamePk = jsObj.dates[0].games[counter1].gamePk;
      homeTeam = jsObj.dates[0].games[counter1].teams.home.team.name;
      awayTeam = jsObj.dates[0].games[counter1].teams.away.team.name;
      homeText.value = homeTeam;
      awayText.value = awayTeam;
      fetch(`https://statsapi.mlb.com/api/v1/game/${gamePk}/content`)
        .then((res) => res.json())
        .then((data) => {
          highlight =
            data["highlights"]["highlights"]["items"][counter2]["headline"];
          hl_video_url =
            data["highlights"]["highlights"]["items"][counter2]["playbacks"][0][
              "url"
            ];
          highlightText.value = highlight;
          console.log(hl_video_url);
        })
        .catch((err) => alert(err.message));
    })
    .catch((err) => alert(err.message));
}
// functions on button
retrive.addEventListener("click", function () {
  displayGame();
});

next_btn.addEventListener("click", function () {
  counter1 = counter1 + 1;
  displayGame();
});
previous_btn.addEventListener("click", function () {
  counter1 = counter1 - 1;
  displayGame();
});
next_hl_btn.addEventListener("click", function () {
  counter2 = counter2 + 1;
  displayGame();
});
previous_hl_btn.addEventListener("click", function () {
  counter2 = counter2 - 1;
  displayGame();
});
run_hl_btn.addEventListener("click", function () {
  console.log(hl_video_url);
  window.open(hl_video_url, "_blank");
});
