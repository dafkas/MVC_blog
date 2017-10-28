const sanitizeHtml = require('sanitize-html');

//sanitize content
exports.sanitizeContent = (req, res, next) =>{
    console.log(res.locals.h.allowedTags);
    const cleanContent = sanitizeHtml(req.body.content, {
        allowedTags: res.locals.h.allowedTags,
        allowedAttributes: res.locals.h.allowedAttributes
    });
    req.body.content = cleanContent;
    next();
}