
var Radial = Radial || {};

var ephoxShapes;
(function () {

    var tearDrop = Radial.shapes.tearDrop({});

    ephoxShapes = [

        {
            id: '4',
            group: 'small',
            path: tearDrop,
            color: '#28a2d9',
            stroke: '#28a2d9',
            angle: 315,
            arcLength: 90,
            inner: 0.25,
            outer: 1.0
        },
        {
            id: '1',
            group: 'large',
            path: tearDrop,
            color: '#7cc731',
            stroke: '#7cc731',
            angle: 45,
            arcLength: 90,
            inner: 0.0,
            outer: 1.0
        },
        {
            id: '2',
            group: 'small',
            path: tearDrop,
            color: '#fa4e88',
            stroke: '#fa4e88',
            angle: 135,
            arcLength: 90,
            inner: 0.25,
            outer: 1.0
        },
        {
            id: '3',
            group: 'large',
            path: tearDrop,
            color: '#fbbc2c',
            stroke: '#fbbc2c',
            angle: 225,
            arcLength: 90,
            inner: 0.0,
            outer: 1.0
        }
    ];

})();