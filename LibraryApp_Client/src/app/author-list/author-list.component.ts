import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorModel } from './author.model';
import { AuthorService } from '../shared/author.service';


@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  title:String ="Authors";

  authors: AuthorModel[];

  constructor(private authorService: AuthorService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAuthorList();
  }

  getAuthorList(){
    this.authorService.getAuthors()
      .subscribe((authordata)=>{
        this.authors = JSON.parse(JSON.stringify(authordata));
      });
  }

  onclickGetAuthorDetails(author:any){
    localStorage.setItem("authorId",author._id.toString());
    this.router.navigate([`authors/${author._id}`]);
  }

}
