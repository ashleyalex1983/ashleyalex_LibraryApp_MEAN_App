import { Type } from "@angular/core";

export class AuthorModel{
  constructor(
                public _id               : string,
                public authorId          : number,
                public author_name       : string,
                public author_nationality: string,
                public author_dob        : string,
                public author_genre      : string,
                public author_imageUrl   : string
             ){} 
}
