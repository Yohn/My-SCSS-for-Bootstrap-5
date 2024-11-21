
document.addEventListener("DOMContentLoaded", function () {
	const sidePanel = document.getElementById('sidePanel'),
		settingsBtn = document.getElementById('settings-btn'),
		mainChat = document.getElementById('main-box'),
		textForm = document.getElementById('text-form'),
		textEle = document.getElementById('text-msg'),
		loading = document.getElementById("loading-icon"),
	resp = document.getElementById('resp');

	textForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		let textMsg = textEle.value;
		loading.classList.remove('d-none')
		const formData = new FormData();
		formData.append('hello', 'Yohn');
		formData.append('chatMsg', textMsg);
		const plainObject = Object.fromEntries(formData);
		try {
			// Send POST request to server
			const response = await fetch('/submit', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify(plainObject)
			});
			if (!response.ok) {
				throw new Error('Network response was not ok.');
			}
			// Clear textarea
			textEle.value = "";
			const tevent = new Event('input', { bubbles: true });
			textEle.dispatchEvent(tevent);
			// Handle response
			const result = await response.json(); // Assuming server responds with JSON
			resp.innerHTML = result.greeting;
			console.log(result);
			loading.classList.add('d-none')
		} catch (error) {
			console.error('Error:', error);
		}
	});

	// sidebar show / hide slider
	function mainCol(direction){
		let curCol = parseInt(mainChat.getAttribute('data-yo-col'))
		let newCol = direction == 'up' ? curCol+3 : curCol-3;
		mainChat.classList.remove('col-'+curCol);
		mainChat.classList.add('col-'+newCol);
		mainChat.setAttribute('data-yo-col', newCol);
	}
	sidePanel.addEventListener('show.bs.collapse', () => {
		settingsBtn.classList.toggle('btn-primary');
		settingsBtn.classList.toggle('btn-outline-primary');
		sidePanel.classList.toggle('font-zero');
		mainCol('down');
	})
	sidePanel.addEventListener('hide.bs.collapse', () => {
		settingsBtn.classList.toggle('btn-primary');
		settingsBtn.classList.toggle('btn-outline-primary');
		sidePanel.classList.toggle('font-zero');
		mainCol('up');
	})
	//!
	//!------------------------------------------------------------------------!
	//!
	//!		Background changer
	//!
	//!------------------------------------------------------------------------!
	//!
	// The theme tab within settings.. just changing the background, not sure how it'll look here though haha
	document.getElementById("bgColor").addEventListener("input", function () {
		document.body.style.backgroundColor = this.value;
	});

	let gsColor = document.getElementById("gradientStart");
	let geColor = document.getElementById("gradientEnd");
	let opacityInput = document.getElementById("gradientOpacity");

	gsColor.addEventListener("input", updateGradient);
	geColor.addEventListener("input", updateGradient);
	opacityInput.addEventListener("input", updateGradient);

	function updateGradient() {
		const startColor = gsColor.value;
		const endColor = geColor.value;
		const opacity = opacityInput.value;
		document.body.style.backgroundImage = `linear-gradient(to right, ${hexToRgba(
			startColor,
			opacity
		)}, ${hexToRgba(endColor, opacity)})`;
	}

	function hexToRgba(hex, opacity) {
		let r = parseInt(hex.slice(1, 3), 16);
		let g = parseInt(hex.slice(3, 5), 16);
		let b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}
})