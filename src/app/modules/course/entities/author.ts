export class Author {
  public id: string;
  public name: string;

  public constructor(author: any) {
    this.id = author.id;
    this.name = author.name;
  }
}
