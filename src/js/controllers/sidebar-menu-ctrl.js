/**
 * SidebarMenu Controller
 */

angular
    .module('RDash')
    .controller('SidebarMenuCtrl', ['$scope', 'sidebarMenuService', SidebarMenuCtrl]);

function SidebarMenuCtrl($scope, sidebarMenuService) {
    /**
     * 赋值给菜单
     */

    // controller里面别出现dom操作，特别是prepend,append 这些，
    // 因为未被编译过的dom对象是没法被watch的，angularjs不会监视那些后来加入又没有被编译过的dom对象。

    // 业务逻辑[不要]写在driective自己的controller里， 而是在它绑定的scope的那个controller上
    // 取数据逻辑写在service里, 和后台一样

    var promise = sidebarMenuService.query(); // 同步调用，获得承诺接口
    promise.then(function(data) {  // 调用承诺API获取数据 .resolve
        $scope.menus = data;
    }, function(data) {  // 处理错误 .reject
        $scope.menus = {error: '用户菜单不存在！'};
    });

    $scope.isMenuExpend = false;
    $scope.menuExpend = function() {
        $scope.isMenuExpend = !$scope.isMenuExpend;
    };
}