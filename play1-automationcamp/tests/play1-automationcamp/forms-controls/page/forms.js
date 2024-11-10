import path from "path";
import { BasePage } from "../../pages/base";
import { expect } from '@playwright/test';

export class FormsPage extends BasePage{
  constructor(page) {
    super(page);
  };

  async checkAndValidate(selector, validationSelector, expectedResult) {
    const locator = this.page.getByLabel(selector);
    const receivedResult = this.page.locator(validationSelector);

    await locator.check();
    await expect(receivedResult).toHaveText(expectedResult);
  };

  async selectAndValidate(selector, validationSelector, option, expectedResult) {
    const locator = this.page.getByLabel(selector);
    const receivedResult = this.page.locator(validationSelector);

    await locator.selectOption({ label: option });
    await expect(receivedResult).toHaveText(expectedResult);
  };

  async typeAndValidate(selector, validationSelector, expectedText) {
    const locator = this.page.locator(selector);
    const receivedResult = this.page.locator(validationSelector);

    await locator.pressSequentially(expectedText);
    await expect(receivedResult).toHaveText(expectedText);
  };

  async fillForm() {
    const mandatorySkill = this.page.getByPlaceholder('Common Sense');
    const speaksGerman = this.page.getByText('Speaks German?');
    const speaksGermanExpect = this.page.locator('#german_validate');
    const germanLvl = this.page.getByLabel('German Fluency Level');
    const germanLvlExpect = this.page.locator('#fluency_validate');
    const uploadSingleFile = this.page.getByLabel('Upload CV (SINGLE FILE)');
    const uploadSingleFileExpect = this.page.locator('#validate_cv');
    // TODO: make expect check for this
    const uploadMultiFile = this.page.getByLabel('Upload Certificates (MULTIPLE FILES)');
    
    const downloadPromise = this.page.waitForEvent('download');
    const downloadBtn = await this.page.locator('a', { hasText: ' Click here to Download'});
    
    // Date
    const germanLvlText = '5';
    const uploadCVName = 'CV-Timurs_Boronenko_Main.pdf';
    const uploadSingleFilePath = path.join(`tests/test-data/forms/${uploadCVName}`);
    const uploadMultiFilePaths = [
      path.join('tests/test-data/forms/cesis-image.JPG'),
      path.join('tests/test-data/forms/insta-photo.JPG'),
    ];

    await this.typeAndValidate('#exp', '#exp_help', '2');
    
    await this.checkAndValidate('JavaScript', '#check_validate', 'JAVASCRIPT');
    await this.checkAndValidate('Selenium', '#rad_validate', 'SELENIUM');
    
    await this.selectAndValidate('Primary Skill', '#select_tool_validate', 'Cypress', 'cyp');
    await this.selectAndValidate('Choose Language', '#select_lang_validate', 'TypeScript', 'typescript');
    
    await this.typeAndValidate('#notes', '#area_notes_validate', 'Hello, World!');
    
    await mandatorySkill.click();
    
    await speaksGerman.check();
    await expect(speaksGermanExpect).toHaveText('true');
    
    await germanLvl.fill(germanLvlText);
    await expect(germanLvlExpect).toHaveText(germanLvlText);

    await uploadSingleFile.setInputFiles(uploadSingleFilePath);
    await expect(uploadSingleFileExpect).toHaveText(uploadCVName);

    await uploadMultiFile.setInputFiles(uploadMultiFilePaths);

    // TODO: Flaky part
    await downloadBtn.click();

    const download = await downloadPromise;
    expect(await download.suggestedFilename()).toBe('sample_text.txt');
  };

  async formValidation() { 
    const cityField = await this.page.getByPlaceholder('City');
    const stateField = await this.page.getByPlaceholder('State');
    const zipField = await this.page.getByPlaceholder('Zip');
    const checkBox = await this.page.getByText('Agree to terms and conditions');
    const submitBtn = await this.page.getByRole('button', { name: 'Submit Form'});

    await cityField.fill('Riga');
    await stateField.fill('State');
    await zipField.fill('LV-1012');
    await checkBox.check();
    await submitBtn.click();

    await this.page.waitForLoadState('load');
  };

  async handleNonEnglish() {
    const textField = await this.page.getByLabel('आपले नांव लिहा');
    const textFieldValidation = await this.page.locator('#नाव_तपासा');
    const checkBox = await this.page.getByLabel('मराठी');
    const checkBoxValidation = await this.page.locator('#check_validate_non_english');

    const text = 'Hello, World!';

    await textField.pressSequentially(text);
    await expect(textFieldValidation).toHaveText(text);

    await checkBox.click();
    await expect(checkBoxValidation).toHaveText('मराठी');
  };
};