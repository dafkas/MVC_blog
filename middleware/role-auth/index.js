const models = require('../../models')

exports.roleAuth = (role) => {
    return (req, res, next) =>{
        models.post.findById(req.params.id).then(post => {
            if(role.indexOf(req.user.role) > -1){
                if(req.user.role == 'admin' || req.user.userId == post.userId){
                    next();
                }
            }else{
                req.flash('error', 'Not allowed!');
                res.redirect('back');
            }
        });
    }
}
