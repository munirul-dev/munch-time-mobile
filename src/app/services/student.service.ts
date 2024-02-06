import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';
import { ConnectionService } from './connection.service';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private _studentList: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private connections: ConnectionService,
  ) { }

  get studentList() {
    return this._studentList.asObservable();
  }

  index() {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.student.index, null, this.connections.options(auth ? auth.token : ''))),
      take(1),
      map((result: any) => result.data),
      tap((data: Student[]) => this._studentList.next(data)),
    );
  }

  create(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.student.create, body, this.connections.formDataOptions(auth ? auth.token : ''))),
      take(1),
    );
  }

  edit(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.student.edit, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

  update(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.student.update, body, this.connections.formDataOptions(auth ? auth.token : ''))),
      take(1),
    );
  }

  delete(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.student.destroy, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

}
