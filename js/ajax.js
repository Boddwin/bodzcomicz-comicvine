const srchBtn = document.querySelector(".searchBtn");

srchBtn.addEventListener('click', function (event) {
	event.preventDefault();	

	const choice = document.querySelector('#choice');
	const txtBox = document.querySelector('#search'); //get hold of the text box

	console.log('The button was clicked!');
	console.log(choice.value);
	console.log(txtBox.value); //displays whatever the user has entered into txtBox.

	const query = `make_request.php?searchoption=${choice.value}&searchterm=${txtBox.value}`;

	const myNode = document.getElementById("results");
  	myNode.textContent = '';

	fetch(query).then(function(response) {
		return response.json();
	}).then(function(json) {
		const comics = json;
		console.log(comics);

		function getShowMsgFnc(comic){
			return function(){
				console.log(comic.name+" has an ID of "+comic.id);
				myNode.textContent = '';

				const selectedComicsFragment = document.createDocumentFragment(); 
				
				const selectedTitle = document.createElement('h2');
				const selectedTitleText = document.createTextNode(`${comic.name}`);
				selectedTitle.appendChild(selectedTitleText);

				const newAlias = document.createElement("div");
				newAlias.innerHTML = `${comic.aliases}`;

				const newDeck = document.createElement('p');
				const newDeckText = document.createTextNode(`${comic.deck}`);
				newDeck.appendChild(newDeckText);

				const newImage = document.createElement("img");
				newImage.src = `${comic.image.small_url}`;	


				selectedComicsFragment.appendChild(selectedTitle);
				selectedComicsFragment.appendChild(newAlias);
				selectedComicsFragment.appendChild(newDeck); 
				selectedComicsFragment.appendChild(newImage);

				const comicsDiv = document.querySelector("#results"); 
				comicsDiv.appendChild(selectedComicsFragment); 

			  }
		  }

		const comicsFragment = document.createDocumentFragment(); 
		comics.results.forEach(function(comic){
	
			const newTitle = document.createElement("h2");
			const newTitleText = document.createTextNode(`${comic.name}`);

			const newAlias = document.createElement("div");
			// const newAliasText = document.createTextNode(`${comic.aliases}`);

			const newDeck = document.createElement('p');
			const newDeckText = document.createTextNode(`${comic.deck}`);
	
			// const newDiv = document.createElement("div");			
			const newImage = document.createElement("img");

			newTitle.setAttribute('class', 'result-title');
			newTitle.appendChild(newTitleText);

			// newAlias.appendChild(newAliasText);
			newAlias.innerHTML = `${comic.aliases}`;

			newDeck.appendChild(newDeckText);

			// newDiv.innerHTML = `${comic.description}`;
			newImage.src = `${comic.image.small_url}`;		
	
			comicsFragment.appendChild(newTitle);
			comicsFragment.appendChild(newAlias);
			comicsFragment.appendChild(newDeck); 
			// comicsFragment.appendChild(newDiv);
			comicsFragment.appendChild(newImage);

			newTitle.addEventListener("click",getShowMsgFnc(comic),false); // add an event listener
		});
	
		const comicsDiv = document.querySelector("#results"); 
		comicsDiv.appendChild(comicsFragment); 
		
	});
});