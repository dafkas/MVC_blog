exports.menu = [
    {slug: '/', title: 'Index',},
    {slug: '/register', title: 'Register',},
    {slug: '/login', title: 'Login', },
];

exports.dashboardMenu = [
    {slug: '/', title: 'Index',},
    {slug: '/logout', title: 'Logout',},
    {slug: '/post/create', title: 'Create a post'},
];

exports.allowedTags = [ 
'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre'];

exports.allowedAttributes = {
 'a': [ 'href' ]
};