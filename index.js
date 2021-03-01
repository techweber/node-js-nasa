const express = require('express');
const fetch = require('node-fetch');
const app = express();

const serverPort = 3000;
let api_key = 'ZKebWUzGJ2rgDYZTjz2iHfW5brcoJDJqqa7pjhld';

let header = "<a href='/earth'>Earth</a><br/>";
	header += "<a href='/mars'>Mars</a><br/>";
	header += "<a href='/picture-of-today'>Picture of Today</a><br/>";


app.get('/earth',(req,res)=>{
	let longitude = -95.33;
	let latitude = 29.78;
	let date_of_image = '2018-01-01';
	let api_url = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date_of_image}&dim=0.15&api_key=${api_key}`;
	let html = header + "Image : <img src='" + api_url + "' style='width:100%;' /> <br/><br/>";
	res.send(html);	
});

app.get('/picture-of-today',(req,res)=>{

	let api_url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;
	fetch(api_url)
	.then((response)=>response.json())
	.then((data)=>{
		let html = header + "Date: " + data.date + "<br/><br/>";
		html += "Title: " + data.title + "<br/><br/>";
		html += "Description: " + data.explanation + "<br/><br/>";
		html += "Image: <img src='" + data.hdurl + "' style='width:100%' /><br/><br/>";
		res.send(html);
	})
	.catch((err)=> console.log(err));
});


app.get('/mars',(req,res)=>{

	let api_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${api_key}`;
	fetch(api_url)
	.then((response)=>response.json())
	.then((data)=>{
		data = data.photos;
		let html = header;
		Object.keys(data).forEach(function(d){
			html = html + "Camera: " + data[d].camera.full_name + "<br/>" +
			"Earth date: " + data[d].earth_date
			+ "<br/> Rover : " + data[d].rover.name + " (Landing date) : " + 
			data[d].rover.landing_date + "<br/><img src='" + data[d].img_src + "' /><br/><br/>";
		});
		res.send(html);
	})
	.catch((err)=>console.log(err));
});


app.get('/',(req,res)=>{
	res.send(header);
});

app.listen(serverPort,()=>console.log(`Started Server at http://localhost:${serverPort}!`));