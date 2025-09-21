const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('log-data', (request, response) => {
    if (request.body) {
        return JSON.stringify(request.body)
    }
})

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }

// app.use(requestLogger)

app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan(':log-data'))

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    {
        "id": "5",
        "name": "hi",
        "number": "39483287"
    }
]

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`
        <p>Phonebook has info for ${phonebook.length} people
        <p>${date.toString()}</p>
    `)
})

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const data = phonebook.find(data => data.id === id)
    if (!data) {
        response.status(404).end()
        return
    }

    response.json(data)
})

const REALLY_LARGE = 10**5
const generateId = () => {
    return Math.floor(REALLY_LARGE*Math.random())
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (phonebook.find(data => data.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const data = {
        id: String(generateId()),
        name: body.name,
        number: body.number,
    }

    phonebook = phonebook.concat(data)
    response.json(data)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id    
    phonebook = phonebook.filter(data => data.id !== id)

    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Phonebook server is running on port ${PORT}`)
})