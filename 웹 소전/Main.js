let btcPrice, ethPrice, neoPrice, qtumPrice, mtlPrice, lskPrice, xrpPrice;

let gamelink = "dino.html"
let link = "Finish.html"
let money = 1000000000;
let initialMoney = money;

let btcCoinC = 0;
let xrpCoinC = 0;
let lskCoinC = 0;
let mtlCoinC = 0;
let qtumCoinC = 0;
let neoCoinC = 0;
let ethCoinC = 0;

async function getTickerPrice(market) {
    const url = `https://api.upbit.com/v1/ticker?markets=${market}`;
    const headers = { "accept": "application/json" };

    try {
        const response = await fetch(url, {headers});
        const data = await response.json();
        return data[0].trade_price;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

async function fetchAndPrintPrices() {
    btcPrice = await getTickerPrice("KRW-BTC");
    ethPrice = await getTickerPrice("KRW-ETH");
    neoPrice = await getTickerPrice("KRW-NEO");
    qtumPrice = await getTickerPrice("KRW-QTUM");
    mtlPrice = await getTickerPrice("KRW-MTL");
    lskPrice = await getTickerPrice("KRW-LSK");
    xrpPrice = await getTickerPrice("KRW-XRP");
}

fetchAndPrintPrices();

setInterval(fetchAndPrintPrices, 1000);

setInterval(function() {
    document.getElementById("nowMoney").innerHTML = `현재 소지금 : ${money}`;

    document.getElementById("nowXrp").innerHTML = `현재 가격 : ${xrpPrice}`;
    document.getElementById("xrpCoin").innerHTML = `현재 보유량 : ${xrpCoinC}`;

    document.getElementById("nowLsk").innerHTML = `현재 가격 : ${lskPrice}`;
    document.getElementById("lskCoin").innerHTML = `현재 보유량 : ${lskCoinC}`;

    document.getElementById("nowMtl").innerHTML = `현재 가격 : ${mtlPrice}`;
    document.getElementById("mtlCoin").innerHTML = `현재 보유량 : ${mtlCoinC}`;

    document.getElementById("nowQtum").innerHTML = `현재 가격 : ${qtumPrice}`;
    document.getElementById("qtumCoin").innerHTML = `현재 보유량 : ${qtumCoinC}`;

    document.getElementById("nowNeo").innerHTML = `현재 가격 : ${neoPrice}`;
    document.getElementById("neoCoin").innerHTML = `현재 보유량 : ${neoCoinC}`;

    document.getElementById("nowEth").innerHTML = `현재 가격 : ${ethPrice}`;
    document.getElementById("ethCoin").innerHTML = `현재 보유량 : ${ethCoinC}`;

    document.getElementById("nowBtc").innerHTML = `현재 가격 : ${btcPrice}`;
    document.getElementById("btcCoin").innerHTML = `현재 보유량 : ${btcCoinC}`;
}, 1);

function buyButtonB() {
    if(money >= xrpPrice) {
        money -= xrpPrice;
        xrpCoinC++;
    }
    else {
        console.log
        money = initialMoney;
        xrpCoinC = 0;
        location.href = link;
    }
}
function sellButtonB() {
    if(xrpCoinC > 0) {
        money += xrpPrice;
        xrpCoinC--;
    }
}
//...
function buyButtonG() {
    if(money >= lskPrice) {
        money -= lskPrice;
        lskCoinC++;
    }
    else {
        console.log
        money = initialMoney;
        lskCoinC = 0;
        location.href = link;
    }
}
function sellButtonG() {
    if(lskCoinC > 0) {
        money += lskPrice;
        lskCoinC--;
    }
}
//...
function buyButtonN() {
    if(money >= mtlPrice) {
        money -= mtlPrice;
        mtlCoinC++;
    }
    else {
        console.log
        money = initialMoney;
        mtlCoinC = 0;
        location.href = link;
    }
}
function sellButtonN() {
    if(mtlCoinC > 0) {
        money += mtlPrice;
        mtlCoinC--;
    }
}
//...
function buyButtonC() {
    if(money >= qtumPrice) {
        money -= qtumPrice;
        qtumCoinC++;
    }
    else {
        console.log
        money = initialMoney;
        qtumCoinC = 0;
        location.href = link;
    }
}
function sellButtonC() {
    if(qtumCoinC > 0) {
        money += qtumPrice;
        qtumCoinC--;
    }
}
//...
function buyButtonV() {
    if(money >= neoPrice) {
        money -= neoPrice;
        neoCoinC++;
    }
    else {
        console.log
        money = initialMoney;
        neoCoinC = 0;
        location.href = link;
    }
}
function sellButtonV() {
    if(neoCoinC > 0) {
        money += neoPrice;
        neoCoinC--;
    }
}
//...
function buyButtonF() {
    if(money >= ethPrice) {
        money -= ethPrice;
        ethCoinC++;
    }
    else {
        console.log
        money = initialMoney;
        ethCoinC = 0;
        location.href = link;
    }
}
function sellButtonF() {
    if(ethCoinC > 0) {
        money += ethPrice;
        ethCoinC--;
    }
}
//...
function buyButtonM() {
    if(money >= btcPrice) {
        money -= btcPrice;
        btcCoinC++;
    }
    else {
        console.log
        money = initialMoney;
        btcCoinC = 0;
        location.href = link;
    }
}
function sellButtonM() {
    if(btcCoinC > 0) {
        money += btcPrice;
        btcCoinC--;
    }
}

//..............

function gameStart() {
    localStorage.setItem("moneys", money);
    location.href = gamelink;
}

if(localStorage.getItem('sToM')){
    let a = localStorage.getItem('sToM');
    money = parseInt(a);
   }


function reset() {
    money = 1000000000
}