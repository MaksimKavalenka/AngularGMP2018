export interface ICourse {
  id: string;
  title: string;
  duration: number;
  creationDate: Date;
  description: string;
}

export class Course implements ICourse {
  public id: string;
  public title: string;
  public duration: number;
  public creationDate: Date;
  public description: string;

  public constructor(id: string, title: string, duration: number, creationDate: Date, description: string) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.creationDate = creationDate;
    this.description = description;
  }

  public getDuration(): string {
    const duration: number[] = [];
    duration[0] = Math.floor(this.duration / 60);
    duration[1] = this.duration % 60;

    if (!duration[0]) {
      return `${duration[1]}min`;
    }
    if (!duration[1]) {
      return `${duration[0]}h`;
    }
    return `${duration[0]}h ${duration[1]}min`;
  }
}
