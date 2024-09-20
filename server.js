const app = require('./app')
const CONFIG = require('./config/config')
const connectTODB = require('./db/db')

connectTODB()

app.listen(CONFIG.PORT, () => {
    console.log(`Server is running on  http://localhost:${CONFIG.PORT}`)
})