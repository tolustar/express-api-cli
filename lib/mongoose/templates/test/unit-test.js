module.exports = (title) => {
  const Title = title.charAt(0).toUpperCase() + title.slice(1);

  return `import { expect } from 'chai';
import * as ${Title}Service from '../../services/${title}.service';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

describe('${Title}', () => {
  before((done) => {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(process.env.DATABASE_TEST, () => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      });
    } else {
      done();
    }
  });

  describe('Get ${Title}s', () => {
    it('should return empty array', async () => {
      const result = await ${Title}Service.getAll${Title}s();
      expect(result).to.be.an('array');
    });
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });
}).timeout(10000);
`;
};
