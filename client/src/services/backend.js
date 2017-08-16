import fetch from 'node-fetch'
import FormData from 'form-data'

// const API_URL = 'http://localhost:3000'
const API_URL = 'http://raspberrypi.local:3000'

const backend = {
  fetchMidiConnections: () =>
    new Promise((resolve, reject) =>
      fetch(`${API_URL}/midi-devices`, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(body => resolve(body))
      .catch(error => reject(error))
    )
  ,
  createConnection: ({ sourceId, targetId }) => {
    const body = { sourceId, targetId }
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}/connect`, {
          method: 'POST',
          body:    JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        })
        .catch(error => reject(error))
    )
  },
	disconnectAll: () =>
		new Promise((resolve, reject) =>
			fetch(`${API_URL}/disconnect-all`, {
				method: 'DELETE'
			})
			.catch(error => reject(error))
		)
}

export default backend
