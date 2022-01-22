const hero_names = [
    "Spider Man",
    "Iron Man",
    "Hulk",
    "Thor",
    "Doctor Strange",
    "Deadpool",
    "Captain Ameriaca",
    "Black Phanter",
    "Hawkeye",
    "Falcon",
];

const villain_names = [
    "Thanos",
    "Loky",
    "Red Skull",
    "Altron",
    "Doctor Octopus",
    "Ivan Vanko",
    "Green Goblin",
    "Rhino",
    "Electro",
    "Mysterio",
];

function getRandomValue (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeCharacter(arr) {
    let characters = [];
    for(let i = 0; i < arr.length; i++) {
        characters.push({
            name: arr[i],
            speed: getRandomValue(1000, 5000) / 1000,
            health: 100,
            power: getRandomValue(1000, 10000) / 1000,
        });
    }
    return characters;
}

const heroes = makeCharacter(hero_names);
const villains = makeCharacter(villain_names);

function battle (heroes, villains) {
    for (let i = 0; i < heroes.length; ++i) {
        attacke(heroes[i], villains);
    }
    for (let i = 0; i < villains.length; ++i) {
        attacke(villains[i], heroes);
    }
}

function attacke(attacer, arr) {
    if(arr.length === 0) {
        finish();
        return;
    }
    let time = 1 / attacer.speed * 5000;
    let attacted_character = arr[Math.floor(Math.random() * arr.length)];
    if(attacted_character.health - attacer.power <= 0) {
        setTimeout(() => {
            console.log(attacer.name + "[" + attacer.health + "] hits " + attacted_character.name + "[" + attacted_character.health + "] with a power of " + attacer.power);
            console.log(attacted_character.name + " dies");
            removeCharacter(arr, attacted_character);
            attacke(attacer, arr); 
        }, time);
    } else {
        setTimeout(() => {
            console.log(attacer.name + "[" + attacer.health + "] hits " + attacted_character.name + "[" + attacted_character.health + "] with a power of " + attacer.power);
            attacted_character.health -= attacer.power;
            attacke(attacer, arr);
        }, time);
    }
}

function finish() {
    if(heroes.length === 0) {
        console.log("Villains win !!!");
        let str = "";
        for (let i = 0; i < villains.length; i++) {
            str = str + villains[i].name + "[" + villains[i].health + "], "; 
        }            
        console.log(str);
    } else {
        console.log("Heroes win !!!");
        let str = "";
        for (let i = 0; i < heroes.length; i++) {
            str = str + heroes[i].name + "[" + heroes[i].health + "], "; 
        }
        console.log(str);
    }
}

function removeCharacter (arr, character) {
    const index = arr.indexOf(character);
    if (index > -1) {
        arr = arr.splice(index, 1);
    }
}

battle(heroes, villains);