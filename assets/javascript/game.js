/* 
Star Wars RPG Javascript
 */
// ----------- OBJECTS -----------

var obi = {
    id: "#obi",
    hp: 100,
    base_ad: 1,
    ad: 1,
}

var jarjar = {
    id: "#jarjar",
    hp: 100,
    base_ad: 5,
    ad: 100,
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

// Returns an ID for JQuery
function genID(str) {
    return "#" + str;
}

// Searches characters array using an ID and returns the character object
function findCharByID(characters, id) {
    for (i = 0; i < characters.length; i++) {
        if (characters[i].id == id) {
            return characters[i];
        }
    }
}

// Moves characters between divs. If first character clicked, selects as character and moves enemies. Else if no current defender, moves to defender.
function moveChar(id) {
    if (chooseCharacter) {
        $(id).appendTo("#character");
        character = findCharByID(characters, id);
        chooseCharacter = false;
        console.log(id + " is character");
        for (i = 0; i < characters.length; i++) {
            if (characters[i].id !== id) {
                $(characters[i].id).appendTo("#enemies")
                $(characters[i].id + " .card-body").css("background-color", "red")
                $(characters[i].id + " p").css("color", "white");
                enemies.push(characters[i])
                console.log(characters[i].id + " put in enemies");
            }
        }
    }
    else if (!battle) {
        if (id !== character.id) {
            $(id).appendTo("#defender");
            battle = true;
            defender = findCharByID(characters, id);
            enemies.splice((enemies.indexOf(defender)), 1);
            console.log(defender.id + " is defender");
            console.log(enemies);
        }

    }
}

// Character attacks another, attacker deals current AD to defender HP, defender counters, attacker's AD increases
function attack(attacker, defender) {
    console.log(attacker.id + " attacks " + defender.id);
    defender.hp -= attacker.ad;
    attacker.hp -= defender.ad;
    attacker.ad += attacker.base_ad;
}

// Updates HP displays and triggers events when a character's hp is 0 (endgame, defender defeated)
function update() {
    console.log("update");

    if (character.hp <= 0) {
        alert("Game Over!");
        // RESET //
    }
    else if (defender.hp <= 0) {
        console.log(defender.id + " defeated");
        $(defender.id).hide();
        defeated.push(defender);
        defender = null;
        battle = false;

    }

    for (let i = 0; i < characters.length; i++) {
        console.log(characters[i].id + " hp = " + characters[i].hp);
    }

    if (battle == false & defeated.length == 3) {
        alert("You win!");
    }
}

// ----------- GAME LOGIC -----------

// Initialize characters
var obi = obi;
var rey = rey;
var boba = boba;
var jarjar = jarjar;

// Initialize conditions
var chooseCharacter = true;
var battle = false;

// Initialize positions
var characters = [obi, rey, boba, jarjar];
var character, defender;
var enemies = [];
var defeated = [];

// Game flow
$(".character-card").on("click", function () {
    id = genID(this.id);
    moveChar(id);
});

$("#attack-btn").on("click", function () {
    if (battle) {
        attack(character, defender);
        update();
    }
})