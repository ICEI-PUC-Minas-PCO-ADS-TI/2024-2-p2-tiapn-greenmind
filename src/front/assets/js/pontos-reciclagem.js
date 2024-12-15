// Carregando header correto
const token = localStorage.getItem('token');
const body = document.getElementsByTagName("body")[0];

if(token) {
    body.innerHTML = "<greenmind-header>perfil</greenmind-header>" + body.innerHTML;
}
else {
    body.innerHTML = "<greenmind-header></greenmind-header>" + body.innerHTML;
}
//////////////

const backURL = "https://backend-greenmind-degdgcebgvesfua9.brazilsouth-01.azurewebsites.net/api/pontosreciclagem";
let map;
if(localStorage.getItem("pontos-favoritos") == null) {
    localStorage.setItem("pontos-favoritos", JSON.stringify([]));
}
// const favorites = JSON.parse(localStorage.getItem("pontos-favoritos"));
let favorites;
fetch(backURL, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}).then((res) => {
    return res.json();
}).then((dados) => {
    if(dados.success) {
        favorites = dados.dados;
        updateFavoritesList();
    }
    else {
        console.log(dados);
    }
});

const recyclingCenters = {
            MG: {
                "Belo Horizonte": [
                    { name: "De Filippo Sucatas", address: "Belo Horizonte - MG", coordinates: { lat: -19.9200, lng: -43.9350 } },
                    { name: "BH Recicla Gestão de Resíduos", address: "Contagem - Minas Gerais", coordinates: { lat: -19.9325, lng: -44.0527 } },
                    { name: "MG Recicla Reciclagem de Lixo Eletrônico", address: "Rua Sararé, 47", coordinates: { lat: -19.9092, lng: -43.9543 } },
                    { name: "Reciclagem Tc", address: "Av. Teresa Cristina, 8880", coordinates: { lat: -19.8893, lng: -43.9732 } },
                    { name: "CMR - Reciclagem de Resíduos e Sucatas Ltda", address: "R. Paracatu, 15", coordinates: { lat: -19.9208, lng: -43.9463 } },
                    { name: "Reciclando BH", address: "Av. Álvaro da Silveira, 170", coordinates: { lat: -19.8865, lng: -43.9731 } },
                    { name: "COMARP - Cooperativa de Material Reciclável da Pampulha", address: "Av. Pres. Antônio Carlos, 4070", coordinates: { lat: -19.8498, lng: -43.9852 } },
                    { name: "Reciclagem Lunardi", address: "Av. Dom Pedro II, 145", coordinates: { lat: -19.9136, lng: -44.0179 } },
                    { name: "Centro Mineiro de Referência em Resíduos - CMRR", address: "Rua Belém, 40", coordinates: { lat: -19.9243, lng: -43.9460 } },
                    { name: "Centro de Reciclagem - SLU GERLU NORDESTE", address: "R. Princesa Leopoldina, 485", coordinates: { lat: -19.9194, lng: -43.9445 } },
                    { name: "Reciclagem Horizonte BH", address: "R. Salomão Camargos, 54", coordinates: { lat: -19.9301, lng: -43.9513 } },
                    { name: "Centro de Reciclagem 3R", address: "R. Padre Paraíso, 181", coordinates: { lat: -19.9091, lng: -43.9317 } },
                    { name: "Reciclagem ️ Cobre, Metal, Alumínio, Latinha, Bateria, Chumbo, Aço inox e outros", address: "Av. Teresa Cristina, 9110", coordinates: { lat: -19.8891, lng: -43.9739 } },
                    { name: "Reciclagem Santa Maria", address: "Av. Álvares Cabral, 982 - 1101", coordinates: { lat: -19.9325, lng: -43.9308 } },
                    { name: "Coopemar - Cooperativa de Catadores de Materiais Recicláveis da Região Oeste de Belo Horizonte", address: "R. Solferina Ricci Pace, 1250", coordinates: { lat: -19.9381, lng: -44.0192 } },
                    { name: "Reciclar", address: "Rua José Marra Freitas, 980", coordinates: { lat: -19.9076, lng: -43.9612 } },
                    { name: "Vem Reciclar", address: "Av. Santa Albertina, 540", coordinates: { lat: -19.9064, lng: -43.9805 } },
                    { name: "Reciclagem BH", address: "R. Frei Gáspar, 10", coordinates: { lat: -19.9056, lng: -43.9371 } },
                    { name: "Ferro Velho e Reciclagem Itapecerica", address: "R. Itapecerica, 189", coordinates: { lat: -19.9397, lng: -44.0181 } },
                    { name: "Reciclagem para todos", address: "R. México, 931", coordinates: { lat: -19.9332, lng: -43.9556 } },
                    { name: "URPV - Unidade de Recebimento de Pequenos Volumes - Liberdade", address: "R. Flôr de Índio, 105", coordinates: { lat: -19.9063, lng: -43.9388 } },
                    { name: "Metais Souza", address: "Rua Peçanha, 15", coordinates: { lat: -19.9212, lng: -43.9564 } },
                    { name: "Projeto Pro Verde - Lixo Eletrônico", address: "R. Itajubá, 170 A", coordinates: { lat: -19.9037, lng: -43.9399 } },
                    { name: "Reciclagem Renato", address: "Contagem - MG", coordinates: { lat: -19.9328, lng: -44.0517 } },
                    { name: "Emile Empresa Mineira De Lixo Eletrônico - Floresta (Cotemig)", address: "Belo Horizonte - MG", coordinates: { lat: -19.9245, lng: -43.9343 } },
                ],
                "Betim": [
                    { name: "Reciclagem Betim", address: "R. Vinte e Quatro, 51", phone: "(31) 97171-5795", coordinates: { lat: -20.0345, lng: -44.1987 } },
                    { name: "R4 Reciclagem", address: "R. Gracyra Resse de Gouvêia, 1123", phone: "(31) 3912-2283", coordinates: { lat: -20.0208, lng: -44.2052 } },
                    { name: "Racri", address: "Av. Juiz Marco Túlio Isaac, 9940", phone: "(31) 3304-9090", coordinates: { lat: -20.0459, lng: -44.2064 } },
                    { name: "Reciclagem Silva", address: "Av. Juiz Marco Túlio Isaac", phone: "(31) 97517-3533", coordinates: { lat: -20.0502, lng: -44.2067 } },
                    { name: "Estação Circular", address: "Av. Juiz Marco Túlio Isaac, 50", phone: null, coordinates: { lat: -20.0505, lng: -44.2051 } },
                    { name: "Piemont Reciclagem", address: "R. Gracyra Resse de Gouvêia", phone: "(31) 97111-9922", coordinates: { lat: -20.0187, lng: -44.2049 } },
                    { name: "Reciclagem Medina", address: "R. Onizia Maria Sabino, 114", phone: "(31) 98504-9754", coordinates: { lat: -20.0212, lng: -44.2043 } },
                    { name: "Betim Reciclagem", address: "R. Maria Cândida, 13", phone: null, coordinates: { lat: -20.0257, lng: -44.2047 } },
                    { name: "Reciclagem Venâncio", address: "R. Paulo Costa, 320", phone: "(31) 3591-7465", coordinates: { lat: -20.0293, lng: -44.2049 } },
                    { name: "Brasil Reciclagem MG", address: "R. Antônio Soares de Melo, 61", phone: "(31) 98955-7206", coordinates: { lat: -20.0333, lng: -44.2062 } },
                    { name: "NICANOR RECICLAGEM LTDA", address: "R. Paulo Costa", phone: "+1 407-697-1810", coordinates: { lat: -20.0295, lng: -44.2055 } },
                    { name: "5RS Reciclagem de Vidros", address: "Distrito Industrial - R. P, 299", phone: "(31) 3234-7210", coordinates: { lat: -20.0381, lng: -44.2043 } },
                    { name: "Reciclagem Itacolomi", address: "R. Riachão", phone: null, coordinates: { lat: -20.0311, lng: -44.2044 } },
                    { name: "ASH Reciclagem", address: "Av. Antônio Carlos, 63", phone: "(31) 99444-1774", coordinates: { lat: -20.0351, lng: -44.2059 } },
                    { name: "Reciclagem Bandeirantes", address: "Av. Bandeirantes, 103", phone: "(31) 98372-0954", coordinates: { lat: -20.0480, lng: -44.2007 } },
                    { name: "Ed Metais Recicláveis", address: "BR 381 KM 429, nº 68", phone: "(31) 98506-7411", coordinates: { lat: -20.0655, lng: -44.2033 } },
                    { name: "Sucalog - Betim", address: "Rodovia BR-381, Rod. Fernão Dias, 900", phone: "(31) 4042-4415", coordinates: { lat: -20.0617, lng: -44.2138 } },
                    { name: "Reciclagem Pais e Filhos", address: "Av. Juiz Marco Túlio Isaac, 10836", phone: "(31) 99518-8717", coordinates: { lat: -20.0512, lng: -44.2133 } },
                    { name: "ML Reciclagem", address: "R. Santa Helena, 384", phone: "(31) 3597-0050", coordinates: { lat: -20.0284, lng: -44.2072 } },
                    { name: "Resiminas Reciclagens", address: "R. Boa Esperança, 70", phone: "(31) 97400-8055", coordinates: { lat: -20.0321, lng: -44.2090 } }
    
                ],
                "Brumadinho": [
                    
                    { name: "Alô Reciclagem", address: "R. Doná Belmira, 72B", coordinates: { lat: -20.2215, lng: -44.3258 } },
                    { name: "Ascavap", address: "Av. Inhotim, 641 - Galpão", coordinates: { lat: -20.2197, lng: -44.3065 } }
                ],
                "Contagem": [
                    { name: "Ferro Velho Sucatamos", address: "418 Avenida Tancredo Neves", coordinates: { lat: -19.9393, lng: -44.0477 } },
                    { name: "CSR Sucatas Ltda", address: "Via Expressa de Contagem, 9350", coordinates: { lat: -19.9268, lng: -44.0579 } },
                    { name: "GNF Reciclagem", address: "R. Dezenove, 318", coordinates: { lat: -19.9184, lng: -44.0553 } },
                    { name: "Serv Soluções em Metais Recicláveis", address: "R. Zelinda da Silva, 90", coordinates: { lat: -19.9231, lng: -44.0585 } },
                    { name: "Ecoponto Bela Vista", address: "R. José Pedro de Araújo, 115", coordinates: { lat: -19.9278, lng: -44.0512 } },
                    { name: "Trindade Reciclagem", address: "Av. Teresa Cristina, 313", coordinates: { lat: -19.9129, lng: -44.0490 } },
                    { name: "Comercial Pai e Filhos", address: "R. Dr. Arthur Hermeto, 325", coordinates: { lat: -19.9243, lng: -44.0541 } },
                    { name: "Reciclagem Bela Vista", address: "R. Manoel Pereira Mendes, 504", coordinates: { lat: -19.9207, lng: -44.0493 } },
                    { name: "Resicom Resíduos Industriais Ltda", address: "Av. General David Sarnoff, 2662", coordinates: { lat: -19.9165, lng: -44.0421 } },
                    { name: "Ambiental Materiais Recicláveis", address: "R. Alfa, 455", coordinates: { lat: -19.9172, lng: -44.0582 } },
                    { name: "Reciclagem Eldorado", address: "Av. Francisco Firmo de Matos", coordinates: { lat: -19.9284, lng: -44.0631 } },
                    { name: "Koprum", address: "R. Santiago Balesteiros, 260", coordinates: { lat: -19.9195, lng: -44.0473 } },
                    { name: "DISQUE COLETA ELETRÔNICA", address: "R. Ver. José Augusto Diniz", coordinates: { lat: -19.9221, lng: -44.0508 } },
                    { name: "PAGUS Comércio de Sucatas Ltda", address: "Av. Severino Ballesteros, 3203", coordinates: { lat: -19.9215, lng: -44.0485 } },
                    { name: "Eldorado Comércio de Sucatas Ltda", address: "BR-040, 2450", coordinates: { lat: -19.9160, lng: -44.0410 } },
                    { name: "Ana C L K Machado", address: "R. Cinqüenta e Três, 86", coordinates: { lat: -19.9248, lng: -44.0577 } },
                    { name: "Emil Metálicos Ltda", address: "R. Manoel Pereira Mendes, 85", coordinates: { lat: -19.9209, lng: -44.0502 } },
                    { name: "Reso Ambiental", address: "R. Joaíma, 475b", coordinates: { lat: -19.9214, lng: -44.0458 } },
                    { name: "NBN Sucatas", address: "Av. Águas Marinhas, 18", coordinates: { lat: -19.9262, lng: -44.0586 } },
                    { name: "Quality Injet", address: "R. do Registro, 1.782", coordinates: { lat: -19.9189, lng: -44.0480 } }
                ],
               
                "Caeté": [
                    { name: "Grupo Seiva", address: "Av. João Pinheiro, R. Pedra Branca, 4543 - LJ 09", coordinates: { lat: -19.7382, lng: -43.5641 } },
                    { name: "Papel Reciclado", address: "Av. Dr. João Pinheiro, 751", coordinates: { lat: -19.7370, lng: -43.5663 } }
                ],
                "Esmeraldas": [
                    { name: "Paletes Esmeraldas", address: "Ao lado do restaurante frango com quiabo - Rua Carlos Marques reis, sn", coordinates: { lat: -19.8345, lng: -43.7621 } },
                    { name: "ASCAMARE - Associação dos Catadores de Materiais Recicláveis de Esmeraldas", address: "Esmeraldas - MG", coordinates: { lat: -19.8442, lng: -43.7625 } },
                    { name: "Reciclagem Melo Viana", address: "VIANINHA - Antiga carajás, R. Marajás, 17", coordinates: { lat: -19.8391, lng: -43.7628 } },
                    { name: "Ecoglobal Coleta Seletiva", address: "Av. Brasília, 642", coordinates: { lat: -19.8360, lng: -43.7580 } },
                    { name: "Ferro Velho São Francisco", address: "Av. Brasília", coordinates: { lat: -19.8375, lng: -43.7595 } },
                    { name: "Reciclagem Viviane", address: "R. Carajas, 72", coordinates: { lat: -19.8402, lng: -43.7612 } },
                    { name: "Reciclagem Esmeralda", address: "R. Um", coordinates: { lat: -19.8450, lng: -43.7630 } }
                ],
                "Ibirité": [
                    { name: "EcoCentro Reciclagens", address: "R. José Tavares Filho, 366", coordinates: { lat: -20.0101, lng: -44.0605 } },
                    { name: "A & M Reciclagem", address: "R. Braúnas, 293", coordinates: { lat: -20.0202, lng: -44.0610 } },
                    { name: "Reciclagem Andrade Ibirite", address: "R. José Matos Ferreira, 45", coordinates: { lat: -20.0303, lng: -44.0603 } },
                    { name: "Barreiros Reciclagem", address: "R. do Ipê Encantado, 159", coordinates: { lat: -20.0404, lng: -44.0620 } },
                    { name: "Gold Gil", address: "R. Montes Claros", coordinates: { lat: -20.0505, lng: -44.0608 } },
                    { name: "Topa Tudo Vem Que Tem - Bairro Lindéia", address: "Rua Dona Judith de Morais e Barros, 890", coordinates: { lat: -20.0606, lng: -44.0632 } },
                ],
                "Nova Lima": [
                    { name: "Ascap - Assoc. Dos Catad. De Mat. Recicláveis De Nova Lima", address: "Nova Lima - MG", coordinates: { lat: -20.1100, lng: -43.9865 } },
                    { name: "Ecotri Ambiental Gerenciamento de Resíduos", address: "Av. Montreal, 554", coordinates: { lat: -20.1201, lng: -43.9802 } },
                    { name: "Reciclar Ambiental", address: "Rua José Teófilo Valle, R. Campo do Pires, 705", coordinates: { lat: -20.1302, lng: -43.9730 } },
                    { name: "Associação dos Catadores de Papel e Mat Reciclave", address: "R. Laudelino Vicente Silva, 35", coordinates: { lat: -20.1403, lng: -43.9607 } },
                    { name: "Centro de Educação Ambiental de Nova Lima", address: "Av. Prof. Aldo Zanini, 3050", coordinates: { lat: -20.1504, lng: -43.9458 } }
                ],
                "Santa Luzia": [
                    { name: "Centro de Reciclagem e Ferro Velho Santa Luzia", address: "Av. Yolanda Teixeira da Costa, 1577", coordinates: { lat: -19.7031, lng: -43.9049 } },
                    { name: "Ultra mega eco reciclagens", address: "R. Rubi, 325", coordinates: { lat: -19.6904, lng: -43.9281 } },
                    { name: "Centro de Reciclagem e Ferro Velho - Renovar", address: "Rua Guapuhy, 10", coordinates: { lat: -19.6876, lng: -43.9143 } },
                    { name: "L.O.S RECICLAGEM", address: "Av. Ásia, 36", coordinates: { lat: -19.7038, lng: -43.8996 } },
                    { name: "Comércio de Metais Militão", address: "R. Caviúna, 193", coordinates: { lat: -19.7054, lng: -43.8932 } },
                    { name: "Reciclarc Jateamento", address: "Av. Brasília, 5833", coordinates: { lat: -19.7223, lng: -43.9301 } },
                    { name: "Ferro Velho Galpão - Reciclagem de Metais", address: "R. Eldorado, 117", coordinates: { lat: -19.7328, lng: -43.9025 } },
                    { name: "Matos Reciclagem de Plásticos (RECICLOS)", address: "Av. Brasília, 4300", coordinates: { lat: -19.7185, lng: -43.9141 } },
                    { name: "FERRO VELHO PAI & FILHO", address: "Av. Raul Teixeira da Costa Sobrinho, 398", coordinates: { lat: -19.6939, lng: -43.9160 } },
                    { name: "Ferro Velho Ra Frimisa", address: "Av. Frimisa, 157", coordinates: { lat: -19.7290, lng: -43.8992 } },
                    { name: "Ecoponto 5 Santa Luzia Conj. Cristina", address: "Av. Yolanda Teixeira da Costa, 292", coordinates: { lat: -19.7027, lng: -43.9013 } },
                    { name: "PSA Sucatas", address: "Av. Beira-Rio, 2635A", coordinates: { lat: -19.7205, lng: -43.9056 } },
                    { name: "Sucata União LTDA", address: "Av. Beira-Rio, s/n", coordinates: { lat: -19.7234, lng: -43.9062 } },
                    { name: "Ferro velho do baiano", address: "R. Nova Jerusalém, 688", coordinates: { lat: -19.7170, lng: -43.9017 } }
                ],
                "Juiz de Fora": [
                    { name: "EcoJF", address: "Rua Halfeld, 400", coordinates: { lat: -21.7594, lng: -43.3496 } },
                    { name: "Recicla Juiz de Fora", address: "Av. Rio Branco, 500", coordinates: { lat: -21.7603, lng: -43.3512 } },
                    { name: "Verde Juiz de Fora", address: "Rua São João, 300", coordinates: { lat: -21.7587, lng: -43.3501 } }
                ],
                 }                        
                    };




