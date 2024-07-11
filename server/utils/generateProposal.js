import puppeteer from "puppeteer";
import fs from "fs-extra";
import hbs from "handlebars";
import path from "path";

hbs.registerHelper("formatDate", function (dateString) {
  const parsedDate = new Date(dateString);

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
});

hbs.registerHelper("multiply", function (one, two) {
  return one * two;
});

hbs.registerHelper("add", function (one, two) {
  return one + two;
});

const compile = async (templateName, data) => {
  const filePath = path.join(
    process.cwd(),
    "public/templateData",
    `${templateName}.hbs`
  );
  const html = await fs.readFile(filePath, "utf8");
  return hbs.compile(html)({ data });
};

export const generateProposal = async (data) => {
  try {
    const browser = await puppeteer.launch({
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    });
    const page = await browser.newPage();
    const content = await compile("proposal_template", data);
    await page.setContent(content);
    await page.pdf({
      path: "public/proposal_doc/output.pdf",
      format: "A4",
      printBackground: true,
    });
    await browser.close();
    return true;
  } catch (error) {
    console.error("Error generating proposal:", error);
    return false;
  }
};
