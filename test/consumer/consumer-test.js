const path = require('path');
const chai = require('chai');
const pact = require('pact');
const request = require('superagent');

const expect = chai.expect;

describe('Pact', () => {

  // 1. 创建一个Pact对象，其表示依赖的一个生产者端
  const provider = pact({
    consumer: 'TodoApp',
    provider: 'TodoService',
    port: 8002,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'INFO',
    spec: 2
  });

  describe('when there is matched user', () => {
    before((done) => {
      // 2. 启动mock server来mock生产者服务
      provider.setup()
        // 3. 定义消费者与生产者相互交互的内容
        .then(() => {
          provider.addInteraction({
            state: 'have a matched user',
            uponReceiving: 'a request for get user',
            withRequest: {
              method: 'GET',
              path: '/user/1'
            },
            willRespondWith: {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
              body: {
                id: 1,
                name: 'God'
              }
            }
          })
        })
        .then(() => done())
      });

      // 4. 测试代码中需要有逻辑请求mock的生产者服务
      it('should response with user with id and name', (done) => {
        request.get('http://localhost:8002/user/1')
          .then((response) => {
            const user = response.body;
            expect(user.name).to.equal('God');
            provider.verify();
            done();
          })
          .catch((e) => {
            console.log('error', e);
            done(e);
          });
      });

      // 5. 将契约写到文件中，关闭mock的生产者端
      after(() => {
        provider.finalize();
      });
    });
});
