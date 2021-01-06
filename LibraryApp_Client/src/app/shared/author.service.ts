import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  readonly baseURL = 'http://localhost:3000';

  //heroku hosted server url
  // readonly baseURL = 'https://ashley-lib-server.herokuapp.com';

  constructor(private http: HttpClient) { }

  getAuthors(){
    return this.http.get(this.baseURL + '/authors');
  }

  newAuthor(item){
    return this.http.post(this.baseURL + '/authors/addauthor',{"author":item})
      .subscribe(data =>{console.log(data);})
  }

  getAuthorDetails(id){
    return this.http.get(this.baseURL + `/authors/${id}`);
  }

  updateAuthor(id, item){
    // console.log(id+'-'+item)
    return this.http.put(this.baseURL + `/authors/${id}`, item);
  }

  deleteAuthor(id){
    return this.http.delete(this.baseURL + `/authors/${id}`);
  }
}
