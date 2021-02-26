import express from 'express'

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
)

app.get('/', (request, response) => {
    return response.json({
        'message': 'Hello World!'
    });
});

app.post('/', (request, response) => {
    const userData = request.body;
    return response.json({
        'name': userData.name
    });
});

app.listen(3333, () => console.log("Server is running 2!"))
