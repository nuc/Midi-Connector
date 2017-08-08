import fetch from 'node-fetch'

const API_URL = 'http://localhost:3000'

const backend = {
  fetchMidiConnections: () =>
    new Promise((resolve, reject) =>
      fetch(`${API_URL}/midi-devices`)
        .then(res => res.json())
        .then(body => resolve(body))
        .catch(error => reject(error))
    )
  ,
  createConnection: () =>
    new Promise((resolve, reject) =>
      fetch(`${API_URL}/connection`)
        .then(res => res.json())
        .then(body => resolve(body))
        .catch(error => reject(error))
    )
}

export default backend
