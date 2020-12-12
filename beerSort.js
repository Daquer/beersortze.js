//Acessar https://ze.delivery/produtos/categoria/cervejas
// Abrir o Developer Tools do browser e colar o código abaixo
// Utilizar o sortBy passando o atributo pelo qual desejar fazer o sort. O padrão é o custo-benefício (costBenefit)
// Se desejar, existe a função toCSV (necessário passar o parâmetro beers) para gerar uma string que pode ser inserida diretamente em um arquivo csv em modo texto

var beers = [];
Array.from(document.getElementsByClassName("css-1q4ix2j-productDetails")).forEach(function(item) {
   let title = item.firstElementChild.innerText;
   let price = parseFloat(item.lastElementChild.lastElementChild.innerText.replace("R$", "").replace(",","."));
   let ml = title.match(/\d+L/) ? parseInt(title.match(/\d+/)[0]) * 1000 : parseInt(title.match(/\d+/)[0]);

   beers.push({
        cerveja: title,
        onlyLiquid: title.indexOf("Líquido") != -1,
        ml: ml,
        price: price,
        costBenefit: price/ml
    });
});

function sortBy(attr) {
	attr = attr ? attr : "costBenefit";
	return beers.sort(function(a,b){return  a[attr] - b[attr];})
}

function toCSV(array) {
	var props = [];
	
	for(var prop in array) {
		props.push(prop);
	}
	
	var beers = JSON.parse(JSON.stringify(array));
	return props.join(";") + "\n" + beers.map(function(beer) {
		beer.price = beer.price.toString().replace(".", ",");
		return Object.values(beer).join(";");
	}).join("\n");
}


//executando o sortBy para já trazer um resultado de cara
sortBy();
