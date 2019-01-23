let recaptchaDone = false;
let recaptchaStarted = false;
let recaptcha = document.getElementById('recaptcha');

function recaptchaVerify() {
	if (recaptchaStarted) return;
	recaptchaStarted = true;
	let recaptcha = document.getElementById('recaptcha');
	recaptcha.src='images/recaptcha_checking.gif';
	setTimeout(()=>{
		recaptcha.src='images/recaptcha_checked.jpg';
		recaptchaDone = true;
	}, 3000);
}

function validateForm() {
	if (recaptchaDone) {
		document.forms.form.submit();
	} else {
		document.getElementById('recaptchaDone').innerText = "Please verify that you are not a robot.";
	}
}