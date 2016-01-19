(function () {
  var controllerId = 'lampController';
  angular.module('lamp').controller(controllerId, [
    '$scope',
    '$cordovaFlashlight',
    '$ionicPopup',
    function (
      $scope,
      $cordovaFlashlight,
      $ionicPopup
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
          $scope.msg= $scope.isOn ? 'Off' : 'On';
          $cordovaFlashlight.toggle()
            .then(function (success) {
                },
              function (error) {
                 }
          );
        }
      }

      
    }
  ])
})();
