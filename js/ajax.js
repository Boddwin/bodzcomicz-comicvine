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
				const selectedResourceType = document.createElement('h4');
				const selectedResourceTypeText = document.createTextNode(`Resource type: ${comic.resource_type}`);
				const newAlias = document.createElement("div");
				const newDeck = document.createElement('p');
				const newDeckText = document.createTextNode(`${comic.deck}`);
				const newIssueNo = document.createElement('p');
				const newIssueNoText = document.createTextNode(`Issue Number: ${comic.issue_number}`);
				const newImage = document.createElement("img");
				const newDiv = document.createElement("div");

				selectedTitle.appendChild(selectedTitleText);
				selectedResourceType.appendChild(selectedResourceTypeText);				
				newAlias.innerHTML = `${comic.aliases}`;
				newDeck.appendChild(newDeckText);
				newIssueNo.appendChild(newIssueNoText);
				newImage.src = `${comic.image.small_url}`;					
				newDiv.innerHTML = `${comic.description}`;

				selectedComicsFragment.appendChild(selectedTitle);
				selectedComicsFragment.appendChild(selectedResourceType);
				selectedComicsFragment.appendChild(newAlias);
				selectedComicsFragment.appendChild(newDeck); 
				selectedComicsFragment.appendChild(newIssueNo);
				selectedComicsFragment.appendChild(newImage);
				selectedComicsFragment.appendChild(newDiv)

				const comicsDiv = document.querySelector("#results"); 
				comicsDiv.appendChild(selectedComicsFragment); 

			  }
		  }

		const comicsFragment = document.createDocumentFragment(); 
		comics.results.forEach(function(comic){
	
			const newTitle = document.createElement("h2");
			const newTitleText = document.createTextNode(`${comic.name}`);

			const newImage = document.createElement("img");

			newTitle.setAttribute('class', 'result-title');
			newTitle.appendChild(newTitleText);

			newImage.src = `${comic.image.small_url}`;		
	
			comicsFragment.appendChild(newTitle);
			comicsFragment.appendChild(newImage);

			newTitle.addEventListener("click",getShowMsgFnc(comic),false); // add an event listener
		});
	
		const comicsDiv = document.querySelector("#results"); 
		comicsDiv.appendChild(comicsFragment); 
		
	});
});