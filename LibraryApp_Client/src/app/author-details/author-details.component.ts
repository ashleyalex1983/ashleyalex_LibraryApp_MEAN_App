import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorModel } from '../author-list/author.model';
import { AuthorService } from '../shared/author.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  title:String = "Author";

  currentAuthor = null;

  constructor(private router : Router,
              private authorService : AuthorService,
              public _auth : AuthService) { }

  ngOnInit(): void {
    let authorId = localStorage.getItem("authorId");

    this.getAuthorData(authorId);
  }

  getAuthorData(id){
    this.authorService.getAuthorDetails(id)
      .subscribe((author)=>{
        this.currentAuthor = author;
      },(error)=>{
        console.log(error);
      });
  }

  editAuthor(author:any){
    this.router.navigate(['update_author']);
  }

  deleteAuthor(author:any){
    if(confirm(`Are you sure to delete ${author.author_name} ?`) == true)
    {
      this.authorService.deleteAuthor(author._id)
        .subscribe((response)=>{
          console.log(response);
        },(error)=>{
          console.log(error);
        });
      alert(`${author.author_name} Deleted Successfully`);
      this.router.navigate(['authors']);
    }
  }

}
