

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const TYPE_URL = "https://pokeapi.co/api/v2/type/";
let backImage = "", frontImage ="";

//  DOM Elements
const charName = document.getElementById("charName");
const charHeight = document.getElementById("charHeight");
const charWeight = document.getElementById("charWeight");
const charTypes = document.getElementById("charTypes");
const charImage = document.getElementById("charImage");

const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const input = document.getElementById("input");

// use API
const getFromApi = async (inputtedName) => {
    try {
        const response = await axios.get(`${BASE_URL}${inputtedName}`);
        console.log(response);
        assignValues(response.data);
    }
    catch (error) {
        alert(`Your search for ${inputtedName} has no matching results`)
        console.error(error);
    }
}

const getPokeList = async (type) => {
    try {
        const res = await axios.get(`${TYPE_URL}${type}`);
        console.log(res.data.pokemon);
        createDOMPokeList(res.data.pokemon);
    } catch (error) {
        console.error(error);
    }
}

// extra Functions
const getInputtedValue = () => {
    if(input.value === "") alert("PLease insert Some text");
    getFromApi(input.value);
}

const assignValues = (data) => {
    clearValues();
charName.textContent += data.name;
charHeight.textContent += data.height;
charWeight.textContent += data.weight;
charTypes.innerHTML += getTypes(data.types).join(", ");

frontImage = data.sprites.front_default     // used for Image turn
charImage.src = frontImage;                 
backImage = data.sprites.back_default;      // used for Image turn

}

const getTypes = (typesArr) => {
    console.log(typesArr);
    return typesArr.map(cell => (`<button onclick="getPokeList('${cell.type.name}')" class= "pokeType">${cell.type.name}</button>`));
}

const clearValues = () => {
charName.textContent = "Name: ";
charHeight.textContent = "Height: ";
charWeight.textContent = "Weight: ";
charTypes.textContent = "Types: ";
}

const createDOMPokeList = (pokeArr) => {
    let list = document.createElement("ul");
    list.classList.add("pokeList");
    for (let i = 0; i < pokeArr.length; i++) {
        // Create the list item:
        let pokeListItem = document.createElement('li');

        // Set its contents:
        pokeListItem.innerHTML += `<button onclick="getFromApi('${pokeArr[i].pokemon.name}')" class= "pokeType">${pokeArr[i].pokemon.name}</button>`;

        // Add it to the list:
        list.appendChild(pokeListItem);
    }
   document.body.appendChild(list);
}


// eventListeners
submitBtn.addEventListener("click", getInputtedValue)

clearBtn.addEventListener("click", () => {
    input.value = "";
})

charImage.addEventListener("mouseover", () => {
    charImage.src = backImage;
})

charImage.addEventListener("mouseout", () => {
    charImage.src = frontImage;
})
