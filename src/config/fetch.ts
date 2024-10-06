'use server';

import { siteConfig } from './site';
import { cookies } from 'next/headers';

const customFetch = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const accessToken = cookies().get('access-token')?.value;

  // Set up headers
  const headers = {
    ...init?.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  // Prepare the full request config
  const fetchConfig: RequestInit = {
    ...init,
    headers,
  };

  // Add base URL if the input is a relative path
  const url =
    typeof input === 'string' && !input.startsWith('http')
      ? `${siteConfig.baseApiURL}${input}`
      : input;

  try {
    // Make the fetch request
    const response = await fetch(url, fetchConfig);

    // Handle non-2xx responses as errors
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    // Handle request error
    console.error('Fetch request failed:', error);
    throw error;
  }
};

export default customFetch;
