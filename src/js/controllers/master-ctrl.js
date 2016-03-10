/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$http', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $http) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    var promise = $http.get('/data/data.json');
    promise.then(function(data) {
        console.log(data);

    });

    promise.then(function(data) {
        console.log(data);
    });

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}