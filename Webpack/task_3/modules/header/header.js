import $ from 'jquery';
import './header.css';

$(function() {
    $('body').append('<div id="logo"></div>');
    $('body').append('<header>Holberton Dashboard</header>');
    console.log('Init header');
});
