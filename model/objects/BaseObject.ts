export default class BaseObject {
  id = `_${Math.random().toString(36).substr(2, 9)}`;

  name: string;

  createdAt: string;

  updatedAt: string;

  constructor(name: string, createdAt: string, updatedAt: string) {
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
