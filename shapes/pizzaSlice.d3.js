(function(){

    d3.svg.pizzaSlice = function() {

        var PathCreator = function() {

            var self = this;

            var path = "";

            self.moveTo = function(pt) {
                path = path + "M " + pt.x + " " + pt.y + " ";
                return self;
            };

            self.lineTo = function(pt) {
                path = path + "l " + pt.x + " " + pt.y + " ";
                return self;
            };

            self.LineTo = function(pt) {
                path = path + "L " + pt.x + " " + pt.y + " ";
                return self;
            };

            self.cTo = function(cPt1, cPt2, target) {
                path = path + "c " + cPt1.x + " " + cPt1.y + " " + cPt2.x + " " + cPt2.y + " " + target.x + " " + target.y + " ";
                return self;
            };

            self.CTo = function(cPt1, cPt2, target) {
                path = path + "C " + cPt1.x + " " + cPt1.y + " " + cPt2.x + " " + cPt2.y + " " + target.x + " " + target.y + " ";
                return self;
            };

            self.path = function () {
                return path;
            };

            return self;
        };


        /*============ PRIVATE VARIABLES / METHODS ============*/

        var innerRadius = d3_svg_pizzaSliceInnerRadius;
        var outerRadius = d3_svg_pizzaSliceOuterRadius;
        var angle = d3_svg_pizzaSliceAngle;
        var arcLength = d3_svg_pizzaSliceArcLength;
        var cornerPercent = d3_svg_pizzaSliceCornerPercent;

        var toRadians = function (a) { return a * (Math.PI/180); };

        var percentFromAtoB = function (ptA, ptB, percent) {
            return {x:(ptB.x - ptA.x) * percent + ptA.x, y: (ptB.y - ptA.y) * percent + ptA.y};
        };


        /*============ CLASS DEFINITION ============*/

        function pizzaSlice () {

            var rI = innerRadius.apply(this, arguments);
            var rO = outerRadius.apply(this, arguments);
            var a0 = toRadians(angle.apply(this, arguments)) + d3_svg_arcOffset;
            var aLength = toRadians(arcLength.apply(this, arguments));
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

            var slicePath = new PathCreator();
            slicePath.moveTo(BkC).CTo(B, B, BkA).LineTo(AkB).CTo(A, A, AkC).LineTo(CkA).CTo(C, C, CkB).LineTo(BkC);

            return  slicePath.path();
        }


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

    var d3_svg_arcOffset = 0 * Math.PI/2;

    function d3_svg_pizzaSliceInnerRadius(d) {
        return d.innerRadius;
    }

    function d3_svg_pizzaSliceOuterRadius(d) {
        return d.outerRadius;
    }

    function d3_svg_pizzaSliceAngle(d) {
        return d.angle;
    }

    function d3_svg_pizzaSliceCornerPercent(d) {
        return d.cornerPercent;
    }

    function d3_svg_pizzaSliceArcLength(d) {
        return d.arcLength;
    }

}());
