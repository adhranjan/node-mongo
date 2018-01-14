const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

var data = {
  id:10
}

var token = jwt.sign(data,'123abc')
var data = jwt.verify(token,'123abc')
console.log(data)


var data = {
  id:4
}

var token = {
  data,
  hash: SHA256(JSON.stringify(data)+'my_key').toString()
}

token.data.id=5

var result = SHA256(JSON.stringify(token.data)+'my_key').toString()
console.log(result === token.hash)
