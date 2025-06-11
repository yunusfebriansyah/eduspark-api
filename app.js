const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const path = require('path')
const sequelize = require('./config/database')
const VwGames = require('./models/VwGames')
const Word = require('./models/Word')
const Leaderboard = require('./models/Leaderboard')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// cek koneksi database
// sequelize.sync().then(() => { console.log('Koneksi database berhasil.') })
async function checkDbConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Koneksi database berhasil.');
  } catch (error) {
    console.error('❌ Gagal terkoneksi ke database:', error);
  }
}
checkDbConnection();

app.get('/', (req, res) => {
  res.json({
    status: '200',
    message: 'Welcome to the Word Game API EduSpark'
  })
})

// API Routes
app.get('/api/games', async (req, res) => {
  const data = await VwGames.findAll()
  res.json(data)
})

app.get('/api/words/:game_id', async (req, res) => {
  const data = await Word.findAll({
    where: {
      game_id: req.params.game_id
    }
  })
  res.json(data)
})

app.get('/api/leaderboards/:game_id', async (req, res) => {
  const data = await Leaderboard.findAll({
    where: {
      game_id: req.params.game_id
    }
  })
  res.json(data)
})

app.post('/api/leaderboards', async (req, res) => {
  await Leaderboard.create({
    nickname: req.body.nickname,
    game_id: req.body.gameID,
    total_point: req.body.totalPoint
  })
  res.json({
    status: '200',
    message: 'Success post new data.'
  })
})

// app.listen(PORT, () => {
//   console.log(`Server berjalan di http://localhost:${PORT}`)
// })

module.exports = app