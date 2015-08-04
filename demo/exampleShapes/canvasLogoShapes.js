
var Radial = Radial || {};

var canvasLogoShapes;
(function () {

    var halfCircleIn = Radial.shapes.halfCircleIn({});
    var circle = Radial.shapes.circle({});
    var arc = Radial.shapes.arc({cornerRadius: 0});

    canvasLogoShapes = [

        {
            id: '1',
            group: 'outer',
            path: halfCircleIn,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 0,
            arcLength: 35,
            inner: 0.6,
            outer: 1.0
        },

        {
            id: '2',
            group: 'outer',
            path: halfCircleIn,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 45,
            arcLength: 35,
            inner: 0.6,
            outer: 1.0
        },
        {
            id: '3',
            group: 'outer',
            path: halfCircleIn,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 90,
            arcLength: 35,
            inner: 0.6,
            outer: 1.0
        },
        {
            id: '4',
            group: 'outer',
            path: halfCircleIn,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 135,
            arcLength: 35,
            inner: 0.6,
            outer: 1.0
        },
        {
            id: '5',
            group: 'outer',
            path: halfCircleIn,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 180,
            arcLength: 35,
            inner: 0.6,
            outer: 1.0
        },
        {
            id: '6',
            group: 'outer',
            path: halfCircleIn,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 225,
            arcLength: 35,
            inner: 0.6,
            outer: 1.0
        },
        {
            id: '7',
            group: 'outer',
            path: halfCircleIn,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 270,
            arcLength: 35,
            inner: 0.6,
            outer: 1.0
        },
        {
            id: '8',
            group: 'outer',
            path: halfCircleIn,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 315,
            arcLength: 35,
            inner: 0.6,
            outer: 1.0
        },

        {
            id: '9',
            group: 'inner',
            path: circle,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 0,
            arcLength: 35,
            inner: 0.45,
            outer: 0.625
        },
        {
            id: '10',
            group: 'inner',
            path: circle,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 45,
            arcLength: 35,
            inner: 0.45,
            outer: 0.625
        },
        {
            id: '11',
            group: 'inner',
            path: circle,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 90,
            arcLength: 35,
            inner: 0.45,
            outer: 0.625
        },
        {
            id: '12',
            group: 'inner',
            path: circle,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 135,
            arcLength: 35,
            inner: 0.45,
            outer: 0.625
        },
        {
            id: '13',
            group: 'inner',
            path: circle,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 180,
            arcLength: 35,
            inner: 0.45,
            outer: 0.625
        },
        {
            id: '14',
            group: 'inner',
            path: circle,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 225,
            arcLength: 35,
            inner: 0.45,
            outer: 0.625
        },
        {
            id: '15',
            group: 'inner',
            path: circle,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 270,
            arcLength: 35,
            inner: 0.45,
            outer: 0.625
        },
        {
            id: '16',
            group: 'inner',
            path: circle,
            color: '#E33C28',
            stroke: '#E33C28',
            angle: 315,
            arcLength: 35,
            inner: 0.45,
            outer: 0.625
        }
    ];

})();