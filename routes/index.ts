import express from 'express'

const indexRouter = express()

indexRouter.get('/', (req, res) => {
  return res.render('index', { test: 'Altissimo' })
})

export default indexRouter
