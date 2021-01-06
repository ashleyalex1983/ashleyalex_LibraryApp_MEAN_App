export class BookModel{
  constructor(
                public _id          : string,
                public bookId       : number,
                public book_title   : string,
                public book_author  : string,
                public book_genre   : string,
                public book_imageUrl: string
             ){} 
}
