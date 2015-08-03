
var startDemo;

var colorfulPizzaShapes = colorfulPizzaShapes || [];
var colorfulArcShapes = colorfulArcShapes || [];
var colorfulTransforms = colorfulTransforms || [];

(function () {

    startDemo = function () {

        setupDemoOne();
        setupDemoTwo();
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

})();