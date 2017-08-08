import fetch from 'node-fetch'

const API_URL = 'http://localhost:3000'

export const fetchMidiConnections = () =>
  new Promise((resolve, reject) =>
    fetch(`${API_URL}/midi-connections`)
      .then(res => res.json())
      .then(body => resolve(body))
      .catch(error => reject(error))
  )

export const createConnection = () =>
  new Promise((resolve, reject) =>
    fetch(`${API_URL}/connection`)
      .then(res => res.json())
      .then(body => resolve(body))
      .catch(error => reject(error))
  )
