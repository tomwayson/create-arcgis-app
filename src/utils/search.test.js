import { didSearchParamsChange, parseSearch } from './search';
describe('utils', function() {
  describe('search', function() {
    describe('didSearchParamsChange', function() {
      it('it returns true when parameters have changed', function() {
        let result = didSearchParamsChange(
          { search: '?q=test' },
          { search: '?q=test&start=11' }
        );
        expect(result).toBeTruthy();
      });
      it('it returns false when parameters have not changed', function() {
        let result = didSearchParamsChange(
          { search: '?q=test' },
          { search: '?q=test' }
        );
        expect(result).toBeFalsy();
      });
    });
    describe('parseSearch', function() {
      it('returns defaults when there are no params', function() {
        let result = parseSearch('');
        expect(result).toEqual({
          num: 10,
          start: 1
        });
      });
      it('overrides defaults when there are params', function() {
        let result = parseSearch('?q=test&start=11');
        expect(result).toEqual({
          num: 10,
          q: 'test',
          start: 11
        });
      });
      it('returns q & defaults when there is only the q param', function() {
        let result = parseSearch('?q=test');
        expect(result).toEqual({
          num: 10,
          q: 'test',
          start: 1
        });
      });
    });
  });
});
