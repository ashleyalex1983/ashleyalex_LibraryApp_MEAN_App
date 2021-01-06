import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BookModel } from '../book-list/book.model';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  title: String = "Add New Book";

  selectedImage : string;

  //image properties
  imageWidth: number = 80;
  imageMargin: number = 2;

  book_Item = new BookModel(null,null,null,null,null,null);

  bookform = new FormGroup({
    title: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    genre: new FormControl('',Validators.required),
    imageurl: new FormControl('',Validators.required)
  })

  get bf(){
    return this.bookform.controls;
  }

  constructor(private bookService: BookService,
              private router: Router) { }

  ngOnInit(): void {
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
      this.book_Item.book_imageUrl = this.selectedImage;
    }
    reader.readAsDataURL(file);
  }

  addBook(){
    this.bookService.newBook(this.book_Item);
    console.log('Called');
    alert("Success");
    this.router.navigate(['books']);
  }

}
