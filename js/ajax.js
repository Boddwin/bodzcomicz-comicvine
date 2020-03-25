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

		const comicsFragment = document.createDocumentFragment(); 
		comics.results.forEach(function(comic){

			const newTitle = document.createElement('h2');			
			const resource = comic.resource_type;							
	
			if (comic.name !== null){		
				const newTitleText = document.createTextNode(`${comic.name}`);		
				newTitle.setAttribute('class', 'result-title');			
				newTitle.appendChild(newTitleText);
				comicsFragment.appendChild(newTitle);	
			}	else if (comic.issue_number !== null){
				const newTitleText = document.createTextNode(`${comic.volume.name}: Issue ${comic.issue_number}`);		
				newTitle.setAttribute('class', 'result-title-issue');			
				newTitle.appendChild(newTitleText);
				comicsFragment.appendChild(newTitle);
			};

			const newImage = document.createElement('img');
			newImage.src = `${comic.image.small_url}`;
			comicsFragment.appendChild(newImage);	

			const resourceType = document.createElement('p');			
			const resourceToUpperCase = resource.replace(/^\w/, c => c.toUpperCase());
			const resourceTypeText = document.createTextNode(`Resource type: ${resourceToUpperCase}`);
			resourceType.appendChild(resourceTypeText);
			comicsFragment.appendChild(resourceType);

			if (resource == 'character'){
				const issueAppearances = document.createElement('p');
				const issueAppearancesText = document.createTextNode(`${comic.count_of_issue_appearances} Issue appearances`);
				issueAppearances.appendChild(issueAppearancesText);
				comicsFragment.appendChild(issueAppearances);
			};

			if (resource != 'issue'){
				const publisher = document.createElement('p');
				const publisherText = document.createTextNode(`Publisher: ${comic.publisher.name}`);
				publisher.appendChild(publisherText);
				comicsFragment.appendChild(publisher);
			};
			
			if (comic.deck !== null){
			const newDeck = document.createElement('p');
			const newDeckText = document.createTextNode(`${comic.deck}`);
			newDeck.appendChild(newDeckText);
			comicsFragment.appendChild(newDeck);
			};	

			newTitle.addEventListener("click",getShowMsgFnc(comic),false); // add an event listener
		});
	
		const comicsDiv = document.querySelector("#results"); 
		comicsDiv.appendChild(comicsFragment); 

		function getShowMsgFnc(comic){
			return function(){
				console.log(comic.name+" has an ID of "+comic.id);
				myNode.textContent = '';

				const selectedComicsFragment = document.createDocumentFragment(); 
				
				const selectedTitle = document.createElement('h2');
				const selectedTitleText = document.createTextNode(`${comic.name}`);
				selectedTitle.appendChild(selectedTitleText);
				selectedComicsFragment.appendChild(selectedTitle);				

				const selectedResourceType = document.createElement('h5');
				const selectedResourceTypeText = document.createTextNode(`Resource type: ${comic.resource_type}`);
				selectedResourceType.appendChild(selectedResourceTypeText);
				selectedComicsFragment.appendChild(selectedResourceType);	

				if (comic.aliases !== null){
					const newAlias = document.createElement("div");
					newAlias.innerHTML = `${comic.aliases}`;
					selectedComicsFragment.appendChild(newAlias);
				}
				
				if (comic.deck !== null){
					const newDeck = document.createElement('p');
					const newDeckText = document.createTextNode(`${comic.deck}`);
					newDeck.appendChild(newDeckText);
					selectedComicsFragment.appendChild(newDeck);
				}

				const newIssueNo = document.createElement('p');
				const newIssueNoText = document.createTextNode(`Issue Number: ${comic.issue_number}`);
				newIssueNo.appendChild(newIssueNoText);
				selectedComicsFragment.appendChild(newIssueNo);

				const newImage = document.createElement("img");
				newImage.src = `${comic.image.small_url}`;
				selectedComicsFragment.appendChild(newImage);

				const newDiv = document.createElement("div");
				newDiv.innerHTML = `${comic.description}`;
				selectedComicsFragment.appendChild(newDiv)

				const comicsDiv = document.querySelector("#results"); 
				comicsDiv.appendChild(selectedComicsFragment); 
			  }
		  }
		
	});
});