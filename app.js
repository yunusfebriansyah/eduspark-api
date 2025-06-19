const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const path = require('path')
const sequelize = require('./config/database')
const VwGames = require('./models/VwGames')
const Game = require('./models/Game')
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
    message: 'Welcome to the API EduSpark'
  })
})

// API Routes
app.get('/api/games', async (req, res) => {
  const data = await VwGames.findAll()
  let returnData = []

  for (let i = 0; i < data.length; i++) {
    returnData.push({
      id: data[i].id,
      name: data[i].name,
      category: data[i].category,
      // total_point: parseInt(data[i].total_point),
      total_player: parseInt(data[i].total_point),
    })
  }
  res.json(
    {
      status: '200',
      message: 'Success get all games.',
      data: returnData
    }
  )
})

app.get('/api/words/:game_id', async (req, res) => {
  const data = await Word.findAll({
    where: {
      game_id: req.params.game_id
    }
  })
  res.json({
    status: '200',
    message: 'Success get all words.',
    data: data
  })
})

app.get('/api/leaderboards/:game_id', async (req, res) => {
  const data = await Leaderboard.findAll({
    where: {
      game_id: req.params.game_id
    }
  })
  res.json({
    status: '200',
    message: 'Success get all leaderboards.',
    data: data
  })
})

app.post('/api/leaderboards', async (req, res) => {
  await Leaderboard.create({
    nickname: req.body.nickname,
    game_id: req.body.game_id,
    total_point: req.body.total_point
  })

  await Game.update(
    { total_point: sequelize.literal('total_point + 1') },
    { where: { id: req.body.gameID } }
  )
  
  res.json({
    status: '200',
    message: 'Success post new data.'
  })
})

// app.listen(PORT, () => {
//   console.log(`Server berjalan di http://localhost:${PORT}`)
// })

module.exports = app