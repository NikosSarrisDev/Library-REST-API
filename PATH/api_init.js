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
    
    const book = new Library({
        Id : req.body.Id,
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

app.put('/books/Update/:id2',getBook,async (req,res) => {///////////////PUT COMMAND(Update)
    
    if (req.body.name != null) {//Αν τα καινουρια πεδια του json δεν ειναι κενα τοτε αντικατεστησετα με τα καινουρια 
        res.subscriber.name = req.body.name
      }

      if (req.body.game != null) {
        res.subscriber.game = req.body.game
      }

      try {
        const updatedBook = await res.book.save()

        res.json(updatedBook)
        
      } catch (err) {
        res.status(400).json({ message: err.message })
      }

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

app.delete('/books/Delete/:id2',getBook ,async (req,res) => {////////////Delete COMMAND(delete)
    
    try {
        await res.book.remove();

        res.json({ message: 'Deleted Book' });

      } catch (err) {
        res.status(500).json({ message: err.message });
      }

});

app.delete('/books/Delete/All', async (req,res) => {
    try {
        await Library.remove();
    }catch(err){
        res.status(500).json({message : err.message});
    }
})

///////////////////////////////////////////////////////////////////////////////////////////

async function getBook(req, res ,next ){
    let book
    try{
        book = await Library.findById(req.params.Id);
        if(!book){
            return res.status(404).json({message : "Cannot find that Book"});

        }           
        
    }catch(err){
        return res.status(500).json({message : err.message});

    }
    res.book = book;
    next();
}

module.exports = app;