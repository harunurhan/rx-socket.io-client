import { RxSocket } from './index';

const URL = 'http://localhost:8080';
const MIRROR_EVENT = 'karma-mirror-event';

describe('RxSocket', () => {
  it('should send and receive data for same event', (done) => {
    const socket = new RxSocket<{ foo: string }>(URL);
    const event$ = socket.fromEvent(MIRROR_EVENT);
    const outgoingData = { foo: 'bar' };
    event$.subscribe((incomingData) => {
      expect(incomingData).toEqual(outgoingData);
      done();
    });
    event$.next(outgoingData);
  });
});
