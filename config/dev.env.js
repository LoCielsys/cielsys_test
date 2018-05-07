'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://localhost/LinhuibaServer-GitLab/public/api"', // 主干版本迭代开发， 3.1 等
  // API_ROOT: '"http://lanhanba.net/api"', // 日常bug需求开发+
})
