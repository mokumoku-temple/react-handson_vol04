import { EventEmitter } from 'events';

class RepositoryStore extends EventEmitter {
  constructor() {
    super();
    this.repositoryList = [];
  }

  getRepository() {
    this.repositoryList;
  }

  updateRepositoryList(repositoryList) {
    this.repositoryList = repositoryList;
    this.emit('changed');
  }

}

export default new RepositoryStore();
