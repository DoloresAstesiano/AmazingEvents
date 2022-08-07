var detaislcardsIdHtml = document.getElementById("containerdetailsCards")

//Creo la Función Asíncrona
async function getDataFromApi() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
  .then (response => response.json())
  .then (json => dataApi= json)

let dataArray= dataApi.events

function getData() {
    var id = location.search.split("?id=").join("") //join une todos los elementos de una matriz.
    // console.log(id)
    var card = dataArray.find((texto) => {
        return texto._id == id
    })
    // console.log(card)
    
    //genero el template de la tarjeta.
    let templateDetailsCard = `<img src=${card.image} class="img-thumbnail img_card_details" alt=${card.name}> 
        <div class="card" style="width: 18rem;">
          <div class="card-body card_body_detail card_details_txt">
            <h5>${card.name}</h5>
            <ul>
              <li${card.name}</li>
              <li>${card.date}</li>
              <li>${card.description}</li>
              <li>${card.category}</li>
              <li>${card.place}</li> 
              <li>$${card.price}</li>      
            </ul>
          </div>
        </div>`
    detaislcardsIdHtml.innerHTML = templateDetailsCard; //Imprimo lo que quiero ver con la variable cards

}
getData() //Ejecuto la Función
}
getDataFromApi()//Ejecuto la Función
