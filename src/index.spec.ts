import { RxSocket } from './index';

const URL = 'http://localhost:8080';
const MIRROR_EVENT = 'karma-mirror-event';
const WELCOMING_EVENT = 'karma-welcoming-event';

describe('RxSocket', () => {
  it('should send and receive data for same event [subject]', (done) => {
    const socket = new RxSocket(URL);
    const mirror$ = socket.subject<{ foo: string }>(MIRROR_EVENT);
    const outgoingData = { foo: 'bar' };
    mirror$.subscribe((incomingData) => {
      expect(incomingData).toEqual(outgoingData);
      done();
    });
    mirror$.next(outgoingData);
  });

  it('should receive data [observable]', (done) => {
    const socket = new RxSocket(URL);
    const welcoming$ = socket.observable<string>(WELCOMING_EVENT);
    welcoming$.subscribe((welcome) => {
      expect(welcome).toEqual('welcome');
      done();
    });
  });
});
