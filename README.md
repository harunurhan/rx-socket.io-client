## rx-socket.io-client [WIP, not yet released]

Easy to use `rxjs` powered wrapper for `socket.io-client`.

*Although current API is experimental and limited, there __won't__ be any breaking release without major release*

### Install

`npm install --save rx-socket.io-client`

Requires `socket.io-client` and `rxjs` as `peerDependency`, incase you don't have them also run:

`npm install --save socket.io-client rxjs`

### Use

```typescript
const socket = new RxSocket<{ foo: string }>('/url/to/socket.io/server'); // typescript
const socket = new RxSocket('/url/to/socket.io/server'); // javascript 

const event$ = socket.subject('event_name'); // get rxjs/Subject for a specific event

event$.subscribe((data) => { // read data
  console.log(data.foo)
});

event$.next({foo: 'bar'}); // send data

// create observables for events that you want to only listen (receive data)
const event$ = socket.observable('event_name'); // get rxjs/Observable for a specific event

event$.subscribe((data) => { // read data
  console.log(data.foo)
});

```

[See tests for more detailed and up to date examples](./src/index.spec.ts)