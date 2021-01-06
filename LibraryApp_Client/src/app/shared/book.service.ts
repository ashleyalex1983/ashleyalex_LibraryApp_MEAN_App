import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly baseURL = 'http://localhost:3000';

  //heroku hosted server url
  // readonly baseURL = 'https://ashley-lib-server.herokuapp.com';

  constructor(private http: HttpClient) { }

  getBooks(){
    // return this.http.get("http://localhost:3000/books");
    return this.http.get(this.baseURL + '/books');
  }

  newBook(item){
    return this.http.post(this.baseURL + '/books/addbook',{"book":item})
      .subscribe(data =>{console.log(data);})
  }

  getBookDetails(id){
    return this.http.get(this.baseURL + `/books/${id}`);
  }

  updateBook(id, item){
    // console.log(id+'-'+item)
    return this.http.put(this.baseURL + `/books/${id}`, item);
  }

  deleteBook(id){
    return this.http.delete(this.baseURL + `/books/${id}`);
  }
}
