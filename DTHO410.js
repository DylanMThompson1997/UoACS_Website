function homeDisplay() {
	var display = "<br/>Welcome to New Zealand's leading computer science department. We pride ourselves on the excellence of our staff and our students.<br/> Please click one of the buttons above to begin."
    document.getElementById("content").innerHTML = display;
}

function coursesList() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var data = xmlHttp.responseText;
			const new_data = JSON.parse(data)
			const records = new_data.data
			let table = "<table>\n<tr><td><b>Class Number</b></td><td><b>Class Description</b></td><td><b>Class Times</b></td></tr>\n"
			for (let i = 0; i < records.length; ++i) { 
				const record = records[i];
				if (i % 2 == 0) {
					table += "<tr class = 'odd'>"
				} else {
					table += "<tr>"
				}
				table += "<td>Computer Science " + record.catalogNbr + "</td><td>" + record.classDescr + "</td><td>" + record.meetingPatterns + "</td></tr>\n";
			}
			table += "</table>";
			document.getElementById("content").innerHTML = table;
    }
    xmlHttp.open("GET", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/course", true); // true for asynchronous 
    xmlHttp.send(null);
}

function staffList() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var data = xmlHttp.responseText;
			const new_data = JSON.parse(data);
			const records = new_data.list;
			let table = "<table>\n<tr><td></td><td><b>Name</b></td><td><b>Contact E-Mail</b></td><td><b>Save Contact Details</b></td></tr>\n"
			for (let i = 0; i < records.length; ++i) { 
				const record = records[i];
				if (i % 2 == 0) {
					table += "<tr class = 'odd'>"
				} else {
					table += "<tr>"
				}
				if (record.imageId) {
					table += '<td><img src="https://unidirectory.auckland.ac.nz/people/imageraw/' + record.profileUrl[1] + '/' + record.imageId + '/small" alt = "No photo available"/></td>'
				} else {
					table += '<td><img src="https://unidirectory.auckland.ac.nz/static/g5Km3OjLZuWCA8w7PdOyS4j603aTN0QC7X2gk6kRhEs.png" height="115px" alt = "No photo available"/></td>'
				}

					table += "<td>" + record.names + "</td><td>" + record.emailAddresses + "</td><td><a href='https://unidirectory.auckland.ac.nz/people/vcard/" + record.profileUrl[1] + "/'>Link to vCard</a></td></tr>\n";
			}
			table += "</table>";
			document.getElementById("content").innerHTML = table;
    }
    xmlHttp.open("GET", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/people", true); // true for asynchronous 
    xmlHttp.send(null);
}

function newsFeed() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var data = xmlHttp.responseText;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(data,"text/xml");
			var items = xmlDoc.getElementsByTagName("item");
			for (var i = 0; i < items.length; i++) {     
				var title = items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
				var description = items[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
				//var links = items[i].getElementsByTagName("links")[0].childNodes[0].nodeValue;
				//var pubdate = items[i].getElementsByTagName("pubdate")[0].childNodes[0].nodeValue;
				var html = html + "<h3>" + title + "</h3><p>" + description + "</p><hr />";   
			}
			document.getElementById("content").innerHTML = html;
    }
    xmlHttp.open("GET", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/newsfeed", true); // true for asynchronous 
    xmlHttp.send(null);
}

function noticesFeed() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var data = xmlHttp.responseText;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(data,"text/xml");
			var items = xmlDoc.getElementsByTagName("item");
			for (var i = 0; i < items.length; i++) {     
				var title = items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
				var description = items[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
				//var links = items[i].getElementsByTagName("links")[0].childNodes[0].nodeValue;
				//var pubdate = items[i].getElementsByTagName("pubdate")[0].childNodes[0].nodeValue;
				var html = html + "<h3>" + title + "</h3><p>" + description + "</p><hr />";   
			}
			document.getElementById("content").innerHTML = html;
    }
    xmlHttp.open("GET", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/noticesfeed", true); // true for asynchronous 
    xmlHttp.send(null);
}

function guestBook() {
	content = "<h3>Enter User Comments</h3><form><table><tr><td><p><b>Name: </b></p></td><td><input type = 'textarea' id='comment_name'></td></tr>";
	content += "<tr><td><p><b>Comment:</b></p></td><td><input type = 'text' id='comments'></td></tr>";
	content += "<tr><td><input name='submit' type='submit' value='Submit'></td><td</td></tr></table></form>";
	content += "<hr /><h3>Past User Comments</h3>";
	content += "<div id = 'comments'></div>";
	document.getElementById("content").innerHTML = content; //"This functionality is coming soon!";
}