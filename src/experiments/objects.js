const objects = {
  test: {
    lol: 'nice'
  },
  wallet: {
    cash: 5
  }
}

function objectCheck() {
  for (let key in objects) {
    console.log(key);
  }
}

objectCheck();

function arrayFrom() {
  return Array.from(objects);
}

console.log(arrayFrom());
