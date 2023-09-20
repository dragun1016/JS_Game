import requests

def get_ticker_price(market):
    url = f"https://api.upbit.com/v1/ticker?markets={market}"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)
    data = response.json()
    return data[0]['trade_price']

btc_price = get_ticker_price("KRW-BTC")
lsk_price = get_ticker_price("KRW-LSK")
neo_price = get_ticker_price("KRW-NEO")
mtl_price = get_ticker_price("KRW-MTL")
xrp_price = get_ticker_price("KRW-XRP")
eth_price = get_ticker_price("KRW-ETH")
qtum_price = get_ticker_price("KRW-QTUM")

print(f"비트코인 현재 가격{btc_price}")
print(f"이더리움 현재 가격{eth_price}")
print(f"네오 현재 가격{neo_price}")
print(f"퀌텀 현재 가격{qtum_price}")
print(f"메탈 현재 가격{mtl_price}")
print(f"리스크 현재 가격{lsk_price}")
print(f"리플 현재 가격{xrp_price}")

# def get_tickers():
#     url = "https://api.upbit.com/v1/market/all"
#     headers = {"accept": "application/json"}
#     response = requests.get(url, headers=headers)
#     data = response.json()
#     tickers = []
#     for market in data:
#         if market['market'].startswith("KRW"):
#             tickers.append(market['market'])
#     return tickers

# def main():
#     tickers = get_tickers()
#     print(f"코인 목록")