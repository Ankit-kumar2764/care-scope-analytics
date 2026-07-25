const AUTH_KEY = 'carescope-user';

export interface MockUser {
  name: string;
  email: string;
  role: string;
  initials: string;
}

export function getMockUser(): MockUser | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(AUTH_KEY);
  return raw ? (JSON.parse(raw) as MockUser) : null;
}

export function signInMock(user: MockUser) {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function signOutMock() {
  window.localStorage.removeItem(AUTH_KEY);
}