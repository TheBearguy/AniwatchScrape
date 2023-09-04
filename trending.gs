
function YoutubeScrape() {
  const url = 'https://aniwatch.to/home';
  const response = UrlFetchApp.fetch(url);
  const html = response.getContentText();

  var sheetName = 'Trending';
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

  sheet.clear();

  var headers = ['Order', 'Title', 'Img'];
  sheet.appendRow(headers);

  // Load the HTML content with Cheerio
  var $ = Cheerio.load(html);

  // Find elements containing anime data and extract information
  $('div.swiper-slide').each(function (index, element) {

    var order = $(element).find('div.number .span').text();
    var title = $(element).find('div.film-title').text();
    var img = $(element).find('img.film-poster-img').attr('data-src')

    sheet.appendRow([order, title, img]);
  });
}
