const srchBtn = document.querySelector(".searchBtn");

srchBtn.addEventListener('click', function (event) {
	event.preventDefault();	

	const choice = document.querySelector('#choice');
	const txtBox = document.querySelector('#search'); //get hold of the text box

	console.log('The button was clicked!');
	console.log(choice.value);
	console.log(txtBox.value); //displays whatever the user has entered into txtBox.

	const query = `make_request.php?searchoption=${choice.value}&searchterm=${txtBox.value}`;
	// const query = `make_request.php?searchterm=${txtBox.value}`;

	// fetch(`make_request.php?searchoption=${choice.value}&?searchterm=${txtBox.value}`).then(function(response) {
		fetch(query).then(function(response) {
		return response.json();
	}).then(function(json) {
		const comics = json;
		console.log(comics);
	
		comics.results.forEach(function(comic){
			// console.log(`Title ${comic.name} Description ${comic.description} Image ${comic.image.meduim_url}`);		
		})
	
		const comicsFragment = document.createDocumentFragment(); 
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
	
		const comicsDiv = document.querySelector("#comics"); 
		comicsDiv.appendChild(comicsFragment); 
		
	});
});