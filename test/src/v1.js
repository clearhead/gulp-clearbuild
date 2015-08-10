/* optimizely_evaluate=force */
import { logger } from './mods/utils';
import jsxr from 'jsxr';

const test = '**********\nclearbuild test2\n**********';
logger(test);

$.exp = $.exp || {};

$.exp.elem = (
  <div className="exp-container warn">
    <p className="msg">Test 1 of the clearbuild system.</p>
  </div>
);

/* optimizely_evaluate=safe */
$('body').prepend($.exp.elem);
