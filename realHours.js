$(".UMenuTimeStampLabels > div").each(
    function(index){
        console.log("Index: "+index+" value: "+$(this).text());
        children = $(this).children();
        if (index == $(".UMenuTimeStampLabels > div").length-1) {
            console.log("Total Worked: " + $(children[1]).text()); // total worked
            console.log("Total Required: " + $(children[2]).text()); // required month
            totWorked = $(children[1]).text();
            totRequired = $(children[2]).text();
        }
        else {            
            console.log("Day: " + $(children[0]).text()); // day
            console.log("Worked: " + $(children[1]).text()); // worked       
            console.log("Required: " + $(children[2]).text()); // required
            //console.log("Required (today): " + $(children[2]).text(); // required today
            //obj = $(this);    
        }
        
    })    
    var totalRecoupMs = 0;
$(".UMenuTimeStampContent > div").each(
    function(index){
        console.log("Row: "+index);
        children = $(this).children();
        //console.log(children);
        $.each(children, function(index, value) {
        
            //console.log("Index: "+index+" value: ");
            //console.log(value);
            item = $(value).find("div.UMenuTimeStampToolTip").text();
            if ( (item.indexOf("Recoup") != -1) && (item.indexOf("Inizio") != -1) ) {
                console.log("-Found recoup to sum");
                start = $(value).find("div.UMenuTimeStampContentSubElementTime").text();

		var dStart = new Date(2000,0,1,0,0), time = start.split(/\:|\-/g);
		dStart.setHours(time[0]);
		dStart.setMinutes(time[1]);

                console.log("--Start time: "+dStart);
                for (var i=index+1;i<children.size();i++){
                    enditem = children[i];
                    enditemText = $(enditem).find("div.UMenuTimeStampToolTip").text();
                    if ( (enditemText.indexOf("Recoup") != -1) && (enditemText.indexOf("Fine") != -1) ){
                        end = $(enditem).find("div.UMenuTimeStampContentSubElementTime").text();

			var dEnd = new Date(2000,0,1,0,0), time = end.split(/\:|\-/g);
			dEnd.setHours(time[0]);
			dEnd.setMinutes(time[1]);

                        console.log("--End time: "+dEnd);
                        difference = new Date(dEnd.getTime()-dStart.getTime()).getTime();
                        console.log("Difference in ms: "+ difference);
                        totalRecoupMs += difference;
                        //console.log(enditem);
                    }
                    //console.log(enditemText); // controllare per fine recoup                    
                }
                if (!end) {alert("Some error on row: "+index);}                
            }

        }
	      );        
    }
)
console.log("Total ms: "+totalRecoupMs);
seconds = ~~(totalRecoupMs / 1000);
minutes = ~~(seconds / 60);
hours = ~~(minutes / 60);
minutes = minutes - (hours*60);
totalRecoupStr = hours+":"+minutes;
console.log("Total recoup: "+totalRecoupStr);
alert(
    "Total recoup for this month: "+totalRecoupStr+"\n"+
    "Total worked hours for this month: "+msToStr(strToMs(totWorked)+totalRecoupMs)
    );

function strToMs(strTime){
    var date = new Date(2000,0,1,0,0), time = strTime.split(/\:|\-/g);
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    return date.getTime();
}
function msToStr (msTime) {
    var date = new Date(2000,0,1,0,0);
    msTime = msTime - date.getTime();
    seconds = ~~(msTime / 1000);
    minutes = ~~(seconds / 60);
    hours = ~~(minutes / 60);
    minutes = minutes - (hours*60);
    return hours+":"+minutes;
}