import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookModel } from '../book-list/book.model';
import { BookService } from '../shared/book.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  title:String="Book";

  currentBook = null;

  constructor(private router : Router,
              private bookService : BookService,
              public _auth : AuthService) { }

  ngOnInit(): void {
    let bookId = localStorage.getItem("bookId");

    this.getBookData(bookId);
  }

  getBookData(id){
    this.bookService.getBookDetails(id)
      .subscribe((book)=>{
        this.currentBook = book;
      },(error)=>{
        console.log(error);
      });
  }

  editBook(book:any){
    this.router.navigate(['update_book']);
  }

  deleteBook(book:any){
    if(confirm(`Are you sure to delete ${book.book_title} ?`) == true)
    {
      this.bookService.deleteBook(book._id)
        .subscribe((response)=>{
          console.log(response);
        },(error)=>{
          console.log(error);
        });
      alert(`${book.book_title} Deleted Successfully`);
      this.router.navigate(['books']);
    }


  }

}
