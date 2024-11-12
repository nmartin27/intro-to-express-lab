const express = require('express');
const app = express();

app.get('/greetings', (req, res) => {
    const name = req.query.name
res.send(`Hello there, ${name}!`)
});

// did not understand
app.get('/roll/:rollId', (req, res) => {
res.send(`You rolled ${req.params}`)
});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index); //asked chat for help
      if (index >= 0 && index < collectibles.length) {
        const item = collectibles[index];
            res.send(`So, you want this ${item.name}? For ${item.price}, it can be yours!`);
      } else {
        res.send('This is not in stock. Check back soon!');
      }
});


const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes/:index', (req, res) => {
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const type = Number(req.query.type);

        const filteredShoes = shoes.filter(shoe => {
            return (
                (isNaN(minPrice) || shoe.price >= minPrice) &&
                (isNaN(maxPrice) || shoe.price >= maxPrice) &&
                (!type || shoe.type === type)
            );
        });

        if (filteredShoes.length > 0) {
          res.send(filteredShoes);

    } else {
        res.send('Pick another category')
    }
});


app.listen(3000, () => {
    console.log('Listening');
    
});