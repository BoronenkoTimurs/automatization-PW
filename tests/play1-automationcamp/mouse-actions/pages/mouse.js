import { expect } from '@playwright/test';
import { BasePage } from "../../pages/base";

export class MousePage extends BasePage {
  constructor(page) {
    super(page);
  };

  async clickOnArea() {
    const area = this.page.locator('#click_area');
    const clickType = this.page.locator('#click_type');
    const xPositionLabel = this.page.locator('#click_x');
    const yPositionLabel = this.page.locator('#click_y');
    
    const click = 'Click';
    const doubleClick = 'Double-Click';
    const zeroPosition = { position: { x: 0, y: 0 }} ;
    const middlePosition = { position: { x: 260, y: 100 }} ;

    await area.click(zeroPosition);
    await expect(clickType).toHaveText(click);
    await expect(xPositionLabel).toHaveText('Left: 0');
    // TODO: Invistigate why its -1 when click y: 0
    await expect(yPositionLabel).toHaveText('Top: -1');
    
    await area.dblclick(zeroPosition);
    await expect(clickType).toHaveText(doubleClick);
    await expect(xPositionLabel).toHaveText('Left: 0');
    // TODO: Invistigate why its -1 when click y: 0
    await expect(yPositionLabel).toHaveText('Top: -1');
    
    
    await area.click(middlePosition);
    await expect(clickType).toHaveText(click);
    await expect(xPositionLabel).toHaveText('Left: 260');
    // TODO: Invistigate why its -1 when click y: 0
    await expect(yPositionLabel).toHaveText('Top: 99');
  };

  async mouseHover() {
    const dropDownBtn = this.page.getByRole('button', { name: 'Choose Language'});
    const javaBtn = this.page.locator('#dd_java');
    const pythonBtn = this.page.locator('#dd_python');
    const jsBtn = this.page.locator('#dd_javascript');

    const validation = this.page.locator('#hover_validate');
    const java = 'Java';
    const python = 'Python';
    const js = 'JavaScript';

    
    await dropDownBtn.hover();

    await javaBtn.click();
    await expect(validation).toHaveText(java);

    await pythonBtn.click();
    await expect(validation).toHaveText(python);

    await jsBtn.click();
    await expect(validation).toHaveText(js);
  };

  async dragAndDrop() {
    const dragSoure = this.page.locator('#drag_source');
    const dropTarget = this.page.locator('#drop_target');

    const successMsg = 'Drop is successful!';

    await dragSoure.dragTo(dropTarget);

    await expect(dropTarget).toHaveText(successMsg);
  };
};