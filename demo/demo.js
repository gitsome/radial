var startDemo;
(function () {

    startDemo = function () {

        var container = $('.target');

        var pizzaSlicePath = d3.svg.pizzaSlice()
            .innerRadius(function(d){return d.innerRadius;})
            .outerRadius(function(d){return d.outerRadius;})
            .angle(function(d){return d.angle;})
            .cornerPercent(function(d){return 0.30;});

        var shapes = [
            {
                id: 'orange',
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
                path: pizzaSlicePath,
                color: '#c7d643',
                stroke: '#c7d643',
                angle: 300,
                arcLength: 60,
                inner: 0.31323,
                outer: 1.0
            }
        ];

        var radial = new Radial(container, shapes, {});

    };

})();