console.log('is inside Meetup to Google+ Event Chrome Extension');

chrome.extension.sendRequest({method: "getMeetupEventInfo"}, function(response) {
  console.log(response);
  
  if(response.meetupEventUrl){
    var divs=document.getElementsByTagName('div');
    console.log('divs='+divs);

    for(i in divs){
  	  if(divs[i].innerText == 'CREATE EVENT'){
  		divs[i].click();
      }
    }
  
    var finishedInterval = setTimeout(function() {
      var inputs=document.getElementsByTagName('input');
      for(i in inputs){
        if(inputs[i].placeholder == 'Event title'){
  		  inputs[i].value=response.meetupEventTitle;
  	    }else if(inputs[i].placeholder == 'Location (optional)'){
  		  inputs[i].value=response.meetupEventWhere;
  	    }else if(inputs[i].placeholder == 'Details (optional)'){ //is div not input
  		  inputs[i].value=response.meetupEventDescription;
  	    }
      }
      
      var divs=document.getElementsByTagName('div');
      for(i in divs){
      console.log(i+' '+divs[i].id +' ' +divs[i].innerHTML);
        if(divs[i].innerHTML == 'Details (optional)'){
          console.log(i+'=MATCH');
  		  divs[i].innerHTML=response.meetupEventDescription; //This is not working
  		  //divs[i+1].innerHTML=response.meetupEventDescription;
  		  
  	    }
      }
    }, 2000);
  }    
});
