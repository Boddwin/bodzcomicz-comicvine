const srchBtn = document.querySelector(".searchBtn");
const favesBtn = document.querySelector(".js-add-to-favourites");
const faves = document.querySelector(".favourites");
const retrieveBtn = document.querySelector(".retrieveBtn");

const myNode = document.getElementById("results");
let savedItems = []; 


srchBtn.addEventListener('click', function (event) {
	event.preventDefault();	
	const element = document.getElementById("favBtn");
	element.classList.add("hide");

	const choice = document.querySelector('#choice');
	const txtBox = document.querySelector('#search'); //get hold of the text box

	console.log('The button was clicked!');
	console.log(choice.value);
	console.log(txtBox.value); //displays whatever the user has entered into txtBox.

	const query = `make_request.php?searchoption=${choice.value}&searchterm=${txtBox.value}`;

	// const myNode = document.getElementById("results");
  	myNode.textContent = '';

	fetch(query).then(function(response) {
		return response.json();
	}).then(function(json) {
		const comics = json;
		console.log(comics);

		const comicsFragment = document.createDocumentFragment(); 
		comics.results.forEach(function(comic){

			const newTitle = document.createElement('h4');
			const resource = comic.resource_type;

			if (comic.name !== null){ 
				const newTitleText = document.createTextNode(`${comic.name}`)
				newTitle.appendChild(newTitleText);
			}
			 else if (comic.volume.name !== null){ 
				const newTitleText = document.createTextNode(`${comic.volume.name}: Issue ${comic.issue_number}`)
				newTitle.appendChild(newTitleText);	
			};		

			newTitle.setAttribute('class', 'result-title');	
			comicsFragment.appendChild(newTitle);

			const newImage = document.createElement('img');
				newImage.src = `${comic.image.small_url}`;
				comicsFragment.appendChild(newImage);

			if(resource == 'volume'){
				const publisher = document.createElement('p');
				const publisherText = document.createTextNode(`Publisher: ${comic.publisher.name} | Year Published: ${comic.start_year}`);
				publisher.appendChild(publisherText);
				comicsFragment.appendChild(publisher);
			};

			function revealFavouritesBtn() {
				const element = document.getElementById("favBtn");
				element.classList.remove("hide");
			  };

			  
			newTitle.addEventListener("click",getShowMsgFnc(comic),false); // add an event listener
			newTitle.addEventListener("click",revealFavouritesBtn,false);
		});
	
		const comicsDiv = document.querySelector("#results"); 
		comicsDiv.appendChild(comicsFragment); 

		function getShowMsgFnc(comic){
			return function(){
				console.log(comic.name+" has an ID of "+comic.id);
				myNode.textContent = '';

				const selectedComicsFragment = document.createDocumentFragment(); 
				
				const newTitle = document.createElement('h4');
				const resource = comic.resource_type;
	
				if (comic.name !== null){ 
					const newTitleText = document.createTextNode(`${comic.name}`)
					newTitle.appendChild(newTitleText);
				}
				 else if (comic.volume.name !== null){ 
					const newTitleText = document.createTextNode(`${comic.volume.name}: Issue ${comic.issue_number}`)
					newTitle.appendChild(newTitleText);	
				};		
	
				newTitle.setAttribute('class', 'result-title');	
				selectedComicsFragment.appendChild(newTitle);
	
				const newImage = document.createElement('img');
					newImage.src = `${comic.image.small_url}`;
					selectedComicsFragment.appendChild(newImage);
				
				if (comic.deck !== null){
					const newDeck = document.createElement('p');
					const newDeckText = document.createTextNode(`${comic.deck}`);
					newDeck.appendChild(newDeckText);
					selectedComicsFragment.appendChild(newDeck);
				}

				if(resource == 'character'){
					const newAlias = document.createElement("div");
					newAlias.innerHTML = `Alliases: ${comic.aliases}`;
					selectedComicsFragment.appendChild(newAlias);
				};

				if(resource == 'issue'){
					const newIssueNo = document.createElement('p');
					const newIssueNoText = document.createTextNode(`Issue Number: ${comic.issue_number}`);
					newIssueNo.appendChild(newIssueNoText);
					selectedComicsFragment.appendChild(newIssueNo);
					const volumeName = document.createElement('p');
					const volumeNameText = document.createTextNode(`Volume: ${comic.volume.name}`);
					volumeName.appendChild(volumeNameText);
					selectedComicsFragment.appendChild(volumeName);
				};

				if(resource == 'series'){
					const publisher = document.createElement('p');
					const publisherText = document.createTextNode(`Publisher: ${comic.publisher.name}`);
					publisher.appendChild(publisherText);
					selectedComicsFragment.appendChild(publisher);
					const seriesCount = document.createElement('p');
					const seriesCountText = document.createTextNode(`Number of episodes: ${comic.count_of_episodes}`);
					seriesCount.appendChild(seriesCountText);
					selectedComicsFragment.appendChild(seriesCount);
					const startYear = document.createElement('p');
					const startYearText = document.createTextNode(`Year first aired: ${comic.start_year}`);
					startYear.appendChild(startYearText);
					selectedComicsFragment.appendChild(startYear);
				};

				if(resource == 'volume'){
					const publisher = document.createElement('p');
					const publisherText = document.createTextNode(`Publisher: ${comic.publisher.name}`);
					publisher.appendChild(publisherText);
					selectedComicsFragment.appendChild(publisher);
					const yearPublished = document.createElement('p');
					const yearPublishedText = document.createTextNode(`Year Published: ${comic.start_year}`);
					yearPublished.appendChild(yearPublishedText);
					selectedComicsFragment.appendChild(yearPublished);
					const issueCount = document.createElement('p');
					const issueCountText = document.createTextNode(`Number of issues: ${comic.count_of_issues}`);
					issueCount.appendChild(issueCountText);
					selectedComicsFragment.appendChild(issueCount);
				};

				const resourceType = document.createElement('p');			
				const resourceToUpperCase = resource.replace(/^\w/, c => c.toUpperCase());
				const resourceTypeText = document.createTextNode(`Resource type: ${resourceToUpperCase}`);
				resourceType.appendChild(resourceTypeText);
				selectedComicsFragment.appendChild(resourceType);

				if (comic.description !== null){
				const newDiv = document.createElement("div");
				newDiv.innerHTML = `${comic.description}`;
				selectedComicsFragment.appendChild(newDiv);
				};

				const comicsDiv = document.querySelector("#results"); 
				comicsDiv.appendChild(selectedComicsFragment); 

				document.body.scrollTop = 0; // For Safari
				document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

				//Save to favourites
				favesBtn.addEventListener('click', function () {				
				if(!localStorage.getItem('saved')) {
					localStorage.setItem('saved', JSON.stringify(comic));
				  } else {
					const prevSavedItems = localStorage.getItem('saved');  
					savedItems.push(prevSavedItems);
					savedItems.push(comic);
					const newSaveJson = JSON.stringify(savedItems);
					const newSave = localStorage.setItem("saved", newSaveJson);
					console.log(newSave);
					console.log(savedItems);
				  }
				});
			  }
		  }		
	});
});

