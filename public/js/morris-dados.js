
Morris.Bar({
    element: 'morris-bar-chart',
    data: [
     {
        y: '2010',
        a: 30,
        b: 60
     }, {
        y: '2011',
        a: 100,
        b: 90
    }, {
        y: '2012',
        a: 75,
        b: 65
    }, {
        y: '2013',
        a: 50,
        b: 40
    }, {
        y: '2014',
        a: 75,
        b: 65
    }, {
        y: '2015',
        a: 50,
        b: 40
    }, {
        y: '2016',
        a: 75,
        b: 65
    }, {
        y: '2017',
        a: 100,
        b: 90
    }],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Propostas', 'Contratos'],
    hideHover: 'auto',
    resize: true
});
