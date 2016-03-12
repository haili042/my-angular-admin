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
    console.log(new Date().getTime());
    var promise = $http.get('/data/data.json');
    console.log(new Date().getTime());

    promise.then(function(data) {
        console.log(data);
        console.log(new Date().getTime());

    });

    promise.then(function(data) {
        console.log(data);
        console.log(new Date().getTime());

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

    // controller里面别出现dom操作，特别是prepend,append 这些，
    // 因为未被编译过的dom对象是没法被watch的，
    // angularjs不会监视那些后来加入又没有被编译过的dom对象。
    // 比 link 先执行, 作用是为了指令之间交互
    // 业务逻辑[不要]写在driective自己的controller里， 而是在它绑定的scope的那个controller上
    $http.get('../data/menuData.json').success(function(data, status, header, config) {
        $scope.menus = data
    });
    $scope.menus = [];
}