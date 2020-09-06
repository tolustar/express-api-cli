import { expect } from 'chai';
import UserService from '../../services/user.service';

describe('User', () => {
  describe('Get Users', () => {
    it('should return empty array', async () => {
      const result = await new UserService().getAllUsers();
      expect(result).to.be.an('array');
    });
  });
}).timeout(10000);
