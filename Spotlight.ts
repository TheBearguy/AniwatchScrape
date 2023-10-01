
function AiringScrape(): void {
  const url: string = 'https://aniwatch.to/top-airing';
  const response: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(url);
  const html: string = response.getContentText();

  const sheetName: string = 'Airing';
  const spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet: GoogleAppsScript.Spreadsheet.Sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

  sheet.clear();

  const headers: string[] = ['Img', 'Title', 'Type', 'Time', 'Subbed Episodes', 'Dubbed Episodes', 'No. of Episodes', 'Description'];
  sheet.appendRow(headers);

  // Load the HTML content with Cheerio
  const $: CheerioStatic = Cheerio.load(html);
