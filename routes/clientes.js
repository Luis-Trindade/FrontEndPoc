var express = require('express');
var router = express.Router();

var http = require('http');
/* GET home page. */
router.get('/', function(req, res, next) {

    var context = {
        modal_title: "Adicionar Clientes",
        modal_id: "adicionaCliente",
        temTabelas: "Sim",
        idtabela: "dataTables-clientes",
        tabledblhref: "cliente",
        restricoes: [
            { codigo: "Portugueses" },
            { codigo: "Estrangeiros" },
            { codigo: "Particulares" },
            { codigo: "Empresas" }
        ],
        clientes: [

            { numero: "103746276", nome: "ATLANTICO A VISTA - SOCIEDADE DE CONSTRUCOES LDA", email: "", telefone: "", nif: "501514228" },
            { numero: "103279383", nome: "BAVIERA COMERCIO AUTOMOVEIS SA", email: "", telefone: "232480810", nif: "500003165" },
            { numero: "102906814", nome: "MEDIOCURSO - ESTABELECIMENTO DE ENSINO PARTICULAR SA", email: "", telefone: "213979718", nif: "501324186" },
            { numero: "102053460", nome: "MARIA EUFEMIA MARQUES RAMOS VARZEA", email: "", telefone: "", nif: "107646455" },
            { numero: "102053427", nome: "ANTONIO CRUZ VARZEA", email: "", telefone: "", nif: "144475596" },
            { numero: "101984676", nome: "BELA_COISA", email: "", telefone: "", nif: "123456789" },
            { numero: "60000002", nome: "JORGE MIGUEL FERREIRA TEIXEIRA", email: "", telefone: "", nif: "231751893" },
            { numero: "4089517", nome: "NomeEmpresa", email: "", telefone: "210003344", nif: "504211080" },
            { numero: "3640529", nome: "MARIA MANUELA FIDALGO GREGORIO", email: "", telefone: "967613922", nif: "127102760" },
            { numero: "3007106", nome: "TERCEIRA FARMA COMERCIO INDUS PROD QUIMICOS LDA", email: "", telefone: "295206700", nif: "512045453" },
            { numero: "2028360", nome: "SNN - SERVICOS DE GESTAO APLICADA LDA", email: "", telefone: "214787460", nif: "505322684" },
            { numero: "2012475", nome: "FRANCISCO FILIPE FERREIRA GRACA", email: "", telefone: "22", nif: "225426145" },
            { numero: "1513143", nome: "TRANSPORTES ALHO LDA", email: "", telefone: "214328970", nif: "501483411" },
            { numero: "1113333", nome: "Liberio das neves", email: "www.slbenfica.pt", telefone: "", nif: "123456789" },
            { numero: "1111113", nome: "Liberio das neves", email: "", telefone: "", nif: "123456789" },
            { numero: "804148", nome: "S.P.L.A.-SOCIEDADE PORTUGUESA DE LEILOES DE AUTOMOVEIS, SA", email: "", telefone: "219227300", nif: "503617326" },
            { numero: "790805", nome: "FRANCISCO XAVIER VIEIRA DA SILVA", email: "", telefone: "966546899", nif: "189381949" },
            { numero: "780993", nome: "PAULO FERNANDO CALAFATE RODRIGUES", email: "", telefone: "2497328972", nif: "204713900" },
            { numero: "775115", nome: "CONSULPAV-CONSULTORES E PROJECTOS DE PAVIMENTOS, LDA", email: "", telefone: "", nif: "502323507" },
            { numero: "620440", nome: "ANTONIO JOSE BRANDARIZ MANSO PRETO DE BRAGANÇA", email: "", telefone: "22-2005575", nif: "156093227" },
            { numero: "593159", nome: "ANTONIO JOSE RIBEIRO MATOS MORAIS", email: "", telefone: "962682837", nif: "13456969" },
            { numero: "515177", nome: "CIPAN-COMPANHIA INDUSTRIAL PRODUTORA DE ANTIBIOTICOS SA", email: "", telefone: "263856800", nif: "500508291" },
            { numero: "509665", nome: "CLIENTE DE TESTE TOTTA", email: "", telefone: "", nif: "000000000" },
            { numero: "501684", nome: "ANTONIO FERREIRA LEAL E CIA LDA", email: "", telefone: "255890320", nif: "500745250" },
            { numero: "426893", nome: "José Joao Joaquim dos Anzois", email: "", telefone: "", nif: "123456789" },
            { numero: "426892", nome: "TRANSGRUA-REPRESENTACOES E ALUGUER DE GRUAS,LDA", email: "", telefone: "213873455", nif: "500286957" },
            { numero: "202020", nome: "QQ", email: "", telefone: "21 000 0000", nif: "123456789" },
            { numero: "199200", nome: "TITULAR CONTRATO NORMAL", email: "", telefone: "", nif: "992000009" },
            { numero: "199100", nome: "AVALISTA CONTRATO NORMAL", email: "", telefone: "", nif: "991000000" },
            { numero: "199000", nome: "CONTRATO NORMAL", email: "", telefone: "", nif: "990000000" },
            { numero: "188200", nome: "TITULAR CONSORCIO LIDER", email: "", telefone: "", nif: "882000004" },
            { numero: "188100", nome: "AVALISTA CONSORCIO LIDER", email: "", telefone: "", nif: "881000000" },
            { numero: "188000", nome: "CONSORCIO LIDER", email: "", telefone: "", nif: "880000000" },
            { numero: "177200", nome: "TITULR CONSORCIO NAO LIDER", email: "", telefone: "", nif: "772000000" },
            { numero: "177100", nome: "AVALISTA CONSORCIO NAO LIDER", email: "", telefone: "", nif: "771000000" },
            { numero: "177000", nome: "CONSORCIO NAO LIDER CTOCLI", email: "", telefone: "", nif: "770000000" },
            { numero: "166000", nome: "CTO NAO LIDER CTOCLICONS", email: "", telefone: "", nif: "660000000" },
            { numero: "155200", nome: "TITULR CONTRATO SECUR", email: "", telefone: "", nif: "552000000" },
            { numero: "155100", nome: "AVALISTA CONTRATO SECUR", email: "", telefone: "", nif: "551000000" },
            { numero: "155000", nome: "CONTRATO SECUR", email: "", telefone: "", nif: "550000000" },
            { numero: "140020", nome: "MIND SOURCE - CONSULTORES DE PORTUGAL, S.A.", email: "", telefone: "217937418", nif: "508123585" },
            { numero: "124023", nome: "CONTAS E CONTOS UNIPESSOAL LDA", email: "", telefone: "212349010", nif: "509375154"}


        ]
    };

    var paises = '';
    http.get('http://apaxsys004:5113/lease/api/pais/short', function(response){
        var contentType = response.headers['content-type'];

        if (response.statusCode !== 200) {
            console.log("StatusCODE: " + response.statusCode);
            return;
        } else if (!/^application\/json/.test(contentType)) {
            console.log("Erro contentType: "+ contentType);
            return;
        }
        response.setEncoding('utf8');
        var rawData = '';
        response.on('data', function(chunk) { rawData += chunk; });
        response.on('end', function(){
            try {
                paises = JSON.parse(rawData);
                context.paises = paises;
                res.render('clientes', context);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', function(e) {
        console.error("Got error: "+ e.message);
    });

});

module.exports = router;

