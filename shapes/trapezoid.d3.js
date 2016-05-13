var Radial = Radial || {};

(function(){

    var d3_svg_trapezoidInnerRadius = function (d) {
        return d.innerRadius;
    };

    var d3_svg_trapezoidOuterRadius = function (d) {
        return d.outerRadius;
    };

    var d3_svg_trapezoidAngle = function (d) {
        return d.angle;
    };

    var d3_svg_trapezoidArcLength = function (d) {
        return d.arcLength;
    };

    d3.svg.trapezoid = function() {

        /*============ PRIVATE VARIABLES / METHODS ============*/

        var innerRadius = d3_svg_trapezoidInnerRadius;
        var outerRadius = d3_svg_trapezoidOuterRadius;
        var angle = d3_svg_trapezoidAngle;
        var arcLength = d3_svg_trapezoidArcLength;


        /*============ CLASS DEFINITION ============*/

        var trapezoid = function () {

            var rI = innerRadius.apply(this, arguments);
            var rO = outerRadius.apply(this, arguments);
            var a0 = Radial.toRadians(angle.apply(this, arguments));
            var aLength = Radial.toRadians(arcLength.apply(this, arguments));

            // outerLeft
            var A = {
                x: rO * Math.cos(a0 - aLength / 2),
                y: -rO * Math.sin(a0 - aLength / 2)
            };

            // outerRight
            var B = {
                x: rO * Math.cos(a0 + aLength / 2),
                y: -rO * Math.sin(a0 + aLength / 2)
            };

            // innerRight
            var C = {
                x: rI * Math.cos(a0 + aLength / 2),
                y: -rI * Math.sin(a0 + aLength / 2)
            };

            // innerLeft
            var D = {
                y: -rI * Math.sin(a0 - aLength / 2),
                x: rI * Math.cos(a0 - aLength / 2)
            };

            var slicePath = new Radial.PathCreator();
            slicePath.moveTo(A).LineTo(B).LineTo(C).LineTo(D).close();

            return  slicePath.path();
        };


        /*============ CLASS METHODS ============*/

        trapezoid.innerRadius = function(v) {
            if (!arguments.length) return innerRadius;
            innerRadius = d3.functor(v);
            return trapezoid;
        };

        trapezoid.outerRadius = function(v) {
            if (!arguments.length) return outerRadius;
            outerRadius = d3.functor(v);
            return trapezoid;
        };

        trapezoid.angle = function(v) {
            if (!arguments.length) return angle;
            angle = d3.functor(v);
            return trapezoid;
        };

        trapezoid.arcLength = function(v) {
            if (!arguments.length) return arcLength;
            arcLength = d3.functor(v);
            return trapezoid;
        };

        return trapezoid;
    };

}());
