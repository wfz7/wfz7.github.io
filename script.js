// Stores users. Settings may be stored here, too
users = [
    {"id": 1, "username": "Yulita", "ig": '@yulita', "email": "yulita@gmail.com", "password": "cbf94abacce58e81ed788ff4f8319b5f0243003f08b4b688bcb202210d3b2ab0"}
]
// Stores the users friends, based on the userid
user_friends = {
    1: ["Marina", "Yulita", "Ana"]
}
// Stores the results for the users friends, based on the userid
user_friends_results = {
    1: [
        {
            "user": "Yulita",
            "points": "5P"
        },
        {
            "user": "Ana",
            "points": "10P"
        },
        {
            "user": "Marina",
            "points": "3P"
        },
    ]
}
// Stores the results for the user, based on the userid
user_results = {
    1: [
        {
            "outcome": "won",
            "result": "3 , 1",
            "name": "MARINA"
        },
        {
            "outcome": "lost",
            "result": "0 , 4",
            "name": "YULITA"
        },
        {
            "outcome": "tie",
            "result": "2 , 2",
            "name": "ANA"
        },
        {
            "outcome": "won",
            "result": "3 , 1",
            "name": "MARINA"
        },
    ]
}

questions = {
    "geography": [
        {
            "question": "What is the capital of Iceland?",
            "answers": [
                "Oslo",
                "Helsinki",
                "Reykjavik"
            ],
            "correct": 2
        },
        {
            "question": "In which country is the Suez Canal located ?",
            "answers": [
                "Egypt",
                "Turkey",
                "Syria"
            ],
            "correct": 0
        }
    ],
    "art": [
        {
            "question": "Who painted the 'Mona Lisa' ?",
            "answers": [
                "Leonardo Da Vinci",
                "Michelangelo",
                "Shakespeare"
            ],
            "correct": 0
        },
        {
            "question": "Who of the following was not a renaissance artist ?",
            "answers": [
                "Raphael",
                "Splinter",
                "DaVinci"
            ],
            "correct": 1
        }
    ],
    "entertainment": [
        {
            "question": "Who is considered the king of pop ?",
            "answers": [
                "Justin Bieber",
                "Michael Jackson",
                "Zayn Malik"
            ],
            "correct": 1
        },
        {
            "question": "What is the name of the protagonist of  the Titanic ?",
            "answers": [
                "Bradley Cooper",
                "Brad Pitt",
                "Leonardo Dicaprio"
            ],
            "correct": 2
        }
    ],
    "sports": [
        {
            "question": "Which country won the soccer world cup in 2010 ?",
            "answers": [
                "Spain",
                "Holland",
                "Germany"
            ],
            "correct": 0
        },
        {
            "question": "In which sport can the opponent be pushed ?",
            "answers": [
                "Volleyball",
                "Handball",
                "Rugby"
            ],
            "correct": 2
        }
    ]
}

