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

    d3.svg.circle = function() {

        /*============ PRIVATE VARIABLES / METHODS ============*/

        /*============ CLASS DEFINITION ============*/

        var circle = function () {

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

            // here we calculate the radius of an inscribed circle in an isocolese triangle
            var cB = {
                x: rO * Math.cos(Radial.toRadians(90 - arcLengthDegrees / 2)),
                y: rO * Math.sin(Radial.toRadians(90 - arcLengthDegrees / 2))
            };
            var cC = {
                x: rI * Math.cos(Radial.toRadians(90)),
                y: rI * Math.sin(Radial.toRadians(90))
            };
            var cD = {
                x: 0,
                y: rO
            }

            // we need to find the point that extends beyond B so we can calculate the base of the iso triangle
            // http://mathschallenge.net/full/inscribed_circle_in_isosceles_triangle
            var Bp = {
                x: cB.x + (cD.y - cB.y) * ((cB.x-cC.x)/(cB.y-cC.y)),
                y: cD.y
            };

            var triangleB = Bp.x * 2;
            var triangleL = Radial.distance({x:0, y:0}, Bp);

            var maxRadius = (rO - rI) / 2;

            var circleRadius = Math.min((triangleB/2) * Math.sqrt((2 * triangleL - triangleB)/(2 * triangleL + triangleB)), maxRadius);

            //circleRadius = 20;

            var circleCenter = {
                x: (rO - circleRadius) * Math.cos(a0),
                y: -(rO - circleRadius) * Math.sin(a0)
            };

            var F1 = {
                x: circleRadius,
                y: circleRadius
            };

            var circlePath = new Radial.PathCreator();

            circlePath.MoveTo(circleCenter)
                .moveTo({x:-circleRadius, y:0})
                .aTo(F1, 0, 1, 0, {x:circleRadius * 2, y:0})
                .aTo(F1, 0, 1, 0, {x: -1 * circleRadius * 2, y:0})
                .close()

            return  circlePath.path();
        };


        /*============ CLASS METHODS ============*/

        circle.innerRadius = function(v) {
            if (!arguments.length) return innerRadius;
            innerRadius = d3.functor(v);
            return circle;
        };

        circle.outerRadius = function(v) {
            if (!arguments.length) return outerRadius;
            outerRadius = d3.functor(v);
            return circle;
        };

        circle.angle = function(v) {
            if (!arguments.length) return angle;
            angle = d3.functor(v);
            return circle;
        };

        circle.arcLength = function(v) {
            if (!arguments.length) return arcLength;
            arcLength = d3.functor(v);
            return circle;
        };

        return circle;
    };

}());
