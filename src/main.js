var VehicleType = "";
var url = "";
var vehicleValue = 0;
var fipePrice = 0;
var percentualValue = 0;
var brandCars = "https://parallelum.com.br/fipe/api/v2/cars/brands";
var brandTrucks = "https://parallelum.com.br/fipe/api/v2/trucks/brands";
var brandMotocycles = "https://parallelum.com.br/fipe/api/v2/motorcycles/brands";
var codeFipe = "";
let resultOfFipesCount = "";
let referenceMonth = "";
let resultOfFipe = ""; 

//Essa função solicita os dados pra o servidor
function getType() {
    fetch(url)
        .then(response => response.json())
        .then(data => JSON.stringify(data))
        .catch(erro => console.error(error))
}
//essa função habilita as opções de modelo dos carros
function selectBrand() {
    if (url === brandCars) {
        fetch("https://parallelum.com.br/fipe/api/v2/cars/brands")
        .then(response => response.json())
        .then(data => {
            var selectBrand = document.querySelector('#brand');
            var options = data.map( brand => `<option value="${brand.code}">${brand.name}</option>`);
            selectBrand.innerHTML = options.join("");
        });
    }
    else if (url === brandMotocycles) {
        fetch("https://parallelum.com.br/fipe/api/v2/motorcycles/brands")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var selectBrand = document.querySelector('#brand');
            var options = data.map(brand =>  `<option value="${brand.code}">${brand.name}</option>`);
            selectBrand.innerHTML = options.join("");
        });
    }
    else if (url === brandTrucks) {
        fetch("https://parallelum.com.br/fipe/api/v2/trucks/brands")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var selectBrand = document.querySelector('#brand');
            var options = data.map(brand => `<option value="${brand.code}">${brand.name}</option>`);
            selectBrand.innerHTML = options.join("");
        });
    }
    else {
        console.error("Marca Não encontrada");
    }
    return;
}
//pega o modelo pela marca
function getModelsbyBrand() {
    fetch(`${url}/${brand.value}/models`)
    .then(response => response.json())
    .then(data => JSON.stringify(data))
    .catch(error => console.error(error))   
}
//seleciona o modelo para os options
function selectModel() {
    fetch(`${url}/${brand.value}/models`)
        .then(response => response.json())
        .then(data => {
            const selectModel = document.querySelector('#models');
            const option = data.map(models => `<option value="${models.code}">${models.name}</option>`);
            selectModel.innerHTML = option.join("")
    });
}
//pega os anos pelo modelo
function getYearByModel() {
    fetch("".concat(url, "/").concat(brand.value, "/models/").concat(models.value, "/years"))
        .then(function (response) { return response.json(); })
        .then(function (data) { return JSON.stringify(data); })["catch"](function (error) { return console.error(error); });
}
//seleciona o ano e coloca para o option
function selectYear() {
    fetch("".concat(url, "/").concat(brand.value, "/models/").concat(models.value, "/years"))
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var selectModel = document.querySelector('#years');
        var optionYears = data.map(years => `<option value="${years.code}">${years.name}</option>`);
        selectModel.innerHTML = optionYears.join("");
    })}

//busca o preço
function getVheicleHistory() {
    fetch("".concat(url, "/").concat(brand.value, "/models/").concat(models.value, "/years/").concat(years.value))
        .then(function (response) { return response.json(); })
        .then(function (data) { return JSON.stringify(data); })["catch"](function (error) { return console.error(error); });
}
//pega o Preço
function setFipePrice() {
    fetch("".concat(url, "/").concat(brand.value, "/models/").concat(models.value, "/years/").concat(years.value))
        .then(function (response) { return response.json(); })
        .then(function (data) {
        fipePrice = data.price;
        codeFipe = data.codeFipe;
        referenceMonth = data.referenceMonth;
        
       
        // Remove o "R$"
        fipePrice = fipePrice.replace("R$ ", "");
        // Remove as vírgulas e transforma em número
        fipePrice = parseFloat(fipePrice.replace(",", ""));
    });
}
//logica de para calcular a porcentagem do valor ta tabela fipe
function attValue() {
    vehicleValue = parseFloat((document.querySelector("#vehicle-value")).value);
    percentualValue = (vehicleValue - fipePrice) / fipePrice * 100;
    console.log(`Valor do veiculo: ${vehicleValue} valor na tabela fipe: ${fipePrice} valor em percentual:${percentualValue}`);
    
    if (percentualValue >= 10.00) {
        resultOfFipe = "acima"
        render();
        
    }
    else if (percentualValue <= -10.00) {
        resultOfFipe = "abaixo"
        render();
        
    }
    else if (percentualValue <= 9.99 || percentualValue >= -9.99) {
        resultOfFipe = "na média";
        render();
        
    }
}
function render() {
    var apiResult = document.querySelector("#renderApiResult");
    return apiResult.innerHTML = 
    `<div class="row">
    <div class="col d-flex">
      <ul>
        <li>Marca: </li>
        <li>Modelo: </li>
        <li>Ano do Modelo: </li>
        <li>Código Fipe: </li>
        <li>Mês referencia: </li>
      </ul>
      <ul>
        <li>${brand.name}</li>
        <li>${models.name}</li>
        <li>${years.value}</li>
        <li>${codeFipe}</li>
        <li>${referenceMonth}</li>
      </ul>

    </div >
    <div class="col d-flex">
      <ul>
        <li>Valor do Veículo: </li>
        <li>Valor pela Fipe: </li>
      </ul>
      <ul>
        <li>R$ ${vehicleValue}</li>
        <li>R$ ${fipePrice}</li>
      </ul>

    </div>
    <div class="row mt-5 d-flex justify-content">
      <p>Valor ${resultOfFipe} da tabela FIPE</p>
      <h1>${percentualValue}%</h1>
    </div>
  </div>
  <div class="d-flex justify-content-center" id="footer">
    <h3>Valor ${resultOfFipe} do mercado</h3>
  </div>
</div>`
}
//essas função atualiza o valor do option e atualiza a url, além de executar as outras funções.
async function searchType(){

    VehicleType = document.getElementById("vehicleType").value;
    url=`https://parallelum.com.br/fipe/api/v2/${VehicleType}/brands`
    
    await getType();
    await selectBrand()
}
async function searchModel() {

    await getModelsbyBrand()
    await selectModel()
}
async function searchYear(){
    await getYearByModel()
    await selectYear()
  
}
async function searchResults(){
    await getVheicleHistory()
    await setFipePrice()

}


async function getFipe() {
    
    await attValue()
}