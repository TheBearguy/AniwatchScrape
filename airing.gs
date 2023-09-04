function AiringScrape() {
  const url = 'https://aniwatch.to/top-airing'
  const response = UrlFetchApp.fetch(url)
  const html = response.getContentText()

  var sheetName = 'Airing';
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

  sheet.clear();

  var headers = ['Img', 'Title', 'Type', 'Time','Subbed Episodes', 'Dubbed Episodes', 'No. of Episodes', 'Description'];
  sheet.appendRow(headers);

  // Load the HTML content with Cheerio
  var $ = Cheerio.load(html);

  // Find elements containing anime data and extract information
 $('.flw-item').each((index, element) => {
  const title = $(element).find('.film-name a').attr('title');
  const imgSrc = $(element).find('.film-poster-img').attr('data-src');
  const type = $(element).find('.fdi-item:first-child').text();
  const time = $(element).find('.fdi-duration').text();
  const description = $(element).find('.description').text();
  const sub = $(element).find('.tick-item.tick-sub').text();
  const dub = $(element).find('.tick-item.tick-dub').text();
  const noOfEpisodes = $(element).find('.tick-item.tick-eps').text();

    sheet.appendRow([imgSrc, title, type, time,sub, dub, noOfEpisodes, description]);
  });
}
