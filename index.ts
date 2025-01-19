import fetch from 'node-fetch';
import {existsSync, readFileSync} from 'fs';
import {resolve, join} from 'path';

class Localize {
  private language: string;
  private googleTranslateKey?: string;
  private basePath: string;

  constructor(language: string, googleTranslateKey?: string) {
    this.language = language;
    this.googleTranslateKey = googleTranslateKey;
    this.basePath = resolve(__dirname, 'localization');
  }

  public set(language: string): void {
    this.language = language;
  }

  public async translate(text: string, targetLang: string): Promise<string> {
    if (!this.googleTranslateKey) {
      throw new Error('Google Translate API key is required for live translations.');
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${this.googleTranslateKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, target: targetLang })
    });

    if (!response.ok) {
      throw new Error(`Translation API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
  }

  public localize(key: string, language: string = this.language, autoTranslate: boolean = false): string | Promise<string> {
    const segments = key.split('-');
    const filePath = join(this.basePath, ...segments.slice(0, -1), `${language}.json`);

    if (existsSync(filePath)) {
      const fileContent = JSON.parse(readFileSync(filePath, 'utf-8'));
      const localizedString = fileContent[segments[segments.length - 1]];

      if (localizedString) {
        return localizedString;
      }
    }

    if (autoTranslate && this.googleTranslateKey) {
      return this.translate(key, language);
    }

    throw new Error(`Localization key "${key}" not found for language "${language}".`);
  }
}

export default {
  local: Localize
};
