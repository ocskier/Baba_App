$(document).ready(function() {
  var textTitle = $("textarea#text-title");
  var textBody = $("textarea#text-body");
  var textSubject = $("#subject-input-lesson");
  var textAge = $("#age-input-lesson");

  $("#submit-text").on("click", function(event) {
    event.preventDefault();
    var userTextInput = {
      title: textTitle.val().trim(),
      description: textBody.val().trim(),
      subject: textSubject.val(),
      ageGroup: textAge.val()
    };

    console.log(userTextInput);

    submitLesson(
      userTextInput.title,
      userTextInput.description,
      userTextInput.subject,
      userTextInput.ageGroup
    );

    textTitle.val("");
    textBody.val("");
  });

  $("#savedLessonsRow").on("click", ".lesson", function() {
    //   var url = $(this).data("url");
    var lessonId = $(this).attr("id");
    var cardTitle = $("#" + lessonId + " span").text();
    var cardDescrip = $("#" + lessonId + " p").text();
    $("#matchCard .modal-content h4").text(cardTitle);
    $("#matchCard .modal-content p").text(cardDescrip);
    var instance = M.Modal.getInstance($("#modal1"));
    instance.open();
  });

  function submitLesson(title, description, subject, ageGroup) {
    $.post("/api/lesson", {
      title: title,
      description: description,
      subject: subject,
      grade: ageGroup
    }).then(function(data) {
      console.log(data);
    });
  }

  $.ajax({ url: "/api/user_data", method: "GET" }).then(function(data) {
    var name = data.name;
    var subject = data.subject;
    var grade = data.grade;
    var userId = data.id;
    console.log(subject, name, grade, userId);

    $('#user-name').text(name);
    $('#subject-name').text(subject);
    $('#grade-name').text(grade);

    var url = "/api/userPlan/" + userId;
    console.log(url);

    $.ajax({ url: url, method: "GET" }).then(function(data) {
      console.log(data);
      for (i = 0; i < data.length; i++) {
        var newLi = $(
          '<li id="' +
            (i + 1) +
            '" class="collection-item avatar lesson" style="max-height:275px">'
        );
        newLi.append(
          $('<i class="material-icons circle">folder</i>'),
          $('<span class="title">' + data[i].title + "</span>"),
          $(" <p>" + data[i].description + "</p>"),
          $(
            '<a href="#modal1" class="secondary-content modal-trigger" data-target="modal1"><i class="material-icons">grade</i></a>'
          )
        );
        $("#savedLessonsRow").append(newLi);
      }
    });
  });
});
