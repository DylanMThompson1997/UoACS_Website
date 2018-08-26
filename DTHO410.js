function homeDisplay() {
	let display = "<br/>Welcome to New Zealand's leading computer science department. We pride ourselves on the excellence of our staff and our students.<br/> Please click one of the buttons above to begin.</p>"
	display += "<img src='http://redsox.uoa.auckland.ac.nz/ups/logo.svg' alt='Computer Science Department Logo' width = '200px'>"
    document.getElementById("content").innerHTML = display;
}

function courseTimetables(number) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() { 
        let data = xmlHttp.responseText;
		const new_data = JSON.parse(data)
		const records = new_data.data
		let table = "<table>\n<tr><td><b>Class Number</b></td><td><b>Class Description</b></td><td><b>Class Type</b></td><td><b>Class Times</b></td></tr>\n"
		for (let i = 0; i < records.length; ++i) { 
			const record = records[i];
			if (record.catalogNbr == number) {
				let type = "";
				if (record.classType == "N") {
					type = "Tutorial";
				} else if (record.classType == "E") {
					type = "Lecture";
				} else {
					type = "Other";
				}
				meetings = "";
				for (let j in record.meetingPatterns){
					let rec = record.meetingPatterns[j];
					meetings += "Start Date: " + rec.startDate + "   End Date: " + rec.endDate + "   Start Time: " + rec.startTime + "   End time: " + rec.endTime + "   Location: " + rec.location + "<br />";
				}
				table += "<tr id = 'timetable'><td>Computer Science " + record.catalogNbr + "</td><td>" + record.classDescr + "</td><td>" + type + "</td><td>" + meetings + "</td></tr>\n";
			}
		}
		table += "</table>";
		document.getElementById("content").innerHTML = table;
    }
    xmlHttp.open("GET", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/course", true); // true for asynchronous 
    xmlHttp.send(null);
}

function coursesList() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() { 
        let data = xmlHttp.responseText;
		const new_data = JSON.parse(data)
		const records = new_data.data
		let table = "<h2>Computer Science Courses</h2><p>Browse the Computer Science courses offered at the University of Auckland. Click on one of the courses to view its timetable.</p><table><tr><td><b>Course Number</b></td><td><b>Course Title</b></td><td><b>Course Description</b></td><td><b>Course Prerequisites</b></td></tr>"
		for (let i = 0; i < records.length; ++i) { 
			const record = records[i];
			if (i % 2 != 1) {
				table += "<tr class = 'odd' id = 'timetable' onclick = 'courseTimetables("+ record.catalogNbr +")'>"
			} else {
				table += "<tr id = 'timetable' onclick='courseTimetables("+ record.catalogNbr +")'>"
			}
			let number = record.catalogNbr;
			table += "<td width = '10%'>Computer Science " + number + "</td><td width='10%'>" + record.titleLong + "</td>"
			if (record.description) {
				table += "<td width = '60%'>" + record.description + "</td>"
			} else {
				table += "<td width = '60%'>Course description not available</td>"
			}
			if (record.rqrmntDescr && record.rqrmntDescr != '.') {
				table += "<td width='20%'>" + record.rqrmntDescr + "</td></tr>\n";
			} else {
				table += "<td width='20%'>Course prerequisites not available</td></tr>\n";
			}
		}
		table += "</table>";
		document.getElementById("content").innerHTML = table;
    }
    xmlHttp.open("GET", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/courses", true); // true for asynchronous 
    xmlHttp.send(null);
}

