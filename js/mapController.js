// var globales, solo para debuggin
var map
var markers = []

app.controller('map', function($scope, $http){
    // methods
    $scope.getLat = function(id){
        if(markers[id])
            return markers[id].getPosition().lat()
    }
    $scope.getLng = function(id){
        if(markers[id])
            return markers[id].getPosition().lng()
    }
    $scope.setLatLng = function(id, lat, lng){
        console.warn(
            arguments,
            $scope.markers
        )
        // $scope.markers[id].lat = lat
        // $scope.markers[id].lng = lng
    }

    // data
    $scope.db = {}
    $scope.markers = []

    // posicion inicial
    var uluru = {lat: -25.363, lng: 131.044};

    // init map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: uluru
    });

    // marcadores
    // obtener marcadores
    $scope.guardar = function(){
        $http.post(`${config.urlApi}/db`, $scope.db).then(
            // success
            function(){
                // $scope.leer()
            }
        )
    }
    $scope.leer = function(){
        $http.get(`${config.urlApi}/db`).then(
            // success
            function(response){
                // $scope.markers = response.data.markers
                $scope.db = {}
                $scope.db = response.data
                $scope.markers = []
                // $scope.markers = $scope.db.markers

                for(i in $scope.db.markers){
                    var marker = $scope.db.markers[i]
                    $scope.markers[marker.id] = marker
                }

                for(i in $scope.markers){
                    var marker = $scope.markers[i]
                    markers[marker.id] = new google.maps.Marker({
                        draggable: true,
                        position: {
                            lat: marker.lat,
                            lng: marker.lng
                        },
                        map: map
                    });
                    markers[marker.id].markers_id = marker.id
                    markers[marker.id].addListener('dragend', function(){
                        // console.warn(
                        //     this,
                        //     marker,
                        //     $scope.markers[this.markers_id],
                        //     $scope.leer,
                        // )
                        console.warn(
                            this.markers_id,
                            $scope.markers
                        )
                        
                        //GUARDAR CAMBIOS
                        // marker.lat = this.getPosition().lat()
                        // marker.lng = this.getPosition().lng()
                        // $scope.markers[this.markers_id].lat = this.getPosition().lat()
                        // $scope.markers[this.markers_id].lng = this.getPosition().lng()


                        // $scope.setLatLng(this.markers_id, this.getPosition().lat(), this.getPosition().lng())
                        // $scope.guardar()
                        // $scope.leer()
         
                        // marker.name = "poto"

                        var m = $scope.markers[this.markers_id]
                        // m.name = "onon"
                        m.lat = this.getPosition().lat()
                        m.lng = this.getPosition().lng()
                        $scope.guardar()
                    })
                    // console.log(
                    //     marker,
                    //     markers
                    // )
                }
            }
        )
    }
    // marcadores
    
    $scope.leer()
})