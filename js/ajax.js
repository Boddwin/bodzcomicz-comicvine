const srchBtn = document.querySelector(".searchBtn");
const favesBtn = document.querySelector(".js-add-to-favourites");
const faves = document.querySelector(".favourites");
const retrieveBtn = document.querySelector(".retrieveBtn");

// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/bodzcomicz-comicvine/sw.js')
	.then(function(registration) {
	  console.log('Registration successful, scope is:', registration.scope);
	})
	.catch(function(error) {
	  console.log('Service worker registration failed, error:', error);
	});
  }
    
  // Code to handle install prompt
  const addIconBtn = document.querySelector('#myBtn');
  
  let promptForAddIcon;
  function triggerThePrompt(){
	//the button has been clicked
	promptForAddIcon.prompt();
  }
  
  function setUpAddIcon(evnt){
	console.log("Set up add icon")
	console.log(evnt);
	evnt.preventDefault();
	promptForAddIcon = evnt; 
	addIconBtn.addEventListener('click',triggerThePrompt,false)
  }
  
  window.addEventListener('beforeinstallprompt',setUpAddIcon, false);



// page layout -----------
const myNode = document.getElementById("results");

const mainLogo = document.querySelector('.home-image');
anime({
	targets: mainLogo,
	scale: 10,
	duration: 3000
  });

 //search functionality ---------- 

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

			const newTitle = document.createElement('h3');
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
				newImage.src = `${comic.image.screen_url}`;
				newImage.setAttribute('class', 'z-depth-3');
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

			  function addGridClass() {
				const element = document.getElementById("results");
				element.classList.remove('results-list');
				element.classList.remove("favourites-list");
				element.classList.add("results-grid");
			  };
			
			addGridClass();
			newTitle.addEventListener("click",getShowMsgFnc(comic),false);
			newTitle.addEventListener("click",revealFavouritesBtn,false);
		});
	
		const comicsDiv = document.querySelector("#results"); 
		
		comicsDiv.appendChild(comicsFragment); 	

		//animates headings and main results images in
		const titles = document.querySelectorAll('.result-title');
		anime({
			targets: titles,
			translateY: -5
		});
		const pictures = document.querySelectorAll('#results img');
		anime({
			targets: pictures,
			translateY: -10
		});
	});
});

function getShowMsgFnc(comic){
	return function(){
		console.log(comic.name+" has an ID of "+comic.id);
		myNode.textContent = '';

		const selectedComicsFragment = document.createDocumentFragment(); 
		
		const newTitle = document.createElement('h3');
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
			newImage.setAttribute('class', 'z-depth-3');
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

	//Save to favourites ---------------
		favesBtn.addEventListener('click', function () {				
		if(!localStorage.getItem('saved')) {  //checks if 'saved' already exists in localstorage
			const savedItems = [];
			savedItems.push(comic);
			localStorage.setItem('saved', JSON.stringify(savedItems));
		  } else {
			const prevSavedItems = JSON.parse(localStorage.getItem('saved'));  
			prevSavedItems.push(comic);
			const newSaveJson = JSON.stringify(prevSavedItems);
			const newSave = localStorage.setItem("saved", newSaveJson);
			console.log(newSave);
		  }
		});

		function addResultsListClass() {
			const element = document.getElementById("results");
			element.classList.remove('results-grid');
			element.classList.remove("favourites-list");
			element.classList.add("results-list");
		  };
		
		  addResultsListClass();

				//animates headings and main results images in
				const titles = document.querySelectorAll('.result-title');
				anime({
					targets: titles,
					translateY: -5
				});
				const pictures = document.querySelectorAll('#results img');
				anime({
					targets: pictures,
					translateY: -10
				});
	  }
	  
  }	