// Used in login.html page
function login() {
    username = $("#username-input").val().toLowerCase();
    password = $("#password-input").val();
    var logged_in = false;
    users.forEach(user => {
        if ((user["username"].toLowerCase() == username) && (user["password"]==sha256(password))){
            window.location = "menu.html";
            localStorage.setItem("userid", user["id"]);
            logged_in = true;
            return false;
        }
    });
    if (!logged_in){
        alert('Wrong user or password');
        $("#username-input").val('');
        $("#password-input").val('');
    }
}
// Used in bf-results.html page
function load_bf_results() {
    var names = $(".latest-friends-list-name");
    var points = $(".latest-friends-list-points");
    for (let i = 0; i < names.length; i++) {
        names[i].textContent = user_friends_results[localStorage.userid][i]["user"];
        points[i].textContent = user_friends_results[localStorage.userid][i]["points"];        
    }
}
// Used in results.html
function load_results() {
    var outcomes = $(".results-result-outcome");
    for (let i = 0; i < outcomes.length; i++) {
        var text;
        result = user_results[localStorage.userid][i]["result"];
        name = user_results[localStorage.userid][i]["name"];
        text = "YOU " + result + " AGAINST " + name;
        outcomes[i].innerHTML = "<p>" + text + "</p>";
    }
    
}
// Used in play-now.html
function random_game() {
    userid = localStorage.userid;
    random_player = user_friends[userid][Math.floor(Math.random()*user_friends[userid].length)];
    localStorage.setItem("play_against", random_player);
    window.location.href='spin.html';
}
function load_play_now() {
    localStorage.setItem('answered_categories', '');
}
// Used in bf-list.html
function load_bf_list(params) {
    var names = $("#best-friends-list button");
    for (let i = 0; i < names.length; i++) {
        names[i].textContent = user_friends[localStorage.userid][i];
        
    }
}
function play_against(element) {
    console.log("Play against " + element.textContent);
    userid = localStorage.userid;
    localStorage.setItem("play_against", element.textContent);
    window.location.href='spin.html';
}
// Used in spin.html
function load_spin() {
    userid = localStorage.userid;
    var username = $("#spin-name-1");
    var against_name = $("#spin-name-2");
    username.text(users.find(function(u){return u.id == userid})["username"]);
    against_name.text(localStorage.play_against);

    if (localStorage.answered_categories) {
        answered_categories = localStorage.answered_categories.split(';');

        if (answered_categories.indexOf('entertainment') >= 0) {
            var overlay = document.createElement('img');
            overlay.setAttribute('style', 'position: absolute; top: 0; left: 0');
            overlay.setAttribute('src', 'Resources/TopLeft2.png');
            document.getElementsByClassName('spin-group')[0].getElementsByTagName('div')[0].appendChild(overlay);
        }
        if (answered_categories.indexOf('art') >= 0) {
            var overlay = document.createElement('img');
            overlay.setAttribute('style', 'position: absolute; top: 0; left: 0');
            overlay.setAttribute('src', 'Resources/TopRight.png');
            document.getElementsByClassName('spin-group')[0].getElementsByTagName('div')[0].appendChild(overlay);
        }
        if (answered_categories.indexOf('sports') >= 0) {
            var overlay = document.createElement('img');
            overlay.setAttribute('style', 'position: absolute; top: 0; left: 0');
            overlay.setAttribute('src', 'Resources/BottomLeft.png');
            document.getElementsByClassName('spin-group')[0].getElementsByTagName('div')[0].appendChild(overlay);
        }
        if (answered_categories.indexOf('geography') >= 0) {
            var overlay = document.createElement('img');
            overlay.setAttribute('style', 'position: absolute; top: 0; left: 0');
            overlay.setAttribute('src', 'Resources/BottomRight.png');
            document.getElementsByClassName('spin-group')[0].getElementsByTagName('div')[0].appendChild(overlay);
        }
    }

    
}
function spin_the_wheel(image) {
    var audio = new Audio('SOUNDS/398235__pooky1__wheel-spin-click-slow-down.wav');
    audio.play();
    image.removeAttribute('style');
    valid = false;
    var deg = 720 + Math.round(Math.random() * 360);
    while (!valid) {
        console.log('deg: '+deg);
        valid = true;
        if (localStorage.answered_categories) {
            answered_categories = localStorage.answered_categories.split(';');
            if ((answered_categories.indexOf('entertainment') >= 0)&&(deg%360 < 90)) {
                valid = false;
            }
            if ((answered_categories.indexOf('art') >= 0)&&(deg%360 > 270)) {
                valid = false;
            }
            if ((answered_categories.indexOf('sports') >= 0)&&(deg%360 >= 90 && deg%360 < 180)) {
                valid = false;
            }
            if ((answered_categories.indexOf('geography') >= 0)&&(deg%360 >= 180 && deg%360 < 270)) {
                valid = false;
            }
        }
        if (!valid) {
            var deg = 720 + Math.round(Math.random() * 360);
        }
    }
    var css = '-webkit-transform: rotate(' + deg + 'deg);';
    image.setAttribute("style", css);
    var category;
    if (deg%360 < 90) category = "entertainment"
    else if (deg%360 >= 90 && deg%360 < 180) category = "sports"
    else if (deg%360 >= 180 && deg%360 < 270) category = "geography"
    else category = "art";
    localStorage.setItem("category", category);
    setTimeout(function(){
        window.location.href = '/' + category + '.html';
    }, 2200);
}
// Used in question.html
function load_question() {
    category = localStorage.category;
    question = questions[category][Math.floor(Math.random()*questions[category].length)];
    localStorage.setItem("answer", question["answers"][question["correct"]])
    $("#question").text(question["question"]);
    $("#answer-1").text(question["answers"][0]);
    $("#answer-2").text(question["answers"][1]);
    $("#answer-3").text(question["answers"][2]);

    $("#answer-1").attr("onclick", "window.location.href='incorrect.html';")
    $("#answer-2").attr("onclick", "window.location.href='incorrect.html';")
    $("#answer-3").attr("onclick", "window.location.href='incorrect.html';")
    $("#answer-"+(question["correct"]+1)).attr("onclick", "window.location.href='correct.html';")
    
    $("#question-stripes").attr('class', category+'-stripes')
    if (category == "art")
        $("#question-body").attr("style", "background-color: #90B29A");
    else if (category == "entertainment")
        $("#question-body").attr("style", "background-color: #E16C5D");
    else if (category == "sports")
        $("#question-body").attr("style", "background-color: #E8CA72");
}
// Used in correct.html and incorrect.html
function load_correct_incorrect() {
    category = localStorage.category;
    if (window.location.pathname == "/correct.html"){
        if (localStorage.answered_categories === undefined) {
            localStorage.setItem('answered_categories', category);
        }
        if (localStorage.answered_categories.search(category) < 0) {
            answered_categories = localStorage.answered_categories ? localStorage.answered_categories+';'+category : category;
            localStorage.setItem('answered_categories', answered_categories);
        }
        if (localStorage.answered_categories.split(';').length >= 4) {
            setTimeout(() => {window.location.href = '/win.html'}, 1000)
        }
    }
    if (window.location.pathname == "/incorrect.html"){
        answer = localStorage.answer;
        $("#correct-incorrect-subtext").html("The correct answer was <br> " + answer);
    }
    $("#top-stripes").attr('class', category+'-stripes')
    $("#bottom-stripes").attr('class', category+'-stripes')
    if (category == "art") {
        $("#correct-incorrect-body").attr("style", "background-color: #90B29A");
        $("#correct-incorrect-subtext").attr("style", "color: #EADBA0");
        $("#correct-incorrect").attr("style", "color: #7C766A");
    }else if (category == "entertainment") {
        $("#correct-incorrect-body").attr("style", "background-color: #E16C5D");
        $("#correct-incorrect-subtext").attr("style", "color: #EADBA0");
        $("#correct-incorrect").attr("style", "color: #7C766A");
    }else if (category == "sports") {
        $("#correct-incorrect-body").attr("style", "background-color: #E8CA72");
        $("#correct-incorrect-subtext").attr("style", "color: #7C766A");
        $("#correct-incorrect").attr("style", "color: #DE6F5E");
    }
}
// Used in settings.html
function load_settings() {
    userid = localStorage.userid;

    var profile_header = $("#profile-header");
    var profile_social = $("#profile-social");
    
    username = users.find(function(u){return u.id == userid})["username"].toUpperCase();
    ig = users.find(function(u){return u.id == userid})["ig"];
    email = users.find(function(u){return u.id == userid})["email"];
    
    profile_header.text(username + "'S PROFILE");
    profile_social.html(ig + "<br>" + email);
}
function load_index() {
    var loading_bar = $("#loading-bar div");
    var width = 4;
    var id = setInterval(frame, 15);
    function frame() {
      if (width >= 97) {
        clearInterval(id);
        window.location.href = '/login.html';
      } else {
        width++;
        loading_bar.css("width", width+"%");
      }
    }
}
function page_loaded() {
    console.log('DOMContentLoaded');
    switch (window.location.pathname) {
        case "/bf-results.html":
            console.log('/bf-results.html loaded');
            load_bf_results();
            break;
        case "/results.html":
            console.log('/results.html loaded');
            load_results();
            break;
        case "/bf-list.html":
            console.log('/bf-list.html loaded');
            load_bf_list();
            break;
        case "/spin.html":
            console.log('/spin.html loaded');
            load_spin();
            break;
        case "/entertainment.html":
        case "/sports.html":
        case "/geography.html":
        case "/art.html":
            console.log('Category loaded');
            setTimeout(function(){
                window.location.href = '/question.html';
            }, 1000);
            break;
        case '/question.html':
            console.log("/question.html loaded");
            load_question();
            break;
        case '/correct.html':
        case '/incorrect.html':
            console.log("Correct/Incorrect loaded");
            load_correct_incorrect();
            break;
        case '/settings.html':
            console.log("/settings.html loaded");
            load_settings();
            break;
        case '/play-now.html':
            console.log('/play-now.html loaded');
            load_play_now();
            break;
        case '/':
            console.log("Index loaded");
            window.location = '/intro.html';
            break;
        case '/intro.html':
            console.log("Intro loaded");
            load_index();
            break;
        default:
            break;
    }
    
}
window.addEventListener('DOMContentLoaded', page_loaded);