var cardsIdHtml = document.getElementById("containerCards")//Este id que genero lo traigo del HTML 

//Creo la función Asincrona
async function getDataFromApi(){
    await fetch ("https://amazing-events.herokuapp.com/api/events")
    .then (response => response.json())
    .then (json => dataApi= json)

var upcomingEventsDate= dataApi.currentDate
// console.log(upcomingEventsDate)
var dataArray = dataApi.events
// console.log(dataArray)
let array = dataArray.filter(eventocategory => upcomingEventsDate < eventocategory.date)
// console.log(array)

//CREO LOS CHECKBOX DINAMICOS
var checkboxIdHtml = document.getElementById("containerCheckbox")//capturamos el getElementById dentro mi index.html 
var categoryCheckMap = dataArray.map(cadaEvento => cadaEvento.category);// A través de un map traigo todas las categorias que me da el array.
// console.log(categoryCheckMap)
const categoryCheckSet = new Set(categoryCheckMap) //Lo que hace el set es traerme las categorias no repetidas, despues de esto tengo que meter los valores en un array.
// console.log(categoryCheckSet)
var categoryCheckArray = [...categoryCheckSet] //Genero una variable que solo me va a contener los elementos de categoryChecSet para formar el array. Con los 3 puntos lo que hago es extraer lo que tiene adentro new Set.
// console.log(categoryCheckArray)

function checkboxUpcomingEvents() { //Creamos la funcion y la nombramos.
    let categoryContainer = ""
    categoryCheckArray.forEach(category =>{
        categoryContainer += 
        `<div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${category}">
            <label class="form-check-label" for="inlineCheckbox1">${category}</label>
        </div> `
    })
    checkboxIdHtml.innerHTML = categoryContainer
}
checkboxUpcomingEvents() //Ejecutamos o llamamos a la funcion.

//CAPTURO Y ESCUCHO LOS EVENTOS DE LOS CHECKBOX 
let escuchadorChecbox = []
var checkboxClick = document.querySelectorAll("input[type=checkbox]") //Guardo los checkbox creados dinamicamente en una variable.
// console.log (checkboxClick)
checkboxClick.forEach(check => check.addEventListener("click", (e) => {
    var checkboxchecked = e.target.checked
    if (checkboxchecked) { //Establezcon un condicional que verifica si la propiedad/atributo checked del elemento html, es true o false, es decir si esta tildado o no el checkbox
        escuchadorChecbox.push(e.target.value)//Si esta tildado lo empujo lo guardo dentro de la variable local declarada anteriormente
    } else {
        escuchadorChecbox = escuchadorChecbox.filter(sincheck => sincheck !== e.target.value)//Este metodo lo utilizo para quitar del array un checkbox deschequeado
    }
    //console.log(escuchadorChecbox)
    filterCheckSearch()//PONER LA FUNCION DE FILTRADO
}))

//CAPTURAMOS EL VALOR DEL INPUT
var escuchadorSearch = "" //declaro una variable sin contenido.
var searchIdHtml = document.getElementById("search")//Creo una variable para contener el valor del Id
searchIdHtml.addEventListener("keyup", (event) => { //Lamo a la variable para aplicarle el escuchador del keyup (se dispara cuando soltas una tecla del teclado)
    escuchadorSearch = event.target.value //llamo a la variable para aplicarle al escuchador el valor.
    filterCheckSearch()//PONER LA FUNCION DE FILTRADO
    // console.log(searchIdHtml)
})

function filterCheckSearch() {//Declaro una funcion, la nombro, pero no aplico parametro porque no lo necesito, que voy a trabajar con parametros externos.
    var arrayCombinado = []
    if (escuchadorChecbox.length > 0 && escuchadorSearch !== "") {//si escuchadorCheckbox es mayor a 0 y escuchadorSearch es igual a un string vacio
        escuchadorChecbox.map(checkCategory => {
            arrayCombinado.push(...array.filter(search => search.name.toLocaleLowerCase().includes(escuchadorSearch.trim().toLowerCase())
                && search.category == checkCategory))
        })
    }
    else if (escuchadorChecbox.length > 0 && escuchadorSearch === "") {
        escuchadorChecbox.map(checkCategory => { arrayCombinado.push(...array.filter(search => search.category == checkCategory)) })
    }
    else if (escuchadorSearch !== "" && escuchadorChecbox.length === 0) {
        arrayCombinado.push(...array.filter(search => search.name.toLowerCase().includes(escuchadorSearch.trim().toLowerCase())))
    }
    else {
        arrayCombinado.push(...array)
    }
    upcomingEventsCards(arrayCombinado)
    // console.log(arrayCombinado)
}
filterCheckSearch()

//CARDS
function upcomingEventsCards(array) { //Declaro una funcion y la nombro.
    let upcomingEventsCardsTemplate = "";  //Declaro una variable sin contenido, que cuando se genere el recorrido me vaya guardando los datos. 
    if (array.length !== 0) {
        array.forEach(evento => { //evento hace referencia a cada elemento del array | Al array lo recorro con el forEach(func. ord. sup.) y le asigno un parametro con una funcion flecha que me va a contener los datos de cada card, cuando se recorra
            upcomingEventsCardsTemplate += 
            `<div class="card my-3" style="width: 17rem;">
                <img src= ${evento.image} class="card-img-top mt-3 img_card" alt= ${evento.name}>
                <div class="card-body">
                    <div class="card_body_txt mb-5">
                        <h5 class="card-title text-center nombre_evento"><b>${evento.name}</b></h5>     
                        <p class="card-text text-center mb-1">${evento.description}</p> 
                        <p class="card-text text-center fecha mt-1 mb-2">${evento.date}</p> 
                    </div>
                    <div class="d-flex align-items-baseline justify-content-between txt_btn_card">
                        <p>Price: $${evento.price}</p><a href="/details.html?id=${evento._id}" class="btn btn_card">View More</a>
                    </div>
                </div>
            </div>`
            cardsIdHtml.innerHTML = upcomingEventsCardsTemplate;
        })
    } else {
        cardsIdHtml.innerHTML = `<p style="color:white">"You cant´ find what you´re looking for"<p>`
    }
}
}
getDataFromApi()
