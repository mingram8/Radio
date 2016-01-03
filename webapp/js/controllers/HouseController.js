
app.controller('HouseController', function ($scope, $http, $sce, $interval) {
    $scope.currentSong = {playingExternal: false};
    $scope.date = new Date();
    $scope.hours = $scope.date.getHours();
    $scope.minutes = $scope.date.getMinutes();
    $scope.seconds = $scope.date.getSeconds();
    $scope.lastframe = true;
    $scope.day = $scope.date.getDate();
    $scope.month = $scope.date.getMonth();
    $scope.homePage = true;
    $scope.musicPage = false;


    $interval(function() {
        $scope.date = new Date();
        $scope.hours = $scope.date.getHours();
        $scope.minutes = $scope.date.getMinutes();
        $scope.day = $scope.date.getDate();
        $scope.seconds = $scope.date.getSeconds();
        $scope.milliSeconds = $scope.date.getMilliseconds();
        var width = screen.width;
        width *=.25
        width-=40
        if (screen.width < 1440) {

            var g = document.getElementsByClassName("houseButton");
            for (var i=0; i < g.length; i ++) {
                g[i].style.width = '150px'
            }
            document.getElementsByClassName("temperature")[0].style.top = 0+'px';
            document.getElementById('albumArt').style.width = '50px';
        }

        if (width > 270)
            width = 270

        document.getElementsByClassName("temperature")[0].style.width = width*2;
        document.getElementsByClassName("temperature")[0].style.height = width*2;

        $scope.month = $scope.date.getMonth();
        var c=document.getElementById("seconds");
        var ctx=c.getContext("2d");
        ctx.strokeStyle = "#1DE1D6";
        ctx.lineWidth = 10;
        ctx.clearRect(0, 0,600,600);
        ctx.beginPath();
        var secs = $scope.seconds+($scope.milliSeconds/1000)
        ctx.arc(width+5,width+10,width-20, 1.5*Math.PI,((secs-15)*.0333333)*Math.PI);
        ctx.stroke();
        var c=document.getElementById("minutes");
        var ctx=c.getContext("2d");
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 10;
        ctx.clearRect(0, 0,600,600);
        ctx.beginPath();
        ctx.arc(width+5,width+10,width -10, 1.5*Math.PI,(($scope.minutes-15)*.0333333)*Math.PI);
        ctx.stroke();
        if ($scope.minutes < 10) {
            $scope.minutes = "0"+$scope.minutes
        }
        var c=document.getElementById("hours");
        var ctx=c.getContext("2d");
        ctx.strokeStyle = "#026cfe";
        ctx.lineWidth = 10;
        ctx.clearRect(0, 0,600,600);
        ctx.beginPath();
        if ($scope.hours < 12)
         var hours = $scope.hours + 12;
        else
        var hours = $scope.hours;
        ctx.arc(width+5,width+10,width, 1.5*Math.PI,((hours-3)*.16666666)*Math.PI);
        ctx.setLineDash([133,8.37166666666665])
        ctx.stroke();
        if ($scope.hours < 10) {
            $scope.hours = "0"+$scope.hours
        }
        $http.get('/getSong').success(function (data) {
            if (data.play === true) {
                $scope.currentSong.playingExternal = true;
                $scope.currentSong.track = data.song.track;
            }
            else {
                $scope.currentSong.playingExternal = false;

            }
        })
    }, 100)

    $scope.submitCode = function() {
        $http({method: 'post', url: 'https://192.168.86.11:1900/', data: {code: 1120003}}).success(function(data) {

        });
        }
    $scope.goHome = function() {
        $scope.homePage = true;
        $scope.musicPage = false;
    }
    $scope.music = function() {
        //window.location = "/music"
        $scope.homePage = false;
        $scope.musicPage = true;
    }
    $scope.getWeather = function() {
        $http.get('https://api.wunderground.com/api/001af8c90a9f12ad/conditions/q/MD/Rockville.json').
            success(function(data){
                $scope.weather = data;
                var hours = new Date().getHours()
                if ($scope.weather.current_observation.weather === "Clear" && hours <18)
                    $scope.weatherImage = 'images/sunny.png'
                else if ($scope.weather.current_observation.weather === "Clear" && hours >=18)
                    $scope.weatherImage = 'images/night.png'
                else if ($scope.weather.current_observation.weather === "Rain")
                    $scope.weatherImage = 'images/rain.png'
                else if ($scope.weather.current_observation.weather === "Overcast")
                    $scope.weatherImage = 'images/overcast.png'
                else if ($scope.weather.current_observation.weather === "Partly Cloudy")
                    $scope.weatherImage = 'images/pCloudy.png'


            })
        $http.get('https://api.wunderground.com/api/001af8c90a9f12ad/forecast/q/MD/Rockville.json').
            success(function(data){
                $scope.forecast = data;


            })
    }
    $interval(function() {
        $scope.getWeather()
    }, 200000)
    $scope.getWeather()

});