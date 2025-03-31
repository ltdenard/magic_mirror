jQuery(document).ready(function($) {
    var lastCompliment;

    // updates the current date and time
    (function updateTime() {
        var days = [
            'Sunday', //Sunday starts at 0
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        var d = new Date();
        var year = d.getFullYear();
        var day = days[d.getDay()];
        var numday = d.getDate();
        var month = months[d.getMonth()];
        var hour = d.getHours();
        if (hour > 12) {
            newhour = hour - 12;
            hour = newhour;
        }
        if (hour == 0) {
            newhour = 12;
            hour = newhour;
        }
        var minute = d.getMinutes();
        if (minute < 10) {
            newminute = '0' + minute;
            minute = newminute;
        }
        var second = d.getSeconds();
        if (second < 10) {
            newsecond = '0' + second;
            second = newsecond;
        }
        $('.date').html(day + ', ' + month + ' ' + numday + ', ' + year);
        $('.time').html(hour + ':' + minute + '<span class="sec">' + second + '</span>');
        setTimeout(function() {
            updateTime();
        }, 1000);
    })();
    // updates the compliments section
    (function updateCompliment() {
        $.get('/timeline_feed.txt', function(data) {
            var compliments = new Array();
            compliments = data.split('\n');
            var compliment = Math.floor(Math.random() * compliments.length);
            // this along with the timeout function
            // execute at the same time. therefore, the setTimeout for updateCompliment function
            // time must be the sum of the fadeout plus the setTimeout for the fateOut
            // setTimeout function
            $('.compliment').fadeIn(3000).text(compliments[compliment]);
            setTimeout(function() {
                $('.compliment').fadeOut(3000).text(compliments[compliment]);
            }, 24000);
        });
        setTimeout(function() {
            updateCompliment();
        }, 30000);
    })();
    // pulls all the weather info
    (function updateWeather() {
        var api_key = API_KEY;
        var zip_code = ZIP_CODE;
        var weather_api_url = "https://api.weatherapi.com/v1/forecast.json?key=" + api_key + "&q=" + zip_code + "&days=1&aqi=no&alerts=no";
        $.getJSON(weather_api_url, {}).done(function(data) {
            // https://www.weatherapi.com/docs/weather_conditions.json
            var weathercodes = {
                '1087': 'wi-thunderstorm',
                '1192': 'wi-thunderstorm',
                '1195': 'wi-thunderstorm',
                '1243': 'wi-thunderstorm',
                '1246': 'wi-thunderstorm',
                '1273': 'wi-thunderstorm',
                '1276': 'wi-thunderstorm',
                '231': 'wi-thunderstorm',
                '232': 'wi-thunderstorm',
                '1063': 'wi-sprinkles',
                '1198': 'wi-sprinkles',
                '1240': 'wi-sprinkles',
                '310': 'wi-sprinkles',
                '311': 'wi-sprinkles',
                '312': 'wi-sprinkles',
                '313': 'wi-sprinkles',
                '314': 'wi-sprinkles',
                '321': 'wi-sprinkles',
                '1150': 'wi-showers',
                '1153': 'wi-showers',
                '1168': 'wi-showers',
                '1171': 'wi-showers',
                '1180': 'wi-showers',
                '1183': 'wi-showers',
                '1186': 'wi-showers',
                '1189': 'wi-showers',
                '1030': 'wi-smisthowers',
                '1000': 'wi-day-sunny',
                '1003': 'wi-cloudy',
                '1006': 'wi-cloudy',
                '1009': 'wi-cloudy',
                '804': 'wi-cloudy',
                '1066': 'wi-snow',
                '1069': 'wi-snow',
                '1072': 'wi-snow',
                '1114': 'wi-snow',
                '1117': 'wi-snow',
                '1201': 'wi-snow',
                '1204': 'wi-snow',
                '1207': 'wi-snow',
                '1210': 'wi-snow',
                '1213': 'wi-snow',
                '1216': 'wi-snow',
                '1222': 'wi-snow',
                '1225': 'wi-snow',
                '1237': 'wi-snow',
                '1249': 'wi-snow',
                '1252': 'wi-snow',
                '1255': 'wi-snow',
                '1258': 'wi-snow',
                '1261': 'wi-snow',
                '1264': 'wi-snow',
                '1279': 'wi-snow',
                '1282': 'wi-snow',
                '1219': 'wi-fog',
                '711': 'wi-smoke',
                '721': 'wi-smog',
                '731': 'wi-dust',
                '1135': 'wi-fog',
                '1147': 'wi-fog',
                '751': 'wi-sandstorm',
                '761': 'wi-dust',
                '762': 'wi-volcano',
                '771': 'wi-strong-wind',
                '781': 'wi-tornado',
            }

            function degToCompass(num) {
                var val = Math.floor((num / 22.5) + 0.5);
                var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
                return arr[(val % 16)];
            }

            var current_data = data['current'];
            var winddirection = degToCompass(current_data['wind_degree']);
            var windspeed = current_data['wind_mph'];
            var astronomy = data['forecast']['forecastday'][0]['astro'];
            var sunset = astronomy['sunset'];
            var sunrise = astronomy['sunrise'];
            var moon_illumination = astronomy['moon_illumination'];
            var moon_phase = astronomy['moon_phase'];
            var temp = current_data['temp_f'];
            var windchill = current_data['feelslike_f'];
            var humidity = current_data['humidity'];
            var pressure = current_data['pressure_in'];
            var visibility = current_data['vis_miles'];
            var condition_code = current_data['condition']['code'];
            $('.wind').html(' <span class="miscicon-windy1"></span> ' + windspeed + ' ' + winddirection);
            $('.wind').append(' <span class="wi wi-strong-wind xdimmed"></span> ' + windchill + '&deg;');
            $('.sun').html(' <span class="wi wi-sunrise xdimmed"></span>  ' + sunrise + ' <span class="wi wi-sunset xdimmed"></span> ' + sunset);
            $('.atmos').html("&nbsp;&nbsp;&nbsp;" + moon_illumination + '<span class="miscicon-percentage2"></span><br>');
            $('.atmos').append('<span class="miscicon-thermometer41"></span>' + pressure + 'in.');
            $('.atmos').append('<span class="miscicon-water-drop"></span>' + humidity + '<span class="miscicon-percentage2"></span>');
            $('.atmos').append('<span class="miscicon-eye46"></span>' + visibility + 'mi');
            $('.temp').html(' <span class="wi ' + weathercodes[condition_code] + '"></span>');
            $('.temp').append(' ' + temp + '&deg;');

            // 0 => New Moon
            // 1 => Waxing Crescent
            // 2 => First Quarter
            // 3 => Waxing Gibbous
            // 4 => Full Moon
            // 5 => Waning Gibbous Moon
            // 6 => Last Quarter Moon
            // 7 => Waning Crescent Moon
            var moonphases = {
                "New Moon": 'flaticon-new99',
                "Waxing Crescent": 'flaticon-moon110',
                "First Quarter": 'flaticon-moon94',
                "Waxing Gibbous": 'flaticon-moon90',
                "Full Moon": 'flaticon-new42',
                "Waning Gibbous": 'flaticon-moon97',
                "Last Quarter": 'flaticon-half21',
                "Waning Crescent": 'flaticon-moon103'
            }
            $('.moons').html('<span class="' + moonphases[moon_phase] + '"></span>');
        });
        setTimeout(function() {
            updateWeather();
        }, 900000);
    })();
    // API to pull up-coming calendar events
    (function updateCalendar() {
        var d = new Date();
        var count = 0;
        // Link to json
        var calendarAPI = "https://www.googleapis.com/calendar/v3/calendars/en.usa%23holiday%40group.v.calendar.google.com/events?key=" + GOOGLE_KEY;
        $.getJSON(calendarAPI, {}).done(function(data) {
            function comp(a, b) {
                return new Date(a.start.date).getTime() - new Date(b.start.date).getTime();
            }
            holidays = data['items'].sort(comp);
            $('.holidays').html('');
            opacity = 1;
            for (var i = 0, l = holidays.length; i < l; i++) {
                if (count == 5) {
                    break;
                }
                sdate = new Date(holidays[i]['start']['date']);
                if (sdate > d) {
                    var holiday = holidays[i]['summary'];
                    var daystill = Math.round((sdate - d) / (1000 * 60 * 60 * 24));
                    if (daystill > 14) {
                        months = Math.round(daystill / 30);
                        if (months == 1) {
                            description = "in a month";
                        } else {
                            description = "in " + months + " months";
                        }
                    } else {
                        if (daystill == 1) {
                            description = "in a day";
                        } else {
                            description = "in " + daystill + " days";
                        }
                    }
                    $('.holidays').append('<br />' + holiday + ' <span class="days dimmed"' + ' style="opacity: ' + opacity + ';">' + description + '</span>');
                    opacity -= 1 / 7;
                    count++;
                }
            }

        });
        setTimeout(function() {
            updateCalendar();
        }, 3600000);
    })();
    // Ends jQuery
});
