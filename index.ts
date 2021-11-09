import puppeteer, { Browser, Page } from "puppeteer";

type Content = {
  page: string;
  data: any;
};

// Add a list of all the pages you want to grab the values from
const pages = [
  "file:///Users/tomleost/Projects/rPageScraper/pages/edgar_data_2186_0001654954-20-012366.html",
  "file:///Users/tomleost/Projects/rPageScraper/pages/edgar_data_2186_0001654954-20-008613.html",
];

const getPage = async (url: string, page: Page) => {
  await page.goto(url);
  const content: string[] = [];
  const selectors = await page.$$("font");

  for (const index in selectors) {
    const raw = await page.evaluate((el) => el.textContent, selectors[index]);
    if (raw !== "" && raw !== " ") content.push(raw);
  }
  return content;
};

const app = async () => {
  // Create the Puppeteer Headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // All the content
  const content: Content[] = [];

  for (const index in pages) {
    const url = pages[index];
    const data = await getPage(url, page);
    const finalData: string[] = [];

    let grabValue = false;

    data.forEach((value) => {
      if (value.includes("7.01")) {
        grabValue = true;
        finalData.push(value);
      } else if (value.includes("9.01")) {
        grabValue = false;
      } else if (grabValue) {
        finalData.push(value);
      }
    });

    content.push({
      page: url,
      data: finalData,
    });
  }

  console.log(content);
};

// Run App
app();
