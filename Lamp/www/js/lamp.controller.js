(function () {
  var controllerId = 'lampController';
  angular.module('lamp').controller(controllerId, [
    '$scope',
    '$cordovaFlashlight',
    '$ionicPopup',
    '$timeout',
    function (
      $scope,
      $cordovaFlashlight,
      $ionicPopup,
      $timeout
      )
    {
      $scope.avail=false;
      $scope.isOn=false;
      $scope.msg="Off";

      document.addEventListener("deviceready", onDeviceReady, false);

      function onDeviceReady() {  
        $cordovaFlashlight.available()
          .then(function(availability) {
            $scope.avail = availability;
            if(!availability){
              $ionicPopup.alert({
                template: "Your Device Can't Handle This App!"
              });
            }else{
              $scope.toggle();
            }
          }, function () {
        });      
      }

      $scope.toggle = function toggle(){
        if($scope.avail){
          $scope.isOn=!$scope.isOn;

          if($scope.isOn){
            autoSwitchOff();
          }else{
            $timeout.cancel($scope.timer);
            $scope.timer=null;
          }

          $scope.msg= $scope.isOn ? 'Off' : 'On';
          $cordovaFlashlight.toggle()
            .then(function (success) {
                },
              function (error) {
                 }
          );
        }
      }


      var autoSwitchOff = function(){
        $scope.timer=$timeout(function(){
          $scope.isOn=false;
          $scope.msg='On';
          $cordovaFlashlight.switchOff()
            .then(
              function (success) { /* success */ },
              function (error) { /* error */ });
          $timeout.cancel($scope.timer);
          $scope.timer=null;
        }, 5000);
      }
      
    }
  ])
})();
