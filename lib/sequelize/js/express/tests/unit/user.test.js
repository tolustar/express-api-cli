import { expect } from 'chai';
import * as UserService from '../../src/services/user.service';

describe('User', () => {
  describe('Get Users', () => {
    it('should return empty array', async () => {
      const result = await UserService.getAllUsers();
      expect(result).to.be.an('array');
    });
  });
});
