var totalPanels = 0;
var currentPanel = 0;
var completed = true;
var index = 0;
var valueCriteria = 1000;

$(document).ready(function() {

  // totalPanels = $('#mainContent .panel').length;

  // set panel
  adjustLayout();

  // set Data for each item
  setData();

  $(".inline-popups").mouseenter(function() {
    var _this = $(this).find("img")[0].id;
    var thisData = $("#"+_this).data();
    var food_id = $("#"+_this).data().id;
    setPopup(food_id);
  }).mouseleave(function() {
    closePopup();
  })


  // set Value for each item
  setValue();

  // Link range to menus
  $("#slider").change(function() {
    valueCriteria = $("#rangeValue").val();
    filterItems(valueCriteria);
  });

  // consequeses for list changed
  $("#faves").bind('DOMSubtreeModified',function(e) {
    var valueSum = 0;
    $.each($("#faves li"), function(i, item) {
      var id = $(item).data().id;
      valueSum += parseInt($("#"+id).data().calory)
    })
    filterItems(valueCriteria - valueSum);
  });

})

function filterItems(theValue) {
  $.each($("#menu .menu"), function(i, item) {
    $item = $(item);
    itemData = parseInt($item.data().calory);
    if (itemData <= theValue) {
      $item.animate({opacity: 1});
      itemData.matching = true;
    } else {
      $item.animate({opacity: 0.5});
      itemData.matching = false;
    }
  });
}

function closePopup() {
  $("#template #fatsecret_output_0").html('');
  $("#template #fatsecret_output_1").html('');
  $("#template #container").html('');

}

function setPopup(foodId) {
  var s = document.createElement('script');
  var scriptContent = "fatsecret.setContainer('container');";
  scriptContent += 'fatsecret.setCanvas("food.get", {food_id:"' + foodId + '"});';
  s.innerHTML = scriptContent;

  $("#template").append(s);

  var timeOut = setInterval(function() {
    if( $("#template").find(".fatsecret_nutritionpanel").length > 0 ) {
        clearInterval(timeOut);
        $("#popup-template").html($("#template .fatsecret_nutritionpanel").html());
        setContent();
      }
    }, 100)
}

function setData() {
  $('#classic1').data({ id: "25927", name: "Chicken Sandwich", photoUrl: 'C:/Users/JinaLee/MyProject/nav-menu-project/_images/ChickfilA-Chicken-Sandwich.png', calory: '400'});
  $('#classic2').data({ id: "1387599", name: "Chicken Deluxe Sandwich", photoUrl: 'C:/Users/JinaLee/MyProject/nav-menu-project/_images/Chicken-Deluxe-Sandwich.png', calory: '490'});
  $('#classic3').data({ id: "779759", name: "Spicy Chicken Sandwich", photoUrl: 'C:/Users/JinaLee/MyProject/nav-menu-project/_images/Spicy-Chicken-Sandwich.png', calory: '490'});
  $('#classic4').data({ id: "874825", name: "Spicy Chicken Deluxe Sandwich", photoUrl: 'C:/Users/JinaLee/MyProject/nav-menu-project/_images/Spicy-Chicken-Deluxe-Sandwich.png', calory: '570'});
  $('#classic5').data({ id: "27279", name: "Nuggets", photoUrl: 'C:/Users/JinaLee/MyProject/nav-menu-project/_images/Nuggets.png', calory: '270l'});
  $('#classic6').data({ id: "60107", name: "Chick-n-Strips", photoUrl: 'C:/Users/JinaLee/MyProject/nav-menu-project/_images/ChicknStrips.png', calory: '360'});
  $('#classic7').data({ id: "8267448", name: "Grilled Chicken Club Sandwich", photoUrl: 'C:/Users/JinaLee/MyProject/nav-menu-project/_images/Grilled-Chicken-Club-Sandwich.png', calory: '440'});
  $('#classic8').data({ id: "3373280", name: "Grilled Chicken Sandwich", photoUrl: 'C:/Users/JinaLee/MyProject/nav-menu-project/_images/Grilled-Chicken-Sandwich.png', calory: '320'});
  $('#classic9').data({ id: "60108", name: "Chicken Salad Sandwich", photoUrl: 'C:/Users/JinaLee/MyProject/nav-menu-project/_images/Chicken-Salad-Sandwich.png', calory: '500'});
  $('#classic10').data({ id: "7194136", name:"Grilled Nuggets", photoUrl: 'C:/Users/JinaLee/MyProject/nav-menu-project/_images/Grilled-Nuggets-6.png', calory: '140'});

}

