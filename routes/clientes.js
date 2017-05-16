var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/clientes.html', function(req, res, next) {

    var context = {
        modal_title: "Adicionar Clientes",
        modal_id: "adicionaCliente",
        clientes: [
            { numero: "100846", nome: "JOSE VIEIRA", nif:"123546789", morada: "RUA Z", clitcli:"P", tipo: "CLI" },
            { numero: "100917", nome: "SUPERMERCADOS MARCOMPRAS, LDA", nif:"501369198", morada: "AV GEN HUMBERTO DELGADO, 2A", clitcli:"E", tipo: "CLI" },
            { numero: "101007", nome: "JOSE SANTOS BANDEIRA VIEIRA", nif:"805483942", morada: "URB HORTA PERES, LOTE 18/19 - 2/C", clitcli:"E", tipo: "CLI" },
            { numero: "101215", nome: "JOSE FELICIANO SOUSA MATIAS", nif:"813091578", morada: "VALE MOURO", clitcli:"E", tipo: "CLI" },
            { numero: "100936", nome: "BELFAX-REPRESENTACOES COMERCIO GERAL, LDA", nif:"500520003", morada: "PRACA COMERCIO, 2 A", clitcli:"E", tipo: "CLI" },
            { numero: "101080", nome: "MARIA IRENE TEIXEIRA MOURA", nif:"809784165", morada: "R IGREJA, 3", clitcli:"E", tipo: "CLI" },
            { numero: "101364", nome: "MARTINS MOURA & SILVA, LDA", nif:"500187096", morada: "R FERNAO MAGALHAES, 89", clitcli:"E", tipo: "CLI" },
            { numero: "101480", nome: "DECORVIANA - MATERIAIS CONSTRUCAO DECORACAO, LDA", nif:"502426721", morada: "QUINTA SEQUEIRO, LOTE 102 - R/C", clitcli:"E", tipo: "CLI" },
            { numero: "100859", nome: "FERNANDO VENTURA GUIMARAES SA FERREIRA", nif:"802478603", morada: "R 18, 704", clitcli:"E", tipo: "CLI" },
            { numero: "100826", nome: "RADIO CLUBE ARGANIL-COOPERATIVA RADIO, CRL", nif:"501851070", morada: "LG PDR MANUEL VASC DELGADO, 3-2 ESQ", clitcli:"E", tipo: "CLI" },
            { numero: "101609", nome: "ANTONIO JOSE FERREIRA GUEDES PINTO", nif:"180893831", morada: "R CIDADE CABINDA, 34 - 6 ESQ", clitcli:"E", tipo: "CLI" },
            { numero: "100844", nome: "LUIS JOSE FERNANDES & FOS, LDA", nif:"500375542", morada: "PAINCOL", clitcli:"E", tipo: "CLI" },
            { numero: "100793", nome: "SERRALHARIA ARTISTICA CIVIL OLIVEIRAS, LDA", nif:"500246009", morada: "AV DR MOREIRA SOUSA, 2571", clitcli:"E", tipo: "CLI" },
            { numero: "101281", nome: "CARTOPOR-CARTAO PORTUGUES, LDA", nif:"502233559", morada: "AREAL- S JOAO VER", clitcli:"E", tipo: "CLI" },
            { numero: "100801", nome: "NESMATEX-SOCIEDADE INDUSTRIAL MALHAS TEXTEIS, LDA", nif:"501790349", morada: "CANICOS - BAIRRO", clitcli:"E", tipo: "CLI" },
            { numero: "100828", nome: "MANUEL RODRIGUES OLIVEIRA SA & FILHOS, SA", nif:"500180547", morada: "RUA DO OUTEIRO", clitcli:"E", tipo: "CLI" },
            { numero: "100835", nome: "VERTO PORTUGAL-SOCIEDADE INDUSTRIAL DE CORDOARIA, LDA", nif:"502040360", morada: "REBORDAOS", clitcli:"E", tipo: "CLI" },
            { numero: "100834", nome: "CARLOS ALBERTO JESUS LOPES", nif:"800622111", morada: "R LATINO COELHO", clitcli:"E", tipo: "CLI" },
            { numero: "100841", nome: "MANUEL AUGUSTO ROCHA CAPELA", nif:"135844991", morada: "SEITELA",  clitcli:"E", tipo: "CLI" },
            { numero: "101649", nome: "IGIDIO MANUEL NOVO CORREIA PEREIRA", nif:"801033721", morada: "R ELVAS, 56", clitcli:"E", tipo: "CLI" },
            { numero: "103663", nome: "COSTA & TIMOTIO, LDA", nif:"502803878", morada: "RUA FILIPA BORGES", clitcli:"E", tipo: "CLI" },
            { numero: "100884", nome: "CARVALHO & CA, LDA", nif:"500328447", morada: "LUGAR CASAL", clitcli:"E", tipo: "CLI" },
            { numero: "100862", nome: "VALINOX - INDUSTRIAS METALURGICAS, LDA", nif:"501167250", morada: "ZONA INDUSTRIAL DA FARRAPA", clitcli:"E", tipo: "CLI" },
            { numero: "101403", nome: "MARIA NOEMIA CORREIA TOME NORA", nif:"800810546", morada: "TRAV CASTELO, 55", clitcli:"E", tipo: "CLI" },
            { numero: "100997", nome: "LUIS FERNANDES OLIVEIRA", nif:"805961380", morada: "LUGAR MONTE",clitcli:"E", tipo: "CLI" },
            { numero: "100858", nome: "PLASTIVENDA-SOCIEDADE COMERCIO MATERIAS PLASTICAS, LDA", nif:"502451688", morada: "R MARIA LAMAS, 23 - APELACAO", clitcli:"E", tipo: "CLI" },
            { numero: "100856", nome: "LUIS CONCEICAO PIRES", nif:"800699386", morada: "FIGUEIRA CASTELO RODRIGO", clitcli:"E", tipo: "CLI" },
            { numero: "100926", nome: "CEZANNE - FOTO VIDEO, LDA", nif:"502610883", morada: "PASSEIO VIRTUDES, 30 - 3 ESQ", clitcli:"E", tipo: "CLI" },
            { numero: "100916", nome: "LUIS MANUEL DE CARVALHO BARBOSA COLEN", nif:"111661773", morada: "URBANIZACAO DA PORTELA-LOTE 168-12 DTO", clitcli:"E", tipo: "CLI" },
            { numero: "100840", nome: "JOSE MARQUES GRACIO, LDA", nif:"500738793", morada: "CABACOS", clitcli:"E", tipo: "CLI" },
            { numero: "100847", nome: "MALHAS ROMIL DE FERREIRA & IRMA, LDA", nif:"502037970", morada: "RUA DA INDUSTRIA", clitcli:"E", tipo: "CLI" },
            { numero: "100930", nome: "GUILHERME GOMES DOS SANTOS & CA, LDA", nif:"500131961", morada: "RUA NOVA DE BRANDARIZ, 62", clitcli:"E", tipo: "CLI" },
            { numero: "101400", nome: "HOMER-PUBLICIDADE MARKETING, LDA", nif:"502554380", morada: "R VASCO GAMA, LOTE A - R/C DTO", clitcli:"E", tipo: "CLI" },
            { numero: "102030", nome: "LINO CRUZ, LDA", nif:"500800073", morada: "VILAMAR", clitcli:"E",tipo: "CLI" },
            { numero: "103910", nome: "IBERTEJO - COMERCIO E INDUSTRIA DE PRODUTOS ALIMENTARES, SA", nif:"501642226", morada: "QUINTA DA ARROCASIA, LOTE 3", clitcli:"E", tipo: "CLI" },
            { numero: "100914", nome: "BATALHA DOS ANJOS, LDA", nif:"501211225", morada: "QUINTA DAS CALVANAS, 2 B", clitcli:"E", tipo: "CLI" },
            { numero: "101180", nome: "VIDEO FOTO VANGUARDA, LDA", nif:"501785728", morada: "RUA BATALHA REIS, 115/117", clitcli:"E", tipo: "CLI" },
            { numero: "101650", nome: "FERNANDO REIS & FILHOS, LDA", nif:"501704833", morada: "VILA BOA", clitcli:"E", tipo: "CLI" },
            { numero: "100921", nome: "JOSE MANUEL SANTOS BRANCO", nif:"813467519", morada: "ESTRADA NACIONAL 1, KM 35", clitcli:"E", tipo: "CLI" },
            { numero: "101030", nome: "MARIO PEDRO RODRIGUES NEVES", nif:"810660547", morada: "R DIU, 13 A", clitcli:"E", tipo: "CLI" }
        ]
    }

    res.render('clientes', context);
});

module.exports = router;

