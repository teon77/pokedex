

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
const getPokemonFromApi = async (inputtedName) => {
    try {
        const response = await axios.get(`${BASE_URL}${inputtedName}`);
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
        createDOMListSection(res.data.pokemon, type);
    } catch (error) {
        console.error(error);
    }
}

// extra Functions
const getInputtedValue = () => {
    if(input.value === "") alert("PLease insert Some text");
    getPokemonFromApi(input.value);
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
    return typesArr.map(cell => (`<button onclick="getPokeList('${cell.type.name}')" class= "pokeType">${cell.type.name}</button>`));
}

const clearValues = () => {
charName.textContent = "Name: ";
charHeight.textContent = "Height: ";
charWeight.textContent = "Weight: ";
charTypes.textContent = "Types: ";
}

const createDOMListSection = (pokeArr, type) => {
    closeSection();
    const typesSection = document.createElement("section");
    typesSection.append(createSearchInput(type));
    typesSection.append(createCloseBtn())
    typesSection.append(createDOMList(pokeArr));
    typesSection.setAttribute("id", "typesSection")
    document.body.appendChild(typesSection);
}

const createDOMList = (pokeArr) => {
    const list = createElement("ul","", [], {id: "pokeList"})
    for (let i = 0; i < pokeArr.length; i++) {
        const pokeListButton = createElement("button", pokeArr[i].pokemon.name,  ["pokeType"], {onclick: `getPokemonFromApi('${pokeArr[i].pokemon.name}')`})
        const pokeListLi = document.createElement("li");
        pokeListLi.appendChild(pokeListButton)
        list.appendChild(pokeListLi);
    }
   return list;
}

const createSearchInput = (type) => {
  return createElement("input", "", [],
   {type: "text",
    placeholder: `Search ${type} type Pokemons`,
    onkeyup: "filterList(this.value)",
    id: "search"})
}

const filterList = (inputValue) => {
    const searchValue = inputValue.toLowerCase();   // gets the value in lower case

    for ( let pokeElement of document.getElementById("pokeList").children) {    // gets all tasks on the page
        if(pokeElement.innerText.toLowerCase().includes(searchValue)) {
            pokeElement.style.display = "list-item";
           }
           else{
            pokeElement.style.display = "none";                     // hides them
           }
    }
          
}

const createCloseBtn = () => {
    const closeBtn = createElement("button", "✘", ["closeBtn"], {onclick: "closeSection()"});
    return closeBtn;
}

const closeSection = () =>  {
    try{
    document.getElementById("typesSection").remove();
    } catch {
        return;
    }
}

const createElement = (tagName, text=" ", classes = [], attributes = {}) => {
    const element = document.createElement(tagName);
    
    // assigning text
      element.textContent = text;
    
    // For Classes
    for(const cls of classes) {
      element.classList.add(cls);
    }
  
    // For Attributes
    for (const attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }
    return element;
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
