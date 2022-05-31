import { useBody } from 'h3';
import { HtmlValidate } from 'html-validate-es';
import { formatterFactory } from 'html-validate';
export default defineEventHandler( async (event) => {
    event.res.setHeader("Access-Control-Allow-Origin", "*");
    const body = await useBody(event);
    const validateHtml = new HtmlValidate();
    const validate = validateHtml.validateString(body);
    const formatErrors = formatterFactory('codeframe');

    console.log(validate.valid, formatErrors(validate.results));
    return { validated: validate.valid, errors: formatErrors(validate.results) }
})