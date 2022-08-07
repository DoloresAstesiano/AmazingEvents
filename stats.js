let dataArray;

//Función Asíncrona
async function getDataFromApi(){
await fetch("https://amazing-events.herokuapp.com/api/events")
    .then (response => response.json())
    .then (json => dataApi= json)
    dataArray=dataApi.events //dataArray es mi array gral.
    // console.log(dataArray)

    let fechaActual= dataApi.currentDate
    let eventosPasadosArray= dataArray.filter (evento => fechaActual>evento.date)
    let eventosFuturosArray= dataArray.filter (evento => fechaActual<evento.date)
    // console.log(assistance)
    // console.log(capacity)

//PRIMER TABLA
   let porcentajes = [] //Declaro una variable con un array vacio
   eventosPasadosArray.map(eventos => {
    porcentajes.push({
    eventos: eventos.name,
    porAssistance:(eventos.assistance * 100 / eventos.capacity).toFixed(2) //toFixed formatea un número.
    })
  })
  let MAX = porcentajes.sort((a, b) => b.porAssistance - a.porAssistance)[0] //Ordenamos el resultado
  console.log(MAX)
  let MIN = porcentajes.sort((a, b) => a.porAssistance - b.porAssistance)[0]
  console.log(MIN)
  let capacity = dataArray.filter(e => e.capacity).sort((a, b) => b.capacity - a.capacity)[0] //Filtamos el array general.
  // console.log(capacity)
//let capacity es la capacidad maxima.

//Eventos Futuros
   const upcomingcategoryAssist = eventosFuturosArray.map(eventos => eventos.category)
   const categoriasFututasNewSet = new Set(upcomingcategoryAssist)
   const categoriasFuturas = [...categoriasFututasNewSet] //el newSet nos devuelve un objeto 
  //console.log(categoriasFuturas)
 
   const categoriaValueFutura = [] //Creamos una variable que va a contener un objeto con dos propiedades.
   categoriasFuturas.map(category =>
    categoriaValueFutura.push({
       category: category,
       evento: eventosFuturosArray.filter(evento => evento.category === category), //Ahora tenemos las categorias que tienen adentro todos los eventos pasados
     }))
  //  console.log(categoriaValueFutura)
 
   let estimateAndCapacityFuture = [] //creamos una variable y pusheamos el objeto
   categoriaValueFutura.map(datos => {
     estimateAndCapacityFuture.push({
       category: datos.category,
       estimate: datos.evento.map(item => item.estimate),
       capacity: datos.evento.map(item => item.capacity),
       estimateRevenue: datos.evento.map(item => item.estimate * item.price)
     })
   })
  //console.log(estimateAndCapacityFuture)
 
   estimateAndCapacityFuture.forEach(category => {
     let totalEstimate = 0
     category.estimate.forEach(estimate => totalEstimate += Number(estimate)) //suma de assistencia
     category.estimate = totalEstimate
 
     let totalCapacityFut = 0
     category.capacity.forEach(capacity => totalCapacityFut += Number(capacity)) //suma de capacity
     category.capacity = totalCapacityFut
 
     let totalEstimateRevenue = 0
     category.estimateRevenue.forEach(estimateRevenue => totalEstimateRevenue += Number(estimateRevenue)) //suma de revenue
     category.estimateRevenue = totalEstimateRevenue
 
     category.porcentajeAttendace = ((totalEstimate * 100) / totalCapacityFut).toFixed(2) //le agregamos una nueva propiedad, el calculo de % assistencia total por categoria.
   })
  //console.log(estimateAndCapacityFuture)
 
//Eventos Pasados
   const categoryAssit = eventosPasadosArray.map(eventos => eventos.category) // Extrajimos las categorias del array del evento pasado
   const categorySet = new Set(categoryAssit) //Aplicamos el sett para eliminar las categorias duplicadas
   const categorias = [...categorySet] //Ahora en categorys tenemos un array de 7 categorias
   console.log(categorias)
 
   const categoryValue = [] //Creamos un Array que contiene 1 objeto con 2 propiedades
   categorias.map(category =>
     categoryValue.push({
       category: category,
       evento: eventosPasadosArray.filter(evento => evento.category === category), //Ahora tenemos las categorias que tienen adentro todos los eventos pasados
     })
   )
  //console.log(categoryValue)
 
   let assistAndCapacityPast = [] // De la varible anterior mapeamos para traer un nuevo array.
   categoryValue.map(datos => {
     assistAndCapacityPast.push({
       category: datos.category,
       assistance: datos.evento.map(item => item.assistance),
       capacity: datos.evento.map(item => item.capacity),
       revenue: datos.evento.map(item => item.assistance * item.price)
     })
   })
  // console.log(assistAndCapacityPast)
   //Sumamos todos los elementos de cada propiedad entre si.
 
   assistAndCapacityPast.forEach(category => {
     let totalAssit = 0
     category.assistance.forEach(assistance => totalAssit += Number(assistance)) 
     category.assistance = totalAssit
 
     let totalCapacity = 0
     category.capacity.forEach(capacity => totalCapacity += Number(capacity)) 
     category.capacity = totalCapacity
 
     let totalRevenue = 0
     category.revenue.forEach(revenue => totalRevenue += Number(revenue))
     category.revenue = totalRevenue
 
     category.porcentaje = ((totalAssit * 100) / totalCapacity).toFixed(2) //le agregamos una nueva propiedad, el calculo de % assistencia total por categoria.
   })
  //  console.log(assistAndCapacityPast)
  //  console.log(categoryValue)
 
   
//IMPRESION DE TABLAS
   function tableEvents() {
     let contenedorEvents = `<td scope="row">${MAX.eventos}: ${MAX.porAssistance}%</td>
                          <td>${MIN.eventos}: ${MIN.porAssistance}%</td>
                          <td>${capacity.name}: ${capacity.capacity}</td>`
     document.getElementById("tableEventStatistics").innerHTML = contenedorEvents
   }
   tableEvents()
 
   function tablaUpcomingEvents() {
     let contenedorUpcoming = 
    `<tr class="text-center">
      <td>
        Categories
      </td>
      <td>Estimated</td>
      <td>Percentage of estimated attendance</td>
    </tr>`
    estimateAndCapacityFuture.forEach(e => {
       e.estimateAndCapacityFuture
       contenedorUpcoming += 
     `<tr>
        <td>${e.category}</td>
        <td>$${e.estimateRevenue}</td>
        <td>${e.porcentajeAttendace}%</td>
      </tr>`
     })
     document.getElementById("tableUpcomingEvents").innerHTML = contenedorUpcoming
   }
   tablaUpcomingEvents()
 
   function tablaPastEvents() {
     let contenedorPast = 
    `<tr class="text-center">
      <td>
        Categories
      </td>
      <td>Revenue</td>
      <td>Percentage of attendance</td>
    </tr>`
     assistAndCapacityPast.forEach(e => {
       e.assistAndCapacityPast
       contenedorPast +=
      `<tr>
        <td>${e.category}</td>
        <td>$${e.revenue}</td>
        <td>${e.porcentaje}%</td>
      </tr>`
     })
     document.getElementById("tablePastEvents").innerHTML = contenedorPast
   }
   tablaPastEvents()
 }
 getDataFromApi()






