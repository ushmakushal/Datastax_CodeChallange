//set today's date as max value for the date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("inputDate").setAttribute("max", today);

//eventListner on form submit
document.getElementById("form").addEventListener("submit", getData);

function getData(event){
	event.preventDefault();
	const lat = document.getElementById("inputLat").value;
	const longi = document.getElementById("inputLong").value;
	const dim = document.getElementById("inputDim").value == 0 ? 0.025 : document.getElementById("inputDim").value;
	const date = document.getElementById("inputDate").value == '' ? today : document.getElementById("inputDate").value;
	const apiKey = "<your_apiKey>"; // Use your API Key here
	
	const url = `https://api.nasa.gov/planetary/earth/assets?lon=${longi}&lat=${lat}&date=${date}&dim=${dim}&api_key=${apiKey}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
		  if(data){
			displayImage(data);
		  }
	})
	.catch(error => console.log(error));
}

function displayImage(data){
	const container = document.getElementById("imageContainer");
	
	const img = document.getElementById("imgEarth");
	img.src = data.url;
	
	//let imgDate = data.date.slice(0, 10).split('-');   
	//imgDate = imgDate[1] +'/'+ imgDate[2] +'/'+ imgDate[0];
	const imageDate = document.getElementById("imageDate");
	imageDate.textContent = data.date;
	
	const imageId = document.getElementById("imageId");
	imageId.textContent = data.id;
	
	const imageDataset = document.getElementById("imageDataset");
	imageDataset.textContent = data.resource.dataset;
	
	const imageVersion = document.getElementById("imageVersion");
	imageVersion.textContent = data.service_version;
	
	const imageUrl = document.getElementById("imageUrl");
	imageUrl.textContent = data.url;
	
	container.style.display = "block";
}
