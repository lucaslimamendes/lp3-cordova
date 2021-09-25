const urlDotaList = "https://pacific-sierra-10784.herokuapp.com/http://api.steampowered.com/IEconDOTA2_570/getHeroes/v1?key=0069303A2719A03FFD8B79E9F06546AD";
var heroesList = [];
const urlDotaImg = "https://cdn.dota2.com/apps/dota2/images/heroes/HERONAME_sb.png";
var headers = { "Origin": "*", "Access-Control-Allow-Origin": "*" }
window.streak = 0;
let total = window.localStorage.getItem("totalCorrects");
let best = window.localStorage.getItem("bestStreak");

fetch(urlDotaList, {
    method: "GET",
    mode: 'cors',
    headers: headers
})
    .then(resp => resp.json())
    .then(result => {
        for (let i = 0; i < result.result.heroes.length; i++) {
            heroesList.push(result.result.heroes[i].name.replace('npc_dota_hero_', ''));
        }
        beginRound();
    })

function checkAnswer(id) {
    var alt = document.querySelector(id).textContent;

    window.streak = window.resposta == alt ? window.streak + 1 : window.streak = 0;

    beginRound()
}

function beginRound() {

    var heroPool = [];

    document.querySelector("#streak").textContent = window.streak;

    while (heroPool.length != 4) {
        var num = getRandomInt(0, 121);

        var hero = { name: capitalizeFirstLetter(heroesList[num].replaceAll("_", " ")), image: urlDotaImg.replace("HERONAME", heroesList[num]) };

        if (!heroPool.includes(hero))
            heroPool.push(hero);
    }

    var correct = getRandomInt(-1, 4);


    document.querySelector("#heroImg").src = heroPool[correct].image;
    document.querySelector("#opt" + (correct + 1)).textContent = heroPool[correct].name;

    window.resposta = heroPool[correct].name;

    heroPool.splice(correct, 1);

    for (let i = 1; i < 5; i++) {
        if (i == (correct + 1))
            continue

        document.querySelector("#opt" + i).textContent = heroPool[heroPool.length - 1].name;
        heroPool.pop();
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}