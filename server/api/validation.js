import { createApp, useBody } from 'h3';
import cors from 'cors';
import { HtmlValidate } from 'html-validate-es';
import { formatterFactory } from 'html-validate';
const app = createApp();
app.use(cors());
export default defineEventHandler( async (event) => {
    event.res.setHeader('X-Frame-Options', 'ALLOWALL')
    event.res.setHeader('Access-Control-Allow-Origin', '*')
    event.res.setHeader('Access-Control-Allow-Methods', '*')
    event.res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    const body = await useBody(event.req);
    const validateHtml = new HtmlValidate();
    const validate = validateHtml.validateString(body);
    const formatErrors = formatterFactory('codeframe');

    console.log(validate.valid, formatErrors(validate.results));
    return { validated: validate.valid, errors: formatErrors(validate.results) }
})