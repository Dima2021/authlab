function get_difficulty() {
	let difficulty = document.getElementById ("difficulty").value
	return difficulty;
}

function validate_token () {
	var url = "/JWT_Cracking_Check?difficulty=" + get_difficulty()

	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	if (!xhr) {
		throw new Error('XMLHttpRequest not supported');
	}

	let token = document.getElementById ("testToken").value

	xhr.setRequestHeader ("Authorization", "Bearer " + token);

	xhr.onload = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log ("Server says: " + xhr.responseText);

			let jsonObj = JSON.parse(xhr.responseText);
			if (jsonObj.Success) {
				document.getElementById("header").style.color = "green";
				document.getElementById("header").innerText = "Login Success";
				document.getElementById("user").innerText = "User: " + jsonObj.User;
				document.getElementById("level").innerText = "Level: " + jsonObj.Level;
				document.getElementById("user").style.display = "block";
				document.getElementById("level").style.display = "block";
				document.getElementById("error").style.display = "none";
			} else {
				document.getElementById("header").style.color = "red";
				document.getElementById("header").innerText = "Login Failed";
				document.getElementById("error").innerText = "Error: " + jsonObj.Message;
				document.getElementById("user").style.display = "none";
				document.getElementById("level").style.display = "none";
				document.getElementById("error").style.display = "block";
			}
		} else {
			console.log ("There was a problem with the reply from the server");
		}
	};

	xhr.onerror = function() {
		console.log('Error making request');
	};

	xhr.send()
}

function get_token () {
	var url = "/JWT_Cracking_Get?difficulty=" + get_difficulty()

	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	if (!xhr) {
		throw new Error('XMLHttpRequest not supported');
	}

	xhr.onload = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log ("Server says: " + xhr.responseText);

			let jsonObj = JSON.parse(xhr.responseText);
			if (jsonObj.error) {
				document.getElementById("generatedToken").value = "There was an error generating the token";
			} else {
				document.getElementById("generatedToken").value = jsonObj.Token;
			}
		} else {
			console.log ("There was a problem with the reply from the server");
		}
	};

	xhr.onerror = function() {
		console.log('Error making request');
	};

	xhr.send()
}

var button = document.getElementById ("get_token_button");
button.addEventListener("click", get_token);

button = document.getElementById ("validate_token_button");
button.addEventListener("click", validate_token);
