/**
 * Created by Administrator on 2016/3/13.
 */
angular
    .module('RDash')
    .service('sidebarMenuService', ['$http', '$q', sidebarMenuService]);

function sidebarMenuService($http, $q) {

    this.query = function() {
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        $http
            .get('../data/menuData.json')
            .success(function(data, status, headers, config) {
                deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了,
                // resolve 方法返回一个给定值给promise对象
            })
            .error(function() {
                deferred.reject(data);  // 声明执行失败，即服务器返回错误
                // reject 方法拒绝返回一个给定值给promise对象
            });
        return deferred.promise;

    };


}