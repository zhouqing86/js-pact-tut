const pact = require('@pact-foundation/pact-node');
const path = require('path');

pact.publishPacts({
  pactUrls: [path.join(process.cwd(), 'pacts')],
  pactBroker: 'http://localhost:8080',
  consumerVersion: '1.0.0'
});

console.log('done');
