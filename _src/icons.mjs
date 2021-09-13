import fs from "fs/promises";
import yaml from "yaml";
import fetch from "node-fetch";

const toDataURL = async (url) => {
  const res = await fetch(url);
  const buffer = await res.buffer();
  const type = res.headers.get("content-type");
  return `data:${type};base64,${buffer.toString("base64")}`;
};

const file = await fs.readFile("_data/icons.yml");
const icons = yaml.parse(file.toString("utf8"));
const ids = icons.map((icon) => icon.id);
const res = await fetch(`https://itunes.apple.com/lookup?id=${ids.join()}`);
const { results } = await res.json();
const urls = results.map(({ artworkUrl512 }) => artworkUrl512);
const dataUris = await urls.map(toDataURL);
Promise.all(dataUris).then(async (uris) => {
  const newIcons = icons.map(({ name, url, id }, i) => ({
    name,
    icon: uris[i],
    url,
    id,
  }));
  const newYaml = yaml.stringify(newIcons);
  await fs.writeFile("./_data/newIcons.yml", newYaml);
});
