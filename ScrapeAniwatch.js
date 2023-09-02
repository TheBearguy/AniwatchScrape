
function AniwatchScrape() {
  const url = 'https://aniwatch.to/home';
  const response = UrlFetchApp.fetch(url);
  const html = response.getContentText();

  var sheetName = 'Anime';
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

  sheet.clear();

  var headers = ['Img', 'Title', 'Type', 'Time', 'Quality', 'Date', 'Description'];
  sheet.appendRow(headers);

  // Load the HTML content with Cheerio
  var $ = Cheerio.load(html);

  // Find elements containing anime data and extract information
  $('div.deslide-item').each(function (index, element) {
    var imgSrc = $(element).find('img.film-poster-img.lazyload').attr('data-src');
    var title = $(element).find('.desi-head-title').text();
    var type = $(element).find('.scd-item:eq(0)').text();
    var time = $(element).find('.scd-item:eq(1)').text();
    var quality = $(element).find('.quality').text();
    var date = $(element).find('.scd-item.m-hide').text();
    var description = $(element).find('.desi-description').text();

    sheet.appendRow([imgSrc, title, type, time, quality, date, description]);
  });
}
