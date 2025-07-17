// src/insecureApi.js

export async function getUserData() {
  // Intentionally missing authentication headers
  const response = await fetch('https://example.com/api/users');
  return await response.json();
}
