/* Global Variables */
let apiKey = '4aa51535e7dd703bcb096c9716a30451&units=imperial';
let baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) +'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', getData);

function getData(){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherData(baseUrl, zipCode, apiKey)
    .then(function(data){
        console.log(data);
        postData('/postData',{date: newDate, temp: data.main.temp, content: feelings});
        retrieveData()
    })
}

// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),         
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

const getWeatherData = async (baseUrl, zipCode, apiKey) =>{
    const res = await fetch(baseUrl+zipCode+ "&appid="+apiKey)
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("error", error);
    }
}
const retrieveData = async () =>{
    const response = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await response.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
    }
   }
