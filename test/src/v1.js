/* optimizely_evaluate=force */
import { logger } from './mods/utils';

const test = 'test';
logger(test);

$.exp = $.exp || {};

$.exp.elem = '<div>Testing 123</div>';

/* optimizely_evaluate=safe */
$('body').append($.exp.elem);
