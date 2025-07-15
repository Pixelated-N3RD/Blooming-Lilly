function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (you'll need to create this)
    const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE');
    const sheet = spreadsheet.getSheetByName('Visitors');
    
    // Prepare the row data
    const rowData = [
      new Date(), // Timestamp
      data.name, // Visitor Name
      data.timestamp, // Original timestamp
      data.userAgent, // Browser info
      data.referrer // Where they came from
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'status': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'status': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to set up the spreadsheet headers (run this once)
function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE');
  const sheet = spreadsheet.getSheetByName('Visitors');
  
  // Set up headers
  const headers = ['Timestamp', 'Name', 'Original Timestamp', 'Browser Info', 'Referrer'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#39c6d6');
  sheet.getRange(1, 1, 1, headers.length).setFontColor('white');
} 
