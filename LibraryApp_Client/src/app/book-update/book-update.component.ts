import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BookModel } from '../book-list/book.model';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

  title:String ="Edit Book Details";

  currentBook = null;

  selectedImage : string;

  //image display properties
  imageWidth: number = 80;
  imageMargin: number = 2;

  bookform = new FormGroup({
    title: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    genre: new FormControl('',Validators.required)
    // ,imageurl: new FormControl('',Validators.required)
  })

  get bf(){
    return this.bookform.controls;
  }

  constructor(private router: Router,
              private bookService: BookService) { }

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

  onSelectImage($event):void {
    this.readImageFile($event.target as HTMLInputElement);
  }

  readImageFile(img:any):void{
    var file:File =img.files[0];
    var reader:FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.selectedImage = reader.result as string;
      console.log(this.selectedImage);
      this.currentBook.book_imageUrl = this.selectedImage;
    }
    reader.readAsDataURL(file);
  }

  editBook(){
    this.bookService.updateBook(this.currentBook._id, this.currentBook)
      .subscribe((response)=>{
        console.log(response);
      },(error)=>{
        console.log(error);
      });

      localStorage.removeItem("bookId");

      alert("Book Updated Successfully");
      this.router.navigate([`books`]);
      // this.router.navigate([`books/${this.currentBook._id}`]);
  }

}
