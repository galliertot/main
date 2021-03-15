import BaseObject from '../BaseObject';

export default class User extends BaseObject {
  constructor(
    name: string,
    createdAt: string,
    updatedAt: string,
  ) {
    super(name, createdAt, updatedAt);
  }
}
