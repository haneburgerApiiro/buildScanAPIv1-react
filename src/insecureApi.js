// src/insecureApi.js

export async function getUserData() {
  // Intentionally missing authentication headers
  const response = await fetch('https://example.com/api/users');
  return await response.json();
}

/**
 * DEMO: SQL injection - user input concatenated into query string (vulnerable).
 * Do not use in production. Use parameterized queries / prepared statements instead.
 */
export async function findUserById(userId) {
  // Simulated vulnerable query construction (pattern scanners look for)
  const query = "SELECT * FROM users WHERE id = '" + userId + "'";
  // In a real app this would be sent to a backend; here we return the "query" for demo
  return { query, message: 'Demo only - query would be executed on backend' };
}
