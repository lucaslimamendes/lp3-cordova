var dataLancamento;

    function callApi() {
        let URL = "https://api.pokemontcg.io/v2/cards/";

        fetch(URL)
            .then(req => req.json())
            .then(show => { console.log(show); fillTable(show); })

    }

    function fillTable(tableData) {
        var pesquisa = $('#filtro').val();
        const tbodyTag = document.getElementById("tableData");
        tbodyTag.innerHTML = "";
        for (var item in tableData.data) {
            if (pesquisa && pesquisa.length > 1) {

                if (tableData.data[item].name.includes(pesquisa)) {
                    let trTag = document.createElement("tr");
                    let tdTagName = document.createElement("td");
                    let tdTagTypes = document.createElement("td");
                    let tdTagImages = document.createElement("td");

                    tdTagName.innerHTML = tableData.data[item].name;
                    trTag.appendChild(tdTagName);

                    tdTagTypes.innerHTML = tableData.data[item].types;
                    trTag.appendChild(tdTagTypes);

                    tdTagImages.innerHTML = '<img src="' + tableData.data[item].images.small + '" alt="Card Pokémon">';
                    trTag.appendChild(tdTagImages);

                    tbodyTag.appendChild(trTag);
                }
                else
                    continue;
            }
            else {
                let trTag = document.createElement("tr");
                let tdTagName = document.createElement("td");
                let tdTagTypes = document.createElement("td");
                let tdTagImages = document.createElement("td");

                tdTagName.innerHTML = tableData.data[item].name;
                trTag.appendChild(tdTagName);

                tdTagTypes.innerHTML = tableData.data[item].types;
                trTag.appendChild(tdTagTypes);

                tdTagImages.innerHTML = '<img src="' + tableData.data[item].images.small + '" alt="Card Pokémon">';
                trTag.appendChild(tdTagImages);

                tbodyTag.appendChild(trTag);
            }
        }
        document.querySelectorAll("#base").forEach(element => element.removeAttribute("hidden"))
    }

//https://docs.pokemontcg.io/api-reference/cards/search-cards 