/*
 * This file is part of record-editor.
 * Copyright (C) 2018 CERN.
 *
 * record-editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * record-editor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with record-editor; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import * as socketIO from 'socket.io-client';

export class RxSocket<DT> {
  private socket: SocketIOClient.Socket;

  constructor(url: string, options?: SocketIOClient.ConnectOpts) {
    this.socket = socketIO(url, options);
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public connect(): void {
    this.socket.connect();
  }

  public observable<T = DT>(event: string): Observable<T> {
    return this.createEventObservable<T>(event);
  }

  public subject<T = DT>(event: string): Subject<T> {
    return this.createEventSubject<T>(event);
  }

  private createEventSubject<T>(event: string): Subject<T> {
    const incoming$ = this.createEventObservable<T>(event);
    const outgoing = {
      next: (data: T) => {
        this.socket.emit(event, data);
      },
    };
    return Subject.create(outgoing, incoming$);
  }

  private createEventObservable<T>(event: string): Observable<T> {
    return Observable.create(
      (incoming: Observer<T>) => {
        this.socket.on(event, (data: T) => {
          incoming.next(data);
        });
        return () => { this.onEventSubjectUnsubscribe(event); };
      });
  }

  private onEventSubjectUnsubscribe(event: string): void {
    // FIXME: conditional socket.disconnect or socket.removeListener
  }

}