//retrieve items from localStorage  ---------------------
retrieveBtn.addEventListener('click', function (){
	myNode.textContent = '';
	const savedComics = (localStorage.getItem('saved'));
	retrievedItems = JSON.parse(savedComics);

	const savedComicsFragment = document.createDocumentFragment();

	function addFavouritesClass() {
		const element = document.getElementById("results");
		element.classList.remove('results-list');
		element.classList.remove("results-grid");
		element.classList.add("favourites-list");
	  };
	
	  addFavouritesClass();
	
	retrievedItems.forEach(function(retrieved){

	const newTitle = document.createElement('h3');

			if (retrieved.name !== null){ 
				const newTitleText = document.createTextNode(`${retrieved.name}`)
				newTitle.appendChild(newTitleText);
			}
			 else if (retrieved.volume.name !== null){ 
				const newTitleText = document.createTextNode(`${retrieved.volume.name}: Issue ${retrieved.issue_number}`)
				newTitle.appendChild(newTitleText);	
			};		

		newTitle.setAttribute('class', 'result-title');	
		savedComicsFragment.appendChild(newTitle);

		const newImage = document.createElement('img');
			newImage.src = `${retrieved.image.small_url}`;
			newImage.setAttribute('class', 'z-depth-3');
			savedComicsFragment.appendChild(newImage);	

			newTitle.addEventListener("click",showDetails(retrieved),false);

			function showDetails(retrieved){
				return function(){
					console.log(retrieved.name+" has an ID of "+retrieved.id);

					myNode.textContent = '';

					function addResultsListClass() {
						const element = document.getElementById("results");
						element.classList.remove('results-grid');
						element.classList.remove("favourites-list");
						element.classList.add("results-list");
					};
					
					  addResultsListClass();

					const selectedComicsFragment = document.createDocumentFragment(); 
					
					const newTitle = document.createElement('h3');
					const resource = retrieved.resource_type;
			
					if (retrieved.name !== null){ 
						const newTitleText = document.createTextNode(`${retrieved.name}`)
						newTitle.appendChild(newTitleText);
					}
					 else if (retrieved.volume.name !== null){ 
						const newTitleText = document.createTextNode(`${retrieved.volume.name}: Issue ${retrieved.issue_number}`)
						newTitle.appendChild(newTitleText);	
					};		
			
					newTitle.setAttribute('class', 'result-title');	
					selectedComicsFragment.appendChild(newTitle);
			
					const newImage = document.createElement('img');
						newImage.src = `${retrieved.image.small_url}`;
						newImage.setAttribute('class', 'z-depth-3');
						selectedComicsFragment.appendChild(newImage);
					
					if (retrieved.deck !== null){
						const newDeck = document.createElement('p');
						const newDeckText = document.createTextNode(`${retrieved.deck}`);
						newDeck.appendChild(newDeckText);
						selectedComicsFragment.appendChild(newDeck);
					}
			
					if(resource == 'character'){
						const newAlias = document.createElement("div");
						newAlias.innerHTML = `Alliases: ${retrieved.aliases}`;
						selectedComicsFragment.appendChild(newAlias);
					};
			
					if(resource == 'issue'){
						const newIssueNo = document.createElement('p');
						const newIssueNoText = document.createTextNode(`Issue Number: ${retrieved.issue_number}`);
						newIssueNo.appendChild(newIssueNoText);
						selectedComicsFragment.appendChild(newIssueNo);
						const volumeName = document.createElement('p');
						const volumeNameText = document.createTextNode(`Volume: ${retrieved.volume.name}`);
						volumeName.appendChild(volumeNameText);
						selectedComicsFragment.appendChild(volumeName);
					};
			
					if(resource == 'series'){
						const publisher = document.createElement('p');
						const publisherText = document.createTextNode(`Publisher: ${retrieved.publisher.name}`);
						publisher.appendChild(publisherText);
						selectedComicsFragment.appendChild(publisher);
						const seriesCount = document.createElement('p');
						const seriesCountText = document.createTextNode(`Number of episodes: ${retrieved.count_of_episodes}`);
						seriesCount.appendChild(seriesCountText);
						selectedComicsFragment.appendChild(seriesCount);
						const startYear = document.createElement('p');
						const startYearText = document.createTextNode(`Year first aired: ${retrieved.start_year}`);
						startYear.appendChild(startYearText);
						selectedComicsFragment.appendChild(startYear);
					};
			
					if(resource == 'volume'){
						const publisher = document.createElement('p');
						const publisherText = document.createTextNode(`Publisher: ${retrieved.publisher.name}`);
						publisher.appendChild(publisherText);
						selectedComicsFragment.appendChild(publisher);
						const yearPublished = document.createElement('p');
						const yearPublishedText = document.createTextNode(`Year Published: ${retrieved.start_year}`);
						yearPublished.appendChild(yearPublishedText);
						selectedComicsFragment.appendChild(yearPublished);
						const issueCount = document.createElement('p');
						const issueCountText = document.createTextNode(`Number of issues: ${retrieved.count_of_issues}`);
						issueCount.appendChild(issueCountText);
						selectedComicsFragment.appendChild(issueCount);
					};
			
					const resourceType = document.createElement('p');			
					const resourceToUpperCase = resource.replace(/^\w/, c => c.toUpperCase());
					const resourceTypeText = document.createTextNode(`Resource type: ${resourceToUpperCase}`);
					resourceType.appendChild(resourceTypeText);
					selectedComicsFragment.appendChild(resourceType);
			
					if (retrieved.description !== null){
					const newDiv = document.createElement("div");
					newDiv.innerHTML = `${retrieved.description}`;
					selectedComicsFragment.appendChild(newDiv);
					};					
			
					const comicsDiv = document.querySelector("#results"); 
					comicsDiv.appendChild(selectedComicsFragment); 
			
					document.body.scrollTop = 0; // For Safari
					document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
				}
			};
	});

	function addFavouritesClass() {
		const element = document.getElementById("results");
		element.classList.remove('results-list');
		element.classList.remove("results-grid");
		element.classList.add("favourites-list");
	  };
	
	  addFavouritesClass();

	const comicsDiv = document.querySelector("#results"); 
	comicsDiv.appendChild(savedComicsFragment);
})

//history------------------------

// document.addEventListener('DOMContentLoaded', ()=>{
// 	window.addEventListener("hashchange", hc);
// 	window.addEventListener("popstate", ps);
// });

// function hc(ev){
// 	// ev.newURL ev.oldURL
// 	show("hashchange");
// }
// function ps(ev){
// 	//ev.state
// 	show("popstate");
// }

let page1Link;
let page2Link;
let page1;
let page2;



function changeScreen(id){
	if(id==="1"){
		// page1.classList.remove("hide");
		// page2.classList.add("hide");
	}else{
		// page1.classList.add("hide");
		// page2.classList.remove("hide");
	}
}

function linkHandler(evnt){
	evnt.preventDefault(); //stop the default hyperlink
	const id = evnt.target.getAttribute("data-page"); //get the id of the screen to make visible
	console.log('data-page:',id);
	changeScreen(id);
	history.pushState({"page":id},null, id);
}

//this event is triggered when the back button is hit
window.addEventListener('popstate', function(evnt) {
	changeScreen(evnt.state.page);
});

function init(){

	page1Link = document.querySelector(".searchBtn");
	page2Link = document.querySelector(".result-title");
	page1 = document.querySelector("#page1");
	page2 = document.querySelector("#page2");

	page1Link.addEventListener("click",linkHandler,false);
	page2Link.addEventListener("click",linkHandler,false);

}

init();