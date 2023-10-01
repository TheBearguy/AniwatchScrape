
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

  
  // Find elements containing anime data and extract information
  $('.flw-item').each((index: number, element: CheerioElement) => {
    const title: string | undefined = $(element).find('.film-name a').attr('title');
    const imgSrc: string | undefined = $(element).find('.film-poster-img').attr('data-src');
    const type: string = $(element).find('.fdi-item:first-child').text();
    const time: string = $(element).find('.fdi-duration').text();
    const description: string = $(element).find('.description').text();
    const sub: string = $(element).find('.tick-item.tick-sub').text();
    const dub: string = $(element).find('.tick-item.tick-dub').text();
    const noOfEpisodes: string = $(element).find('.tick-item.tick-eps').text();

    sheet.appendRow([imgSrc, title, type, time, sub, dub, noOfEpisodes, description]);
  });
}