// Inicializa o mapa usando o OpenStreetMap com Leaflet
function initMap() {
    map = L.map('map').setView([-14.2350, -51.9253], 4); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    updateFavoritesList();
}


function updateCities() {
    const state = document.getElementById("state-select").value;
    const citySelect = document.getElementById("city-select");
    citySelect.innerHTML = '<option value="">Selecione a cidade</option>';

    if (state && recyclingCenters[state]) {
        const cities = Object.keys(recyclingCenters[state]);
        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

// Mostra os centros de reciclagem no mapa para a cidade selecionada
function showRecyclingCenters() {
    const state = document.getElementById("state-select").value;
    const city = document.getElementById("city-select").value;

    if (state && city && recyclingCenters[state][city]) {
        const firstLocation = recyclingCenters[state][city][0].coordinates;
        map.setView([firstLocation.lat, firstLocation.lng], 12);

        recyclingCenters[state][city].forEach(center => {
            const marker = L.marker([center.coordinates.lat, center.coordinates.lng]).addTo(map);
            marker.bindPopup(`
                <h3>${center.name}</h3>
                <p>${center.address}</p>
                <button onclick="addToFavorites('${center.name}', '${center.address}')">Favoritar</button>
            `);
        });
    } else {
        alert("Selecione um estado e uma cidade válidos.");
    }
}

// Adiciona o ponto de reciclagem aos favoritos
function addToFavorites(name, address) {
    if(favorites.some(fav => fav.nome === name)) {
        alert(`${name} já está nos favoritos.`);
        return;
    }
    fetch(backURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: name,
            endereco: address,
            token: localStorage.getItem("token")
        })
    }).then((res) => {
        return res.json();
    }).then((dados) => {
        if(dados.success) {
            console.log("sucesso");
            favorites.push({ nome: name, endereco: address });
            updateFavoritesList();
            alert(`${name} foi adicionado aos favoritos!`);
        }
        else {
            console.log(dados);
            alert(dados.mensagem);
        }
    })
}

// Atualiza a lista de favoritos na interface
function updateFavoritesList() {
    localStorage.setItem("pontos-favoritos", JSON.stringify(favorites));
    const favoritesList = document.getElementById("favorites-list");
    favoritesList.innerHTML = "";

    favorites.forEach(fav => {
        const listItem = document.createElement("li");
        listItem.textContent = `${fav.nome} - ${fav.endereco}`;
        favoritesList.appendChild(listItem);
    });
}

// Inicializa o mapa assim que a página carrega
window.onload = initMap;
