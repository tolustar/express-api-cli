module.exports = (title) => {
  const Title = title.charAt(0).toUpperCase() + title.slice(1);

  return `import { expect } from 'chai';
import request from 'supertest';

import app from './../../index';

describe('${Title} APIs Test', () => {
  describe('GET /${title}', () => {
    it('should return empty array', (done) => {
      request(app)
        .get('/api/v1/${title}')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.be.an('array');

          done();
        });
    }).timeout(10000);
  });
});
`;
};
