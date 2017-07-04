var tokenValue = sessionStorage.getItem("token");
var mapaUrl = '/api/clientes/mapas/pipeline' + "?auth=" + tokenValue;

var pieChart = Morris.Donut({
    element: 'morris-donut-chart',
    data: [{
        label: null,
        value: null
    }],
    colors: ['#AEE256', '#E28956', '#E25668', '#CF56E2', '#5668E2', '#56E2CF'],
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
            pieChart.setData(result);
        } else {
            console.log("ERRO!");
        }
    },
    error: function (result) {
        console.log("ERRO!");
    }
});

