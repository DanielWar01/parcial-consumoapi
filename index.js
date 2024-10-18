const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Importar body-parser
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

const { findAll, findById, addDish, editDish, deleteDish } = require('./services/apiconsume');

app.get('/', async (req, res) => {
    const { id } = ""; 
    const updatedDish = {
        idDish: "",
        name: "",
        calories: "",
        isVegetarian: "",
        value: "",
        comments: "",
    };
    try {
        const data = await findAll();
        res.render('index', { data, id, updatedDish });
    } catch (error) {
        console.log('Error en la ruta /:', error);
        res.status(500).send('Error al obtener los datos');
    }
});

app.get('/search', async (req, res) => {
    const { id } = ""; 
    const updatedDish = {
        idDish: "",
        name: "",
        calories: "",
        isVegetarian: "",
        value: "",
        comments: "",
    };
    const search = req.query.search;
    try {
        const data = await findById(search);
        const searchData = data ? ((Array.isArray(data)) ? data : [data]) : [];
        res.render('index', { data: searchData, searchTerm: search, id, updatedDish });
    } catch (error) {
        console.log('Error en la ruta /search:', error);
        res.status(500).send('Error al obtener los datos');
    }
});

app.post('/addDish', async (req, res) => {
    try {
        const newDish = {
            idDish: req.body.idDish,
            name: req.body.name,
            calories: parseInt(req.body.calories),
            isVegetarian: req.body.isVegetarian === 'true', 
            value: parseFloat(req.body.value), 
            comments: req.body.comments
        };

        const addedDish = await addDish(newDish);
        console.log('Plato agregado:', addedDish);

        res.redirect('/');
    } catch (error) {
        console.log('Error en la ruta /addDish:', error);
        res.status(500).send('Error al agregar el plato');
    }
});

app.post('/editDish', async (req, res) => {
    const { id } = req.body; 
    const updatedDish = {
        idDish: req.body.idDish,
        name: req.body.name,
        calories: parseInt(req.body.calories),
        isVegetarian: req.body.isVegetarian === 'true',
        value: parseFloat(req.body.value),
        comments: req.body.comments,
    };
    
    try {
        const editedDish = await editDish(id, updatedDish);
        const data = await findAll();
        res.render('index', { data, id, updatedDish });
    } catch (error) {
        console.log('Error en la ruta /editDish:', error);
        res.status(500).send('Error al editar el plato');
    }
});


app.post('/deleteDish', async (req, res) => {
    const { id } = req.body; // El ID del plato que se va a eliminar

    console.log(id)
    try {
        await deleteDish(id);
        console.log(`Plato con ID ${id} eliminado.`);
        res.redirect('/');
    } catch (error) {
        console.log('Error en la ruta /deleteDish:', error);
        res.status(500).send('Error al eliminar el plato');
    }
});

app.listen(PORT, () => console.log(`Server Ready Listen at Port = ${PORT}`));
