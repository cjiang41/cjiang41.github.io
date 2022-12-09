const axios = require('axios');
const cors = require('cors');


const express = require('express');
const app = express();


const api_key = "ImP-OumcN-QgwFyJNETsAnTjpVPp1cLaDw04EbkJjd7qRkQNLyztThYMzIeVAtfJsbON6tgKNoSZx7W7aPqWvESA4E2pn0yO1l4ykM_Fbv2qchiJ2y4-yvKiPy0wY3Yx";
const googleKey = "AIzaSyDWzqkvWeohV2UsN4CCvKTn_NxnO7A51ow";

app.use(cors());

app.get('/', function (req, res) {
   res.send('Hello World');
})


// This responds a GET request for the /list_user page.
app.get('/searchYelp/:term/:latitude/:longitude/:categories/:radius', function (req, res) {
   console.log("Got a GET request for search");
   let URL = "https://api.yelp.com/v3/businesses/search?term=" +req.params.term +"&latitude=" + req.params.latitude + "&longitude=" + req.params.longitude 
   + "&categories=" + req.params.categories + "&radius=" + req.params.radius;

   let config = {
      url:URL,
      method: 'get',
      headers: {
         Authorization: 'Bearer ' + api_key
      }
    }

    axios(config).then(function (response) {
      console.log(response.data);
      res.send(JSON.stringify(response.data));
    });
});



app.get('/keyword/:keyword', function (req, res) {
   console.log("Got a GET request for keyword ");

   let URL = "https://api.yelp.com/v3/autocomplete?text=" +req.params.keyword;

   let config = {
      url:URL,
      method: 'get',
      headers: {
         Authorization: 'Bearer ' + api_key
      }
    }

    axios(config).then(function (response) {
      console.log(response.data);
      result = {};

      result["categories"] = response.data["categories"].map(function(value){return value.title});
      result["terms"] = response.data["terms"].map(function(value){return value.text});


      res.send(JSON.stringify(result));
    });
});


app.get('/location/:location', function (req, res) {
   console.log("Got a GET request for location ");

   let URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.params.location + `&key=${googleKey}`


   let config = {
      url:URL,
      method: 'get',
    }

    axios(config).then(function (response) {
      console.log(response.data);
      result = {};

      if(response.data["results"].length == 0){
         result["latitude"] = '';
         result["longitude"] = '';
      }else{
         result["latitude"] = response.data["results"][0]["geometry"]["location"]["lat"].toString();
         result["longitude"] = response.data["results"][0]["geometry"]["location"]["lng"].toString();
      }
      res.send(JSON.stringify(result));
    });
});



app.get('/searchDetail/:id', function (req, res) {
   console.log("Got a GET request for search detail");
   let URL = "https://api.yelp.com/v3/businesses/" + req.params.id;

   console.log(URL);

   let config = {
      url:URL,
      method: 'get',
      headers: {
         Authorization: 'Bearer ' + api_key
      }
    }


    axios(config).then(function (response) {
      console.log(response.data);
      res.send(JSON.stringify(response.data));
    });
});


app.get('/searchReview/:id', function (req, res) {
   console.log("Got a GET request for search reviews");
   let URL = "https://api.yelp.com/v3/businesses/" + req.params.id + "/reviews";

   console.log(URL);

   let config = {
      url:URL,
      method: 'get',
      headers: {
         Authorization: 'Bearer ' + api_key
      }
    }


    axios(config).then(function (response) {
      console.log(response.data);
      res.send(JSON.stringify(response.data));
    });
});






var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
})


