//retrieve items from localStorage
retrieveBtn.addEventListener('click', function (){
	myNode.textContent = '';
	// const keyName = window.localStorage.key(index);
	// console.log(keyName);

	for (var i = 0; i < localStorage.length; i++){
        const savedComics = (localStorage.getItem(localStorage.key(i)));
        // retrieved = JSON.parse(localStorage.getItem(localStorage.key(i)));
        // savedComicsFragment.append(retrieved);
        console.log(savedComics);
	}

	const savedComics = (localStorage.getItem('saved'));

	retrievedItems = JSON.parse(savedComics);

	const savedComicsFragment = document.createDocumentFragment();

// 	retrieved = JSON.parse(window.localStorage.getItem(saved));
// 	console.log(retrieved); 
	
// 	const savedComicsFragment = document.createDocumentFragment();

	const newTitle = document.createElement('h4');
			// const resource = saved.resource_type;

			if (retrievedItems.name !== null){ 
				const newTitleText = document.createTextNode(`${retrievedItems.name}`)
				newTitle.appendChild(newTitleText);
			}
			 else if (retrieved.volume.name !== null){ 
				const newTitleText = document.createTextNode(`${retrievedItems.volume.name}: Issue ${retrievedItems.issue_number}`)
				newTitle.appendChild(newTitleText);	
			};		

			newTitle.setAttribute('class', 'result-title');	
			savedComicsFragment.appendChild(newTitle);

			const newImage = document.createElement('img');
				newImage.src = `${retrievedItems.image.small_url}`;
				savedComicsFragment.appendChild(newImage);	


// 	// const newDiv = document.createElement("div");
// 	// newDiv.innerHTML = retrieve;
// 	// savedComicsFragment.appendChild(newDiv);
	const comicsDiv = document.querySelector("#results"); 
	comicsDiv.appendChild(savedComicsFragment);
})