import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookModel } from './book.model';
import { BookService } from '../shared/book.service';
// import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  title:String ="Books";

  books: BookModel[];

  constructor(private bookService : BookService,
              private router : Router) { }

  ngOnInit(): void {
    this.getBookList();
  }

  getBookList(){
    this.bookService.getBooks()
      .subscribe((bookdata)=>{
        this.books = JSON.parse(JSON.stringify(bookdata));
      })
  }

  onclickGetBookDetails(book:any){
    localStorage.setItem("bookId",book._id.toString());
    this.router.navigate([`books/${book._id}`]);
  }

}
