import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthorModel } from '../author-list/author.model';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css']
})
export class AuthorCreateComponent implements OnInit {

  title: String = "Add New Author";

  selectedImage : string;

  //image properties
  imageWidth: number = 80;
  imageMargin: number = 2;

  author_Item = new AuthorModel(null,null,null,null,null,null,null);

  authorform = new FormGroup({
    name: new FormControl('',Validators.required),
    nationality: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    genre: new FormControl('',Validators.required),
    imageurl: new FormControl('',Validators.required)
  })

  get af(){
    return this.authorform.controls;
  }

  constructor(private authorService: AuthorService,
              private router : Router) { }

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
      // console.log(this.selectedImage);
      this.author_Item.author_imageUrl = this.selectedImage;
    }
    reader.readAsDataURL(file);
  }

  addAuthor(){
    this.authorService.newAuthor(this.author_Item);
    // console.log('Called');
    alert("Success");
    this.router.navigate(['authors']);
  }

}
