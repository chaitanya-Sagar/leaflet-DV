// We’ll add a tile layer to add to our map, in this case it’s a OSM tile layer.
// Creating a tile layer usually involves setting the URL template for the tile images
var osmUrl = "https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=ebe9e8643d4f439b90fd4b885c3e8171",
  osmAttrib ='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  osm = L.tileLayer(osmUrl, {
    maxZoom: 18,
    attribution: osmAttrib
  });
  var colors = ['#ff0000', '#ff8300', '#ffbb00','#ffd400'];
var visType = "polygon"; // heat bubble

$('#togleVs').val(visType) 

  var rand=''
  var josnWard;
var map = L.map("map").setView([26.8467, 80.9462], 12).addLayer(osm);
var opt = {
    onEachFeature: function (feature, layer) {console.log(feature)}
}

var currentDate = '2020-03-27'
var stile = true
function shtilemap(){
if(!stile){ map.removeLayer(osm)}else{map.addLayer(osm)}
stile = !stile
}

function changeMapLegendColor(){

  $('#legedtTitle').text(severty)
  $('.mapLegend li').each(function(i,e){
    $(this).children('i').css('color',colors[i])
  })
}
$(document).on('click','.rs-pointer, .rs-scale',function(){
  
let cuDate = dateArr.indexOf($('.rs-tooltip').text());

currentDate = acturalDateArr[cuDate]

refreshMap()


})
  function getStyle(){

    rand = colors[Math.floor(Math.random() * colors.length)];

    return {fillColor: rand, fillOpacity:.8,weight:.3}

  }

var severty = 'active';

function btnClick(e,helth){

  $('.helth').each(function(d,e){
    if($(e).hasClass('active')){
      $(e).removeClass('active')
    }
  })

e.target.classList.add('active')


if(helth === 'activebtn'){
  severty = 'active'

  colors = ['#ffbb00', '#ff8300', '#ff0000'];
  
}else if(helth === 'cnfbtn'){
  severty = 'confirmed'
  
  colors = ['#FFB601', '#E6A400', '#BF8900','#805B00'];
}else if(helth === 'deathbtn'){
  severty = 'deaths'
  
  colors = ['#FF4800', '#E64100', '#BF3600','#852600'];
}else if(helth === 'rcbtn'){
  severty = 'recovered'

  colors = [ '#26E600','#20BF00', '#178500'];

}

changeMapLegendColor(severty)
  refreshMap()
}




var dateArr = [];
var acturalDateArr = []
// debugger
for(let i=0;i<16;i++){

  var d = new Date();

 d.setDate(d.getDate()-i);

}
timelineData.forEach(function(obj,i){
  if(obj.date =='2020-01-22') return false
  acturalDateArr.push(obj.date)
  let str = obj.date;
  let res = str.split("-");
  dateArr.push(res[2]+' / '+res[1])
})
//slider
var mySlider = new rSlider({
  target: '#sampleSlider',
  // values: {min: 1, max: 10},
  // step:10,
  values:dateArr,
  range: false,
  tooltip: true,
  scale: true,
  labels: true
  // set: [2010, 2013]
});

let inticout =0
function myTimer() {


  inticout = dateArr.indexOf($('.rs-tooltip').text());

if(dateArr[inticout] == undefined) inticout = 0
inticout++

  mySlider.setValues('26 / 03', dateArr[inticout])
currentDate = acturalDateArr[inticout-1]

refreshMap()

}
function myStopFunction() {
  clearInterval(myVar);
}
var myVar
function play(){
  $('#pausebtn').show()
  $('#playbtn').hide()
  myVar = setInterval(myTimer, 1000);

}
function pause(){
  $('#pausebtn').hide()
  $('#playbtn').show()

  clearInterval(myVar);

}

josnWard = L.geoJSON(geoj).addTo(map);

var bubbleLayer = L.layerGroup()
var cfg = {

  "radius": 30,
  "minOpacity": .7,
  "maxOpacity": 1,
  "scaleRadius": false,
  "useLocalExtrema": false,
  "gradient":{0.4: 'red', 0.65: 'red', 1: 'red'}
}


