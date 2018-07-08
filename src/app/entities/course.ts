export interface ICourse {
  id: string;
  title: string;
  duration: number;
  creationDate: Date;
  description: string;
  topRated: boolean;
}

export class Course implements ICourse {
  public id: string;
  public title: string;
  public duration: number;
  public creationDate: Date;
  public description: string;
  public topRated: boolean;

  public constructor(id: string, title: string, duration: number, creationDate: Date, description: string, topRated = false) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.creationDate = creationDate;
    this.description = description;
    this.topRated = topRated;
  }
}
