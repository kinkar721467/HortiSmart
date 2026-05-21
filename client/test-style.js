import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // 1. Load the page (defaults to light mode/no class)
  await page.goto('http://localhost:5174/storage-finder');
  await page.waitForTimeout(2000);
  
  const lightResult = await page.evaluate(() => {
    const span = Array.from(document.querySelectorAll('span')).find(s => s.textContent.includes('Owner:'));
    if (!span) return { error: 'No Owner span found' };
    const style = window.getComputedStyle(span);
    return {
      mode: 'light',
      classes: span.className,
      color: style.color,
      fontWeight: style.fontWeight
    };
  });
  console.log('Light Mode Style:', lightResult);

  // 2. Enable dark mode manually (add .dark class to html)
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(500);

  const darkResult = await page.evaluate(() => {
    const span = Array.from(document.querySelectorAll('span')).find(s => s.textContent.includes('Owner:'));
    if (!span) return { error: 'No Owner span found' };
    const style = window.getComputedStyle(span);
    return {
      mode: 'dark',
      classes: span.className,
      color: style.color,
      fontWeight: style.fontWeight
    };
  });
  console.log('Dark Mode Style:', darkResult);

  await browser.close();
})();
