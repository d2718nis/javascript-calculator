$(document).ready(function() {

	var numbers = [];
	var actions = [];
	var first = '';
	var second = '';

	// Perform calculation
	function calculate() {
		let calc;
		switch(action) {
			case '+':
				calc = parseFloat(first) + parseFloat(second);
				break;
			case '-':
				calc = parseFloat(first) - parseFloat(second);
				break;
			case '×':
				calc = parseFloat(first) * parseFloat(second);
				break;
			case '÷':
				calc = parseFloat(first) / parseFloat(second);
				break;
		}
		// Slice too long results
		calc = calc.toString();
		if (calc.length > 11) {
			calc = calc.slice(0, 10) + '…';
		}
		return calc;
	}

	// '0-9' pressed
	$('.digit-button').click(function() {
		if (/[=]+/gi.test($('.status-display').text())) {
			$('.display').text('');
			$('.status-display').text('');
		}
		if (/[+\-×÷]/gi.test($('.display').text())) {
			$('.display').text('');
		}
		// prevent 00 and 01 etc.
		if ($('.display').text() !== '0') {
			$('.display').text($('.display').text() + $(this).text());
		}
	});

	// '.' pressed
	$('.dot-button').click(function() {
		// If there is result, buton shouldn't be pressed
		if (!/[=]+/gi.test($('.status-display').text())) {
			if (/^[^.]+$/gi.test($('.display').text())) {
				$('.display').text($('.display').text() + '.');
			}
		}
	});

	// '+-/*' pressed
	$('.action-button').click(function() {
		// If there is number
		if (/[0-9\.]/gi.test($('.display').text())) {
			// Perform calculation
			if (first !== '' && action !== '' && $('.display').text() !== '') {
				second = $('.display').text();
				let calc = calculate();
				first = calc;
				action = $(this).text();
				second = '';
				$('.status-display').text(first + ' ' + action);
				$('.display').text($(this).text());
			// Just add action
			} else if($('.display').text() !== '') {
				first = $('.display').text();
				action = $(this).text();
				$('.status-display').text(first + ' ' + action);
				$('.display').text($(this).text());
			}
		}
	});

	// '=' pressed
	$('.result-button').click(function() {
		if (first !== '' && action !== '' && /[0-9\.]/gi.test($('.display').text())) {
			second = $('.display').text();
			let calc = calculate();
			let left = first + ' ' + action + ' ' + second;
			if (left.length > 10) {
				left = left.slice(0, 9) + '…';
			}
			$('.status-display').text(left + ' = ' + calc);
			$('.display').text(calc);
			first = calc;
		}
	});

	// 'AC' pressed
	$('.ac-button').click(function() {
			$('.status-display').text('');
			$('.display').text('');
			first = '';
			second = '';
			action = '';
	});

	// 'CE' pressed
	$('.ce-button').click(function() {
			$('.display').text('');
	});

	// Easter egg
	$('.calculator-name').on('click', function() {
		if ($('.calculator-name').text() == 'Calculasio'){
			$('.calculator-name').text('Code for life');
		} else {
			$('.calculator-name').text('Calculasio');
		}
	});
});
