const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./bookModel.js');


async function seed() {
    mongoose.connect(process.env.DB_URL);


    await Book.create({
        title: 'Kite Runner',
        description: 'The unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father’s servant, The Kite Runner is a beautifully crafted novel set in a country that is in the process of being destroyed. It is about the power of reading, the price of betrayal, and the possibility of redemption; and an exploration of the power of fathers over sons—their love, their sacrifices, their lies.',
        status: 'available',
        email: 'user@useraddess.com'
});
    console.log('Kite Runner');

    await Book.create({
        title: 'Harry Potter and the Order of the Phoenix',
        description: 'Harry has a lot on his mind for this, his fifth year at Hogwarts: a Defense Against the Dark Arts teacher with a personality like poisoned honey; a big surprise on the Gryffindor Quidditch team; and the looming terror of the Ordinary Wizarding Level exams. But all these things pale next to the growing threat of He-Who-Must-Not-Be-Named - a threat that neither the magical government nor the authorities at Hogwarts can stop',
        status: 'available',
        email: '1user@useraddess.com'
});
    console.log('Harry Potter');

await Book.create({
        title: 'The Da Vinci Code',
        description: 'While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci—clues visible for all to see and yet ingeniously disguised by the painter.',
        status: 'available',
        email: '2user@useraddess.com'
});
    console.log('Da Vinci Code');
    mongoose.disconnect();
};

seed();
