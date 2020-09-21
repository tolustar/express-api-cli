import { expect } from 'chai';
import * as UserService from '../../src/services/user.service';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

describe('User', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('Get Users', () => {
    it('should return empty array', async () => {
      const result = await UserService.getAllUsers();
      expect(result).to.be.an('array');
    });
  });
});
