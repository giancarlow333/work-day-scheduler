// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Listener for click events on the save button. This code uses
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  // Select all save buttons
  var saveBtns = $(".saveBtn");
  console.log(saveBtns);

  // Add listener to each button to add item to localStorage
  saveBtns.on("click", function() {
    var btnID = $(this).parent().attr("id");
    var btnValue = $(this).parent().children().eq(1).val();
    localStorage.setItem(btnID, btnValue);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  var thisHour = dayjs().format("H");
  thisHour = 11; // for testing only

  // Select all divs with hour data
  var hourDivs = $('div').eq(0).children();

  // go through each and change classes as needed
  $.each(hourDivs, function() {
    // https://stackoverflow.com/questions/3239598/how-can-i-get-the-id-of-an-element-using-jquery
    var divID = $(this).attr("id");

    // parse the id to get the hour
    // https://stackoverflow.com/questions/13068225/parsing-text-with-jquery
    var divHour = $.trim(divID.split("-")[1]);
    
    if (divHour < thisHour) {
      $(this).addClass("past");
    }
    else if (divHour == thisHour) {
      $(this).addClass("present");
    }
    else {
      $(this).addClass("future");
    }
  });
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $.each(hourDivs, function() {
    var divID = $(this).attr("id");
    var storedItem = localStorage.getItem(divID);
    if (storedItem) {
      $(this).children().eq(1).val(storedItem);
    }
  });
  //
  // TODO: Add code to display the current date in the header of the page.
  var toDay = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(toDay);
});
