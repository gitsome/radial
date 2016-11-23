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

    d3.svg.tearDrop = function() {

        /*============ PRIVATE VARIABLES / METHODS ============*/

        /*============ CLASS DEFINITION ============*/

        var tearDrop = function () {

            var rI = innerRadius.apply(this, arguments);
            var rO = outerRadius.apply(this, arguments);
            var angleVal = angle.apply(this, arguments);
            var a0 = Radial.toRadians(angleVal);
            var arcLengthDegrees = arcLength.apply(this, arguments);
            var aLength = Radial.toRadians(arcLengthDegrees);

            // Tear Drop Point
            var T = {
                x: rI * Math.cos(a0),
                y: -rI * Math.sin(a0)
            };

            // Tear Drop To Outer Circle Distance
            var totalDistance = (rO - rI) * 1;

            // Circle Radius
            var circleRadius = (totalDistance / (1 + Math.sqrt(2)));

            var distanceToCircleCenter = rO - circleRadius;

            // Circle Center
            var circleCenter = {
                x: distanceToCircleCenter * Math.cos(a0),
                y: -distanceToCircleCenter * Math.sin(a0)
            };

            // Tear Drop Left
            var Tl = {
                x: T.x + circleRadius * Math.cos(a0 - aLength / 2),
                y: T.y - circleRadius * Math.sin(a0 - aLength / 2)
            };

            // Tear Drop Right
            var Tr = {
                x: T.x + circleRadius * Math.cos(a0 + aLength / 2),
                y: T.y - circleRadius * Math.sin(a0 + aLength / 2)
            };

            var tearDropPath = new Radial.PathCreator();

            tearDropPath
                .MoveTo(T)
                .LineTo(Tl)
                .ATo({x:circleRadius, y:circleRadius}, arcLengthDegrees, 1, 0, Tr)
                .close();

            return tearDropPath.path();
        };


        /*============ CLASS METHODS ============*/

        tearDrop.innerRadius = function(v) {
            if (!arguments.length) return innerRadius;
            innerRadius = d3.functor(v);
            return tearDrop;
        };

        tearDrop.outerRadius = function(v) {
            if (!arguments.length) return outerRadius;
            outerRadius = d3.functor(v);
            return tearDrop;
        };

        tearDrop.angle = function(v) {
            if (!arguments.length) return angle;
            angle = d3.functor(v);
            return tearDrop;
        };

        tearDrop.arcLength = function(v) {
            if (!arguments.length) return arcLength;
            arcLength = d3.functor(v);
            return tearDrop;
        };

        return tearDrop;
    };

}());
