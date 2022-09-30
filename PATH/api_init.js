const app = require('express').Router();

const Library = require('../MODELS/DatabaseSchema');//Το σχημα της Βασης (data visualization)

///////////////////////////  G   E   T  ///////////////////////////////////////////////////

app.get('/' , (req,res) => {
    res.status(400).send({message : "There is nothing here"})
});

app.get('/version', (req,res) => {

    const version = "1.0.9";
    res.status(206).send({message : `Version of Software : ${version}`});
});

app.get('/Developer' ,(req,res) => {
    res.status(250).send({ "name" : "Nikolaos",
                            "surname" : "Sarris",
                            "Profession" : "Software engeneer",
                            "Favorite Programming language" : "JavaScrpt",
                            "Date" : "18-9-2022"
                         });
});

app.get('Documentation', (req,res) => {
    res.status(234).send();//This is not ready
})

app.get('/books/all',async (req,res) => {
    try
    {
        const books = await Library.find()//Με το find() βρισκουμε ολα τα αντικειμενα στη βαση 

        res.status(237).json(books);
    }
    catch(err){
        res.status(409).json({message : err.message});
    }
    
});

app.get('/books/' ,(req,res) => {
    res.status(404).send({message : "You do not specified what do you want"});
});

app.get('/books/:id',async (req,res) => {
    // const {id} = req.params;
    // // const body = req.params;

    // const book = books.find(ele => ele.id === id);

    // if(!book) return res.status(404).send("This book does not exist");//////////WRONG

    // res.send(book);//Find COMMAND

    const book = new Library({
        Id : req.body.id,
        name : req.body.name,
        game :req.body.game

    })

    try{
        const newbook = await book.save()

        res.status(200).json(newbook);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }

});

///////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////  P   O   S   T  ////////////////////////////////////////////

app.post('/' , (req,res) => {//Checks if there nothing to post
    res.status(256).send({message : "There is nothing to post"});
});

app.post('/books' , (req,res) => {
    res.status(407).send({message : "There is nothing to post"})
})

app.post('/books/Add' ,async (req,res) => {//Add a Book in library
    // // const {id} = req.params;
    // const {id,name,game} = req.body;  

    // const bookExistance = books.find(ele => ele.id === id);//this variable checks if the book exists(need fild not filter)

    // if (bookExistance) return res.status(404).send("This book is already exists");//if statement takes place

    // const book = {id,name,game};

    // books.push(book);//Add the new book to inventory

    // res.status(234).send({message : `The book  has been added to library`});

    const book = new Library({
        Id : req.body.id,
        name : req.body.name,
        game :req.body.game

    })

    try{
        const newbook = await book.save();

        res.status(208).json(newbook);
    }catch(err){
        res.status(500).json({message : err.message});
    }
    
});

///////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////  P   U   T  /////////////////////////////////////////////////

app.put('/' ,(req,res) => {
    res.status(409).send({message : "You cannot perform an update to this"});
});

app.put('/books' , (req,res) => {
    res.status(425).send({message : "You cannot perform an update to this"})
});

app.put('/books/Update' , (req,res) => {
    res.status(455).send({message : "You cannot perform an update to this"})
});

app.put('/books/Update/:id2',async (req,res) => {///////////////PUT COMMAND(Update)
    const {id2} = req.params;
    const {id,name,game} = req.body;      

    let bookExistance = books.find(ele => ele.id === id2);//Find COMMAND

    if (!bookExistance) return res.status(404).send("This book does not exist");//Check Existance 

    
    const UpdateBooks = {
        ...bookExistance,
        id : id,
        name : name,
        game : game,
    }
    
    
    const bookIndex = books.findIndex(ele => ele.id === bookExistance.id);

    books.splice(bookIndex,1,UpdateBooks);

    res.status(209).send(UpdateBooks);

});

///////////////////////////////////////////////////////////////////////////////////////////


//////////////////////  D   E   L   E   T   E  ////////////////////////////////////////////

app.delete('/' ,(req,res) => {
    res.status(409).send({message : "You cannot delete this"});
});

app.delete('/books' , (req,res) => {
    res.status(425).send({message : "You cannot delete this"});
});

app.delete('/books/Delete' , (req,res) => {
    res.status(455).send({message : "You cannot delete this"});
});

app.delete('/books/Delete/:id2' ,async (req,res) => {////////////Delete COMMAND(delete)
    
    const { id2 } = req.params;

    let bookExistance = books.find(ele => ele.id === id2);
    if (!bookExistance) return res.status(404).send('Book does not exist');

    books = books.filter(ele => ele.id !== id2);

    res.send('Success');

});

///////////////////////////////////////////////////////////////////////////////////////////

module.exports = app;