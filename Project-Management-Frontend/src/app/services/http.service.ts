import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:8000";
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(name: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/api/login`,
      {
        name,
        password      },
      { observe: "response" }
    );
  }

  signup(name: string, password: string,role: string) {
    return this.http.post(
      `${this.ROOT_URL}/api/signup`,
      {
        name,
        password,
        role
      },
      { observe: "response" }
    );
  }
}
