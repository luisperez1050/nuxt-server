import { useBody } from 'h3';

export default defineEventHandler( async (req, res) => {
    const body = await useBody(req);

    return { body }
})