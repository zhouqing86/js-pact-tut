const verifier = require('pact').Verifier;
const path = require('path');
const chai = require('chai');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const expect = chai.expect;

const server = express();
// server.use(cors());
server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({
//   extended: true
// }));

server.use((req, res, next) => {
  res.header('Content-Type', 'application/json')
  next()
});

server.get('/user/:id', (req, res) => {
  res.end(JSON.stringify({
    id: 1,
    name: 'God'
  }));
});

// Append some extra endpoints to mutate current state of the API
server.get('/states', (req, res) => {
  res.json({
    "TodoApp": ['have a matched user']
  });
});

server.post('/setup', (req, res) => {
  const state = req.body.state
  console.log('state:', state);
  res.end()
});

server.listen(8081, () => {
  console.log('User Service listening on http://localhost:8081')
});

// 验证生产者满足消费者的需求
describe('Pact Verification', () => {
  it('should validate the expectations of Matching Service', () => {

    const opts = {
      providerBaseUrl: 'http://localhost:8081',
      providerStatesUrl: 'http://localhost:8081/states',
      providerStatesSetupUrl: 'http://localhost:8081/setup',
      pactUrls: [path.resolve(process.cwd(), './pacts/todoapp-todoservice.json')]
      // pactUrls: ['http://localhost:8080/pacts/provider/TodoService/consumer/TodoApp/latest']
    }

    return verifier.verifyProvider(opts)
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      });
  });
});
