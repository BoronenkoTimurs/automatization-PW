import test, { APIRequestContext, expect } from "@playwright/test";

const parseCookies = async (setCookieHeader) => {
    const cookiesMap = new Map();

    if (!setCookieHeader) return cookiesMap;

    const cookiesArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];

    for (const cookie of cookiesArray) {
        const [cookieNameValue] = cookie.split(';');
        const [name, value] = cookieNameValue.split('=');
        
        if (name && value) {
            cookiesMap.set(name.trim(), value.trim());
        }
    }
    return cookiesMap;
};

test('Context request will share cookie storage with its browser context', async ({ page, context }) => {
  await context.route('https://www.github.com/', async ( route ) => {
    const response = await context.request.fetch(route.request());
    const responseHeaders = response.headers();

    // TODO: Ask Nikita
    const responseCookies = await parseCookies(responseHeaders['set-cookie']);
    expect(responseCookies.size).toBe(3);
    
    const contextCookies = await context.cookies();
    expect(new Map(contextCookies.map(({ name, value }) => [name, value]))).toEqual(responseCookies);

    await route.fulfill({
      response,
      headers: {...responseHeaders, foo: 'bar'},
    });
  });

  await page.goto('https://www.github.com/');
});

test('Global context request has isolated cookie storage', async ({ page, context, browser, playwright}) => {
  const request = await playwright.request.newContext();
  
  // Take answer FROM the server and do something(in our case "save headers")
  await context.route('https://www.github.com/', async ( route ) => {
    const response = await request.fetch(route.request());
    const responseHeaders = response.headers();

    // TODO: Ask Nikita
    const responseCookies = new Map(responseHeaders['set-cookie']
      .split('\n')
      .map(c => c.split(';', 2)[0].split('=')));

    expect(responseCookies.size).toBe(3);
    
    const contextCookies = await context.cookies();
    expect(contextCookies.length).toBe(0);
    
    const storageState = await request.storageState();

    const browserContext2 = await browser.newContext({ storageState });
    const contextCookies2 = await browserContext2.cookies();

    expect(new Map(contextCookies2.map(({name, value}) => ([name, value])))).toEqual(responseCookies);

    await route.fulfill({ 
      response,
      headers: { ...responseHeaders, foo: 'bar'},
    });
  });

  await page.goto('https://www.github.com/');
  await request.dispose();
});