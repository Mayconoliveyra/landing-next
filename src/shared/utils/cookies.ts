import { setCookie, destroyCookie, parseCookies } from 'nookies';

type ICookiesName = 'APP_ACCESS_TOKEN' | 'APP_THEME_NAME';
interface INookieOptions {
  maxAge: number; // Tempo de vida do cookie em segundos
  path: string; // Caminho onde o cookie é válido
  secure?: boolean; // Indica se o cookie requer conexão segura (HTTPS), opcional
  httpOnly?: boolean; // Indica se o cookie é acessível apenas por HTTP, opcional
}

// Função para definir
const setCustomCookie = (cookieName: ICookiesName, cookieValue: string, options: INookieOptions) => {
  setCookie(null, cookieName, cookieValue, options);
};

// Função para resgatar
const getCustomCookie = (cookieName: ICookiesName) => {
  const cookies = parseCookies();
  return cookies[cookieName];
};

// Função para destruir
const deleteCustomCookie = (cookieName: ICookiesName) => {
  destroyCookie(null, cookieName);
};

export { setCustomCookie, getCustomCookie, deleteCustomCookie };