function staffList() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() { 
        let data = xmlHttp.responseText;
		const new_data = JSON.parse(data);
		const records = new_data.list;
		let table = "<table>\n<tr><td></td><td><b>Name</b></td><td><b>Contact Details</b></td></tr>\n"
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
			table += "<td>" + record.names + "</td><td><a href='mailto:" + record.emailAddresses + "'>&#128231; " + record.emailAddresses + "</a><br />";
			if (record.extn){
				table += "<a href='tel:+64 9 373 7999;ext=" + record.extn + "'>&#9742; Extension: " + record.extn + "</a><br />";
			} else {
				table += "No phone<br />";
			}
			table += "<a href='https://unidirectory.auckland.ac.nz/people/vcard/" + record.profileUrl[1] + "/'>&#128100; Save Details</a></td></tr>\n";
		}
		table += "</table>";
		document.getElementById("content").innerHTML = table;
    }
    xmlHttp.open("GET", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/people", true); // true for asynchronous 
    xmlHttp.send(null);
}

function newsFeed() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() { 
        let data = xmlHttp.responseText;
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(data,"text/xml");
		let channel = xmlDoc.getElementsByTagName("channel");
		let title = channel[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
		let description = channel[0].getElementsByTagName("description")[0].childNodes[0].nodeValue;
		let site_link = channel[0].getElementsByTagName("link")[0].childNodes[0].nodeValue;
		html = "<h2><a href='" + site_link + "'>" + title + "</a></h2><h5>" + description + "</h5><hr /><hr />";
		let items = xmlDoc.getElementsByTagName("item");
		for (let i = 0; i < items.length; i++) {     
			let title = items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
			let description = items[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
			let site_link = items[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
			html += "<h3><a href='" + site_link + "'>" + title + "</a></h3><p>" + description + "</p><hr />";
		}
		document.getElementById("content").innerHTML = html;
   }
   xmlHttp.open("GET", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/newsfeed", true); // true for asynchronous 
   xmlHttp.send(null);
}

function noticesFeed() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() { 
        let data = xmlHttp.responseText;
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(data,"text/xml");
		let channel = xmlDoc.getElementsByTagName("channel");
		let title = channel[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
		let description = channel[0].getElementsByTagName("description")[0].childNodes[0].nodeValue;
		let site_link = channel[0].getElementsByTagName("link")[0].childNodes[0].nodeValue;
		html = "<h2><a href='" + site_link + "'>" + title + "</a></h2><h5>" + description + "</h5><hr /><hr />";
		let items = xmlDoc.getElementsByTagName("item");
		for (let i = 0; i < items.length; i++) {     
			let title = items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
			let description = items[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
			let site_link = items[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
			html += "<h3><a href='" + site_link + "'>" + title + "</a></h3><p>" + description + "</p><hr />";
		}
		document.getElementById("content").innerHTML = html;
   }
   xmlHttp.open("GET", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/noticesfeed", true); // true for asynchronous 
   xmlHttp.send(null);
}

function guestBook() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() { 
        let data = xmlHttp.responseText;
		content = "<h3>Enter User Comments</h3>";
		content += "<form><table class = 'comment_form'><tr><td><p><b>Name: </b></p></td><td><input type = 'textarea' maxlength = '200' id='comment_name'></td></tr>";
		content += "<tr><td><p><b>Comment: </b></p></td><td><textarea rows='4' cols='50' maxlength = '2000' id='comment_text'></textarea></td></tr>";
		content += "<tr><td class = 'item' colspan = '2' onClick='addComment()'>Submit</td></tr></table></form>";
		content += "<hr /><h3>Past User Comments</h3>";
		content += "<div id = 'comments'><p>There are currently no comments available.</p><hr /></div>";
		document.getElementById("content").innerHTML = content;
		document.getElementById("comments").innerHTML = data;
   }
   xmlHttp.open("GET", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/htmlcomments", true); // true for asynchronous 
   xmlHttp.send(null);
}

function addComment() {
    let xmlHttp = new XMLHttpRequest();
	let name = document.getElementById("comment_name").value;
	let comment = document.getElementById("comment_text").value;
	let params = '"'+comment+'"';
    xmlHttp.open("POST", "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/comment?name="+name, true); // true for asynchronous 
	xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.send(params);
}