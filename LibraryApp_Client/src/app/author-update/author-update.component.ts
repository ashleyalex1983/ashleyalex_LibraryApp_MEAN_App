import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthorModel } from '../author-list/author.model';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-author-update',
  templateUrl: './author-update.component.html',
  styleUrls: ['./author-update.component.css']
})
export class AuthorUpdateComponent implements OnInit {

  title:String = "Edit Author Details";

  currentAuthor = null;

  selectedImage : string;

  //image display properties
  imageWidth: number = 80;
  imageMargin: number = 2;

  authorform = new FormGroup({
    name: new FormControl('',Validators.required),
    nationality: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    genre: new FormControl('',Validators.required)
    // ,imageurl: new FormControl('',Validators.required)
  })

  get af(){
    return this.authorform.controls;
  }

  constructor(private router : Router,
              private authorService : AuthorService) { }

  ngOnInit(): void {
    let authorId = localStorage.getItem("authorId");

    this.getAuthorData(authorId);
  }

  getAuthorData(id:any){
    this.authorService.getAuthorDetails(id)
    .subscribe((author)=>{
      this.currentAuthor = author;
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
      // console.log(this.selectedImage);
      this.currentAuthor.author_imageUrl = this.selectedImage;
    }
    reader.readAsDataURL(file);
  }

  editAuthor(){
    this.authorService.updateAuthor(this.currentAuthor._id,this.currentAuthor)
      .subscribe((response)=>{
        console.log(response);
      },(error)=>{
        console.log(error);
      });

    localStorage.removeItem("authorId");

    alert("Author Details Updated Successfully");
    this.router.navigate([`authors`]);
  }

}
