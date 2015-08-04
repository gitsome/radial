
var startDemo;

var colorfulPizzaShapes = colorfulPizzaShapes || [];
var colorfulArcShapes = colorfulArcShapes || [];
var canvasLogoShapes = canvasLogoShapes || [];

var colorfulTransforms = colorfulTransforms || [];

(function () {

    startDemo = function () {

        setupDemoOne();
        setupDemoTwo();
        setupDemoThree();
    };

    function setupDemoOne () {

        var container = $('.target1');

        var radial = new Radial(container, colorfulArcShapes, {});

        container.click(function () {
            radial.transform(colorfulTransforms, {});
        });
    }

    function setupDemoTwo () {

        var container = $('.target2');

        var radial = new Radial(container, colorfulPizzaShapes, {});

        container.click(function () {
            radial.transform(colorfulTransforms, {});
        });
    }

    function setupDemoThree () {

        var container = $('.target3');

        var radial = new Radial(container, canvasLogoShapes, {});

        container.click(function () {
            radial.transform(colorfulTransforms, {});
        });
    }

})();