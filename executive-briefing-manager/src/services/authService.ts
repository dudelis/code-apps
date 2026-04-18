import {
  PublicClientApplication,
  InteractionRequiredAuthError,
  type AccountInfo,
} from '@azure/msal-browser';
import { getContext } from '@microsoft/power-apps/app';

const CLIENT_ID = '850eec8f-d740-4088-8d3d-99b9b2eea836';
const TENANT_ID = '1e7886bb-4ad8-4924-b559-29c5f5fea8f5';
const SCOPES = ['https://service.powerapps.com/.default'];

let _pca: PublicClientApplication | null = null;
let _initPromise: Promise<PublicClientApplication> | null = null;

async function initMsal(): Promise<PublicClientApplication> {
  const pca = new PublicClientApplication({
    auth: {
      clientId: CLIENT_ID,
      authority: `https://login.microsoftonline.com/${TENANT_ID}`,
      redirectUri: 'https://apps.powerapps.com',
    },
    cache: { cacheLocation: 'localStorage' },
  });
  await pca.initialize();
  // Clear any leftover interaction state from previous sessions
  await pca.handleRedirectPromise().catch(() => {});
  _pca = pca;
  return pca;
}

function getMsalInstance(): Promise<PublicClientApplication> {
  if (_pca) return Promise.resolve(_pca);
  if (!_initPromise) _initPromise = initMsal();
  return _initPromise;
}

async function getLoginHint(): Promise<string | undefined> {
  try {
    const ctx = await getContext();
    return ctx.user.userPrincipalName;
  } catch {
    return undefined;
  }
}

function findAccount(pca: PublicClientApplication, hint?: string): AccountInfo | null {
  const accounts = pca.getAllAccounts();
  if (!accounts.length) return null;
  if (hint) {
    return accounts.find(a => a.username.toLowerCase() === hint.toLowerCase()) ?? accounts[0];
  }
  return accounts[0];
}

// Prevent concurrent token acquisitions
let _tokenPromise: Promise<string> | null = null;

export function acquireToken(): Promise<string> {
  if (_tokenPromise) return _tokenPromise;
  _tokenPromise = doAcquireToken().finally(() => { _tokenPromise = null; });
  return _tokenPromise;
}

async function doAcquireToken(): Promise<string> {
  const pca = await getMsalInstance();
  const hint = await getLoginHint();
  const account = findAccount(pca, hint);

  // 1. Cached account — fully silent
  if (account) {
    try {
      const result = await pca.acquireTokenSilent({ scopes: SCOPES, account });
      return result.accessToken;
    } catch (e) {
      if (!(e instanceof InteractionRequiredAuthError)) throw e;
    }
  }

  // 2. Popup fallback — only on first use; token is cached in localStorage afterwards
  const result = await pca.acquireTokenPopup({ scopes: SCOPES, loginHint: hint });
  return result.accessToken;
}
