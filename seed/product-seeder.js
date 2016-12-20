var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var products = [
    new Product({
        imagePath: 'http://blog.williams-sonoma.com/wp-content/uploads/2014/05/IcedAmericano-0261.jpg',
        title: 'Iced Americano',
        category: 'cold',
        description: 'An Iced Americano (shortened from Italian: caffè americano or American Spanish: café americano) is a style of coffee prepared by brewing espresso with added hot water, giving it a similar strength to, but different flavor from drip coffee. This drink is served over ice.',
        options: [
        { size : 'small', price : 2.75},
        { size : 'medium', price : 3.25},
        { size : 'large', price : 4.00}
        ]
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Hokitika_Cheese_and_Deli%2C_Hokitika_%283526706594%29.jpg/500px-Hokitika_Cheese_and_Deli%2C_Hokitika_%283526706594%29.jpg',
        title: 'Americano',
        category: 'hot',
        description: 'An Americano (shortened from Italian: caffè americano or American Spanish: café americano) is a style of coffee prepared by brewing espresso with added hot water, giving it a similar strength to, but different flavor from drip coffee.',
        options: [
        { size : 'small', price : 2.75},
        { size : 'medium', price : 3.25},
        { size : 'large', price : 4.00}
        ]
    }),

    new Product({
        imagePath: 'http://static.businessinsider.com/image/4fca66716bb3f7d03f00000a/image.jpg',
        title: 'London Fog',
        category: 'hot',
        description: 'London Fog (also known as Vanilla Tea Misto or an Earl Grey Tea Latte, and in Scotland it is known as a Vancouver Fog) is steamed soy milk with a sugar free vanilla syrup in Earl Grey tea.',
        options: [
        { size: 'small', price : 2.75},
        { size : 'medium', price : 3.25},
        { size : 'large', price : 4.00}
        ]
    }),

    new Product({
        imagePath: 'http://static.businessinsider.com/image/4fca66716bb3f7d03f00000a/image.jpg',
        title: 'London Fog',
        category: 'hot',
        description: 'London Fog (also known as Vanilla Tea Misto or an Earl Grey Tea Latte, and in Scotland it is known as a Vancouver Fog) is steamed soy milk with a sugar free vanilla syrup in Earl Grey tea.',
        options: [
        { size : 'small', price : 2.75},
        { size : 'medium', price : 3.25},
        { size : 'large', price : 4.00}
        ]
    }),

    new Product({
        imagePath: 'http://theendinmind.net/wp-content/uploads/2009/11/popcorn-bowl.jpg',
        title: 'Popcorn',
        category: 'food',
        description: 'Popcorn is a type of corn that expands from the kernel and puffs up when heated. Popcorn is able to pop like amaranth grain, sorghum, quinoa, and millet. When heated, pressure builds within the kernel, and a small explosion (or "pop") is the end result. Some strains of corn are now cultivated specifically as popping corns.',
        options: [
        { size : 'small', price : 2.25},
        { size : 'regular', price : 3.50}
        ]

    }),

    new Product({
        imagePath: 'https://i1.wp.com/www.americanlicorice.com/wp-content/gallery/sour-punch-packagin/8033.jpg',
        title: 'Sour Punch Straws',
        category: 'food',
        description: 'Sour Punch Candy lives up to its name with a sour fruity taste that will get your head spinning with delight. This sour candy packs a real punch with a sour twist! A fun assortment of colors and flavors makes this a great treat for those with a short attention span. Wait, what was I talking about again?',
        options: [
        { size : 'small', price : 2.00},
        ]
    }),
    new Product({
        imagePath: 'http://static.wixstatic.com/media/1bc1c0_258280831bee4a0f9e92055e73c46f60.jpg',
        title: 'Caffè Mocha',
        category: 'hot',
        description: 'Caffè Mocha is based on espresso and hot milk, but with added chocolate.',
        options: [
        { size : 'small', price : 2.50},
        { size : 'medium', price : 2.75},
        { size : 'large', price : 3.00}
        ]
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/1280px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg',
        title: 'Iced Cold Brew Coffee',
        category: 'cold',
        description: 'We brew the coffee cold, yielding different flavor, but not requiring cooling then pour it over ice.  Iced coffee is generally brewed at a higher strength than normal coffee, due to the dilution caused by the ice.',
        options: [
        { size : 'small', price : 2.75},
        { size : 'medium', price : 3.25},
        { size : 'large', price : 4.00}]
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Australian_iced_coffee.jpg/1024px-Australian_iced_coffee.jpg',
        title: 'Australian Coffee',
        category: 'cold',
        description: 'In Australia, iced coffee is occasionally served with ice cream and whipped cream. This drink also includes syrup, cream, cocoa powder or coffee beans. The result is something like an unblended milkshake. Try it for yourself!',
        options: [
        { size : 'small', price : 3.00},
        { size : 'medium', price : 3.75},
        { size : 'large', price : 4.50}]
    }),

    new Product({
        imagePath: 'http://dailywaffle.com/wp-content/uploads/2012/07/cinnamon-roll-front.jpg',
        title: 'Cinnamon Roll',
        category: 'food',
        description: 'A sweet roll served commonly in Northern Europe and North America. Its main ingredients are flour, cinnamon, sugar, and butter, which provide a robust and sweet flavor. Served with cream cheese or icing.',
        options: [
        { size : 'small', price : 2.00},
        ]
    }),
];

/** Loops through products array */
var done = 0;
for (var i = 0; i < products.length; i++) {

    /** Creates products collection in database */
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}


/** Function to disconnect from database */
function exit() {
    mongoose.disconnect();
}
