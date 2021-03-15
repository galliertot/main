import BaseObject from '../BaseObject';

export default class Feed extends BaseObject {
  type: string;

  constructor(
    name: string,
    createdAt: string,
    updatedAt: string,
    type: string
  ) {
    super(name, createdAt, updatedAt);
    this.type = type;
  }
}
