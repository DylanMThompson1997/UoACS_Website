var username;
var passwd;

function homeDisplay() {
	let display = "<p>Welcome to New Zealand's leading computer science department. We pride ourselves on the excellence of our staff and our students.<br/> Please click one of the buttons above to begin.</p>"
	display += "<img src='http://redsox.uoa.auckland.ac.nz/ups/logo.svg' alt='Computer Science Department Logo' width = '200px'>"
    document.getElementById("content").innerHTML = display;
}

function login() {
	let display = "<h2>User Log In</h2>";
	display += "<form><table class = 'reg_form'><tr><td><p><b>Username: </b></p></td><td><input type = 'text' id='user_login'></td></tr>";
	display += "<tr><td><p><b>Password: </b></p></td><td><input type='password' id='pass_login'></td></tr>";
	display += "<tr><td class = 'item' colspan = '2' onClick='write_cred()'>Submit</td></tr></table></form>";
	document.getElementById("content").innerHTML = display;
}

function write_cred() {
    username = document.getElementById("user_login").value;
    passwd = document.getElementById("pass_login").value;
    login_check();
    software();
}

function login_check() {
    try {
        if (username != null) {
            document.getElementById("login").innerHTML = "<p>You are logged in as: <b>" + username + "</b>.</p><a onclick = 'logout()'><p>Log out.</p></a>";
        } else {
            document.getElementById("login").innerHTML = "<p>You are not currently logged in.</p>";
            login();
        }
    } catch {
    document.getElementById("login").innerHTML = "<p>You are not currently logged in.</p>";
    }
}

function logout() {
    username = null;
    passwd = null;
    document.getElementById("content").innerHTML = "<p>You have been logged out.</p>";
    document.getElementById("login").innerHTML = "<p>You are not currently logged in.</p></a>";
}

function download(itemID) {
    let xmlHttp = new XMLHttpRequest();
    login();
    xmlHttp.onload = function() {
        let data = "<p>" + xmlHttp.responseText + "</p>";
        login_check(username);
		document.getElementById("content").innerHTML = data;
    }
    xmlHttp.open("GET", "http://localhost:8189/Service.svc/dl?id="+itemID, true, username, passwd); // true for asynchronous 
    xmlHttp.withCredentials = true;
    xmlHttp.send(null);
}

function search() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() { 
        let data = xmlHttp.responseText;
        let html = "<table><tr><td><b>Item ID</b></td><td><b>Title</b></td><td><b>Version</b></td><td></td></tr>";
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(data,"text/xml");
		let items = xmlDoc.getElementsByTagName("Item");
		for (let i = 0; i < items.length; i++) {     
			let title = items[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
			let item_id = items[i].getElementsByTagName("ItemId")[0].childNodes[0].nodeValue;
            let itemID = '"' + item_id + '"';
			let version = items[i].getElementsByTagName("Version")[0].childNodes[0].nodeValue;
            if (i % 2 == 1) {
                html += "<tr><td>"+ item_id + "</td><td>"+ title + "</td><td>"+ version + "</td><td width='10%' class = 'item' onclick='download("+itemID+")'><b>Download</b></td></tr>";
            } else {
                html += "<tr class='odd'><td>"+ item_id + "</td><td>"+ title + "</td><td>"+ version + "</td><td width='10%' class = 'item' onclick='download("+itemID+")'><b>Download</b></td></tr>";
            }
		}
        html += "</table>";
		document.getElementById("table_content").innerHTML = html;
   }
   let term = document.getElementById("term").value;
   xmlHttp.open("GET", "http://localhost:8188/UniProxService.svc/search?term="+term, true); // true for asynchronous 
   xmlHttp.send(null);
}

