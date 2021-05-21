# JAPANESE ADDRESS GEOCODING

[国土交通省位置参照情報ダウンロードサービス](https://nlftp.mlit.go.jp/isj/index.html)で配布されている街区レベルのデータをベースに、Elasticsearchで検索可能にするまでの処理を自動化したものです。  
Elasticsearchのアナライザー設定等は仮です。

# セットアップ方法

```sh
$ npm install -g zx
$ docker compose build
$ docker compose up -d
$ npm install
$ npx zx setup/index.mjx
```

# 使い方

## ジオコーディング
```sh
$ curl -X GET "localhost:9200/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "query": { "match": { "address": "目黒区目黒三丁目１６" } }
}
'
```


## 逆ジオコーディング
```sh
$ curl -X GET "localhost:9200/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "query": {
    "geo_distance": {
      "distance": "100m",
      "location": {
        "lat": 35.6598003,
        "lon":  139.7023894
      }
    }
  },
  "sort": [
    {
      "_geo_distance": {
        "location": {
          "lat": 35.6598003,
          "lon":  139.7023894
        }
      }
    }
  ]
}
'
```
