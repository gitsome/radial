
var Radial = Radial || {};

var falcorShapes;
(function () {

    var chevron = Radial.shapes.chevron({});

    falcorShapes = [

        {
            id: 'purple',
            group: 'arcs',
            path: chevron,
            color: '#9952BF',
            stroke: '#444',
            strokeWidth: '10',
            angle: 30,
            arcLength: 120,
            inner: 0.5,
            outer: 1.0
        },
        {
            id: 'blue',
            group: 'arcs',
            path: chevron,
            color: '#1C91DE',
            stroke: '#444',
            strokeWidth: '10',
            angle: 150,
            arcLength: 120,
            inner: 0.5,
            outer: 1.0
        },
        {
            id: 'green',
            group: 'arcs',
            path: chevron,
            color: '#82C412',
            stroke: '#444',
            strokeWidth: '10',
            angle: 270,
            arcLength: 120,
            inner: 0.5,
            outer: 1.0
        }
    ];

})();