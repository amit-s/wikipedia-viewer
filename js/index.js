$(document).ready(function(){  
  
   
 setTimeout(function(){
    $("#randomIntro").effect('transfer', {to:$("#random")}, 1500 ).hide(); 
    $("#searchIntro").effect('transfer', {to:$("#search")}, 1500 ).hide();   
    }, 2000);
  
  setTimeout(function(){
    $("#random").addClass("transformed");
    $("#search").addClass("transformed");
  }, 3500);
  
  
  
  $("#searchTerm").on('input', searchUpdate);
  
  $("#search").on('click', getSearchResults);
  
  $("#searchTerm").on('keyup', function(e){    
    if(e.keyCode == 13){
    $(".ui-autocomplete").hide();
    getSearchResults();
    }
  }); // /#searchTerm keyup
  
}); // /ready

function getSearchResults(){
  var searchTerm = $("#searchTerm").val();
  var numberResults = 10;
  
  if(!searchTerm){    
    $(".errorMessage").show();
  }else{
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&limit=" + numberResults + "&format=json&callback=?";
  
  $(".searchResults > *").remove();
  $(".errorMessage").hide();  
          
  $.ajax({
    url: url,
    dataType: "json",
    success: function(data){ 
     
      for(var i=0; i<data[1].length; i++){         
        $(".searchResults").append('<a href="' + data[3][i] + '" target="_blank"><div class="searchItem"><h4>' + data[1][i] + '</h4><p>' + data[2][i] + '</p></div></a>');        
      }  
  
    },
    error: function(errorMessage){
      console.log("Error - ajax fail");
      console.log(errorMessage);
    }    
   }); // /ajax call to wikipedia api
  }// /else for blank searchterm
} // /getSearchResults

function searchUpdate (){
  
  var term = $("#searchTerm").val();
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + term + "&format=json&callback=?";
  
  $(".searchResults > *").remove();
  $(".errorMessage").hide();
  
  $("#searchTerm").autocomplete({
  
  appendTo: "#results",
  source: function(term,response){
    
    $.ajax({
      url: url,
      type: "GET",
      dataType: "JSON",
      success: function(data){
        response(data[1]);
        console.log(data);
      }, // /success
      error: function(error){
        console.log("ERROR - AJAX ISSUE");
        console.log(error);
      } // /error
    }); // /ajax call
    
  }, // /source
    open: function(){
      $(".searchResults > *").remove();      
    }
    
}); // /autocomplete widget
};// /function