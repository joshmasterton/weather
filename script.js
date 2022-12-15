const display = (() => {
  const topCon = document.getElementById("top");
  const mainCon = document.getElementById("main");

  const top = () => {
    const topLocation = document.createElement("div");
    topLocation.id = "topLoc";
    topLocation.className = "top";
    topCon.appendChild(topLocation);

    const topTemp = document.createElement("div");
    topTemp.id = "topTemp";
    topTemp.className = "top";
    topCon.appendChild(topTemp);

    return {topLocation, topTemp};
  };

  const main = () => {
    const getLoc = document.getElementById("topLoc");
    const getTemp = document.getElementById("topTemp");

    const searchLocation = document.createElement("input");
    searchLocation.className = "main";
    searchLocation.placeholder = "Search Location";
    mainCon.appendChild(searchLocation);

    const searchBtn = document.createElement("button");
    searchBtn.className = "main";
    searchBtn.id = "mainBtn";
    searchBtn.innerHTML = "Search";
    searchBtn.addEventListener("click", (e) => {
      weather.getWeather(e, searchLocation.value, getLoc, getTemp);
      searchLocation.value = "";
    });
    mainCon.appendChild(searchBtn);
  };

  return {top, main};
})();

const weather = (() => {
  display.top();
  display.main();

  const getWeather = async (e, inputValue, getLoc, getTemp) => {
    e.preventDefault();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=c0437be30b0e2d63d235aab2b8c3027c`, {mode: `cors`});
    if(response.status === 200){
      const data = await response.json();
      getLoc.innerHTML = data.name;
      getTemp.innerHTML = `${Math.round(parseInt(data.main.temp) - 273.15)}°C`;  
    }else{
      alert("Unknown Location, Please Try Again");
    };
  };

  return {getWeather};
})();