function setContent() {
  $(".inline-popups").magnificPopup({
    mainClass: 'mfp-with-zoom',
    removalDelay: 500,
    midClick: true
  })
}
// function setContent() {
//   var s = document.createElement('script');
//   var scriptContent = "fatsecret.setContainer('container');";
//   scriptContent += 'fatsecret.setCanvas("food.get", {food_id:"60181"});';
//   s.innerHTML = scriptContent;
//     if (completed === true) {
//       completed = false;
//       var _this = $("#menu .menu")[index];
//   // $("#menu .menu").each(function(index) {
//     // var _this = this;
//     // for (var i =0; i<2; i++) {
//     //     var _this = $("#menu .menu")[i];
//         // var temp = $("#template").html();
//         // $("#template").html(temp);
//
//         var s = document.createElement('script');
//         var foodId = $("#" + _this.id).data().id;
//
//         var scriptContent = "fatsecret.setContainer('container');";
//           scriptContent += 'fatsecret.setCanvas("food.get", {food_id:"' + foodId + '"});';
//           s.innerHTML = scriptContent;
//
//         $("#template").append(s);
//         console.log(index);
//         getResult();
//         // var timeOut = setInterval(function() {
//         //   if( $("#template").find(".fatsecret_nutritionpanel").length > 0 ) {
//         //         clearInterval(timeOut);
//         //         num++;
//         //         // alert(($("#template").html()));
//         //         // console.log($("#template").find(".fatsecret_nutritionpanel").html());
//         //         // console.log(_this.id);
//         //         // var popupContent = $("#template .fatsecret_nutritionpanel").html();
//         //         // $("#"+_this.id).data({content: popupContent});
//         //         // $(_this).click(function(index, content){
//         //           // return contentPopup(index,content)
//         //         // }(_this, popupContent))
//         //     }
//         //   }, 100)
//       } else {
//         setTimeout(setContent, 500);
//       }
//   // })
//
// }

function getResult() {
  if ($("#template").find(".fatsecret_nutritionpanel").length > 0) {
    completed = true;
    console.log(index);
    index++;
    // var myWin = window.open("",foodId);
    // myWin.document.write($("#template").html());
  } else {
    setTimeout(getResult(), 1000);
  }
}

function contentPopup(elem, content) {
  $("#popup-template").html(content);

  $(elem).parent(".inline-popups").magnificPopup({
    mainClass: 'mfp-with-zoom',
    removalDelay: 500,
    callbacks: {
      beforeOpen: function() {
        this.st.mainClass = this.st.el.attr('data-effect');
      },
      close: function() {
      }
    },
    midClick: true
  })
}

function setValue() {

  $("#menu .menu").each(function(index) {
    var thisData = $("#" + this.id).data();
    $(this).attr("src",thisData.photoUrl);
    $('.' + this.id).find(".name").html(thisData.name);
    $('.' + this.id).find(".value").html(thisData.calory+'kcal');

  })
}

function adjustLayout() {
  $('#mainContent .panel').each(function(index) {
    $(this).css('display', 'none');
    var category = $(this).find("h1").html();
    $("#mainContent nav").append('<a href="#">' + category + '</a>');
  });

  currentPanel = $('#mainContent nav a:first-child()').index();
  $('#mainContent .panel:eq(' + currentPanel + ')').css('display', 'block');


  activateNavigation();
}

function activateNavigation() {

  $('#mainContent nav a').on('click', function() {
    // currentPanel = $(this).index();
    var newCurrentPanel = $(this).index();
    if (newCurrentPanel === currentPanel) {
      // do nothing
    } else {
      $("#mainContent .panel:eq(" + currentPanel + ")").fadeOut("slow", function() {
        $("#mainContent .panel:eq(" + newCurrentPanel + ")").fadeIn("slow");
      });
    };

    currentPanel = newCurrentPanel;

    $('#mainContent nav a').removeClass('selected');
    $(this).addClass('selected');

  });
}
