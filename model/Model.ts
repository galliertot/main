import BaseObject from "./objects/BaseObject";

export class Model {
  private static instance: Model;
  private constructor() {}

  public static shared(): Model {
    if (!Model.instance) {
      Model.instance = new Model();
    }
    return Model.instance;
  }

  cache: BaseObject[] = [];

  addToCache(object: BaseObject) {
    this.cache.push(object);
  }
}
