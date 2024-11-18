import test, { APIRequestContext, BrowserContext, expect, Page, request } from "@playwright/test";
import { GitHubApi } from "../../steps/githubapi";
import { GitHub } from "../../steps/github";

const USER = 'BoronenkoTimurs';
const REPO = 'new-repo';

let context: BrowserContext;
let page: Page;
let github: GitHub;
let githubapi: GitHubApi;
let apiContext: APIRequestContext;

test.describe('@github GitHub Api', () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    apiContext = await request.newContext({
      baseURL: 'https://api.github.com',
      extraHTTPHeaders: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${process.env.API_TOKEN}`
      },    
    });

    github = new GitHub(page);
    githubapi = new GitHubApi(page, apiContext);

    await githubapi.createRepository(REPO);
  });
  
  test.afterAll(async () => {
    await githubapi.deleteRepository(USER, REPO);
    await apiContext.dispose();
    await context.close();
  });

  test('Create GitHub Issue via API', async () => {
    await githubapi.createIssue(USER, REPO);

    await githubapi.getIssues(USER, REPO);

    await github.goTo(`https://github.com/${USER}/${REPO}/issues`);
  
    await github.verifyFirstIssue();
  });
});