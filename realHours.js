$(".UMenuTimeStampLabels > div").each(
    function(index){
        console.log("Index: "+index+" value: "+$(this).text());
        children = $(this).children();
        console.log("Day: " + $(children[0]).text()); // day
        console.log(children[1]); // worked       
        console.log(children[2]); // required
        //obj = $(this);
    })
    var total = 0;
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
                        total += difference;
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
    console.log("Total ms: "+total);
seconds = ~~(total / 1000);
minutes = ~~(seconds / 60);
hours = ~~(minutes / 60);
minutes = minutes - (hours*60);
totalRecoup = hours+":"+minutes;
console.log("Total recoup: "+totalRecoup);
alert("Total recoup for this month: "+totalRecoup);