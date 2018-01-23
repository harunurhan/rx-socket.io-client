import { RxSocket } from './index';

const URL = 'http://localhost:8080';
const MIRROR_EVENT = 'karma-mirror-event';
const WELCOMING_EVENT = 'karma-welcoming-event';

describe('RxSocket', () => {
  it('should send and receive data for same event [subject]', (done) => {
    const socket = new RxSocket<{ foo: string }>(URL);
    const mirror$ = socket.subject(MIRROR_EVENT);
    const outgoingData = { foo: 'bar' };
    mirror$.subscribe((incomingData) => {
      expect(incomingData).toEqual(outgoingData);
      done();
    });
    mirror$.next(outgoingData);
  });

  it('should receive data [observable]', (done) => {
    const socket = new RxSocket<string>(URL);
    const welcoming$ = socket.observable(WELCOMING_EVENT);
    welcoming$.subscribe((welcome) => {
      expect(welcome).toEqual('welcome');
      done();
    });
  });
});
