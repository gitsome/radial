var Radial = Radial || {};

(function(){

    var innerRadius = function (d) {
        return d.innerRadius;
    };

    var outerRadius = function (d) {
        return d.outerRadius;
    };

    var angle = function (d) {
        return d.angle;
    };

    var arcLength = function (d) {
        return d.arcLength;
    };

    d3.svg.halfCircleIn = function() {

        /*============ PRIVATE VARIABLES / METHODS ============*/

        /*============ CLASS DEFINITION ============*/

        var halfCircleIn = function () {

            var rI = innerRadius.apply(this, arguments);
            var rO = outerRadius.apply(this, arguments);
            var angleVal = angle.apply(this, arguments);
            var a0 = Radial.toRadians(angleVal);
            var arcLengthDegrees = arcLength.apply(this, arguments);
            var aLength = Radial.toRadians(arcLengthDegrees);

            // points on the outer radius
            var A = {
                x: rO * Math.cos(a0 - aLength / 2),
                y: -rO * Math.sin(a0 - aLength / 2)
            };

            var B = {
                x: rO * Math.cos(a0 + aLength / 2),
                y: -rO * Math.sin(a0 + aLength / 2)
            };

            // this first focus for the first arc forces the outer curve to match the circle at that radius
            var F1 = {
                x: this.outerRadius,
                y: this.outerRadius,
            };

            // this is calculations to find the focus for the second arc based on the inner radius
            var outerPoint1 = {
                x: rO * Math.cos(Radial.toRadians(90 + arcLengthDegrees / 2)),
                y: -rO * Math.sin(Radial.toRadians(90 + arcLengthDegrees / 2))
            };
            var outerPoint2 = {
                x: rO * Math.cos(Radial.toRadians(90 - arcLengthDegrees / 2)),
                y: -rO * Math.sin(Radial.toRadians(90 - arcLengthDegrees / 2))
            };
            var innerPoint = {
                x: rI * Math.cos(Radial.toRadians(90)),
                y: -rI * Math.sin(Radial.toRadians(90))
            };

            var circle = Radial.circleFromThreePoints(outerPoint1, innerPoint, outerPoint2);

            var F2 = {
                x: circle.radius,
                y: circle.radius
            };

            var halfCircleInPath = new Radial.PathCreator();
            halfCircleInPath.MoveTo(A).ATo(F1, angleVal, 0, 0, B).close().MoveTo(A).ATo(F2, angleVal, 0, 1, B).close();

            return  halfCircleInPath.path();
        };


        /*============ CLASS METHODS ============*/

        halfCircleIn.innerRadius = function(v) {
            if (!arguments.length) return innerRadius;
            innerRadius = d3.functor(v);
            return halfCircleIn;
        };

        halfCircleIn.outerRadius = function(v) {
            if (!arguments.length) return outerRadius;
            outerRadius = d3.functor(v);
            return halfCircleIn;
        };

        halfCircleIn.angle = function(v) {
            if (!arguments.length) return angle;
            angle = d3.functor(v);
            return halfCircleIn;
        };

        halfCircleIn.arcLength = function(v) {
            if (!arguments.length) return arcLength;
            arcLength = d3.functor(v);
            return halfCircleIn;
        };

        return halfCircleIn;
    };

}());
