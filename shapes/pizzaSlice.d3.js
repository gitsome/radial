var Radial = Radial || {};

(function(){

    var d3_svg_arcOffset = 0 * Math.PI/2;

    var d3_svg_pizzaSliceInnerRadius = function (d) {
        return d.innerRadius;
    };

    var d3_svg_pizzaSliceOuterRadius = function (d) {
        return d.outerRadius;
    };

    var d3_svg_pizzaSliceAngle = function (d) {
        return d.angle;
    };

    var d3_svg_pizzaSliceCornerPercent = function (d) {
        return d.cornerPercent;
    };

    var d3_svg_pizzaSliceArcLength = function (d) {
        return d.arcLength;
    };

    d3.svg.pizzaSlice = function() {

        /*============ PRIVATE VARIABLES / METHODS ============*/

        var innerRadius = d3_svg_pizzaSliceInnerRadius;
        var outerRadius = d3_svg_pizzaSliceOuterRadius;
        var angle = d3_svg_pizzaSliceAngle;
        var arcLength = d3_svg_pizzaSliceArcLength;
        var cornerPercent = d3_svg_pizzaSliceCornerPercent;

        var percentFromAtoB = function (ptA, ptB, percent) {
            return {x:(ptB.x - ptA.x) * percent + ptA.x, y: (ptB.y - ptA.y) * percent + ptA.y};
        };


        /*============ CLASS DEFINITION ============*/

        var pizzaSlice = function () {

            var rI = innerRadius.apply(this, arguments);
            var rO = outerRadius.apply(this, arguments);
            var a0 = Radial.toRadians(angle.apply(this, arguments)) + d3_svg_arcOffset;
            var aLength = Radial.toRadians(arcLength.apply(this, arguments));
            var cornerP = cornerPercent.apply(this, arguments);

            var B = {
                x: rO * Math.cos(a0 - aLength / 2),
                y: -rO * Math.sin(a0 - aLength / 2)
            };

            var C = {
                x: rO * Math.cos(a0 + aLength / 2),
                y: -rO * Math.sin(a0 + aLength / 2)
            };

            var A = {
                y: -rI * Math.sin(a0),
                x: rI * Math.cos(a0)
            };

            BkC = percentFromAtoB(B, C, cornerP);
            BkA = percentFromAtoB(B, A, cornerP);

            AkB = percentFromAtoB(A, B, cornerP);
            AkC = percentFromAtoB(A, C, cornerP);

            CkA = percentFromAtoB(C, A, cornerP);
            CkB = percentFromAtoB(C, B, cornerP);

            var slicePath = new Radial.PathCreator();
            slicePath.moveTo(BkC).CTo(B, B, BkA).LineTo(AkB).CTo(A, A, AkC).LineTo(CkA).CTo(C, C, CkB).LineTo(BkC);

            return  slicePath.path();
        };


        /*============ CLASS METHODS ============*/

        pizzaSlice.innerRadius = function(v) {
            if (!arguments.length) return innerRadius;
            innerRadius = d3.functor(v);
            return pizzaSlice;
        };

        pizzaSlice.outerRadius = function(v) {
            if (!arguments.length) return outerRadius;
            outerRadius = d3.functor(v);
            return pizzaSlice;
        };

        pizzaSlice.angle = function(v) {
            if (!arguments.length) return angle;
            angle = d3.functor(v);
            return pizzaSlice;
        };

        pizzaSlice.cornerPercent = function(v) {
            if (!arguments.length) return cornerPercent;
            cornerPercent = d3.functor(v);
            return pizzaSlice;
        };

        pizzaSlice.arcLength = function(v) {
            if (!arguments.length) return arcLength;
            arcLength = d3.functor(v);
            return pizzaSlice;
        };

        return pizzaSlice;
    };

}());
