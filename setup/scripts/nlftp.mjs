#!/usr/bin/env zx

import { writeFile } from "fs";

const DOWNLOAD_FILES = {
  hokkaido: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/01000-18.0a.zip",
    aomori: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/02000-18.0a.zip",
    iwate: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/03000-18.0a.zip",
    miyagi: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/04000-18.0a.zip",
    akita: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/05000-18.0a.zip",
    yamagata: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/06000-18.0a.zip",
    hukusima: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/07000-18.0a.zip",
    ibaraki: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/08000-18.0a.zip",
    tochigi: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/09000-18.0a.zip",
    gunnma: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/10000-18.0a.zip",
    saitama: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/11000-18.0a.zip",
    chiba: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/12000-18.0a.zip",
    tokyo: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/13000-18.0a.zip",
    kanagawa: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/14000-18.0a.zip",
    niigata: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/15000-18.0a.zip",
    toyama: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/16000-18.0a.zip",
    ishikawa: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/17000-18.0a.zip",
    hukui: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/18000-18.0a.zip",
    yamanasi: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/19000-18.0a.zip",
    nagano: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/20000-18.0a.zip",
    gifu: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/21000-18.0a.zip",
    sizuoka: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/22000-18.0a.zip",
    aichi: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/23000-18.0a.zip",
    mie: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/24000-18.0a.zip",
    shiga: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/25000-18.0a.zip",
    kyoto: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/26000-18.0a.zip",
    osaka: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/27000-18.0a.zip",
    hyogo: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/28000-18.0a.zip",
    nara: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/29000-18.0a.zip",
    wakayama: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/30000-18.0a.zip",
    tottori: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/31000-18.0a.zip",
    shimane: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/32000-18.0a.zip",
    okayama: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/33000-18.0a.zip",
    hiroshima: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/34000-18.0a.zip",
    yamaguchi: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/35000-18.0a.zip",
    tokushima: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/36000-18.0a.zip",
    kagawa: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/37000-18.0a.zip",
    ehime: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/38000-18.0a.zip",
    kochi: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/39000-18.0a.zip",
    hukuoka: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/40000-18.0a.zip",
    saga: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/41000-18.0a.zip",
    nagasaki: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/42000-18.0a.zip",
    kumamoto: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/43000-18.0a.zip",
    oita: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/44000-18.0a.zip",
    miyazaki: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/44000-18.0a.zip",
    kagoshima: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/45000-18.0a.zip",
    okinawa: "https://nlftp.mlit.go.jp/isj/dls/data/18.0a/46000-18.0a.zip",
};

const ARCHIVE_DIRECTORY = `${__dirname}/zip`;
const CSV_DIRECTORY = `${__dirname}/csv`;

await $`mkdir -p ${ARCHIVE_DIRECTORY} ${CSV_DIRECTORY}`;

const result = await Promise.all(
  Object.entries(DOWNLOAD_FILES).map(([pref, url]) => {
    const zipFileName = `${ARCHIVE_DIRECTORY}/${pref}.zip`;
    const unzippedDirectory = `${ARCHIVE_DIRECTORY}/${pref}`;
    const csvFileName = `${CSV_DIRECTORY}/${pref}.csv`;

    return fetch(url)
      .then((zip) => zip.arrayBuffer())
      .then(
        (buf) =>
          new Promise((resolve, reject) => {
            return writeFile(zipFileName, Buffer.from(buf), (err, data) => {
              if (err) {
                return reject(err);
              }
              return resolve(data);
            });
          })
      )
      .then(() => $`unzip -d ${unzippedDirectory} ${zipFileName}`)
      .then(
        () =>
          $`find ${unzippedDirectory} -type f -name "*.csv" | xargs iconv -f CP932 -t UTF-8 -c > ${csvFileName}`
      );
  })
).catch(console.error)
