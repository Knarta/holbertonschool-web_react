import $ from 'jquery';
import './body.css';
import _ from 'lodash';

let count = 0;
function updateCounter() {
    count++;
    $('#count').text(`${count} clicks on the button`);
}

    $(function() {
        $('body').append('<p>Dashboard data for the students</p>');
        $('body').append(`<button>Click here to get started</button>`);
        $('body').append(`<p id="count"></p>`);
        $('button').on('click', _.debounce(updateCounter, 500));
});
