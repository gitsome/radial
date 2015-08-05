
var Radial = Radial || {};

var ubuntuShapes;
(function () {

    var circle = Radial.shapes.circle({});
    var arc = Radial.shapes.arc({cornerRadius: 0});

    ubuntuShapes = [

        {
            id: '1',
            group: 'arcs',
            path: arc,
            color: '#FF6309',
            stroke: '#FFF',
            strokeWidth: '10',
            angle: 60,
            arcLength: 120,
            inner: 0.4,
            outer: 0.7
        },
        {
            id: '2',
            group: 'arcs',
            path: arc,
            color: '#FFB515',
            stroke: '#FFF',
            strokeWidth: '10',
            angle: 180,
            arcLength: 120,
            inner: 0.4,
            outer: 0.7
        },
        {
            id: '3',
            group: 'arcs',
            path: arc,
            color: '#C90016',
            stroke: '#FFF',
            strokeWidth: '10',
            angle: 300,
            arcLength: 120,
            inner: 0.4,
            outer: 0.7
        },

        {
            id: '4',
            group: 'circles',
            path: circle,
            color: '#C90016',
            stroke: '#FFF',
            strokeWidth: '10',
            angle: 60,
            arcLength: 40,
            inner: 0.6,
            outer: 1.0
        },
        {
            id: '5',
            group: 'circles',
            path: circle,
            color: '#FF6309',
            stroke: '#FFF',
            strokeWidth: '10',
            angle: 180,
            arcLength: 40,
            inner: 0.6,
            outer: 1.0
        },
        {
            id: '6',
            group: 'circles',
            path: circle,
            color: '#FFB515',
            stroke: '#FFF',
            strokeWidth: '10',
            angle: 300,
            arcLength: 40,
            inner: 0.6,
            outer: 1.0
        }
    ];

})();