//.addTo(heatLay).addTo(map)

var getCentroid2 = function (arr) {
  var twoTimesSignedArea = 0;
  var cxTimes6SignedArea = 0;
  var cyTimes6SignedArea = 0;

  var length = arr.length

  var x = function (i) { return arr[i % length][0] };
  var y = function (i) { return arr[i % length][1] };

  for ( var i = 0; i < arr.length; i++) {
      var twoSA = x(i)*y(i+1) - x(i+1)*y(i);
      twoTimesSignedArea += twoSA;
      cxTimes6SignedArea += (x(i) + x(i+1)) * twoSA;
      cyTimes6SignedArea += (y(i) + y(i+1)) * twoSA;
  }
  var sixSignedArea = 3 * twoTimesSignedArea;
  return [ cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea];        
}
$('#togleVs').on('change',function(){
  visType = $('#togleVs').val()
  refreshMap()
})
var heatLay 
function refreshMap(){
  let reslut = timelineData.filter((obj)=>{
    return obj.date === currentDate
  })

  reslut = reslut[0].list


  if(map.hasLayer(bubbleLayer)) {
    
    bubbleLayer.eachLayer(function(layer){

      bubbleLayer.removeLayer(layer)
    })
  }
// debugger
if(visType==='bubble' || visType==='polygon'){
  if(heatLay === undefined){

  } else{
    heatLay.remove()
  
  }
}else
if(visType==='heat'){

  if(heatLay === undefined){
    // alert()
    heatLay =  L.heatLayer([], cfg).addTo(map)
  } else{
    heatLay.remove()
    heatLay =  L.heatLayer([], cfg).addTo(map)
    // map.removeLayer(heatLayer)
    // L.heatLayer([], cfg).redraw().addTo(map)

    // heatLay =  L.heatLayer([], cfg).addTo(map)
  }
  
}
josnWard.eachLayer(function (layer) {

let radius = 100;

  let ward = reslut.filter((ward)=>{
    return ward.name === layer.feature.properties.name
  })

  
  if(ward.length > 0){
let caseount = ward[0][severty]
  if(caseount >= 0 && caseount <=9){
    rand = colors[0]
    radius = 300;
  }else
  if(caseount >= 10 && caseount <=99){
    rand = colors[1]
    radius = 600;
  }else
  if(caseount > 100 && caseount <=999){
    rand = colors[2]
    radius = 800;
  }else{
  }

   layer.bindTooltip(layer.feature.properties.name+', ' +severty+':'+caseount)

   if(visType === 'heat'){

     heatLay.addLatLng([layer.getBounds().getCenter().lat, layer.getBounds().getCenter().lng, .9])

     heatLay.setOptions({"gradient":{0.4: rand, 0.65: rand, 1: rand}})
  }else
  if(visType === 'polygon'){

        // heatLay.addLatLng([50.6, 30.4, 0.5])
   



   layer.setStyle({fillColor: rand, fillOpacity:.8,weight:1,color:'rand'});
  
  }else{
    L.circle([layer.getBounds().getCenter().lat, layer.getBounds().getCenter().lng], {radius: radius}).setStyle({fillColor: rand, fillOpacity:.5,weight:0,color:'#cccccc'}).addTo(bubbleLayer);

    layer.setStyle({fillColor: rand, fillOpacity:0,weight:.5,color:'#ffffff'});

  }


}else{
   layer.bindTooltip(layer.feature.properties.name+ ','+severty+' count NA ')
   layer.setStyle({fillColor: '#000000', fillOpacity:.1,weight:.5,color:'#ffffff'});
}
if(visType === 'heat'){

  layer.setStyle({fillColor: '#000000', fillOpacity:.1,weight:.5,color:'#ffffff'});
}

})
if(visType === 'polygon'){

}else if(visType === 'bubble'){

  bubbleLayer.addTo(map)
} 
}//end of refresh map

$(document).ready(function(){

  refreshMap()

})

   