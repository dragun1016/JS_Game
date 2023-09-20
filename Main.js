let btcPrice, ethPrice, neoPrice, qtumPrice, mtlPrice, lskPrice, xrpPrice;

let money = 100000000;
let initialMoney = money;

let btcCoin = 0;

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

    document.getElementById("btcPrice").textContent = `비트코인 현재 가격: ${btcPrice}`;
    document.getElementById("ethPrice").textContent = `이더리움 현재 가격: ${ethPrice}`;
    document.getElementById("neoPrice").textContent = `네오 현재 가격: ${neoPrice}`;
    document.getElementById("qtumPrice").textContent = `퀌텀 현재 가격: ${qtumPrice}`;
    document.getElementById("mtlPrice").textContent = `메탈 현재 가격: ${mtlPrice}`;
    document.getElementById("lskPrice").textContent = `리스크 현재 가격: ${lskPrice}`;
    document.getElementById("xrpPrice").textContent = `리플 현재 가격: ${xrpPrice}`;
}

function buyCoin_btc() {
    if (money >= btcPrice) {
        let coinType = btcPrice;
        console.log(coinType);
        money -= coinType;
        console.log(money);
        btcCoin++;
        document.getElementById("coinCount").innerHTML = `비트코인 갯수 : ${btcCoin}`;
        document.getElementById("money").textContent = `보유 금액: ${money} KRW`;
    } 
    else {
        console.log("보유한 돈이 부족합니다.");
        console.log("게임이 초기화 됨니다.");
        money = initialMoney;
        btcCoin = 0;
        document.getElementById("coinCount").innerHTML = `비트코인 갯수 : ${btcCoin}`;
        document.getElementById("money").textContent = `보유 금액: ${money} KRW`;
    }
}

fetchAndPrintPrices();

setInterval(fetchAndPrintPrices, 1000);