/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', 'sidebarMenuService', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, sidebarMenuService) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    // 第一个参数是监视的对象, 第二个参数是回调函数
    $scope.$watch($scope.getWidth, function(newValue, oldValue) { // 监视model 的变化
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = !$cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle); // 保存到 cookie 中
    };

    window.onresize = function() { // 在AngularJS上下文之外的修改了model，需要手动调用$apply()来通知AngularJS
        $scope.$apply(); // 传播Model的变化
    };

}