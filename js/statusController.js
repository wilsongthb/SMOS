app.controller('status', function($scope, $http){
    $scope.db = {}

    $scope.leer = function(){
        $http.get(`${config.urlApi}/db`).then(
            // success
            function(response) {
                $scope.db = response.data
                var data_morris = []
                for(i in $scope.db.markers){
                    data_morris.push({
                        y: $scope.db.markers[i].name,
                        a: $scope.db.historial[i].length // movimientos
                    })
                }
                Morris.Bar({
                    element: 'morris-bar-chart',
                    data: data_morris,
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['Movimientos'],
                    hideHover: 'auto',
                    resize: true
                });
            }
        )
    }

    $scope.leer()

    // SOCKET IO
    socket = io()
    socket.on('update_map', function(msg) {
        console.log(msg)
        $scope.leer()
    })
})