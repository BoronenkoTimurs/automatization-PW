import test, { Page, APIRequestContext, expect, Locator } from "@playwright/test";

export class GitHubApi {
  public readonly request: APIRequestContext;
  public readonly firstIssue: Locator;

  public constructor(private readonly page: Page, request: APIRequestContext){
    this.request = request;
    this.firstIssue = page.locator(`a[data-hovercard-type='issue'`).first();
  };

  async createIssue(user: string, repo: string): Promise<void> {
    await test.step('Create new GitHub Issue', async () => {
      const issue = await this.request.post(`/repos/${user}/${repo}/issues`, {
        data: {
          title: '[Bug] Title',
          body: 'Bug Body',
        },
      });

      const status = issue.status();
  
      expect(status).toBe(201);
    });
  };

  async getIssues(user: string, repo: string): Promise<void> {
    await test.step('Receive list of Issues', async () => {
      const issues = await this.request.get(`/repos/${user}/${repo}/issues`);

      const status = issues.status();

      expect(status).toBe(200);

      expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] Title',
        body: 'Bug Body',
      }));
    });
  };

  async createRepository(repo: string): Promise<void> {
    await test.step('Create new GitHub Repository', async () => {
      const repository = await this.request.post('/user/repos', {
        data: {
          name: repo,
        }
      });

      const status = repository.status();
      
      expect(status).toBe(201);
    });
  };

  async deleteRepository(user: string, repo: string): Promise<void> {
    await test.step('Delete Repository', async () => {
      const response = await this.request.delete(`/repos/${user}/${repo}`);
      const status = response.status();

      expect(status).toBe(204);
    });
  };
};