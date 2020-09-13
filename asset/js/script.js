$(document).ready(function () {
  function getLocalStorage(key) {
    var value = localStorage.getItem(key);
    var elId = "#text" + key;
    if (value) {
      $(elId).text(value);
    }
  }
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
  for (let i = 9; i < 18; i++) {
    // create a row
    var row = $('<div class="row">');
    row.attr("id", i);
    row.attr("data-time", i);

    // create a column
    var col1 = $(
      '<div class="col-sm-2"> <p class="hour">' + formatAMPM(i) + "</p>"
    );

    //create column 2
    var textArea = $(
      "<textarea class='description' placeholder='Add your event here...'>"
    );
    textArea.attr("id", "text"+i);
    var col2 = $('<div class="col-sm-8 past">');
    col2.append(textArea);

    //create column 3
    var saveBtn = $("<button class='saveBtn'> <i class='fas fa-save'></i>");
    saveBtn.attr("id", i);
    var col3 = $('<div class="col-sm-2">');
    col3.append(saveBtn);

    // append col to row
    row.append(col1);
    row.append(col2);
    row.append(col3);

    // last step add rows to container
    $(".container").append(row);

    getLocalStorage(i);
  }
// time formatting function
  function formatAMPM(hours) {
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ampm;
  }

  // update color code segment
  function updateColors() {
    var currentTime = new Date().getHours();
    for (var i = 9; i < 18; i++) {
      var elid = "#" + i;
      var _id = "#text" + i;    
      if ($(elid).data("time") == currentTime) {
        $(_id).addClass("present");
      } else if (currentTime < $(elid).data("time")) {
        $(_id).addClass("future");
      }
    }
  }
// Time interval
  setInterval(function () {
    updateColors();
  }, 1000);

//   save button click event handler
  var saveBtn = $(".saveBtn");
  saveBtn.on("click", function () {
    var eventId = $(this).attr("id");
    var eventText = $(this).parent().siblings().children(".description").val();
    localStorage.setItem(eventId, eventText);
  });
});
