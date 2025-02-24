import { setInitCookies } from '@/app/[table]/actions';

export async function initCookies(params: { table: string }) {
  try {
    await setInitCookies(params);
    console.log('Cookies initialized successfully.');
  } catch (error) {
    console.error('Failed to set cookies:', error);
  }
}
