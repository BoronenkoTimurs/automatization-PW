import test, { APIRequestContext, expect, Page } from "@playwright/test";

export class JsonPlaceholderApi {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext){
    this.request = request;
  };

  async getBookById(id: number) {
    await test.step('Get Book By Id', async () => {
      const todo = await this.request.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const body = await todo.json();

      expect(body).toStrictEqual({
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      });
    });
  };

  async postBook() {
    await test.step('Post a new Book', async () => {
      const data = {
        title: 'foo',
        body: 'bar',
        userId: 1,
      };

      const todo = await this.request.post(`https://jsonplaceholder.typicode.com/todos`, { data });

      expect(todo.status()).toBe(201);
    });
  };
};