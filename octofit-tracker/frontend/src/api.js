const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.docs)) return payload.docs
  return []
}

export async function fetchCollection(resource) {
  return fetchEndpoint(`${apiBaseUrl}/api/${resource}/`)
}

export async function fetchEndpoint(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load ${endpoint}`)
  return collectionFromResponse(await response.json())
}
