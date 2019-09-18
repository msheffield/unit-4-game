/* 
Star Wars RPG Javascript
 */
// ----------- OBJECTS -----------

var obi = {
    id: "#obi",
    hp: 100,
    base_ad: 5,
    ad: 5,
}

var jarjar = {
    id: "#jarjar",
    hp: 100,
    base_ad: 5,
    ad: 5,
}

var boba = {
    id: "#boba",
    hp: 100,
    base_ad: 5,
    ad: 5,
}

var rey = {
    id: "#rey",
    hp: 100,
    base_ad: 5,
    ad: 5,
}

// ----------- FUNCTIONS -----------

function genID(str) {
    return "#" + str;
}

function moveChar(id) {
    if (chooseCharacter) {
        $(id).appendTo("#character");
        chooseCharacter = false;
        console.log(id);
        for (i=0; i<characters.length; i++) {
            if (characters[i].id !== id) {
                $(characters[i].id).appendTo("#enemies")
                enemies.push(characters[i])
                console.log(characters[i].id + " put in enemies");
            }
        }
    }
    else if (!battle) {
        $(id).appendTo("#defender");
        battle = true;
    }
}

// ----------- GAME LOGIC -----------
var obi = obi;
var rey = rey;
var boba = boba;
var jarjar = jarjar;


var chooseCharacter = true;
var battle = false;
var character, defender;
var characters = [obi, rey, boba, jarjar];
var enemies = [];
var defeated = [];

$(".character-card").on("click", function () {
    id = genID(this.id);
    moveChar(id);
});