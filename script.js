//using function to create dom elements

function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}
///creating a base(container,heading,row)

let container = element("div", "container", "", "");
const h1 = element("h1", "text-center", "title", "Countries Weather Details");
const row = element("div", "row", "", "");

//fetch part =>(restcountries)
const response = fetch("https://restcountries.com/v3.1/all");
response
  .then((data) => data.json())
  .then((result) => {
    // console.log(result)
    //allocating country details to the card
    for (var i = 0; i <= result.length - 1; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
  <div class="card h-100">
  <div class="card-header">
  <h5 class="card-title text-center">${result[i].name.common} </h5>
  </div>
 <div class=img-box">
 <img src="${result[i].flags.png}" class="card-img-top" alt="country image"/>
 </div>
<div class="card-body">
<div class="card-text text-center">Region:${result[i].region}</div>
<div class="card-text text-center">Capital:${result[i].capital}</div>
<div class="card-text text-center">Country code:${result[i].cca3}</div>
<button class="btn btn-primary">Click for Weather</button>
</div>
</div>
`;
      row.append(col);
    }
    //button logic for appending weather details from weather api
    let buttons = document.querySelectorAll("button"); //select all button from the api
    // console.log(buttons);
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        //lating splitting for weather api
        let latlng = result[index].latlng;
        // console.log(lating);
        let lat = latlng[0];
        let lon = latlng[1];
        //  console.log(lat);
        //  console.log(lon);

        // weather api gettimg and updating the lat ,lon,api key to the api
        let weatherApi = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f97abe56bb028a8c698aa859be74bd95`
        );
        weatherApi
          .then((data1) => data1.json())
          .then((res) => {
            // console.log(res);
            alert(
              `weather of ${result[index].name.common}is ${Math.floor(
                res.main.temp
              )}🌡️C`
            );
          });
      });
    });
  });
//appending part
container.append(row);
document.body.append(h1, container);
