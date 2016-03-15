

angular
    .module('RDash')
    .directive('widgetSelect', widgetSelect);

function widgetSelect() {
    var directive = {
        requires: '^rdWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
    };
    return directive;
};