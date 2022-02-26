// Key  : dac8cd8abf90c2565292a581ea165b9b

let villeChoisie;
function searchPosition() {

}

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      const url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&appid=dac8cd8abf90c2565292a581ea165b9b&units=metric";

      let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
      requete.open("GET", url); // Nous récupérons juste des données
      requete.responseType = "json"; // Nous attendons du JSON
      requete.send(); // Nous envoyons notre requête

      // Dès qu'on reçoit une réponse, cette fonction est executée
      requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
          if (requete.status === 200) {
            let reponse = requete.response;
            // console.log(reponse);
            let temperature = reponse.main.temp;
            let ville = reponse.name;
            let feels = reponse.main.feels_like;
            let humidity = reponse.main.humidity;
            let windSpeed = reponse.wind.speed;
            // console.log(temperature);
            document.querySelector("#temperature-label").textContent =
              temperature;
            document.querySelector("#ville").textContent = ville;
            document.querySelector("#humi").textContent = humidity;
            document.querySelector("#wind").textContent = windSpeed;
            document.querySelector("#feels").textContent = feels;
          } else {
            alert("Un problème est intervenu, merci de revenir plus tard.");
          }
        }
      };
    },
    erreur,
    options
  );

  var options = {
    enableHighAccuracy: true,
  };
} else {
  villeChoisie = "saint-saulve";
  recevoirTemperature(villeChoisie);
}

let changerDeVille = document.querySelector("#changer");
changerDeVille.addEventListener("click", () => {
  villeChoisie = prompt("Quelle ville souhaitez-vous voir ?");
  recevoirTemperature(villeChoisie);
});

function erreur() {
  villeChoisie = "Douala";
  recevoirTemperature(villeChoisie);
}

function recevoirTemperature(ville) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    ville +
    "&appid=dac8cd8abf90c2565292a581ea165b9b&units=metric";

  let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
  requete.open("GET", url); // Nous récupérons juste des données
  requete.responseType = "json"; // Nous attendons du JSON
  requete.send(); // Nous envoyons notre requête

  // Dès qu'on reçoit une réponse, cette fonction est executée
  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;
        // console.log(reponse);
        let temperature = reponse.main.temp;
        let ville = reponse.name;
        let feels = reponse.main.feels_like;
        let humidity = reponse.main.humidity;
        let windSpeed = reponse.wind.speed;
        // console.log(temperature);
        document.querySelector("#temperature-label").textContent = temperature;
        document.querySelector("#ville").textContent = ville;
        document.querySelector("#humi").textContent = humidity;
        document.querySelector("#wind").textContent = windSpeed;
        document.querySelector("#feels").textContent = feels;
      } else {
        if(confirm("La ville que vous avez saisi n'as pas étés retrouver veiller resaisir à nouveau")===true){
          villeChoisie = prompt("Quelle ville souhaitez-vous voir ?");
          recevoirTemperature(villeChoisie);
        }

      }
    }
  };
}
