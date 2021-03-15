import BaseObject from '../BaseObject';
import Feed from './Feed'

export default class Tag extends BaseObject {
  feeds: Feed[];

  constructor(
    name: string,
    createdAt: string,
    updatedAt: string,
    feeds: Feed[]
  ) {
    super(name, createdAt, updatedAt);
    this.feeds = feeds;
  }
}
