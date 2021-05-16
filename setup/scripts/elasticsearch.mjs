#!/usr/bin/env zx

import { Client } from "@elastic/elasticsearch";
import csv from "csv-parse";
import glob from "glob";
import { createReadStream } from "fs";

const INDEX_NAME = "address";

const client = new Client({
  node: "http://localhost:9200",
});

await client.indices.create({
  index: INDEX_NAME,
  body: {
    settings: {
      analysis: {
        char_filter: {
          normalize: {
            type: "icu_normalizer",
            name: "nfkc",
            mode: "compose",
          },
        },
        tokenizer: {
          kuromoji_normal: {
            mode: "normal",
            type: "kuromoji_tokenizer",
          },
        },
        filter: {
          readingform: {
            type: "kuromoji_readingform",
          },
          edge_ngram: {
            type: "edge_ngram",
            min_gram: 2,
            max_gram: 10,
          },
          synonym: {
            type: "synonym",
            lenient: true,
            synonyms: ["nippon, nihon"],
          },
        },
        analyzer: {
          index_analyzer: {
            type: "custom",
            char_filter: ["normalize"],
            tokenizer: "kuromoji_normal",
            filter: ["lowercase", "edge_ngram"],
          },
          search_analyzer: {
            type: "custom",
            char_filter: ["normalize"],
            tokenizer: "kuromoji_normal",
            filter: ["lowercase"],
          },
        },
      },
    },
    mappings: {
      properties: {
        address: {
          type: "text",
          search_analyzer: "search_analyzer",
          analyzer: "index_analyzer",
        },
        address_level_1: {
          type: "text",
          search_analyzer: "search_analyzer",
          analyzer: "index_analyzer",
        },
        address_level_2: {
          type: "text",
          search_analyzer: "search_analyzer",
          analyzer: "index_analyzer",
        },
        address_level_3: {
          type: "text",
          search_analyzer: "search_analyzer",
          analyzer: "index_analyzer",
        },
        address_level_4: {
          type: "text",
          search_analyzer: "search_analyzer",
          analyzer: "index_analyzer",
        },
        address_level_5: {
          type: "text",
          boost: 0.1,
          search_analyzer: "search_analyzer",
          analyzer: "index_analyzer",
        },
        location: { type: "geo_point" },
      },
    },
  },
});

const ADDRESS_LEVEL_1_KEY = "都道府県名";
const ADDRESS_LEVEL_2_KEY = "市区町村名";
const ADDRESS_LEVEL_3_KEY = "大字・丁目名";
const ADDRESS_LEVEL_4_KEY = "小字・通称名";
const ADDRESS_LEVEL_5_KEY = "街区符号・地番";
const LATITUDE_KEY = "緯度";
const LONGITUDE_KEY = "経度";

// debug
// const NDJSON_FILENAME = `${__dirname}/address.ndjson`;
// const dataStream = createWriteStream(NDJSON_FILENAME, "utf8");

const csvList = await new Promise((resolve, reject) =>
  glob(`${__dirname}/csv/*.csv`, (err, matches) => {
    if (err) {
      return reject(err);
    }
    resolve(matches);
  })
);

async function* dataStream() {
  for (const csvFileName of csvList) {
    const istream = createReadStream(csvFileName, "utf8");
    const parser = istream.pipe(
      csv({
        columns: true,
      })
    );
    console.log(csvFileName);
    for await (const record of parser) {
      const address_level_1 = record[ADDRESS_LEVEL_1_KEY];
      const address_level_2 = record[ADDRESS_LEVEL_2_KEY];
      const address_level_3 = record[ADDRESS_LEVEL_3_KEY];
      const address_level_4 = record[ADDRESS_LEVEL_4_KEY];
      const address_level_5 = record[ADDRESS_LEVEL_5_KEY];
      const json = {
        address: `${address_level_1}${address_level_2}${address_level_3}${address_level_4}${address_level_5}`,
        address_level_1,
        address_level_2,
        address_level_3,
        address_level_4,
        address_level_5,
        location: {
          lat: Number(record[LATITUDE_KEY]),
          lon: Number(record[LONGITUDE_KEY]),
        },
      };
      // dataStream.write(`${JSON.stringify(json)}\n`);
      yield JSON.stringify(json);
    }
  }
}

client.helpers.bulk({
  datasource: dataStream(),
  onDocument: (doc) => {
    return {
      index: { _index: INDEX_NAME },
    };
  },
});
