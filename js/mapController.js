// var globales, solo para debuggin
var map
var markers = []

app.controller('map', function($scope, $http){
    // methods
    $scope.getLat = function(id){
        if($scope.db.historial[id])
            return $scope.db.historial[id][$scope.db.historial[id].length-1].lat
    }
    $scope.getLng = function(id){
        if($scope.db.historial[id])
            return $scope.db.historial[id][$scope.db.historial[id].length-1].lng
    }
    $scope.getLastHistory = function(id){
        if($scope.db.historial[id])
            return $scope.db.historial[id]
    }
    $scope.setLatLng = function(id, lat, lng){
        // console.warn(
        //     arguments,
        //     $scope.markers
        // )
        // $scope.markers[id].lat = lat
        // $scope.markers[id].lng = lng
    }

    // data
    $scope.db = {}
    $scope.markers = []
    $scope.marker = {}

    // posicion inicial
    var uluru = {lat: -25.363, lng: 131.044};

    // init map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: uluru
    })
    map.addListener('click', function(e){
        // crea nuevos marcadores
        let mark = {
            id: $scope.db.markers.length,
            name: "",
            type: ""
        }

        $scope.db.markers.push(mark)

        // console.log(
        //     e,
        //     mark
        // )
        $scope.db.historial[mark.id] = []
        $scope.db.historial[mark.id].push({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date()
        })

        $scope.guardar()
    })

    // marcadores
    // obtener marcadores
    $scope.guardar = function(){
        $http.post(`${config.urlApi}/db`, $scope.db).then(
            // success
            function(){
                $scope.leer()
            }
        )
    }
    $scope.editar = function(m){
        $scope.marker = m
    }
    $scope.eliminar = function(id){
        $scope.db.markers.splice(id, 1)
        $scope.db.historial[id] = null
        $scope.guardar()
    }
    $scope.leer = function(){
        $http.get(`${config.urlApi}/db`).then(
            // success
            function(response){
                // $scope.markers = response.data.markers
                $scope.db = {}
                $scope.db = response.data
                // $scope.markers = []
                // $scope.markers = $scope.db.markers

                // for(i in $scope.db.markers){
                //     var marker = $scope.db.markers[i]
                //     $scope.markers[marker.id] = marker
                // }

                for(i in $scope.db.markers){
                    var marker = $scope.db.markers[i]
                    markers[marker.id] = new google.maps.Marker({
                        draggable: true,
                        position: {
                            lat: $scope.getLat(marker.id),
                            lng: $scope.getLng(marker.id)
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
                        // console.warn(
                        //     this.markers_id,
                        //     $scope.markers
                        // )
                        
                        //GUARDAR CAMBIOS
                        // marker.lat = this.getPosition().lat()
                        // marker.lng = this.getPosition().lng()
                        // $scope.markers[this.markers_id].lat = this.getPosition().lat()
                        // $scope.markers[this.markers_id].lng = this.getPosition().lng()


                        // $scope.setLatLng(this.markers_id, this.getPosition().lat(), this.getPosition().lng())
                        // $scope.guardar()
                        // $scope.leer()
         
                        // marker.name = "poto"

                        // var m = $scope.db.markers[this.markers_id]
                        // GUARDAR HOSTORIAL
                        if(typeof $scope.db.historial[this.markers_id] === "undefined"){
                            $scope.db.historial[this.markers_id] = []
                        }
                        $scope.db.historial[this.markers_id].push({
                            lat: this.getPosition().lat(),
                            lng: this.getPosition().lng(),
                            time: new Date()
                        })
                        // m.lat = this.getPosition().lat()
                        // m.lng = this.getPosition().lng()
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