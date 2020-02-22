// const axios = require('axios');

// const url = 'https://comicvine.gamespot.com/api/volumes/?api_key=d51adb6cf15fee230e5015b8933588ed3f96fa21'
// axios.get(url).then(response => console.log(response));

fetch('make_request.php?searchterm=2000AD').then(function(response) {
	return response.json();
}).then(function(json) {
    const comics = json;
    console.log(comics);
	// console.log(comics.results[0].id);

	comics.results.forEach(function(comic){
		// console.log(`Title ${comic.name} Description ${comic.description} Image ${comic.image.meduim_url}`);		
	})

	const comicsFragment = document.createDocumentFragment(); //create a fragment
	comics.results.forEach(function(comic){

		const newTitle = document.createElement("h2");
		const newTitleText = document.createTextNode(`${comic.name}`);

		const newDiv = document.createElement("div");			
		const newImage = document.createElement("img");

		newTitle.appendChild(newTitleText);
		newDiv.innerHTML = `${comic.description}`;
		newImage.src = `${comic.image.small_url}`;		

		comicsFragment.appendChild(newTitle); 
		comicsFragment.appendChild(newDiv);
		comicsFragment.appendChild(newImage);
	});

	const comicsDiv = document.querySelector("#comics"); //get hold of the div from the page
	comicsDiv.appendChild(comicsFragment); // we only update the document once!
	
});

const txtBox = document.querySelector("#search"); //get hold of the text box
const srchBtn = document.querySelector(".searchBtn");

srchBtn.addEventListener('click', function (event) {
	event.preventDefault();		
 	console.log('The button was clicked!');
  	console.log(txtBox.value); //displays whatever the user has entered into txtBox.
});
