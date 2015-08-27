/* _optimizely_evaluate=force */ /*global $*/
import html from './v1.html';
import css from './v1.scss';
window.expX = { html, css };
/* _optimizely_evaluate=safe */
$('head').append('<style>'+expX.css+'</style>');
$('body').append(expX.html);
