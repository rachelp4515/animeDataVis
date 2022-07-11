function filterByDemo(data, demo) {
  const arr = data.filter((d) => d.demographic === demo);
  return arr.slice(0, 50);
}

function ratedBy(data) {
  // make object that has name: views
  let obj = data.map((show) => {
    let views = {
      name: show.name,
      views: numFix(show.rated_by),
    };
    return views;
  });
  return obj;
}

function split_num(num) {
  return [
    parseFloat(num.slice(0, num.length - 1)),
    num.slice(num.length - 1, num.length),
  ];
}
function numFix(num) {
  const [value, letter] = split_num(num);
  const lookup = {
    M: 1e6,
    K: 1000,
  };
  return value * lookup[letter];
}

function themeList(data) {
  let themes = [];
  const hist = {};
  //  for every theme in the anime list, for every word in the theme, add word to array
  for (let i = 0; i < data.length; i++) {
    // for every object in data
    const entry = data[i];
    const words = entry.theme
      .replace(/[^a-zA-Z ,]/g, "")
      .split(",")
      .map((word) => word.trim()); // split the theme string on the splace
    themes = [...themes, ...words]; // append new list to themes array?
  }
  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i];
    if (hist[theme]) {
      hist[theme] += 1;
    } else {
      hist[theme] = 1;
    }
  }
  return hist;
}

function createOther(data, percent = 0.05) {
  const keys = Object.keys(data);
  keys.sort((a, b) => data[a] - data[b]);
  let total = 0;
  keys.forEach((key) => (total += data[key]));

  let counter = data[keys[0]];
  let index = 0;
  const otherData = { ...data, other: 0 };
  while (counter / total < percent) {
    const key = keys[index];
    otherData.other += data[key];
    delete otherData[key];
    index += 1;
    counter += data[keys[index]];
  }
  return otherData;
}

function getAvg(data) {
  const avg =
    data.reduce((acc, anime) => {
      return acc + parseInt(anime.rating);
    }, 0) / data.length;
  console.log(avg);
}
// shounen 7.8, seinen 7.3, shoujo 7.3, kids 6.3
