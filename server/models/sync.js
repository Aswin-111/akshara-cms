const seq = require('./index')

const Gallery = require('./gallery')

const Devices = require('./devices')
const Contents = require('./contents')


Gallery.sync({alter: true})
Devices.sync({alter: true})
Contents.sync({alter: true})