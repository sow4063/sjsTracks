angular.module("sjsTrack")
.controller("sjsTrackCtrl", function($scope) {

    $scope.data = {
        chart : [
            {rank : 1, artist : "IU", song : "있잖아"},
            {rank : 2, artist : "GD", song : "Monster"},
            {rank : 3, artist : "MCTHEMAX", song : "낮달"}],

        signInCheck : function() {
            window.alert("plz sign in");
        }
    };
});