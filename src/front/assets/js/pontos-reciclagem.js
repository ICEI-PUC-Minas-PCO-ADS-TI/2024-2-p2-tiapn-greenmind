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

const backURL = "http://localhost:3000/api/pontosreciclagem";
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
    AC: {
        "Rio Branco": [
            { name: "Recicla Acre", address: "Av. Ceará, 1500", coordinates: { lat: -9.97499, lng: -67.82431 } },
            { name: "EcoPonto Centro", address: "Rua Marechal Deodoro, 500", coordinates: { lat: -9.97560, lng: -67.80891 } },
            { name: "Centro Verde", address: "Rua Isaura Parente, 950", coordinates: { lat: -9.9743, lng: -67.8222 } }
        ],
        "Cruzeiro do Sul": [
            { name: "Centro Ambiental", address: "Av. Copacabana, 800", coordinates: { lat: -7.62784, lng: -72.6756 } },
            { name: "EcoPonto Cruzeiro", address: "Rua Acre, 300", coordinates: { lat: -7.6321, lng: -72.6702 } },
            { name: "Recicla Sul", address: "Av. Amazonas, 450", coordinates: { lat: -7.6284, lng: -72.6771 } }
        ],
        "Sena Madureira": [
            { name: "Recicla Sena", address: "Av. Brasil, 750", coordinates: { lat: -9.06568, lng: -68.6571 } },
            { name: "EcoPonto Sena", address: "Rua Santos Dumont, 320", coordinates: { lat: -9.0678, lng: -68.6604 } },
            { name: "Verde Sena", address: "Rua 25 de Setembro, 200", coordinates: { lat: -9.0682, lng: -68.6569 } }
        ],
        "Tarauacá": [
            { name: "EcoTarauacá", address: "Rua Rio Branco, 100", coordinates: { lat: -8.1560, lng: -70.7658 } },
            { name: "Reciclagem Tarauacá", address: "Av. Independência, 300", coordinates: { lat: -8.1574, lng: -70.7631 } },
            { name: "EcoAmigo", address: "Rua 12 de Outubro, 250", coordinates: { lat: -8.1582, lng: -70.7613 } }
        ],
        "Brasiléia": [
            { name: "Centro de Reciclagem Brasiléia", address: "Rua Santos Dumont, 300", coordinates: { lat: -10.9948, lng: -68.7461 } },
            { name: "EcoVerde", address: "Av. Prefeito Rolando Moreira, 500", coordinates: { lat: -10.9923, lng: -68.7485 } },
            { name: "Verde Brasiléia", address: "Av. Brasil, 600", coordinates: { lat: -10.9952, lng: -68.7458 } }
        ]
    },
    AL: {
        "Maceió": [
            { name: "EcoPonto Maceió", address: "Av. Fernandes Lima, 2300", coordinates: { lat: -9.64823, lng: -35.71889 } },
            { name: "Reciclagem Lagoa", address: "Rua do Comércio, 600", coordinates: { lat: -9.6411, lng: -35.7315 } },
            { name: "Verde Mais", address: "Rua Padre Roma, 900", coordinates: { lat: -9.6443, lng: -35.7102 } }
        ],
        "Arapiraca": [
            { name: "Recicla Arapiraca", address: "R. Estudante, 400", coordinates: { lat: -9.75197, lng: -36.6617 } },
            { name: "EcoArapiraca", address: "Av. Governador Lamenha Filho, 250", coordinates: { lat: -9.7574, lng: -36.6633 } },
            { name: "Verde Arapiraca", address: "Rua do Sol, 100", coordinates: { lat: -9.7583, lng: -36.6612 } }
        ],
        "Palmeira dos Índios": [
            { name: "EcoPalmeira", address: "R. Independência, 350", coordinates: { lat: -9.4059, lng: -36.6318 } },
            { name: "Centro de Reciclagem Palmeira", address: "Rua Frei Damião, 200", coordinates: { lat: -9.4071, lng: -36.6305 } },
            { name: "Recicla Palmeira", address: "Av. Brasil, 400", coordinates: { lat: -9.4063, lng: -36.6314 } }
        ],
        "Rio Largo": [
            { name: "Reciclagem Rio Largo", address: "Av. Aeroporto, 1200", coordinates: { lat: -9.4851, lng: -35.8530 } },
            { name: "EcoRio", address: "Rua Governador Lamenha Filho, 700", coordinates: { lat: -9.4856, lng: -35.8548 } },
            { name: "Verde Rio Largo", address: "Av. Brasil, 900", coordinates: { lat: -9.4849, lng: -35.8527 } }
        ],
        "Penedo": [
            { name: "EcoPonto Penedo", address: "Rua São Francisco, 550", coordinates: { lat: -10.2875, lng: -36.5854 } },
            { name: "Recicla Penedo", address: "Av. Getúlio Vargas, 1300", coordinates: { lat: -10.2900, lng: -36.5832 } },
            { name: "Centro Verde Penedo", address: "Rua da Praia, 400", coordinates: { lat: -10.2850, lng: -36.5844 } }
        ]
    },
    AM: {
        "Manaus": [
            { name: "Recicla Manaus", address: "Av. Djalma Batista, 200", coordinates: { lat: -3.10194, lng: -60.02578 } },
            { name: "EcoManaus", address: "Rua Leonardo Malcher, 850", coordinates: { lat: -3.1087, lng: -60.0210 } },
            { name: "Centro Verde", address: "Av. Recife, 100", coordinates: { lat: -3.1068, lng: -60.0164 } }
        ],
        "Parintins": [
            { name: "Recicla Parintins", address: "Av. Paraíba, 120", coordinates: { lat: -2.6283, lng: -56.7351 } },
            { name: "EcoPonto Parintins", address: "Rua Amazonas, 320", coordinates: { lat: -2.6305, lng: -56.7362 } },
            { name: "Verde Parintins", address: "Rua Central, 400", coordinates: { lat: -2.6295, lng: -56.7373 } }
        ],
        "Itacoatiara": [
            { name: "EcoItacoatiara", address: "Av. Parque, 540", coordinates: { lat: -3.1378, lng: -58.4435 } },
            { name: "Ponto Verde", address: "Rua Minas Gerais, 200", coordinates: { lat: -3.1389, lng: -58.4446 } },
            { name: "Recicla Itacoatiara", address: "Rua do Sol, 150", coordinates: { lat: -3.1390, lng: -58.4422 } }
        ],
        "Manacapuru": [
            { name: "Recicla Manacapuru", address: "Av. Floriano Peixoto, 1000", coordinates: { lat: -3.2907, lng: -60.6214 } },
            { name: "EcoCentro Manacapuru", address: "Rua Manaus, 900", coordinates: { lat: -3.2921, lng: -60.6235 } },
            { name: "Verde Manacapuru", address: "Rua da Independência, 600", coordinates: { lat: -3.2932, lng: -60.6223 } }
        ],
        "Coari": [
            { name: "Centro de Reciclagem Coari", address: "Av. Amazonas, 250", coordinates: { lat: -4.085, lng: -63.142 } },
            { name: "EcoCoari", address: "Rua Recife, 750", coordinates: { lat: -4.084, lng: -63.141 } },
            { name: "Recicla Coari", address: "Av. Amazonas, 300", coordinates: { lat: -4.086, lng: -63.140 } }
        ]
    },
    BA: {
        "Salvador": [
            { name: "Centro de Reciclagem Itapuã", address: "Av. Dorival Caymmi, 500", coordinates: { lat: -12.94325, lng: -38.36509 } },
            { name: "Recicla Barra", address: "Av. Oceânica, 100", coordinates: { lat: -12.9775, lng: -38.5016 } },
            { name: "EcoSalvador", address: "Rua João das Botas, 700", coordinates: { lat: -12.9614, lng: -38.5017 } }
        ],
        "Feira de Santana": [
            { name: "EcoFeira", address: "Av. Getúlio Vargas, 100", coordinates: { lat: -12.2610, lng: -38.9647 } },
            { name: "Centro Reciclagem Norte", address: "Rua Castro Alves, 300", coordinates: { lat: -12.2630, lng: -38.9683 } },
            { name: "Verde Feira", address: "Rua do Rosário, 200", coordinates: { lat: -12.2640, lng: -38.9672 } }
        ],
        "Vitória da Conquista": [
            { name: "Recicla Vitória", address: "Av. Bartolomeu de Gusmão, 400", coordinates: { lat: -14.8657, lng: -40.8399 } },
            { name: "EcoCentro Vitória", address: "Rua Dois de Julho, 600", coordinates: { lat: -14.8651, lng: -40.8413 } },
            { name: "Verde Vitória", address: "Av. Brumado, 900", coordinates: { lat: -14.8635, lng: -40.8417 } }
        ],
        "Itabuna": [
            { name: "EcoItabuna", address: "Av. Cinquentenário, 250", coordinates: { lat: -14.7889, lng: -39.2785 } },
            { name: "Centro Verde", address: "Rua Alzira Paim, 150", coordinates: { lat: -14.7895, lng: -39.2790 } },
            { name: "Verde Itabuna", address: "Av. Beira Rio, 500", coordinates: { lat: -14.7878, lng: -39.2767 } }
        ],
        "Ilhéus": [
            { name: "Recicla Ilhéus", address: "Av. Itabuna, 400", coordinates: { lat: -14.7935, lng: -39.2765 } },
            { name: "EcoCentro Ilhéus", address: "Rua Jorge Amado, 300", coordinates: { lat: -14.7942, lng: -39.2769 } },
            { name: "Verde Ilhéus", address: "Rua Conselheiro Antônio Cidreira, 200", coordinates: { lat: -14.7947, lng: -39.2772 } }
        ]
    },
    CE: {
        "Fortaleza": [
            { name: "Recicla Fortaleza", address: "Av. Beira Mar, 2500", coordinates: { lat: -3.71722, lng: -38.54323 } },
            { name: "EcoPraia", address: "Rua dos Tabajaras, 500", coordinates: { lat: -3.7186, lng: -38.5431 } },
            { name: "Reciclagem Centro", address: "Av. Domingos Olímpio, 650", coordinates: { lat: -3.7341, lng: -38.5265 } }
        ],
        "Juazeiro do Norte": [
            { name: "EcoJuazeiro", address: "Rua São Pedro, 300", coordinates: { lat: -7.2149, lng: -39.3155 } },
            { name: "Verde Juazeiro", address: "Rua da Matriz, 500", coordinates: { lat: -7.2139, lng: -39.3145 } },
            { name: "Centro de Reciclagem", address: "Rua São Francisco, 150", coordinates: { lat: -7.2123, lng: -39.3160 } }
        ]
    },
        DF: {
            "Brasília": [
                { name: "EcoBrasília", address: "Setor Comercial Sul, Quadra 3", coordinates: { lat: -15.7941, lng: -47.8825 } },
                { name: "Recicla Asa Norte", address: "SQN 214", coordinates: { lat: -15.7624, lng: -47.8831 } },
                { name: "Verde Sul", address: "SEPS 712/912", coordinates: { lat: -15.8006, lng: -47.8992 } }
            ],
            "Taguatinga": [
                { name: "Recicla Taguatinga", address: "Praça do Relógio", coordinates: { lat: -15.8367, lng: -48.0572 } },
                { name: "EcoPonto Centro", address: "QND 12", coordinates: { lat: -15.8323, lng: -48.0602 } },
                { name: "Verde Norte", address: "QNL 10", coordinates: { lat: -15.8286, lng: -48.0623 } }
            ],
            "Gama": [
                { name: "EcoGama", address: "Setor Leste, Quadra 2", coordinates: { lat: -16.0194, lng: -48.0739 } },
                { name: "Recicla Sul", address: "Área Especial 7", coordinates: { lat: -16.0204, lng: -48.0778 } },
                { name: "Centro Verde", address: "Quadra 14", coordinates: { lat: -16.0185, lng: -48.0746 } }
            ],
            "Ceilândia": [
                { name: "EcoCeilândia", address: "QNM 19", coordinates: { lat: -15.8132, lng: -48.1036 } },
                { name: "Reciclagem Centro", address: "QNN 14", coordinates: { lat: -15.8143, lng: -48.1023 } },
                { name: "Verde Leste", address: "QNL 20", coordinates: { lat: -15.8108, lng: -48.1019 } }
            ],
            "Planaltina": [
                { name: "Recicla Planaltina", address: "Av. Brasília, 100", coordinates: { lat: -15.6077, lng: -47.6487 } },
                { name: "EcoPonto Norte", address: "Setor Norte, 200", coordinates: { lat: -15.6092, lng: -47.6456 } },
                { name: "Verde Oeste", address: "Setor Oeste, 300", coordinates: { lat: -15.6111, lng: -47.6478 } }
            ]
        },
        ES: {
            "Vitória": [
                { name: "Centro de Reciclagem Vitória", address: "R. Vitória Régia, 100", coordinates: { lat: -20.3155, lng: -40.3128 } },
                { name: "EcoPonto Centro", address: "Av. Jerônimo Monteiro, 250", coordinates: { lat: -20.3174, lng: -40.3133 } },
                { name: "Verde Vitória", address: "Av. Princesa Isabel, 150", coordinates: { lat: -20.3193, lng: -40.3121 } }
            ],
            "Vila Velha": [
                { name: "Recicla Vila Velha", address: "Praia da Costa, 500", coordinates: { lat: -20.3299, lng: -40.2923 } },
                { name: "EcoPonto Laranjeiras", address: "Rua Laranjeiras, 200", coordinates: { lat: -20.3351, lng: -40.2900 } },
                { name: "Verde Mar", address: "Av. Antônio Gil Veloso, 300", coordinates: { lat: -20.3290, lng: -40.2954 } }
            ],
            "Serra": [
                { name: "EcoSerra", address: "Av. Central, 100", coordinates: { lat: -20.1285, lng: -40.3074 } },
                { name: "Centro de Reciclagem", address: "Rua São Lourenço, 200", coordinates: { lat: -20.1325, lng: -40.3103 } },
                { name: "Verde Serra", address: "Av. Jacaraípe, 300", coordinates: { lat: -20.1256, lng: -40.3098 } }
            ],
            "Cariacica": [
                { name: "Recicla Cariacica", address: "Av. Cariacica, 400", coordinates: { lat: -20.3539, lng: -40.3916 } },
                { name: "EcoPonto Campo Grande", address: "Rua Campo Grande, 150", coordinates: { lat: -20.3551, lng: -40.3927 } },
                { name: "Verde Cidade", address: "Av. Expedito Garcia, 500", coordinates: { lat: -20.3547, lng: -40.3909 } }
            ],
            "Guarapari": [
                { name: "EcoPonto Guarapari", address: "Praia do Morro, 250", coordinates: { lat: -20.6701, lng: -40.4965 } },
                { name: "Recicla Sol", address: "Rua dos Pescadores, 300", coordinates: { lat: -20.6712, lng: -40.4983 } },
                { name: "Verde Guarapari", address: "Av. Praiana, 150", coordinates: { lat: -20.6698, lng: -40.4951 } }
            ]
        },
        GO: {
            "Goiânia": [
                { name: "Recicla Goiânia", address: "Av. Goiás, 1500", coordinates: { lat: -16.6869, lng: -49.2643 } },
                { name: "EcoPonto Oeste", address: "Rua 24 de Outubro, 500", coordinates: { lat: -16.6879, lng: -49.2612 } },
                { name: "Verde Sul", address: "Av. T-63, 250", coordinates: { lat: -16.6885, lng: -49.2648 } }
            ],
            "Anápolis": [
                { name: "EcoAnápolis", address: "Av. Brasil, 300", coordinates: { lat: -16.3332, lng: -48.9524 } },
                { name: "Recicla Centro", address: "Rua Central, 600", coordinates: { lat: -16.3350, lng: -48.9501 } },
                { name: "Verde Leste", address: "Av. Goiás, 450", coordinates: { lat: -16.3325, lng: -48.9517 } }
            ],
            "Aparecida de Goiânia": [
                { name: "EcoAparecida", address: "Rua 6, 200", coordinates: { lat: -16.8198, lng: -49.2469 } },
                { name: "Recicla Sul", address: "Av. Independência, 750", coordinates: { lat: -16.8204, lng: -49.2475 } },
                { name: "Verde Norte", address: "Rua das Palmeiras, 550", coordinates: { lat: -16.8187, lng: -49.2458 } }
            ],
            "Rio Verde": [
                { name: "Recicla Rio Verde", address: "Av. Presidente Vargas, 100", coordinates: { lat: -17.7923, lng: -50.9191 } },
                { name: "EcoVerde", address: "Rua do Comércio, 500", coordinates: { lat: -17.7917, lng: -50.9185 } },
                { name: "Centro Verde", address: "Av. Pausanes, 300", coordinates: { lat: -17.7920, lng: -50.9202 } }
            ],
            "Luziânia": [
                { name: "EcoLuziânia", address: "Rua Santa Maria, 100", coordinates: { lat: -16.2538, lng: -47.9512 } },
                { name: "Recicla Centro", address: "Av. Central, 450", coordinates: { lat: -16.2549, lng: -47.9508 } },
                { name: "Verde Luz", address: "Rua Goiás, 300", coordinates: { lat: -16.2534, lng: -47.9519 } }
            ]
        },
        MA: {
            "São Luís": [
                { name: "EcoSão Luís", address: "Av. dos Holandeses, 2000", coordinates: { lat: -2.5296, lng: -44.3022 } },
                { name: "Recicla Norte", address: "Rua do Sol, 100", coordinates: { lat: -2.5307, lng: -44.3031 } },
                { name: "Verde Leste", address: "Av. Marechal Castelo Branco, 300", coordinates: { lat: -2.5315, lng: -44.3015 } }
            ],
            "Imperatriz": [
                { name: "Recicla Imperatriz", address: "Rua Brasil, 500", coordinates: { lat: -5.5184, lng: -47.4774 } },
                { name: "EcoPonto Oeste", address: "Av. Getúlio Vargas, 200", coordinates: { lat: -5.5195, lng: -47.4786 } },
                { name: "Verde Centro", address: "Rua do Comércio, 150", coordinates: { lat: -5.5179, lng: -47.4792 } }
            ],
            "Caxias": [
                { name: "EcoCaxias", address: "Av. Alexandre Costa, 300", coordinates: { lat: -4.8646, lng: -43.3562 } },
                { name: "Recicla Leste", address: "Rua Coelho Neto, 600", coordinates: { lat: -4.8625, lng: -43.3551 } },
                { name: "Verde Sul", address: "Av. Santos Dumont, 150", coordinates: { lat: -4.8637, lng: -43.3543 } }
            ]
        },
        MT: {
            "Cuiabá": [
                { name: "Recicla Cuiabá", address: "Av. Miguel Sutil, 1000", coordinates: { lat: -15.601, lng: -56.0974 } },
                { name: "EcoCentro", address: "Rua do Comércio, 300", coordinates: { lat: -15.6005, lng: -56.0960 } },
                { name: "Verde Cuiabá", address: "Av. Rubens de Mendonça, 600", coordinates: { lat: -15.6021, lng: -56.0989 } }
            ],
            "Várzea Grande": [
                { name: "EcoPonto VG", address: "Rua São Sebastião, 250", coordinates: { lat: -15.6451, lng: -56.1323 } },
                { name: "Verde VG", address: "Av. Filinto Müller, 150", coordinates: { lat: -15.6444, lng: -56.1315 } },
                { name: "Recicla VG", address: "Rua Dom Orlando Chaves, 400", coordinates: { lat: -15.6467, lng: -56.1332 } }
            ],
            "Rondonópolis": [
                { name: "EcoRondonópolis", address: "Av. Cuiabá, 500", coordinates: { lat: -16.4705, lng: -54.6347 } },
                { name: "Centro Verde", address: "Rua Poxoréo, 300", coordinates: { lat: -16.4718, lng: -54.6329 } },
                { name: "Recicla Rondon", address: "Av. Brasil, 200", coordinates: { lat: -16.4698, lng: -54.6351 } }
            ],
            "Sinop": [
                { name: "Recicla Sinop", address: "Rua das Orquídeas, 450", coordinates: { lat: -11.8646, lng: -55.5081 } },
                { name: "EcoCentro Sinop", address: "Av. dos Jacarandás, 250", coordinates: { lat: -11.8659, lng: -55.5070 } },
                { name: "Verde Norte", address: "Rua das Primaveras, 300", coordinates: { lat: -11.8635, lng: -55.5054 } }
            ]
        },
            MG: {
                "Belo Horizonte": [
                    { name: "EcoPonto Savassi", address: "Av. Getúlio Vargas, 1000", coordinates: { lat: -19.9333, lng: -43.9358 } },
                    { name: "Recicla BH", address: "Praça da Liberdade, 250", coordinates: { lat: -19.9350, lng: -43.9371 } },
                    { name: "Verde Horizonte", address: "Rua dos Guajajaras, 800", coordinates: { lat: -19.9365, lng: -43.9402 } }
                ],
                "Uberlândia": [
                    { name: "EcoPonto Uberlândia", address: "Av. Afonso Pena, 500", coordinates: { lat: -18.9146, lng: -48.2753 } },
                    { name: "Recicla Uberlândia", address: "Rua dos Ferreiros, 300", coordinates: { lat: -18.9133, lng: -48.2781 } },
                    { name: "Verde Cidade", address: "Av. Floriano Peixoto, 750", coordinates: { lat: -18.9120, lng: -48.2762 } }
                ],
                "Contagem": [
                    { name: "Recicla Contagem", address: "Av. João César de Oliveira, 400", coordinates: { lat: -19.9338, lng: -44.0524 } },
                    { name: "EcoPonto Riacho", address: "Rua Rio Comprido, 300", coordinates: { lat: -19.9325, lng: -44.0510 } },
                    { name: "Verde Contagem", address: "Rua Rio Negro, 500", coordinates: { lat: -19.9314, lng: -44.0502 } }
                ],
                "Betim": [
                    { name: "EcoBetim", address: "Av. Edméia Matos Lazarotti, 800", coordinates: { lat: -19.9654, lng: -44.1987 } },
                    { name: "Recicla Centro", address: "Rua do Rosário, 150", coordinates: { lat: -19.9645, lng: -44.1999 } },
                    { name: "Verde Betim", address: "Av. Amazonas, 600", coordinates: { lat: -19.9667, lng: -44.1971 } }
                ],
                "Juiz de Fora": [
                    { name: "EcoJF", address: "Rua Halfeld, 400", coordinates: { lat: -21.7594, lng: -43.3496 } },
                    { name: "Recicla Juiz de Fora", address: "Av. Rio Branco, 500", coordinates: { lat: -21.7603, lng: -43.3512 } },
                    { name: "Verde Juiz de Fora", address: "Rua São João, 300", coordinates: { lat: -21.7587, lng: -43.3501 } }
                ]
            },
            PR: {
                "Curitiba": [
                    { name: "Recicla Curitiba", address: "Av. Sete de Setembro, 3000", coordinates: { lat: -25.4286, lng: -49.2744 } },
                    { name: "EcoCentro", address: "Rua XV de Novembro, 700", coordinates: { lat: -25.4295, lng: -49.2733 } },
                    { name: "Verde Sul", address: "Rua das Flores, 400", coordinates: { lat: -25.4278, lng: -49.2755 } }
                ],
                "Londrina": [
                    { name: "Recicla Londrina", address: "Rua Paranaguá, 200", coordinates: { lat: -23.3103, lng: -51.1628 } },
                    { name: "EcoPonto Norte", address: "Rua Goiás, 500", coordinates: { lat: -23.3116, lng: -51.1601 } },
                    { name: "Verde Norte", address: "Av. Higienópolis, 300", coordinates: { lat: -23.3124, lng: -51.1587 } }
                ],
                "Maringá": [
                    { name: "EcoMaringá", address: "Av. Brasil, 1200", coordinates: { lat: -23.4201, lng: -51.9330 } },
                    { name: "Recicla Sul", address: "Rua Mem de Sá, 300", coordinates: { lat: -23.4197, lng: -51.9344 } },
                    { name: "Verde Maringá", address: "Rua Joubert de Carvalho, 150", coordinates: { lat: -23.4215, lng: -51.9319 } }
                ],
                "Ponta Grossa": [
                    { name: "Recicla PG", address: "Av. Vicente Machado, 1000", coordinates: { lat: -25.0950, lng: -50.1619 } },
                    { name: "EcoPonto Norte", address: "Rua Bonifácio Vilela, 500", coordinates: { lat: -25.0944, lng: -50.1602 } },
                    { name: "Verde Centro", address: "Rua Francisco Ribas, 200", coordinates: { lat: -25.0967, lng: -50.1625 } }
                ],
                "Cascavel": [
                    { name: "EcoCascavel", address: "Rua Paraná, 600", coordinates: { lat: -24.9578, lng: -53.4593 } },
                    { name: "Recicla Cascavel", address: "Av. Brasil, 300", coordinates: { lat: -24.9586, lng: -53.4601 } },
                    { name: "Verde Oeste", address: "Rua Rio de Janeiro, 400", coordinates: { lat: -24.9594, lng: -53.4587 } }
                ]
            },
            RS: {
                "Porto Alegre": [
                    { name: "Centro de Reciclagem Sul", address: "Av. Ipiranga, 2000", coordinates: { lat: -30.0475, lng: -51.2157 } },
                    { name: "EcoZona Norte", address: "Rua Farrapos, 600", coordinates: { lat: -30.0466, lng: -51.2139 } },
                    { name: "Verde Centro", address: "Av. Borges de Medeiros, 400", coordinates: { lat: -30.0454, lng: -51.2173 } }
                ],
                "Caxias do Sul": [
                    { name: "Recicla Caxias", address: "Rua Pinheiro Machado, 500", coordinates: { lat: -29.1686, lng: -51.1798 } },
                    { name: "EcoPonto Leste", address: "Av. Júlio de Castilhos, 300", coordinates: { lat: -29.1693, lng: -51.1779 } },
                    { name: "Verde Norte", address: "Rua Sinimbu, 200", coordinates: { lat: -29.1701, lng: -51.1765 } }
                ],
                "Pelotas": [
                    { name: "EcoPelotas", address: "Rua General Neto, 100", coordinates: { lat: -31.7654, lng: -52.3375 } },
                    { name: "Recicla Sul", address: "Av. Bento Gonçalves, 200", coordinates: { lat: -31.7641, lng: -52.3389 } },
                    { name: "Verde Oeste", address: "Rua Marechal Deodoro, 300", coordinates: { lat: -31.7662, lng: -52.3363 } }
                ],
                "Santa Maria": [
                    { name: "Recicla SM", address: "Av. Rio Branco, 500", coordinates: { lat: -29.6868, lng: -53.8146 } },
                    { name: "EcoPonto Central", address: "Rua do Acampamento, 300", coordinates: { lat: -29.6876, lng: -53.8159 } },
                    { name: "Verde Centro", address: "Rua Venâncio Aires, 200", coordinates: { lat: -29.6883, lng: -53.8135 } }
                ],
                "Novo Hamburgo": [
                    { name: "EcoNH", address: "Av. Pedro Adams Filho, 800", coordinates: { lat: -29.6872, lng: -51.1336 } },
                    { name: "Recicla Centro", address: "Rua Joaquim Nabuco, 500", coordinates: { lat: -29.6860, lng: -51.1348 } },
                    { name: "Verde Sul", address: "Av. Nações Unidas, 400", coordinates: { lat: -29.6854, lng: -51.1351 } }
                ]
            },
            SC: {
                "Florianópolis": [
                    { name: "Centro de Reciclagem Florianópolis", address: "Av. Mauro Ramos, 1000", coordinates: { lat: -27.5954, lng: -48.5480 } },
                    { name: "EcoLeste", address: "Rua Bocaiúva, 200", coordinates: { lat: -27.5963, lng: -48.5472 } },
                    { name: "Verde Sul", address: "Av. Beira-Mar Norte, 500", coordinates: { lat: -27.5972, lng: -48.5491 } }
                ],
                "Joinville": [
                    { name: "EcoJoinville", address: "Rua XV de Novembro, 300", coordinates: { lat: -26.3044, lng: -48.8451 } },
                    { name: "Recicla Norte", address: "Av. Getúlio Vargas, 400", coordinates: { lat: -26.3051, lng: -48.8467 } },
                    { name: "Verde Joinville", address: "Rua Blumenau, 500", coordinates: { lat: -26.3062, lng: -48.8449 } }
                ],
                "Blumenau": [
                    { name: "EcoBlumenau", address: "Rua Amazonas, 100", coordinates: { lat: -26.9166, lng: -49.0719 } },
                    { name: "Recicla Sul", address: "Rua 7 de Setembro, 200", coordinates: { lat: -26.9174, lng: -49.0725 } },
                    { name: "Verde Blumenau", address: "Av. Beira Rio, 300", coordinates: { lat: -26.9183, lng: -49.0732 } }
                ],
                "Criciúma": [
                    { name: "Recicla Criciúma", address: "Av. Centenário, 800", coordinates: { lat: -28.6774, lng: -49.3692 } },
                    { name: "EcoPonto Centro", address: "Rua Marechal Floriano, 150", coordinates: { lat: -28.6766, lng: -49.3684 } },
                    { name: "Verde Sul", address: "Rua Henrique Lage, 200", coordinates: { lat: -28.6758, lng: -49.3701 } }
                ],
                "Chapecó": [
                    { name: "EcoChapecó", address: "Av. Getúlio Dorneles Vargas, 700", coordinates: { lat: -27.1006, lng: -52.6157 } },
                    { name: "Recicla Oeste", address: "Rua Benjamin Constant, 300", coordinates: { lat: -27.1014, lng: -52.6143 } },
                    { name: "Verde Norte", address: "Rua São Pedro, 400", coordinates: { lat: -27.1021, lng: -52.6131 } }
                ]
            },
            SE: {
                "Aracaju": [
                    { name: "EcoAracaju", address: "Av. Beira Mar, 300", coordinates: { lat: -10.9472, lng: -37.0731 } },
                    { name: "Recicla Centro", address: "Rua Laranjeiras, 150", coordinates: { lat: -10.9460, lng: -37.0748 } },
                    { name: "Verde Sul", address: "Av. Hermes Fontes, 200", coordinates: { lat: -10.9448, lng: -37.0722 } }
                ],
                "Nossa Senhora do Socorro": [
                    { name: "Recicla Socorro", address: "Av. Coletora A, 500", coordinates: { lat: -10.8548, lng: -37.1233 } },
                    { name: "EcoPonto Norte", address: "Rua Santa Luzia, 300", coordinates: { lat: -10.8556, lng: -37.1249 } },
                    { name: "Verde Oeste", address: "Rua do Comércio, 250", coordinates: { lat: -10.8567, lng: -37.1225 } }
                ],
                "Lagarto": [
                    { name: "Recicla Lagarto", address: "Rua Doutor Josias Machado, 450", coordinates: { lat: -10.9186, lng: -37.6594 } },
                    { name: "EcoCentro", address: "Av. Contorno, 600", coordinates: { lat: -10.9177, lng: -37.6583 } },
                    { name: "Verde Leste", address: "Rua José Domingos, 300", coordinates: { lat: -10.9191, lng: -37.6575 } }
                ],
                "Estância": [
                    { name: "EcoEstância", address: "Rua Sete de Setembro, 150", coordinates: { lat: -11.2672, lng: -37.4384 } },
                    { name: "Recicla Centro", address: "Praça da Bandeira, 250", coordinates: { lat: -11.2665, lng: -37.4398 } },
                    { name: "Verde Sul", address: "Rua Marechal Deodoro, 300", coordinates: { lat: -11.2657, lng: -37.4379 } }
                ],
                "Itabaiana": [
                    { name: "Recicla Itabaiana", address: "Av. João Teixeira, 100", coordinates: { lat: -10.6858, lng: -37.4275 } },
                    { name: "EcoCentro", address: "Rua São Pedro, 200", coordinates: { lat: -10.6847, lng: -37.4261 } },
                    { name: "Verde Leste", address: "Av. Pedro Paes Mendonça, 300", coordinates: { lat: -10.6869, lng: -37.4253 } }
                ]
            },
                RJ: {
                    "Rio de Janeiro": [
                        { name: "Centro de Reciclagem D", address: "Av. Atlântica, 2000", coordinates: { lat: -22.9719, lng: -43.1826 } },
                        { name: "EcoZona Sul", address: "Rua Farme de Amoedo, 100", coordinates: { lat: -22.9832, lng: -43.2048 } },
                        { name: "Verde Norte", address: "Av. Presidente Vargas, 500", coordinates: { lat: -22.9053, lng: -43.1922 } }
                    ],
                    "Niterói": [
                        { name: "Recicla Niterói", address: "Rua Visconde de Moraes, 250", coordinates: { lat: -22.8973, lng: -43.1261 } },
                        { name: "EcoPonto Norte", address: "Av. Amaral Peixoto, 300", coordinates: { lat: -22.8994, lng: -43.1237 } },
                        { name: "Verde Oceânico", address: "Rua das Margaridas, 100", coordinates: { lat: -22.8965, lng: -43.1276 } }
                    ],
                    "Duque de Caxias": [
                        { name: "EcoDuque", address: "Av. Brigadeiro Lima e Silva, 800", coordinates: { lat: -22.7864, lng: -43.3117 } },
                        { name: "Recicla Centro", address: "Rua José de Alencar, 150", coordinates: { lat: -22.7875, lng: -43.3135 } },
                        { name: "Verde Leste", address: "Rua Tenente José Dias, 500", coordinates: { lat: -22.7857, lng: -43.3108 } }
                    ],
                    "Nova Iguaçu": [
                        { name: "EcoNova Iguaçu", address: "Av. Gov. Roberto Silveira, 400", coordinates: { lat: -22.7562, lng: -43.4553 } },
                        { name: "Recicla Oeste", address: "Rua Frutuoso Rangel, 300", coordinates: { lat: -22.7584, lng: -43.4565 } },
                        { name: "Verde Norte", address: "Rua Getúlio Vargas, 200", coordinates: { lat: -22.7551, lng: -43.4538 } }
                    ],
                    "São Gonçalo": [
                        { name: "EcoSão Gonçalo", address: "Av. Presidente Kennedy, 250", coordinates: { lat: -22.8267, lng: -43.0568 } },
                        { name: "Recicla SG", address: "Rua Coronel Moreira César, 400", coordinates: { lat: -22.8254, lng: -43.0583 } },
                        { name: "Verde Leste", address: "Rua Cel. Serrado, 500", coordinates: { lat: -22.8239, lng: -43.0571 } }
                    ]
                },
                PA: {
                    "Belém": [
                        { name: "Recicla Belém", address: "Av. Almirante Barroso, 1000", coordinates: { lat: -1.4554, lng: -48.4895 } },
                        { name: "EcoCentro", address: "Praça da República, 200", coordinates: { lat: -1.4565, lng: -48.4906 } },
                        { name: "Verde Norte", address: "Rua Ó de Almeida, 300", coordinates: { lat: -1.4543, lng: -48.4887 } }
                    ],
                    "Ananindeua": [
                        { name: "EcoAnanindeua", address: "Av. Três Corações, 400", coordinates: { lat: -1.3634, lng: -48.3743 } },
                        { name: "Recicla Norte", address: "Rua We 15, 100", coordinates: { lat: -1.3645, lng: -48.3751 } },
                        { name: "Verde Centro", address: "Rua SN-23, 300", coordinates: { lat: -1.3629, lng: -48.3734 } }
                    ],
                    "Santarém": [
                        { name: "Recicla Santarém", address: "Av. Mendonça Furtado, 250", coordinates: { lat: -2.4326, lng: -54.7183 } },
                        { name: "EcoCentro Norte", address: "Rua Floriano Peixoto, 150", coordinates: { lat: -2.4318, lng: -54.7176 } },
                        { name: "Verde Oeste", address: "Rua Adriano Pimentel, 400", coordinates: { lat: -2.4334, lng: -54.7162 } }
                    ],
                    "Marabá": [
                        { name: "EcoMarabá", address: "Av. Getúlio Vargas, 800", coordinates: { lat: -5.3682, lng: -49.1171 } },
                        { name: "Recicla Sul", address: "Rua Paraná, 500", coordinates: { lat: -5.3673, lng: -49.1183 } },
                        { name: "Verde Norte", address: "Av. VP-8, 400", coordinates: { lat: -5.3665, lng: -49.1168 } }
                    ],
                    "Castanhal": [
                        { name: "EcoCastanhal", address: "Rua Floriano Peixoto, 700", coordinates: { lat: -1.2956, lng: -47.9237 } },
                        { name: "Recicla Centro", address: "Av. Presidente Vargas, 200", coordinates: { lat: -1.2945, lng: -47.9254 } },
                        { name: "Verde Sul", address: "Rua Senador Lemos, 300", coordinates: { lat: -1.2938, lng: -47.9242 } }
                    ]
                },
                PE: {
                    "Recife": [
                        { name: "Centro de Reciclagem Recife", address: "Av. Agamenon Magalhães, 1500", coordinates: { lat: -8.0476, lng: -34.8781 } },
                        { name: "EcoBoa Vista", address: "Rua da Aurora, 200", coordinates: { lat: -8.0492, lng: -34.8787 } },
                        { name: "Verde Norte", address: "Av. Norte, 400", coordinates: { lat: -8.0514, lng: -34.8802 } }
                    ],
                    "Olinda": [
                        { name: "EcoOlinda", address: "Av. Presidente Kennedy, 600", coordinates: { lat: -7.9932, lng: -34.8414 } },
                        { name: "Recicla Sul", address: "Rua do Sol, 300", coordinates: { lat: -7.9920, lng: -34.8435 } },
                        { name: "Verde Olinda", address: "Rua do Amparo, 500", coordinates: { lat: -7.9912, lng: -34.8446 } }
                    ],
                    "Jaboatão dos Guararapes": [
                        { name: "EcoJaboatão", address: "Av. Barreto de Menezes, 700", coordinates: { lat: -8.1780, lng: -34.9295 } },
                        { name: "Recicla Centro", address: "Rua José Mariano, 150", coordinates: { lat: -8.1792, lng: -34.9312 } },
                        { name: "Verde Norte", address: "Rua Barão de Lucena, 200", coordinates: { lat: -8.1785, lng: -34.9308 } }
                    ],
                    "Caruaru": [
                        { name: "EcoCaruaru", address: "Av. Agamenon Magalhães, 1000", coordinates: { lat: -8.2801, lng: -35.9783 } },
                        { name: "Recicla Norte", address: "Rua Quinze de Novembro, 300", coordinates: { lat: -8.2792, lng: -35.9794 } },
                        { name: "Verde Sul", address: "Rua Vigário Freire, 400", coordinates: { lat: -8.2785, lng: -35.9778 } }
                    ],
                    "Petrolina": [
                        { name: "EcoPetrolina", address: "Av. Souza Filho, 800", coordinates: { lat: -9.3891, lng: -40.5039 } },
                        { name: "Recicla Centro", address: "Rua Pacífico da Luz, 300", coordinates: { lat: -9.3884, lng: -40.5052 } },
                        { name: "Verde Norte", address: "Rua Dom Vital, 500", coordinates: { lat: -9.3878, lng: -40.5021 } }
                    ]
                },
                PI: {
                    "Teresina": [
                        { name: "Recicla Teresina", address: "Av. Frei Serafim, 1000", coordinates: { lat: -5.0910, lng: -42.8034 } },
                        { name: "EcoPonto Norte", address: "Rua Coelho Rodrigues, 300", coordinates: { lat: -5.0919, lng: -42.8046 } },
                        { name: "Verde Leste", address: "Rua Areolino de Abreu, 500", coordinates: { lat: -5.0902, lng: -42.8021 } }
                    ],
                    "Parnaíba": [
                        { name: "EcoParnaíba", address: "Av. São Sebastião, 200", coordinates: { lat: -2.9043, lng: -41.7753 } },
                        { name: "Recicla Sul", address: "Rua Caramuru, 400", coordinates: { lat: -2.9056, lng: -41.7765 } },
                        { name: "Verde Norte", address: "Av. Presidente Vargas, 150", coordinates: { lat: -2.9034, lng: -41.7742 } }
                    ],
                    "Picos": [
                        { name: "Recicla Picos", address: "Rua São Sebastião, 100", coordinates: { lat: -7.0763, lng: -41.4661 } },
                        { name: "EcoCentro", address: "Av. Getúlio Vargas, 300", coordinates: { lat: -7.0771, lng: -41.4675 } },
                        { name: "Verde Sul", address: "Rua do Cruzeiro, 200", coordinates: { lat: -7.0754, lng: -41.4656 } }
                    ],
                    "Floriano": [
                        { name: "EcoFloriano", address: "Rua do Comércio, 250", coordinates: { lat: -6.7715, lng: -43.0245 } },
                        { name: "Recicla Centro", address: "Rua São Pedro, 150", coordinates: { lat: -6.7724, lng: -43.0257 } },
                        { name: "Verde Oeste", address: "Av. Frei Antônio Cúrcio, 300", coordinates: { lat: -6.7731, lng: -43.0239 } }
                    ],
                    "Piripiri": [
                        { name: "EcoPiripiri", address: "Rua Santos Dumont, 100", coordinates: { lat: -4.2753, lng: -41.7768 } },
                        { name: "Recicla Leste", address: "Rua São Francisco, 300", coordinates: { lat: -4.2762, lng: -41.7783 } },
                        { name: "Verde Centro", address: "Rua Tomaz Rebelo, 200", coordinates: { lat: -4.2758, lng: -41.7771 } }
                    ]
                },
                    SP: {
                        "São Paulo": [
                            { name: "Centro de Reciclagem A", address: "Av. Paulista, 1000", coordinates: { lat: -23.5617, lng: -46.6560 } },
                            { name: "EcoZona Norte", address: "Rua Voluntários da Pátria, 200", coordinates: { lat: -23.5083, lng: -46.6379 } },
                            { name: "Verde Oeste", address: "Av. Francisco Matarazzo, 500", coordinates: { lat: -23.5265, lng: -46.6748 } }
                        ],
                        "Campinas": [
                            { name: "Recicla Campinas", address: "Rua Barão de Jaguara, 150", coordinates: { lat: -22.9056, lng: -47.0608 } },
                            { name: "EcoPonto Central", address: "Av. Anchieta, 300", coordinates: { lat: -22.9035, lng: -47.0581 } },
                            { name: "Verde Sul", address: "Rua José Paulino, 500", coordinates: { lat: -22.9047, lng: -47.0617 } }
                        ],
                        "Santos": [
                            { name: "Recicla Santos", address: "Av. Ana Costa, 200", coordinates: { lat: -23.9644, lng: -46.3327 } },
                            { name: "EcoPonto Ponta da Praia", address: "Praça Washington, 100", coordinates: { lat: -23.9695, lng: -46.3334 } },
                            { name: "Verde Santos", address: "Rua XV de Novembro, 300", coordinates: { lat: -23.9656, lng: -46.3352 } }
                        ],
                        "Sorocaba": [
                            { name: "EcoSorocaba", address: "Rua São Bento, 400", coordinates: { lat: -23.5015, lng: -47.4543 } },
                            { name: "Recicla Centro", address: "Av. Itavuvu, 500", coordinates: { lat: -23.5027, lng: -47.4552 } },
                            { name: "Verde Norte", address: "Rua Cel. Benedito Pires, 200", coordinates: { lat: -23.5008, lng: -47.4567 } }
                        ],
                        "Ribeirão Preto": [
                            { name: "EcoRibeirão", address: "Av. Nove de Julho, 1000", coordinates: { lat: -21.1767, lng: -47.8208 } },
                            { name: "Verde Central", address: "Rua São Sebastião, 300", coordinates: { lat: -21.1775, lng: -47.8219 } },
                            { name: "Recicla Sul", address: "Av. Francisco Junqueira, 400", coordinates: { lat: -21.1782, lng: -47.8194 } }
                        ]
                    },
                    RJ: {
                        "Rio de Janeiro": [
                            { name: "Centro de Reciclagem D", address: "Av. Atlântica, 2000", coordinates: { lat: -22.9719, lng: -43.1826 } },
                            { name: "EcoZona Sul", address: "Rua Farme de Amoedo, 100", coordinates: { lat: -22.9832, lng: -43.2048 } },
                            { name: "Verde Norte", address: "Av. Presidente Vargas, 500", coordinates: { lat: -22.9053, lng: -43.1922 } }
                        ],
                        "Niterói": [
                            { name: "Recicla Niterói", address: "Rua Visconde de Moraes, 250", coordinates: { lat: -22.8973, lng: -43.1261 } },
                            { name: "EcoPonto Norte", address: "Av. Amaral Peixoto, 300", coordinates: { lat: -22.8994, lng: -43.1237 } },
                            { name: "Verde Oceânico", address: "Rua das Margaridas, 100", coordinates: { lat: -22.8965, lng: -43.1276 } }
                        ],
                        "Duque de Caxias": [
                            { name: "EcoDuque", address: "Av. Brigadeiro Lima e Silva, 800", coordinates: { lat: -22.7864, lng: -43.3117 } },
                            { name: "Recicla Centro", address: "Rua José de Alencar, 150", coordinates: { lat: -22.7875, lng: -43.3135 } },
                            { name: "Verde Leste", address: "Rua Tenente José Dias, 500", coordinates: { lat: -22.7857, lng: -43.3108 } }
                        ],
                        "Nova Iguaçu": [
                            { name: "EcoNova Iguaçu", address: "Av. Gov. Roberto Silveira, 400", coordinates: { lat: -22.7562, lng: -43.4553 } },
                            { name: "Recicla Oeste", address: "Rua Frutuoso Rangel, 300", coordinates: { lat: -22.7584, lng: -43.4565 } },
                            { name: "Verde Norte", address: "Rua Getúlio Vargas, 200", coordinates: { lat: -22.7551, lng: -43.4538 } }
                        ],
                        "São Gonçalo": [
                            { name: "EcoSão Gonçalo", address: "Av. Presidente Kennedy, 250", coordinates: { lat: -22.8267, lng: -43.0568 } },
                            { name: "Recicla SG", address: "Rua Coronel Moreira César, 400", coordinates: { lat: -22.8254, lng: -43.0583 } },
                            { name: "Verde Leste", address: "Rua Cel. Serrado, 500", coordinates: { lat: -22.8239, lng: -43.0571 } }
                        ]
                    },
                    PA: {
                        "Belém": [
                            { name: "Recicla Belém", address: "Av. Almirante Barroso, 1000", coordinates: { lat: -1.4554, lng: -48.4895 } },
                            { name: "EcoCentro", address: "Praça da República, 200", coordinates: { lat: -1.4565, lng: -48.4906 } },
                            { name: "Verde Norte", address: "Rua Ó de Almeida, 300", coordinates: { lat: -1.4543, lng: -48.4887 } }
                        ],
                        "Ananindeua": [
                            { name: "EcoAnanindeua", address: "Av. Três Corações, 400", coordinates: { lat: -1.3634, lng: -48.3743 } },
                            { name: "Recicla Norte", address: "Rua We 15, 100", coordinates: { lat: -1.3645, lng: -48.3751 } },
                            { name: "Verde Centro", address: "Rua SN-23, 300", coordinates: { lat: -1.3629, lng: -48.3734 } }
                        ],
                        "Santarém": [
                            { name: "Recicla Santarém", address: "Av. Mendonça Furtado, 250", coordinates: { lat: -2.4326, lng: -54.7183 } },
                            { name: "EcoCentro Norte", address: "Rua Floriano Peixoto, 150", coordinates: { lat: -2.4318, lng: -54.7176 } },
                            { name: "Verde Oeste", address: "Rua Adriano Pimentel, 400", coordinates: { lat: -2.4334, lng: -54.7162 } }
                        ],
                        "Marabá": [
                            { name: "EcoMarabá", address: "Av. Getúlio Vargas, 800", coordinates: { lat: -5.3682, lng: -49.1171 } },
                            { name: "Recicla Sul", address: "Rua Paraná, 500", coordinates: { lat: -5.3673, lng: -49.1183 } },
                            { name: "Verde Norte", address: "Av. VP-8, 400", coordinates: { lat: -5.3665, lng: -49.1168 } }
                        ],
                        "Castanhal": [
                            { name: "EcoCastanhal", address: "Rua Floriano Peixoto, 700", coordinates: { lat: -1.2956, lng: -47.9237 } },
                            { name: "Recicla Centro", address: "Av. Presidente Vargas, 200", coordinates: { lat: -1.2945, lng: -47.9254 } },
                            { name: "Verde Sul", address: "Rua Senador Lemos, 300", coordinates: { lat: -1.2938, lng: -47.9242 } }
                        ]
                    },
                    PE: {
                        "Recife": [
                            { name: "Centro de Reciclagem Recife", address: "Av. Agamenon Magalhães, 1500", coordinates: { lat: -8.0476, lng: -34.8781 } },
                            { name: "EcoBoa Vista", address: "Rua da Aurora, 200", coordinates: { lat: -8.0492, lng: -34.8787 } },
                            { name: "Verde Norte", address: "Av. Norte, 400", coordinates: { lat: -8.0514, lng: -34.8802 } }
                        ],
                        "Olinda": [
                            { name: "EcoOlinda", address: "Av. Presidente Kennedy, 600", coordinates: { lat: -7.9932, lng: -34.8414 } },
                            { name: "Recicla Sul", address: "Rua do Sol, 300", coordinates: { lat: -7.9920, lng: -34.8435 } },
                            { name: "Verde Olinda", address: "Rua do Amparo, 500", coordinates: { lat: -7.9912, lng: -34.8446 } }
                        ],
                        "Jaboatão dos Guararapes": [
                            { name: "EcoJaboatão", address: "Av. Barreto de Menezes, 700", coordinates: { lat: -8.1780, lng: -34.9295 } },
                            { name: "Recicla Centro", address: "Rua José Mariano, 150", coordinates: { lat: -8.1792, lng: -34.9312 } },
                            { name: "Verde Norte", address: "Rua Barão de Lucena, 200", coordinates: { lat: -8.1785, lng: -34.9308 } }
                        ],
                        "Caruaru": [
                            { name: "EcoCaruaru", address: "Av. Agamenon Magalhães, 1000", coordinates: { lat: -8.2801, lng: -35.9783 } },
                            { name: "Recicla Norte", address: "Rua Quinze de Novembro, 300", coordinates: { lat: -8.2792, lng: -35.9794 } },
                            { name: "Verde Sul", address: "Rua Vigário Freire, 400", coordinates: { lat: -8.2785, lng: -35.9778 } }
                        ],
                        "Petrolina": [
                            { name: "EcoPetrolina", address: "Av. Souza Filho, 800", coordinates: { lat: -9.3891, lng: -40.5039 } },
                            { name: "Recicla Centro", address: "Rua Pacífico da Luz, 300", coordinates: { lat: -9.3884, lng: -40.5052 } },
                            { name: "Verde Norte", address: "Rua Dom Vital, 500", coordinates: { lat: -9.3878, lng: -40.5021 } }
                        ]
                    },
                    PI: {
                        "Teresina": [
                            { name: "Recicla Teresina", address: "Av. Frei Serafim, 1000", coordinates: { lat: -5.0910, lng: -42.8034 } },
                            { name: "EcoPonto Norte", address: "Rua Coelho Rodrigues, 300", coordinates: { lat: -5.0919, lng: -42.8046 } },
                            { name: "Verde Leste", address: "Rua Areolino de Abreu, 500", coordinates: { lat: -5.0902, lng: -42.8021 } }
                        ],
                        "Parnaíba": [
                            { name: "EcoParnaíba", address: "Av. São Sebastião, 200", coordinates: { lat: -2.9043, lng: -41.7753 } },
                            { name: "Recicla Sul", address: "Rua Caramuru, 400", coordinates: { lat: -2.9056, lng: -41.7765 } },
                            { name: "Verde Norte", address: "Av. Presidente Vargas, 150", coordinates: { lat: -2.9034, lng: -41.7742 } }
                        ],
                        "Picos": [
                            { name: "Recicla Picos", address: "Rua São Sebastião, 100", coordinates: { lat: -7.0763, lng: -41.4661 } },
                            { name: "EcoCentro", address: "Av. Getúlio Vargas, 300", coordinates: { lat: -7.0771, lng: -41.4675 } },
                            { name: "Verde Sul", address: "Rua do Cruzeiro, 200", coordinates: { lat: -7.0754, lng: -41.4656 } }
                        ],
                        "Floriano": [
                            { name: "EcoFloriano", address: "Rua do Comércio, 250", coordinates: { lat: -6.7715, lng: -43.0245 } },
                            { name: "Recicla Centro", address: "Rua São Pedro, 150", coordinates: { lat: -6.7724, lng: -43.0257 } },
                            { name: "Verde Oeste", address: "Av. Frei Antônio Cúrcio, 300", coordinates: { lat: -6.7731, lng: -43.0239 } }
                        ],
                        "Piripiri": [
                            { name: "EcoPiripiri", address: "Rua Santos Dumont, 100", coordinates: { lat: -4.2753, lng: -41.7768 } },
                            { name: "Recicla Leste", address: "Rua São Francisco, 300", coordinates: { lat: -4.2762, lng: -41.7783 } },
                            { name: "Verde Centro", address: "Rua Tomaz Rebelo, 200", coordinates: { lat: -4.2758, lng: -41.7771 } }
                        ]
                    },
                        BA: {
                            "Salvador": [
                                { name: "Recicla Salvador", address: "Av. Sete de Setembro, 100", coordinates: { lat: -12.9714, lng: -38.5014 } },
                                { name: "EcoPelourinho", address: "Rua das Laranjeiras, 200", coordinates: { lat: -12.9738, lng: -38.5071 } },
                                { name: "Verde Iguatemi", address: "Av. Tancredo Neves, 300", coordinates: { lat: -12.9784, lng: -38.4677 } }
                            ],
                            "Feira de Santana": [
                                { name: "EcoFeira", address: "Rua Marechal Deodoro, 400", coordinates: { lat: -12.2674, lng: -38.9636 } },
                                { name: "Recicla Feira", address: "Av. Maria Quitéria, 150", coordinates: { lat: -12.2627, lng: -38.9673 } },
                                { name: "Verde Norte", address: "Rua Conselheiro Franco, 500", coordinates: { lat: -12.2639, lng: -38.9641 } }
                            ],
                            "Vitória da Conquista": [
                                { name: "Recicla Conquista", address: "Praça Tancredo Neves, 600", coordinates: { lat: -14.8619, lng: -40.8441 } },
                                { name: "EcoCentro", address: "Av. Rosa Cruz, 250", coordinates: { lat: -14.8608, lng: -40.8457 } },
                                { name: "Verde Leste", address: "Rua da Granja, 200", coordinates: { lat: -14.8627, lng: -40.8464 } }
                            ],
                            "Itabuna": [
                                { name: "EcoItabuna", address: "Av. Cinquentenário, 100", coordinates: { lat: -14.7876, lng: -39.2785 } },
                                { name: "Recicla Centro", address: "Rua J. J. Seabra, 300", coordinates: { lat: -14.7865, lng: -39.2797 } },
                                { name: "Verde Norte", address: "Praça Otávio Mangabeira, 400", coordinates: { lat: -14.7854, lng: -39.2771 } }
                            ],
                            "Juazeiro": [
                                { name: "EcoJuazeiro", address: "Av. Adolfo Viana, 500", coordinates: { lat: -9.4167, lng: -40.5036 } },
                                { name: "Recicla Leste", address: "Rua José Petitinga, 100", coordinates: { lat: -9.4179, lng: -40.5047 } },
                                { name: "Verde Oeste", address: "Rua Sete de Setembro, 300", coordinates: { lat: -9.4186, lng: -40.5029 } }
                            ]
                        },
                        RN: {
                            "Natal": [
                                { name: "EcoNatal", address: "Av. Eng. Roberto Freire, 1500", coordinates: { lat: -5.7945, lng: -35.2110 } },
                                { name: "Recicla Ponta Negra", address: "Rua Praia de Ponta Negra, 300", coordinates: { lat: -5.7934, lng: -35.2095 } },
                                { name: "Verde Sul", address: "Av. Hermes da Fonseca, 200", coordinates: { lat: -5.7956, lng: -35.2103 } }
                            ],
                            "Mossoró": [
                                { name: "EcoMossoró", address: "Rua Felipe Camarão, 100", coordinates: { lat: -5.1852, lng: -37.3444 } },
                                { name: "Recicla Centro", address: "Av. Dix-Sept Rosado, 400", coordinates: { lat: -5.1843, lng: -37.3458 } },
                                { name: "Verde Norte", address: "Rua Coronel Gurgel, 200", coordinates: { lat: -5.1835, lng: -37.3465 } }
                            ],
                            "Parnamirim": [
                                { name: "EcoParnamirim", address: "Av. Tenente Medeiros, 250", coordinates: { lat: -5.9113, lng: -35.2717 } },
                                { name: "Recicla Centro", address: "Rua Pedro Bezerra Filho, 150", coordinates: { lat: -5.9101, lng: -35.2728 } },
                                { name: "Verde Oeste", address: "Rua Senador João Câmara, 500", coordinates: { lat: -5.9125, lng: -35.2736 } }
                            ],
                            "Caicó": [
                                { name: "EcoCaicó", address: "Rua Celso Dantas, 300", coordinates: { lat: -6.4589, lng: -37.0956 } },
                                { name: "Recicla Sul", address: "Av. Seridó, 400", coordinates: { lat: -6.4576, lng: -37.0948 } },
                                { name: "Verde Centro", address: "Rua Renato Dantas, 100", coordinates: { lat: -6.4583, lng: -37.0937 } }
                            ],
                            "São Gonçalo do Amarante": [
                                { name: "EcoSão Gonçalo", address: "Rua Vereador Onofre Soares, 200", coordinates: { lat: -5.7908, lng: -35.3287 } },
                                { name: "Recicla Centro", address: "Av. Tomaz Landim, 300", coordinates: { lat: -5.7915, lng: -35.3271 } },
                                { name: "Verde Leste", address: "Rua Raimundo Mendes, 500", coordinates: { lat: -5.7923, lng: -35.3264 } }
                            ]
                        },
                        TO: {
                            "Palmas": [
                                { name: "Recicla Palmas", address: "Av. JK, 500", coordinates: { lat: -10.1840, lng: -48.3348 } },
                                { name: "EcoCentro", address: "Praça dos Girassóis, 300", coordinates: { lat: -10.1851, lng: -48.3334 } },
                                { name: "Verde Norte", address: "Rua LO-03, 150", coordinates: { lat: -10.1865, lng: -48.3356 } }
                            ],
                            "Araguaína": [
                                { name: "EcoAraguaína", address: "Rua Cônego João Lima, 100", coordinates: { lat: -7.1926, lng: -48.2044 } },
                                { name: "Recicla Centro", address: "Av. José de Brito, 300", coordinates: { lat: -7.1918, lng: -48.2057 } },
                                { name: "Verde Oeste", address: "Rua Ademar Vicente Ferreira, 400", coordinates: { lat: -7.1934, lng: -48.2031 } }
                            ],
                            "Gurupi": [
                                { name: "EcoGurupi", address: "Rua 7, 200", coordinates: { lat: -11.7290, lng: -49.0681 } },
                                { name: "Recicla Leste", address: "Av. Maranhão, 150", coordinates: { lat: -11.7282, lng: -49.0693 } },
                                { name: "Verde Centro", address: "Rua 20, 300", coordinates: { lat: -11.7274, lng: -49.0672 } }
                            ],
                            "Porto Nacional": [
                                { name: "EcoPorto Nacional", address: "Rua Bartolomeu Bueno, 500", coordinates: { lat: -10.7021, lng: -48.4131 } },
                                { name: "Recicla Oeste", address: "Rua Frederico Lemos, 300", coordinates: { lat: -10.7013, lng: -48.4144 } },
                                { name: "Verde Norte", address: "Av. Pedro Ludovico, 150", coordinates: { lat: -10.7037, lng: -48.4125 } }
                            ],
                            "Paraíso do Tocantins": [
                                { name: "EcoParaíso", address: "Rua Tocantins, 100", coordinates: { lat: -10.1752, lng: -48.8826 } },
                                { name: "Recicla Centro", address: "Av. Alfredo Nasser, 400", coordinates: { lat: -10.1764, lng: -48.8812 } },
                                { name: "Verde Sul", address: "Rua Castelo Branco, 300", coordinates: { lat: -10.1778, lng: -48.8835 } }
                            ]
                        },
                        MA: {
                            "São Luís": [
                                { name: "Recicla São Luís", address: "Av. dos Holandeses, 1500", coordinates: { lat: -2.5296, lng: -44.3022 } },
                                { name: "EcoCentro", address: "Praça Dom Pedro II, 100", coordinates: { lat: -2.5303, lng: -44.3038 } },
                                { name: "Verde Sul", address: "Rua do Sol, 250", coordinates: { lat: -2.5290, lng: -44.3017 } }
                            ],
                            "Imperatriz": [
                                { name: "EcoImperatriz", address: "Rua Ceará, 300", coordinates: { lat: -5.5185, lng: -47.4773 } },
                                { name: "Recicla Centro", address: "Av. Dorgival Pinheiro de Sousa, 150", coordinates: { lat: -5.5197, lng: -47.4756 } },
                                { name: "Verde Oeste", address: "Rua Maranhão, 200", coordinates: { lat: -5.5178, lng: -47.4781 } }
                            ],
                            "Caxias": [
                                { name: "EcoCaxias", address: "Rua Aarão Reis, 500", coordinates: { lat: -4.8644, lng: -43.3561 } },
                                { name: "Recicla Norte", address: "Av. Senador Alexandre Costa, 300", coordinates: { lat: -4.8656, lng: -43.3578 } },
                                { name: "Verde Leste", address: "Rua do Fio, 100", coordinates: { lat: -4.8637, lng: -43.3555 } }
                            ],
                            "Timon": [
                                { name: "EcoTimon", address: "Av. Piauí, 200", coordinates: { lat: -5.0915, lng: -42.8304 } },
                                { name: "Recicla Sul", address: "Rua José Simplicio, 400", coordinates: { lat: -5.0923, lng: -42.8297 } },
                                { name: "Verde Centro", address: "Rua Coronel Falcão, 500", coordinates: { lat: -5.0908, lng: -42.8316 } }
                            ],
                            "Bacabal": [
                                { name: "EcoBacabal", address: "Av. Mearim, 300", coordinates: { lat: -4.2242, lng: -44.7839 } },
                                { name: "Recicla Oeste", address: "Rua Magalhães de Almeida, 500", coordinates: { lat: -4.2231, lng: -44.7846 } },
                                { name: "Verde Norte", address: "Rua Teixeira Mendes, 200", coordinates: { lat: -4.2255, lng: -44.7834 } }
                            ]
                        },
                        PB: {
                            "João Pessoa": [
                                { name: "Centro Verde João Pessoa", address: "Av. Epitácio Pessoa, 500", coordinates: { lat: -7.1153, lng: -34.8610 } },
                                { name: "EcoPonto Tambaú", address: "Rua Infante Dom Henrique, 200", coordinates: { lat: -7.1137, lng: -34.8604 } },
                                { name: "Recicla Sul", address: "Rua Maciel Pinheiro, 150", coordinates: { lat: -7.1169, lng: -34.8625 } }
                            ],
                            "Campina Grande": [
                                { name: "EcoCampina", address: "Rua Maciel Pinheiro, 400", coordinates: { lat: -7.2291, lng: -35.8818 } },
                                { name: "Recicla Norte", address: "Av. Brasília, 300", coordinates: { lat: -7.2284, lng: -35.8802 } },
                                { name: "Verde Oeste", address: "Rua Irineu Joffily, 100", coordinates: { lat: -7.2273, lng: -35.8825 } }
                            ],
                            "Patos": [
                                { name: "EcoPatos", address: "Av. Pedro Firmino, 200", coordinates: { lat: -7.0253, lng: -37.2737 } },
                                { name: "Recicla Centro", address: "Rua Leôncio Wanderley, 300", coordinates: { lat: -7.0265, lng: -37.2721 } },
                                { name: "Verde Norte", address: "Rua Horácio Nóbrega, 100", coordinates: { lat: -7.0274, lng: -37.2749 } }
                            ],
                            "Santa Rita": [
                                { name: "EcoSanta Rita", address: "Rua Solon de Lucena, 500", coordinates: { lat: -7.1133, lng: -34.9761 } },
                                { name: "Recicla Oeste", address: "Rua Presidente João Pessoa, 150", coordinates: { lat: -7.1145, lng: -34.9750 } },
                                { name: "Verde Sul", address: "Rua Dr. Clodoaldo Pinto, 250", coordinates: { lat: -7.1158, lng: -34.9742 } }
                            ],
                            "Bayeux": [
                                { name: "EcoBayeux", address: "Av. Liberdade, 400", coordinates: { lat: -7.1256, lng: -34.9293 } },
                                { name: "Recicla Centro", address: "Rua Marechal Deodoro, 300", coordinates: { lat: -7.1243, lng: -34.9281 } },
                                { name: "Verde Leste", address: "Rua do Sol, 500", coordinates: { lat: -7.1267, lng: -34.9305 } }
                            ]
                        },
                        RR: {
                            "Boa Vista": [
                                { name: "Recicla Boa Vista", address: "Av. Ville Roy, 1000", coordinates: { lat: 2.8235, lng: -60.6753 } },
                                { name: "EcoCentro", address: "Rua Ajuricaba, 500", coordinates: { lat: 2.8247, lng: -60.6769 } },
                                { name: "Verde Norte", address: "Av. Ene Garcez, 300", coordinates: { lat: 2.8216, lng: -60.6782 } }
                            ],
                            "Rorainópolis": [
                                { name: "Recicla Rorainópolis", address: "Rua Bahia, 250", coordinates: { lat: -0.9479, lng: -60.4410 } },
                                { name: "EcoSul", address: "Av. Brasil, 100", coordinates: { lat: -0.9483, lng: -60.4400 } },
                                { name: "Verde Rorainópolis", address: "Rua Central, 350", coordinates: { lat: -0.9469, lng: -60.4423 } }
                            ],
                            "Caracaraí": [
                                { name: "EcoCaracaraí", address: "Av. José da Silva, 150", coordinates: { lat: 1.8271, lng: -61.1278 } },
                                { name: "Recicla Centro", address: "Rua do Comércio, 200", coordinates: { lat: 1.8265, lng: -61.1289 } },
                                { name: "Verde Sul", address: "Rua Marechal Rondon, 300", coordinates: { lat: 1.8257, lng: -61.1266 } }
                            ]
                        },
                        RO: {
                            "Porto Velho": [
                                { name: "Recicla Porto Velho", address: "Av. Farquhar, 1200", coordinates: { lat: -8.76116, lng: -63.90043 } },
                                { name: "EcoCentro", address: "Rua José de Alencar, 450", coordinates: { lat: -8.76020, lng: -63.89921 } },
                                { name: "Verde Norte", address: "Av. Amazonas, 300", coordinates: { lat: -8.75899, lng: -63.90215 } }
                            ],
                            "Ji-Paraná": [
                                { name: "Recicla Ji-Paraná", address: "Rua Mato Grosso, 800", coordinates: { lat: -10.87480, lng: -61.93357 } },
                                { name: "EcoJi-Paraná", address: "Av. Marechal Rondon, 500", coordinates: { lat: -10.87623, lng: -61.93512 } },
                                { name: "Verde Sul", address: "Rua Brasil, 400", coordinates: { lat: -10.87399, lng: -61.93231 } }
                            ],
                            "Ariquemes": [
                                { name: "Recicla Ariquemes", address: "Av. Tancredo Neves, 100", coordinates: { lat: -9.90801, lng: -63.03315 } },
                                { name: "EcoAriquemes", address: "Rua Rio Branco, 200", coordinates: { lat: -9.90912, lng: -63.03522 } },
                                { name: "Verde Centro", address: "Rua Jamari, 300", coordinates: { lat: -9.91014, lng: -63.03401 } }
                            ],
                            "Cacoal": [
                                { name: "Recicla Cacoal", address: "Av. Porto Velho, 700", coordinates: { lat: -11.43450, lng: -61.44523 } },
                                { name: "EcoCacoal", address: "Rua dos Pioneiros, 300", coordinates: { lat: -11.43562, lng: -61.44711 } },
                                { name: "Verde Leste", address: "Rua Presidente Kennedy, 400", coordinates: { lat: -11.43379, lng: -61.44401 } }
                            ],
                            "Vilhena": [
                                { name: "Recicla Vilhena", address: "Rua Major Amarante, 600", coordinates: { lat: -12.74080, lng: -60.14580 } },
                                { name: "EcoVilhena", address: "Av. Brigadeiro Eduardo Gomes, 500", coordinates: { lat: -12.74199, lng: -60.14672 } },
                                { name: "Verde Oeste", address: "Rua Paulo de Assis Ribeiro, 400", coordinates: { lat: -12.73991, lng: -60.14467 } }
                            ]
                        },
                        AP: {
                            "Macapá": [
                                { name: "Recicla Macapá", address: "Av. FAB, 1000", coordinates: { lat: 0.0385, lng: -51.0666 } },
                                { name: "EcoCentro", address: "Rua Cândido Mendes, 200", coordinates: { lat: 0.0401, lng: -51.0689 } },
                                { name: "Verde Norte", address: "Av. Presidente Vargas, 300", coordinates: { lat: 0.0373, lng: -51.0671 } }
                            ],
                            "Santana": [
                                { name: "Recicla Santana", address: "Av. Santana, 500", coordinates: { lat: -0.0579, lng: -51.1803 } },
                                { name: "EcoPonto Norte", address: "Rua Salvador Diniz, 400", coordinates: { lat: -0.0591, lng: -51.1814 } },
                                { name: "Verde Leste", address: "Rua Cláudio Lúcio Monteiro, 600", coordinates: { lat: -0.0568, lng: -51.1822 } }
                            ],
                            "Laranjal do Jari": [
                                { name: "Recicla Jari", address: "Rua Tancredo Neves, 700", coordinates: { lat: -0.8510, lng: -52.4803 } },
                                { name: "EcoSul", address: "Av. Independência, 500", coordinates: { lat: -0.8502, lng: -52.4815 } },
                                { name: "Verde Jari", address: "Rua João Pessoa, 400", coordinates: { lat: -0.8524, lng: -52.4821 } }
                            ],
                            "Oiapoque": [
                                { name: "Recicla Oiapoque", address: "Av. Barão do Rio Branco, 200", coordinates: { lat: 3.8406, lng: -51.8331 } },
                                { name: "EcoPonto Centro", address: "Rua Joaquim Caetano, 300", coordinates: { lat: 3.8418, lng: -51.8342 } },
                                { name: "Verde Oeste", address: "Rua Marechal Rondon, 400", coordinates: { lat: 3.8399, lng: -51.8323 } }
                            ],
                            "Mazagão": [
                                { name: "Recicla Mazagão", address: "Rua Princesa Isabel, 150", coordinates: { lat: -0.1181, lng: -51.2915 } },
                                { name: "EcoMazagão", address: "Av. Dinarte Medeiros, 100", coordinates: { lat: -0.1193, lng: -51.2928 } },
                                { name: "Verde Sul", address: "Rua General Rondon, 300", coordinates: { lat: -0.1175, lng: -51.2902 } }
                            ]
                        },
                        MS: {
                            "Campo Grande": [
                                { name: "Recicla Campo Grande", address: "Av. Afonso Pena, 1200", coordinates: { lat: -20.4486, lng: -54.6295 } },
                                { name: "EcoCentro", address: "Rua 14 de Julho, 800", coordinates: { lat: -20.4502, lng: -54.6281 } },
                                { name: "Verde Sul", address: "Av. Mato Grosso, 500", coordinates: { lat: -20.4491, lng: -54.6308 } }
                            ],
                            "Dourados": [
                                { name: "Recicla Dourados", address: "Av. Marcelino Pires, 1000", coordinates: { lat: -22.2231, lng: -54.8052 } },
                                { name: "EcoPonto Norte", address: "Rua Cuiabá, 400", coordinates: { lat: -22.2243, lng: -54.8065 } },
                                { name: "Verde Oeste", address: "Rua João Rosa Góes, 600", coordinates: { lat: -22.2221, lng: -54.8044 } }
                            ],
                            "Três Lagoas": [
                                { name: "Recicla Três Lagoas", address: "Av. Antônio Trajano, 300", coordinates: { lat: -20.7534, lng: -51.6780 } },
                                { name: "EcoSul", address: "Rua Paranaíba, 200", coordinates: { lat: -20.7547, lng: -51.6792 } },
                                { name: "Verde Centro", address: "Rua Oscar Guimarães, 500", coordinates: { lat: -20.7523, lng: -51.6769 } }
                            ],
                            "Corumbá": [
                                { name: "Recicla Corumbá", address: "Rua Dom Aquino, 100", coordinates: { lat: -19.0088, lng: -57.6536 } },
                                { name: "EcoCentro", address: "Av. General Rondon, 300", coordinates: { lat: -19.0075, lng: -57.6552 } },
                                { name: "Verde Norte", address: "Rua Cabral, 200", coordinates: { lat: -19.0096, lng: -57.6541 } }
                            ],
                            "Ponta Porã": [
                                { name: "Recicla Ponta Porã", address: "Rua Marechal Floriano, 150", coordinates: { lat: -22.5372, lng: -55.7298 } },
                                { name: "EcoLeste", address: "Av. Brasil, 200", coordinates: { lat: -22.5384, lng: -55.7287 } },
                                { name: "Verde Oeste", address: "Rua Guia Lopes, 400", coordinates: { lat: -22.5363, lng: -55.7305 } }
                            ]
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
            if (!favorites.some(fav => fav.nome === name)) {
                favorites.push({ nome: name, endereco: address });
                updateFavoritesList();
                alert(`${name} foi adicionado aos favoritos!`);
            } else {
                alert(`${name} já está nos favoritos.`);
            }
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
