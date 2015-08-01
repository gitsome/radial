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
                group: 'cool',
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

        container.click(function () {

            var transforms = [];
            transforms.push({type: 'white', shapes: ['red'], delay: 0, speed: 500});
            transforms.push({type: 'rotate', groups: ['cool'], configs: {rotation: 360}, delay: Radial.DELAY_BY_INDEX, speed: 800});
            transforms.push({type: 'shrink', delay: 0, speed: 300});
            transforms.push({type: 'grow', delay: 0, speed: 300});
            transforms.push({type: 'restore', delay: Radial.DELAY_BY_INDEX, speed: 300, configs: {color: true, stroke: true}});
            transforms.push({type: 'arcLength', configs: {arcLength: Math.round(Math.random()* 150) + 10 }, delay: Radial.DELAY_BY_INDEX, speed: 500});
            transforms.push({type: 'opacity', configs: {opacity: 0 }, delay: Radial.DELAY_BY_INDEX, speed: 500});
            transforms.push({type: 'opacity', configs: {opacity: 1.0 }, delay: Radial.DELAY_BY_INDEX, speed: 200});

            radial.transform(transforms, {});

        });

    };

})();