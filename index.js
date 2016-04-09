angular.module('ionic.coolroll', ['ionic'])

    .controller('MapCtrl', function($scope, $ionicLoading, $compile) {

      // Holds displayed markers
      var markerArray = [];
      var requestsTracker = 0;

      function initialize() {

        var myLatlng = new google.maps.LatLng(47.191111, 7.0980893);

        var mapOptions = {
          center: myLatlng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        var rendererOptions = { map: map };

        r = Raphael("graph");
        txtattr = { font: "12px sans-serif" };
        graph = null;

        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        elevator = new google.maps.ElevationService();

        var clickArray = [];
        var handleMapClick = function(event) {
          var location = event.latLng;
          clickArray.push(location);
          $scope.plotMarker(location);
          if (clickArray.length == 1) {
            $scope.requestSlope(myLatlng, clickArray[0], true);
            clickArray = [];
          }
          if (clickArray.length > 1) {
            $scope.requestSlope(clickArray[0], clickArray[1], true);
            clickArray = [];
          }
        };
        google.maps.event.addListener(map, 'click', handleMapClick);

        $scope.map = map;

        // Center on load
        $scope.centerOnMe();

        $('input[type="range"]').rangeslider({
            polyfill: true,
            onSlideEnd: function(position, value) {
              console.log(value);
            }
        });
      }
      google.maps.event.addDomListener(window, 'load', initialize);

  	 $scope.plotMarker = function(location, slopeix) {
        var marker = new google.maps.Marker({
            position: location,
            map: $scope.map
        });
        if (typeof slopeix !== 'undefined' && slopeix !== null) {
          if (slopeix > 0) {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
          } else if (slopeix > -1) {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
          } else {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
          }
        }
        //google.maps.event.addListener(marker, 'click', function() {
        //  infowindow.open(map, marker);
        //});
        markerArray.push(marker);
      };

  	 $scope.requestSlope = function(from, to, withClear) {

        //Marker + infowindow + angularjs compiled ng-click
        //var infotext = $compile("<div class='marker'>From here</div>")($scope);
        //var infowindow = new google.maps.InfoWindow({ content: infotext[0] });

        var plotElevation = function(results, status) {
          if (withClear) {
            $scope.resetMarkers();
          } else {
            // console.log(--requestsTracker);
          }

          if (status != google.maps.ElevationStatus.OK) {
            // console.log(status);
            return;
          }
          var elevations = results;

          // Extract the elevation samples from the returned results
          // and store them in an array of LatLngs.
          var elevationSlope = [], x = [], y = [];
          if (results.length === 0) {
            // console.log("No results");
            if (!withClear && requestsTracker === 0)
            	$scope.renderHeatmap();
            return;
          }

          var minelevation = 1e6, slopedata = [];
          for (i = 0; i < results.length; i++) {
            var e = elevations[i].elevation;
            if (e < minelevation) minelevation = e;
          }
          for (i = 0; i < results.length; i++) {
            x.push(i); y.push(elevations[i].elevation);

            var slope = null;
            if (i > 0) {
              slope = elevations[i - 1].elevation - elevations[i].elevation;
              elevationSlope.push(slope);
              slope /= 2;

              if (!withClear && i > 2) {
                var weightedLoc = {
                  location: elevations[i].location,
                  weight: Math.round(elevations[i].elevation - minelevation)
                };
                $scope.heatmapDB.push(weightedLoc);
              }
            }
            if (i < results.length - 1) {
              //console.log(slope)
              if (withClear) {
                // plot coloured steps
         			$scope.plotMarker(elevations[i].location, slope);
              }
            }
          }

          // Graph the heatmap
          if (!withClear) {
            if (requestsTracker === 0)
            	$scope.renderHeatmap();
            return;
          }

          // Graph the slope
          //console.log(x, elevationSlope);
          if (graph !== null) graph.remove();
          graph = r.linechart(0, 0, 300, 40, x, [y]);
        };

        var showSteps = function(request, response) {
          //console.log(request, response);

          // Work out resolution based on dist
          var dist = 0, totalPath = [];
          angular.forEach(response.routes, function(v) {
            // Append route path
            Array.prototype.push.apply(totalPath, v.overview_path);
            // Tab up the distance
            angular.forEach(v.legs, function(v) {
              dist += v.distance.value;
            });
          });
          //console.log(dist);

          // Restrain to 20 km
          if (dist > 20000) {
            alert('Range exceeded: please try a shorter distance');
            return false;
          }

          // Capture slope every 50 m
          var resolution = Math.round(dist / 50);

          // Create elevation requests
          var pathRequest = {
            'path': totalPath,
            'samples': resolution
          };

          requestsTracker++;
          elevator.getElevationAlongPath(pathRequest, plotElevation);
        };

       var request = {
            origin: from,
            destination: to,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            //console.log(response.routes[0].warnings);
            if (withClear)
            	directionsDisplay.setDirections(response);

            showSteps(request, response);
          }
        });
     };

  	 $scope.resetMarkers = function() {
       if (typeof markerArray === 'undefined') return;
       for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
       }
       markerArray = [];
      };

      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          var location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          $scope.map.setCenter(location);

          // Plot a me-marker
          markerArray.push(new google.maps.Marker({
            position: location, map: $scope.map,
            icon: 'http://maps.google.com/mapfiles/ms/micons/man.png'
          }));

          $ionicLoading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };

      $scope.renderSlopemap = function() {
        var from = $scope.map.getCenter();
        //console.log(from.lat(), from.lng());
        var RADIUS = 0.01, SPOKES = 10;
        /*var spokeArray = [
          [ 0, -RADIUS ], [ 0, RADIUS ],
          [ -RADIUS, 0 ], [ RADIUS, 0 ]
        ];*/
        var spokeArray = [];
        for (var i = 0; i < SPOKES; i++) {
          var x = RADIUS * Math.cos(2 * Math.PI * i / SPOKES);
          var y = RADIUS * Math.sin(2 * Math.PI * i / SPOKES);
          spokeArray.push([x, y]);
        }

        $scope.heatmapDB = [];
        requestsTracker = 0;
        angular.forEach(spokeArray, function(v) {
          var to = new google.maps.LatLng(
            from.lat() + v[0], from.lng() + v[1]
          );
          $scope.requestSlope(from, to, false);
        });
      };

      $scope.renderHeatmap = function() {
        //console.log($scope.heatmapDB);
        if (typeof $scope.heatmap !== 'undefined')
        	$scope.heatmap.setMap(null); // remove existing
        $scope.heatmap = new google.maps.visualization.HeatmapLayer({
          data: new google.maps.MVCArray($scope.heatmapDB),
          radius: 30
        });
        $scope.heatmap.setMap($scope.map);
      };

    });
