import test, { APIRequestContext, request } from "@playwright/test";
import { JsonPlaceholderApi } from "../../steps/jsonPlaceholderApi";

let apiConext: APIRequestContext;

test.describe('@jsonplaceholder @book Api calls to todo list', async () => {
  test.beforeAll(async () => {
    apiConext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com/todos',
      extraHTTPHeaders: {
        'Accept': 'application/json'
      }
    });
  });

  test.afterAll(async () => {
    await apiConext.dispose();
  });

  test('Get Todo with Id 1', async () => {
    const jsonPlaceholderApi = new JsonPlaceholderApi(apiConext);

    await jsonPlaceholderApi.getBookById(1);
  });

  test('Post a new Todo', async () => {
    const jsonPlaceholderApi = new JsonPlaceholderApi(apiConext);

    await jsonPlaceholderApi.postBook();
  });
});