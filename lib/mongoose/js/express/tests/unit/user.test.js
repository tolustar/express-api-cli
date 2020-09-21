import { expect } from 'chai';
import * as UserService from '../../src/services/user.service';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

describe('User', () => {
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

  describe('Get Users', () => {
    it('should return empty array', async () => {
      const result = await UserService.getAllUsers();
      expect(result).to.be.an('array');
    });
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });
});
