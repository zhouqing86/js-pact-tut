'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const wrapper = require('@pact-foundation/pact-node')

chai.use(chaiAsPromised)

// used to kill any left over mock server instances
process.on('SIGINT', function () {
  wrapper.removeAllServers()
})
