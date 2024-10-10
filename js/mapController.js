// var globales, solo para debuggin
var map
var markers = []
var socket

app.controller('map', function($scope, $http){
    // data
    // posicion inicial
    var uluru = {lat: -25.363, lng: 131.044};
    $scope.db = {}
    $scope.markers = []
    $scope.marker = {}


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
    // marcadores
    // obtener marcadores
    $scope.guardar = function(){
        $http.post(`${config.urlApi}/db`, $scope.db).then(
            // success
            function(){
                // $scope.leer()
                socket.emit('update_map', 'actualicen')
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
    $scope.leer = function() {
        $http.get(`${config.urlApi}/db`).then(
            // success
            function(response){
                // limpiar marcadores
                for(i in markers){
                    markers[i].setMap(null)
                }
                markers = []
                
                // $scope.markers = response.data.markers
                $scope.db = {}
                $scope.db = response.data

                for(i in $scope.db.markers){
                    // diuja los marcadores
                    var marker = $scope.db.markers[i]
                    markers[marker.id] = new google.maps.Marker({
                        draggable: true,
                        position: {
                            lat: $scope.getLat(marker.id),
                            lng: $scope.getLng(marker.id),
                            
                        },
                        label: marker.name,
                        map: map
                    });
                    markers[marker.id].markers_id = marker.id
                    markers[marker.id].addListener('dragend', function(){
                        // GUARDAR HiSTORIAL
                        if(typeof $scope.db.historial[this.markers_id] === "undefined"){
                            $scope.db.historial[this.markers_id] = []
                        }
                        $scope.db.historial[this.markers_id].push({
                            lat: this.getPosition().lat(),
                            lng: this.getPosition().lng(),
                            time: new Date()
                        })
                        $scope.guardar()
                    })
                }
            }
        )
    }
    // inicializacion
    
    // map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 6,
    //     center: uluru
    // })
    // let map;

    async function initMap() {
      // The location of Uluru
      const position = { lat: -25.344, lng: 131.031 };
      // Request needed libraries.
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      // The map, centered at Uluru
      map = new Map(document.getElementById("map"), {
        zoom: 6,
        center: uluru,
        // mapId: "DEMO_MAP_ID",
      });

      // The marker, positioned at Uluru
      // const marker = new AdvancedMarkerElement({
      //   map: map,
      //   position: position,
      //   title: "Uluru",
      // });
    }

  initMap().then(() => {
    $scope.leer();

    map.addListener('rightclick', function(e){
        // crea nuevos marcadores
        let mark = {
            id: $scope.db.markers.length,
            name: "",
            type: ""
        }

        $scope.db.markers.push(mark)
        $scope.db.historial[mark.id] = []
        $scope.db.historial[mark.id].push({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date()
        })

        $scope.guardar()
    });
  });

    
    
    // $scope.leer()

    // SOCKET IO
    socket = io()
    socket.on('update_map', function(msg) {
        console.log(msg)
        $scope.leer()
    })
})
