
var Radial = Radial || {};

var exaptiveShapes;
(function () {

    var trapezoid = Radial.shapes.trapezoid({});
    var arc = Radial.shapes.arc({cornerRadius: 0});

    var TRAP_INNER = 0.35;
    var TRAP_OUTER = 0.65;

    var ARC_INNER = 0.7;
    var ARC_OUTER = 1.0;

    var ANGLE_INC = 60;

    var EXAPTIVE_COLORS = [
        '#6EAEDD',
        '#96C4E5',
        '#DCC5A9',
        '#DF9C6D',
        '#D16E69',
        '#C54F92'
    ];

    exaptiveShapes = [];

    var color;
    var angle = 0;
    for (var i=0; i < EXAPTIVE_COLORS.length; i++) {

        color = EXAPTIVE_COLORS[i];

        exaptiveShapes.push({
            id: i * 2,
            group: 'arcs',
            path: arc,
            color: color,
            stroke: color,
            angle: angle,
            arcLength: ANGLE_INC,
            inner: ARC_INNER,
            outer: ARC_OUTER
        });

        exaptiveShapes.push({
            id: i * 2 + 1,
            group: 'traps',
            path: trapezoid,
            color: color,
            stroke: color,
            angle: angle,
            arcLength: ANGLE_INC,
            inner: TRAP_INNER,
            outer: TRAP_OUTER
        });

        angle = angle + ANGLE_INC;
    }

})();