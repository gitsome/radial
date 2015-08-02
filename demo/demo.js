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
                group: 'warm',
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

        var radial = new Radial(container, shapes, {});

        container.click(function () {

            var transformPlaylist = [];

            transformPlaylist.push({
                transforms:[
                    {type: 'white'}
                ],
                delay: Radial.DELAY_BY_INDEX,
                speed: 300
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'restore', configs: {color: true, stroke: true}}
                ],
                delay: 0,
                speed: 800
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'rotate', configs: {rotation: 360}}
                ],
                delay: Radial.DELAY_BY_INDEX,
                speed: 800
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'innerHalf', groups: ['cool']},
                    {type: 'outerHalf', groups: ['warm']},
                    {type: 'arcLength', configs: {arcLength: 110}},
                    {
                        type: 'custom',
                        groups: ['cool'],
                        configs: {
                            custom: function () {
                                return {};
                            }
                        }
                    }
                ],
                speed: 800
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'rotate', groups: ['cool'], configs: {rotation: -360}},
                    {type: 'rotate', groups: ['warm'], configs: {rotation: 360}}
                ],
                speed: 800
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'restore', configs: {inner:true, outer: true, arcLength:true}}
                ],
                delay: 0,
                speed: 300
            });

            transformPlaylist.push({
                transforms:[{type: 'shrink'}],
                delay: 0,
                speed: 200
            });

            transformPlaylist.push({
                transforms:[{type: 'grow'}],
                delay: 0,
                speed: 100
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'restore', configs: {color: true, stroke: true}}
                ],
                delay: Radial.DELAY_BY_INDEX,
                speed: 100,
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'gray', groups: ['warm']}
                ],
                delay: 0,
                speed: 300
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'arcLength', configs: {arcLength: Math.round(Math.random()* 150) + 10 }}
                ],
                delay: Radial.DELAY_BY_INDEX,
                speed: 500
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'opacity', configs: {opacity: 0.4 }}
                ],
                speed: 200
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'opacity', configs: {opacity: 1.0 }}
                ],
                speed: 250
            });

            transformPlaylist.push({
                transforms:[{type: 'shrink'}],
                delay: 0,
                speed: 300
            });

            transformPlaylist.push({
                transforms:[{type: 'grow'}],
                delay: 0,
                speed: 200
            });

            transformPlaylist.push({
                transforms:[
                    {type: 'restore'}
                ],
                speed: 700
            });

            radial.transform(transformPlaylist, {});

        });

    };

})();