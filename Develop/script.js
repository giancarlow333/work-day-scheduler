// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Listener for click events on the save button. This code uses
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  // Select all save buttons
  var saveBtns = $(".saveBtn");

  // Add listener to each button to add item to localStorage
  saveBtns.on("click", function() {
    var btnID = $(this).parent().attr("id");
    var btnValue = $(this).parent().children().eq(1).val();
    localStorage.setItem(btnID, btnValue);
  });

  // Code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  var thisHour = dayjs().format("H");
  //thisHour = 10; // for testing only

  // Select all divs with hour data
  var hourDivs = $('div').eq(0).children();

  // go through each and change classes as needed
  $.each(hourDivs, function() {
    var divID = $(this).attr("id");

    // parse the id to get the hour
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

  // Code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  $.each(hourDivs, function() {
    var divID = $(this).attr("id");
    var storedItem = localStorage.getItem(divID);
    if (storedItem) {
      $(this).children().eq(1).val(storedItem);
    }
  });

  // Display the current date in the header of the page.
  var toDay = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(toDay);
});
