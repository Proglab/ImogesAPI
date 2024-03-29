
const db = require('../models');
const Projects = db.projects;

exports.getAll = (req, res) => {
    console.log('getAll');
    let scope = [];
    if(req.query){
        if(req.query.active) scope.push('active');
        if(req.query.limit)
        {
            if(!req.query.offset) req.query.offset = 0;
            scope.push({method: ['limit', Number(req.query.offset), Number(req.query.limit)]});
        }
        if(req.query.order_field) {
            let order = !req.query.order_direction ? 'DESC' : req.query.order_direction;
            scope.push({method: ['order', req.query.order_field, order]});
        }
        if(req.query.diffused) scope.push('diffused');
        if(req.query.media) scope.push('withMedia');
        if(req.query.realties) scope.push('withRealties');
    }

    if(!req.query.countonly){
        scope.push('withPhase');
        Projects.scope(scope).findAll().then(projects => {
            res.status(200).json({
                "description": "projects list",
                "projects": projects
            });
        }).catch(err => {
            if (err.name === 'SequelizeDatabaseError')
            {
                res.status(500).json({
                    "description": err.parent.sqlMessage,
                    "error": err
                });
            }
            else
            {
                res.status(500).json({
                    "description": "Can not access",
                    "error": err
                });
            }
        });
    }else{
        Projects.scope(scope).count().then(totalProjects => {
            res.status(200).json({
                "description": "count projects",
                "totalProjects": totalProjects
            });
        }).catch(err => {
            if (err.name === 'SequelizeDatabaseError')
            {
                res.status(500).json({
                    "description": err.parent.sqlMessage,
                    "error": err
                });
            }
            else
            {
                res.status(500).json({
                    "description": "Can not access",
                    "error": err
                });
            }
        });
    }
};

exports.getOne = (req, res) => {
    console.log('getOne');
    let scope = [];
    if(req.query){
        if(req.query.active) scope.push('active');
    }
    if(req.query.diffused) scope.push('diffused');
    if(req.query.media) scope.push('withMedia');
    scope.push('withPhase');

    Projects.scope(scope).findByPk(req.params.id).then(project => {
        res.status(200).json({
            "description": "get a project",
            "project": project
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access",
            "error": err
        });
    });
};

exports.create = (req, res) => {
    return Projects.create(req.body, {
        include: [{
            association: Projects.projecttypeId
        }]
    })
      .then((project) => {
          return project.reload();
      })
      .then((project) => {
          res.status(201).send({ success: true, project });
      })
      .catch((error) => {
          res.status(400).send({ success: false, error });
      });
};

exports.update = (req, res) => {
    const { id } = req.params;
    return Projects.update(req.body, {
        where: { id: id}
    }).then(() => {
        res.status(200).send({ success: true });
    })
      .catch((error) => {
          res.status(500).send({success: false, error });
      });
}