import BaseObject from '../BaseObject';
import Feed from './Feed'

export default class User extends BaseObject {
  feeds: Feed[];
  follows: User[];
  avatar: String;

  constructor(
    name: string,
    createdAt: string,
    updatedAt: string,
    avatar: string,
    feeds: Feed[],
    follows: User[]
  ) {
    super(name, createdAt, updatedAt);
    this.avatar = avatar;
    this.feeds = feeds;
    this.follows = follows;
  }
}
