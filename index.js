var pact = require('@pact-foundation/pact-node');
var server = pact.createServer({port: 9999});
var servers = pact.listServers();
console.log(JSON.stringify(servers));
