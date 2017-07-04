var tokenValue = sessionStorage.getItem("token");
var mapaUrl = '/api/clientes/mapas/volnegocio' + "?auth=" + tokenValue;

var barChart = Morris.Bar({
    element: 'morris-bar-chart',
    data: [
        {
            ano: null,
            numcto: null,
            numprp: null
        }],
    xkey: 'ano',
    ykeys: ['numcto', 'numprp'],
    labels: ['Propostas', 'Contratos'],
    hideHover: 'auto',
    resize: true
});


$.ajax({
    url: mapaUrl,
    method: 'GET',
    cache: false,
    success: function (result) {
        console.log("SUCESSO");
        if(result){
            console.log(result);
            barChart.setData(result);
        } else {
            console.log("ERRO!");
        }
    },
    error: function (result) {
        console.log("ERRO!");
    }
});



