// Listen for the form being submitted
document.getElementById("input-form").addEventListener("submit", handleFormSubmit);


// Function that handles the form being submitted
function handleFormSubmit(event) {
    // prevent form from refreshing page
    event.preventDefault();
    // Get values from form and store then in variables
    let name = event.target.elements["name"].value;
    let location = event.target.elements["location"].value;
    let photo = event.target.elements["photo"].value;
    let description = event.target.elements["description"].value;
    // Reset form elements value
    resetFormValues(event.target);
    // Create new card from form element values
    const newCard = createNewCard(name, location, photo, description);
    // Access my #output-container
    const outputContainer = document.getElementById("output-container");
    // **********Change outputContainer title if the list is empty**********
    if (outputContainer.children.length === 0) {
        document.querySelector("#title").innerHTML = "My WishList";
    }
    // **********May or may not keep the above code**********
    // Append newCard to #output-container
    document.getElementById("output-container").appendChild(newCard);
}


// Reset form values
function resetFormValues(form) {
    for (let i = 0; i < form.length; i++) {
        form.elements[i].value = "";
    }
}


// Function to create Bootstrap newCard with name, location, photo, and description arguments
function createNewCard(name, location, photo, description) {
    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    newCard.style.width = "1000px";
    newCard.style.height = "fit-content";
    newCard.style.margin = "20px;";
// Create photo element and append to card
    let img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("alt", name);
// If user didn't enter photo show default photo
    const defaultPhoto = "https://cdn.travelpulse.com/images/99999999-9999-9999-9999-999999999999/9f6e5eb0-582a-e711-80f4-005056013017/630x355.jpg";
    if (photo.length === 0) {
        img.setAttribute("src", defaultPhoto);
    } else {
        img.setAttribute("src", photo);
    }
// Append photo
newCard.appendChild(img);
// Create card body with name, location, and description and append to card
const cardBody = document.createElement("div");
cardBody.setAttribute("class", "card-body");

const cardTitle = document.createElement("h5");
cardTitle.setAttribute("class", "card-title");
cardTitle.innerText = name;
cardBody.appendChild(cardTitle);

const cardSubtitle = document.createElement("h6");
cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
cardSubtitle.innerText = location;
cardBody.appendChild(cardSubtitle);

// Only add description if entered by user
if (description.length !== 0) {
    const cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = description;
    cardBody.appendChild(cardText);
}

// Buttons container, edit button, remove button etc
const buttonsContainer = document.createElement("div");
buttonsContainer.setAttribute("class", "buttons_container");

const editButton = document.createElement("button");
editButton.setAttribute("class", "btn btn-warning");
editButton.innerText = "Edit";
editButton.addEventListener("click", editDestination);

const removeButton = document.createElement("button");
removeButton.setAttribute("class", "btn btn-danger");
removeButton.innerText = "Remove";
removeButton.addEventListener("click", removeDestination);

buttonsContainer.appendChild(editButton);
buttonsContainer.appendChild(removeButton);

cardBody.appendChild(buttonsContainer);

newCard.appendChild(cardBody);

return newCard;
}

// Edit Destination
function editDestination(event) {
    let cardBody = event.target.parentElement.parentElement;
    let title = cardBody.children[0];
    let subTitle = cardBody.children[1];

    let card = cardBody.parentElement;
    let photo = card.children[0];

    let newTitle = window.prompt("Enter new name");
    let newSubtitle = window.prompt("Enter new location");
    let newPhotoUrl = window.prompt("Enter new photo url");

    if (newTitle.length > 0) {
        title.innerText = newTitle;
      }
    
    if (newSubtitle.length > 0) {
        subTitle.innerText = newSubtitle;
      }
    if (newPhotoUrl.length > 0) {
        newPhotoUrl.setAttribute("src", newPhotoUrl);
    }
}


// Remove Destination
function removeDestination(event) {
    const cardBody = event.target.parentElement.parentElement;
    const card = cardBody.parentElement;
    card.remove();
}