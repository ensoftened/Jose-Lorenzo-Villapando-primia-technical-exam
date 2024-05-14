export function formatDateTime(dateTime: string) {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("THE DATETIME ", dateTime)
  var date = new Date(dateTime)
 ////////////////////////////////////////////////////////////////////////////////////console.log  ("POST", date)
 // ////////////////////////////////////////////////////////////////////////////////////console.log  ("POST2", date.toISOString())


  
  var year = date.getFullYear()
  var day = (date.getDate()<10) ? "0" + date.getDate() : date.getDate();
  var month = (date.getMonth()<10) ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);


  // Hours part from the timestamp
  var hour = (date.getHours()<10) ? "0" + date.getHours() : date.getHours();
  var minute = (date.getMinutes()<10) ? "0" + date.getMinutes() : date.getMinutes();
  var second = (date.getSeconds()<10) ? "0" + date.getSeconds() : date.getSeconds();

  // Will display time in 10:30:23 format
  //var formattedTime = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second
  var formattedDate = year + "-" + month + "-" + day
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var tempDate = formattedDate.split("-");

  var convertedDate = months[Number(tempDate[1]) - 1] + " " + tempDate[2] + ", " + tempDate[0];
  var convertedTime = hour + ":" + minute + ":" + second



  return {
    convertedDate,
    convertedTime
  }
}