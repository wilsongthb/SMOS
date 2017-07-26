
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Title Page</title>

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="./node_modules/baseguide/dist/css/baseguide.css">
        <style>
        #map {
            height: 400px;
            width: 100%;
        }
        </style>

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.3/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div id="map"></div>

        <script>
            var marker
            var markers = []
            function initMap() {
                var uluru = {lat: -25.363, lng: 131.044};
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 4,
                    center: uluru
                });

                map.addListener('click', function(e) {
                    console.log('hola', e)
                })


                // var marker = new google.maps.Marker({
                marker = new google.maps.Marker({
                    draggable: true,
                    position: uluru,
                    map: map
                });

                marker.addListener('dragend', function(){
                    console.log(
                        marker.getPosition().lat(), 
                        marker.getPosition().lng()
                    )
                })

                
            }
        </script>
        <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCi6ym6B803LzM6Aaug0yC0zmI23q8S_9E&callback=initMap">
        </script>

        <!-- jQuery -->
        <!-- <script src="./node_modules/jquery/dist/jquery.js"></script> -->
    </body>
</html>
