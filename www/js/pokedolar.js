let url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/brl.json";
        let pkmn = {
                "pokemon": function(pkm) {
                    return "https://pokeapi.co/api/v2/pokemon/" + pkm;
                }
            }

        fetch(url)
            .then(resp => resp.json())
            .then(result => {
                document.querySelector("#dolarValue").textContent = "Cotação do Dolar, USD$ 1 está BRL$ " + result.brl.toFixed(2).toString();
                fetch(pkmn.pokemon(result.brl.toFixed(2).toString().replace(".", "")))
                    .then(resp => resp.json())
                    .then(result => {
                        document.querySelector("#pkmnImg").src = result.sprites.other["official-artwork"].front_default;
                        document.querySelector("#pkmnInfo").textContent = result.name + " - #" + result.id;
                    })
            })