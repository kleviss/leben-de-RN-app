import { getBaseUrl } from '../../utils/enviroinment';

const API_BASE_URL = getBaseUrl();

export const CATEGORIES_API = {
  GET_ALL: `${API_BASE_URL}/categories`,
  CREATE: `${API_BASE_URL}/categories`,
  UPDATE: (id) => `${API_BASE_URL}/categories/${id}`,
  DELETE: (id) => `${API_BASE_URL}/categories/${id}`,
};

export const QUESTIONS_API = {
  GET_ALL: `${API_BASE_URL}/questions`,
  GET_V2: `${API_BASE_URL}/questions/v2`,
};
