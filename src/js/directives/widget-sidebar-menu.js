/**
 * 侧边栏
 * @author: haili
 *
 * */

angular
    .module('RDash')
    .directive('sideBarMenu', sideBarMenu);

function sideBarMenu() {
    var directive = {

        restrict: 'AE',
        replace: true,
        // compile: function() {}, // 编译过程, 一般不重写
        templateUrl: './templates/home/menu.html',
        link: function(scope, ele, attrs) {
            console.log(attrs.ishide);
        }
    };
    return directive;
}