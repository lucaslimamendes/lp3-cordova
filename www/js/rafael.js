
    function callApi() {
        var pesquisa = $('#pesquisa').val();
        //debugger;
        if(!pesquisa || pesquisa.length < 3){
            window.alert("Digite algo valido!");
        }
        else{
            let URL = "https://api.jikan.moe/v3/search/anime?q="+ pesquisa;

            fetch(URL)
                .then(req => req.json())
                .then(show => { console.log(show); montaPesquisa(show)})
        }
    }

    function montaPesquisa(dados) {
        
        const tbodyTag = document.getElementById("tabelaPesquisa");
        tbodyTag.innerHTML="";

        for(var anime in dados.results) {

            let trTag = document.createElement("tr");
            let tdImage = document.createElement("td");
            let tdInfo = document.createElement("td"); 

            tdInfo.innerHTML = '<b>' + dados.results[anime].title + '</b>'+
            '<br><br>Sinopse: ' + dados.results[anime].synopsis +
            '<br><br>Tipo: ' + dados.results[anime].type +
            '<br><br>Lançamento: ' + converteData(dados.results[anime].start_date) +
            '<br><br>Links: <br> <a href="'+ dados.results[anime].url +'" target="_blank">myanimelist.net</a>';
            trTag.appendChild(tdInfo);

            tdImage.innerHTML = '<img src="' + dados.results[anime].image_url +  '" width="184">';
            trTag.appendChild(tdImage);

            tbodyTag.appendChild(trTag);
        }
    }

    function converteData(data){
        //debugger;
        var dataSimples = data.split('T');
        var datinha = dataSimples[0].split('-');
        return datinha[2] + '/' + datinha[1] + '/' + datinha[0];
    }
