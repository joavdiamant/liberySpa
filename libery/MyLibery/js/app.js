// Code goes here
'use strict';

var gridApp = angular.module('gridApp', []);
gridApp.controller('GridCtrl', function($scope, $document, $rootScope, GridSvc){
    var hideContextMenu = function(){
      $scope.isContextMenuVisible = false;
      if(!$rootScope.$$phase) {
				$rootScope.$apply();
			}
    };
    $scope.books = GridSvc.books;
    $scope.isContextMenuVisible = false;
    $scope.contextmenuRowIndex = -1;
    $scope.openContextMenu = function($event, $index){
      $event.preventDefault();
      console.log($event.button);

      if($event.button === 0){
        $scope.isContextMenuVisible = false;
        return;
      }
      
      $scope.contextmenuRowIndex = $index;
      $scope.contextMenuStyle = {
        top: $event.clientY + 'px',
        left: $event.clientX-516 + 'px'
      };
      $scope.isContextMenuVisible = true;
    };
    $scope.addRow = function(){
      var index = $scope.contextmenuRowIndex;
      $scope.books.splice(index, 0, {});
      $scope.isContextMenuVisible = false;
    };
    $scope.removeRow = function(){
      var index = $scope.contextmenuRowIndex;
      $scope.books.splice(index, 1);
      $scope.isContextMenuVisible = false;
    };
    
    $document.bind('click', function($evt){
      var target = angular.element($evt.target).closest('table');
      if(target.length === 0) {
        hideContextMenu();
      }
    });
    
  });
gridApp.factory('GridSvc', function(){
    var factory = {},
        i;
    factory.books = [
        {title:'kitchan', autur:'Tony', Date: '21.1.16',},
        {title:'the world', autur:'Bruice', Date: '22.1.7'},
        {title:'Soper', autur:'Peter', Date: '30.2.13'}
      ];
    for(i = 0; i < factory.books.length; i++){
      factory.books[i].edit = {};
    }
    return factory;
  });
  
gridApp.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});
