
var Radial = Radial || {};

var colorfulPizzaShapes;
(function () {

    var pizzaSlicePath = Radial.shapes.pizzaSlice({cornerPercent:0.3});

    colorfulPizzaShapes = [
        {
            id: 'orange',
            group: 'cool',
            path: pizzaSlicePath,
            color: '#f39136',
            stroke: '#f39136',
            angle: 0,
            arcLength: 60,
            inner: 0.31323,
            outer: 1.0
        },
        {
            id: 'red',
            group: 'warm',
            path: pizzaSlicePath,
            color: '#e5483b',
            stroke: '#e5483b',
            angle: 60,
            arcLength: 60,
            inner: 0.31323,
            outer: 1.0
        },
        {
            id: 'purple',
            group: 'cool',
            path: pizzaSlicePath,
            color: '#966882',
            stroke: '#966882',
            angle: 120,
            arcLength: 60,
            inner: 0.31323,
            outer: 1.0
        },
        {
            id: 'blue',
            group: 'warm',
            path: pizzaSlicePath,
            color: '#00a4af',
            stroke: '#00a4af',
            angle: 180,
            arcLength: 60,
            inner: 0.31323,
            outer: 1.0
        },
        {
            id: 'green',
            group: 'cool',
            path: pizzaSlicePath,
            color: '#00c87f',
            stroke: '#00c87f',
            angle: 240,
            arcLength: 60,
            inner: 0.31323,
            outer: 1.0
        },
        {
            id: 'yellow',
            group: 'warm',
            path: pizzaSlicePath,
            color: '#c7d643',
            stroke: '#c7d643',
            angle: 300,
            arcLength: 60,
            inner: 0.31323,
            outer: 1.0
        }
    ];

})();