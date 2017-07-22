// @flow
import { EventEmitter } from 'events';

/**
* @return {Array<Object>} An array of repository fetched from GitHub API
*/

const key = '?client_id=b7a7f8cf2c77acf4f4c8&client_secret=5b8fb8b6b633f294aef29bb5520b8c766de157d9';

export function fetchRepository(id: string) {
  return fetch(`https://api.github.com/users/${id}/repos${key}`)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return console.log('res bad');
    }
  });
}


// 今回使わない

export function fetchApi(id: string) {
  return fetch(`https://api.github.com/users/${id}`)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return console.log('res bad');
    }
  });
}
