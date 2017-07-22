import { EventEmitter } from 'events';

class RepositoryStore extends EventEmitter {
  constructor() {
    super();
    this.repositoryList = [];
    this.isLatest = true;
  }

  getRepository() {
    return this.repositoryList;
  }

  getOrderType() {
    return this.isLatest;
  }

  updateRepositoryList(repositoryList) {
    this.repositoryList = repositoryList;
    this.isLatest = true;
    this.emit('changed');
  }

  orderChange(repositoryList) {
    this.repositoryList = repositoryList.reverse();
    this.isLatest = !this.isLatest;
    this.emit('changed');
  }
}

export default new RepositoryStore();