function software() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() { 
        let data = xmlHttp.responseText;
        let html = "<h2>Browse and Search Software</h2><form><table class = 'comment_form'><tr><td><input type = 'text' maxlength = '200' id='term'></td>";
        html += "<td class = 'item' onClick='search()'>Search</td></tr></table></form><div id = 'table_content'>";
        html += "<table><tr><td><b>Item ID</b></td><td><b>Title</b></td><td><b>Version</b></td><td></td></tr>";
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(data,"text/xml");
		let items = xmlDoc.getElementsByTagName("Item");
		for (let i = 0; i < items.length; i++) {     
			let title = items[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
			let item_id = items[i].getElementsByTagName("ItemId")[0].childNodes[0].nodeValue;
            let itemID = '"' + item_id + '"';
			let version = items[i].getElementsByTagName("Version")[0].childNodes[0].nodeValue;
            if (i % 2 == 1) {
                html += "<tr><td>"+ item_id + "</td><td>"+ title + "</td><td>"+ version + "</td><td width='10%' class = 'item' onclick='download("+itemID+")'><b>Download</b></td></tr>";
            } else {
                html += "<tr class='odd'><td>"+ item_id + "</td><td>"+ title + "</td><td>"+ version + "</td><td width='10%' class = 'item' onclick='download("+itemID+")'><b>Download</b></td></tr>";
            }
		}
        html += "</table></div>";
		document.getElementById("content").innerHTML = html;
   }
   xmlHttp.open("GET", "http://localhost:8188/UniProxService.svc/itemlist", true); // true for asynchronous 
   xmlHttp.send(null);
}
	
function register() {
	let display = "<h2>User Registration</h2>";
	display += "<form><table class = 'reg_form'><tr><td><p><b>Username: </b></p></td><td><input type = 'text' id='username'></td></tr>";
	display += "<tr><td><p><b>Password: </b></p></td><td><input type='password' id='passwd'></td></tr>";
	display += "<tr><td><p><b>Address: </b></p></td><td><input type='textarea' id='address'></td></tr>";
	display += "<tr><td class = 'item' colspan = '2' onClick='addUser()'>Submit</td></tr></table></form>";
	document.getElementById("content").innerHTML = display;
}

function addUser() {
	let address = document.getElementById("address").value;
	let username = document.getElementById("username").value;
	let passwd = document.getElementById("passwd").value;
	let xmlHttp = new XMLHttpRequest();
	let params = '{"Address":"'+address+'", "Name":"'+username+'", "Password":"'+passwd+'"}';
    xmlHttp.open("POST", "http://localhost:8188/UniProxService.svc/register", true); // true for asynchronous
	xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.send(params);
    document.getElementById("content").innerHTML = "<h2>Registration successful.</h2>";
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
    xmlHttp.open("GET", "http://localhost:8188/UniProxService.svc/course", true); // true for asynchronous 
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
    xmlHttp.open("GET", "http://localhost:8188/UniProxService.svc/courses", true); // true for asynchronous 
    xmlHttp.send(null);
}

function staffList() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() { 
        let data = xmlHttp.responseText;
		const new_data = JSON.parse(data);
		const records = new_data.list;
		let table = "<h2>Staff List</h2><table>\n<tr><td></td><td><b>Name</b></td><td><b>Contact Details</b></td></tr>\n"
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
    xmlHttp.open("GET", "http://localhost:8188/UniProxService.svc/people", true); // true for asynchronous 
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
   xmlHttp.open("GET", "http://localhost:8188/UniProxService.svc/newsfeed", true); // true for asynchronous 
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
   xmlHttp.open("GET", "http://localhost:8188/UniProxService.svc/noticesfeed", true); // true for asynchronous 
   xmlHttp.send(null);
}

function guestBook() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() { 
        let data = xmlHttp.responseText;
		content = "<h3>Enter User Comments</h3>";
		content += "<form><table class = 'comment_form'><tr><td><p><b>Name: </b></p></td><td><input type = 'text' maxlength = '200' id='comment_name'></td></tr>";
		content += "<tr><td><p><b>Comment: </b></p></td><td><textarea rows='4' cols='50' maxlength = '2000' id='comment_text'></textarea></td></tr>";
		content += "<tr><td class = 'item' colspan = '2' onClick='addComment()'>Submit</td></tr></table></form>";
		content += "<hr /><h3>Past User Comments</h3>";
		content += "<div id = 'comments'><p>There are currently no comments available.</p><hr /></div>";
		document.getElementById("content").innerHTML = content;
		document.getElementById("comments").innerHTML = data;
   }
   xmlHttp.open("GET", "http://localhost:8188/UniProxService.svc/htmlcomments", true); // true for asynchronous 
   xmlHttp.send(null);
}

function addComment() {
    let xmlHttp = new XMLHttpRequest();
	let name = document.getElementById("comment_name").value;
	let comment = document.getElementById("comment_text").value;
	let params = '"'+comment+'"';
    xmlHttp.open("POST", "http://localhost:8188/UniProxService.svc/comment?name="+name, true); // true for asynchronous 
	xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.send(params);
    document.getElementById("content").innerHTML = "<h2>Comment submitted successfully.</h2>";
}