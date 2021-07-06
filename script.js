(function(){
    'use strict';
    const myForm = document.querySelector("#destination_details_form");
    const destinationList = document.querySelector("#destinations_container");
    const destinationListNew = document.querySelector("#destination_container_new")
    const myTitle = document.querySelector("#title");

    // updateWishlistTitle();

    myForm.addEventListener('submit', handleFormSubmit );

    function handleFormSubmit(event){
        event.preventDefault();
        const destName = event.target.elements["name"].value;
        const destLocation = event.target.elements["location"].value;
        const destPhoto = event.target.elements["photo"].value;
        const destDesc = event.target.elements["description"].value;            
        
        clearFormInputs();

        const userCard = createNewCard(destName,destLocation,destPhoto,destDesc);

        if(destinationList.children.length===0){
            // append it to container
            destinationList.appendChild(userCard);
        }
        else if(destinationList.children.length>0){
            destinationListNew.appendChild(userCard);
        }
        updateWishlistTitle();
    }

    //defning all 3 functions used
    function clearFormInputs(){
        for(let i=0; i<myForm.length-1;i++){
            myForm.elements[i].value = '';
        }
    };

    function createNewCard(destName,destLocation,destPhoto,destDesc) {
        const card = document.createElement('div');
        card.className = 'card';

        //to append image to card
        const photo = document.createElement('img');
        const defaultImg = "images/signpost.jpg";
        if(destPhoto.length !== 0){
            photo.setAttribute('src',destPhoto);
        }
        else{
            photo.setAttribute('src',defaultImg);
        }
        card.appendChild(photo);

        //to append card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        //create cardtitle
        const title = document.createElement('h3');
        title.innerText = destName;
        title.style.color = 'Blue';
        cardBody.appendChild(title);

        //card subtitle (location)
        const subtitle = document.createElement('h4');
        subtitle.innerText = destLocation;
        cardBody.appendChild(subtitle);
        
        //card description
        const destPara = document.createElement('p');
        destPara.className = 'card-text';
        if(destDesc){
            destPara.innerText = destDesc;
        }
        else{
            destPara.innerText = 'No description added for this destination.';
        }
        cardBody.appendChild(destPara);

        //remove button with event listener on it
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click',(e)=>{
            e.target.parentElement.parentElement.remove();
            updateWishlistTitle();
        });
        cardBody.appendChild(removeButton);
    
        card.appendChild(cardBody);

        //very important to return
        return card;
    }

    function updateWishlistTitle(){
        if(destinationList.children.length === 0){
            myTitle.innerText = 'Enter Destination Details';
        }
        else{
            myTitle.innerText = 'My Destination Wishlist';
        }
    }

})();