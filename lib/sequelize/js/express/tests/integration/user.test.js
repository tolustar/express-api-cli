import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';

describe('User APIs Test', () => {
  describe('GET /users', () => {
    it('should return empty array', (done) => {
      request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.be.an('array');

          done();
        });
    });
  });
});
