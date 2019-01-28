import { UserSession } from '@esri/arcgis-rest-auth';
import * as Cookies from 'js-cookie';
import { restoreSession, signIn, signOut } from './session';

jest.mock('js-cookie');
jest.mock('@esri/arcgis-rest-auth');

describe('utils', function() {
  describe('session', function() {
    describe('restoreSession', function() {
      beforeEach(function() {
        Cookies.get.mockClear();
      });
      describe('when no cookie', function() {
        it('reads the cookie but does not deserialize', function() {
          Cookies.get.mockReturnValueOnce(undefined);
          restoreSession();
          expect(Cookies.get.mock.calls.length).toBe(1);
          expect(Cookies.get.mock.calls[0][0]).toBe('caa_test_session');
          expect(UserSession.deserialize.mock.calls.length).toBe(0);
        });
      });
      describe('when cookie exists', function() {
        it('reads the cookie and deserializes it', function() {
          Cookies.get.mockReturnValueOnce('notarealsession');
          restoreSession();
          expect(Cookies.get.mock.calls.length).toBe(1);
          expect(Cookies.get.mock.calls[0][0]).toBe('caa_test_session');
          expect(UserSession.deserialize.mock.calls.length).toBe(1);
          expect(UserSession.deserialize.mock.calls[0][0]).toBe(
            'notarealsession'
          );
        });
      });
    });
    describe('signIn', function() {
      it('begins the OAuth flow and sets the cookie', function() {
        const serialize = jest.fn(() => 'notarealsession');
        const tokenExpires = new Date(2019, 1, 1);
        UserSession.beginOAuth2.mockResolvedValue({ serialize, tokenExpires });
        return signIn().then(result => {
          expect(Cookies.set.mock.calls.length).toBe(1);
          expect(Cookies.set.mock.calls[0]).toEqual([
            'caa_test_session',
            'notarealsession',
            { expires: tokenExpires }
          ]);
        });
      });
    });
    describe('signOut', function() {
      it('deletes the cookie', function() {
        signOut();
        expect(Cookies.remove.mock.calls.length).toBe(1);
        expect(Cookies.remove.mock.calls[0][0]).toBe('caa_test_session');
      });
    });
  });
});
