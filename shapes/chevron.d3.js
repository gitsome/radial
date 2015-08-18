var Radial = Radial || {};

(function(){

    var d3_svg_chevronInnerRadius = function (d) {
        return d.innerRadius;
    };

    var d3_svg_chevronOuterRadius = function (d) {
        return d.outerRadius;
    };

    var d3_svg_chevronAngle = function (d) {
        return d.angle;
    };

    var d3_svg_chevronArcLength = function (d) {
        return d.arcLength;
    };

    d3.svg.chevron = function() {

        /*============ PRIVATE VARIABLES / METHODS ============*/

        var innerRadius = d3_svg_chevronInnerRadius;
        var outerRadius = d3_svg_chevronOuterRadius;
        var angle = d3_svg_chevronAngle;
        var arcLength = d3_svg_chevronArcLength;


        /*============ CLASS DEFINITION ============*/

        var chevron = function () {

            var rI = innerRadius.apply(this, arguments);
            var rO = outerRadius.apply(this, arguments);
            var a0 = Radial.toRadians(angle.apply(this, arguments));
            var aLength = Radial.toRadians(arcLength.apply(this, arguments));

            // the outside tip
            var A = {
                x: rO * Math.cos(a0),
                y: -rO * Math.sin(a0)
            };

            // the right outside corner
            var B = {
                x: rO * Math.cos(a0 + aLength / 2),
                y: -rO * Math.sin(a0 + aLength / 2)
            };

            // the right inside corner
            var C = {
                x: rI * Math.cos(a0 + aLength / 2),
                y: -rI * Math.sin(a0 + aLength / 2)
            };

            // the center inside tip
            var D = {
                y: -rI * Math.sin(a0),
                x: rI * Math.cos(a0)
            };

            // the inside left corner
            var E = {
                x: rI * Math.cos(a0 - aLength / 2),
                y: -rI * Math.sin(a0 - aLength / 2)
            };

            // the outside left corner
            var F = {
                x: rO * Math.cos(a0 - aLength / 2),
                y: -rO * Math.sin(a0 - aLength / 2)
            };

            var slicePath = new Radial.PathCreator();
            slicePath.moveTo(A).LineTo(B).LineTo(C).LineTo(D).LineTo(E).LineTo(F).close();

            return  slicePath.path();
        };


        /*============ CLASS METHODS ============*/

        chevron.innerRadius = function(v) {
            if (!arguments.length) return innerRadius;
            innerRadius = d3.functor(v);
            return chevron;
        };

        chevron.outerRadius = function(v) {
            if (!arguments.length) return outerRadius;
            outerRadius = d3.functor(v);
            return chevron;
        };

        chevron.angle = function(v) {
            if (!arguments.length) return angle;
            angle = d3.functor(v);
            return chevron;
        };

        chevron.arcLength = function(v) {
            if (!arguments.length) return arcLength;
            arcLength = d3.functor(v);
            return chevron;
        };

        return chevron;
    };

}());
