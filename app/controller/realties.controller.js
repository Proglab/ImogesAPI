
const db = require('../models');

const Realties = db.realties;
const Librarycategories = db.librarycategories;
const Libraries = db.libraries;

exports.getAll = (req, res) => {
  let scope = [];
  if(req.query) {
    if(req.query.limit)
    {
      if(!req.query.offset) req.query.offset = 0;
      scope.push({method: ['limit', Number(req.query.offset), Number(req.query.limit)]});
    }
    if(req.query.order_field) {
      let order = !req.query.order_direction ? 'DESC' : req.query.order_direction;
      scope.push({method: ['order', req.query.order_field, order]});
    }

    if(req.query.media) scope.push('withMedia');
    if(req.query.status) scope.push({method: ['status', req.query.status]});
    if(req.query.star) scope.push({method: ['star', Number(req.query.star)]});
    if(req.query.active) scope.push(['active']);
  }
  Realties.scope(scope).findAll()
    .then(realties => {
      res.status(200).json({
        "description": "Realties list",
        "realties": realties
      });
    })
    .catch(err => {
      console.log("error real", err)
      res.status(500).json({
        "description": "Can not access",
        "error": err
      });
    });
};

exports.getRealtiesByProject = (req, res) => {
  console.log('getRealtiesByProject');
  console.log('id: ' + req.params.id);

  let scope = [];
  scope.push({method: ['byProject', req.params.id]});
  if(req.query){
    if(req.query.limit)
    {
      if(!req.query.offset) req.query.offset = 0;
      scope.push({method: ['limit', Number(req.query.offset), Number(req.query.limit)]});
    }
    if(req.query.order_field) {
      let order = !req.query.order_direction ? 'DESC' : req.query.order_direction;
      scope.push({method: ['order', req.query.order_field, order]});
    }

    if(req.query.media) scope.push('withMedia');
    if(req.query.status) scope.push({method: ['status', req.query.status]});
    if(req.query.star) scope.push(['star']);
    if(req.query.active) scope.push(['active']);
  }
  if(!req.query.countonly){
    Realties.scope(scope).findAll().then(realties => {
      res.status(200).json({
        "description": "getRealtiesByProject - " + req.params.id,
        "realties": realties
      });
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access",
        "error": err
      });
    });
  }else{
    Realties.scope(scope).count().then(totalRealties => {
      res.status(200).json({
        "description": "getRealtiesByProject - " + req.params.id,
        "totalRealties": totalRealties
      });
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access",
        "error": err
      });
    });
  }
};

exports.getOne = (req, res) => {
  console.log('getOne');
  console.log('id: ' + req.params.id);

  let scope = [];
  if(req.query){
    if(req.query.media) scope.push('withMedia');
    if(req.query.status) scope.push({method: ['status', req.query.status]});
    if(req.query.active) scope.push(['active']);
    if(req.query.project) scope.push(['withProject']);
  }

  Realties.scope(scope).findByPk(req.params.id).then(realty => {
    res.status(200).json({
      "description": "getOne - " + req.params.id,
      "realty": realty
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access",
      "error": err
    });
  });
};

exports.update = (req, res) => {
  const { realtyId } = req.params;
  return Realties.update(req.body, {
    where: { id: realtyId },
  })
    .then((realty) => {
      res.send({ success: true, realty });
    })
    .catch((error) => {
      res.status(400).send({ success: false });
    });
};

exports.create = (req, res) => {
  const { projectId } = req.params;
  return Realties.create({ ...req.body, projectId })
    .then(() => {
      res.status(201).send({ success: true });
    })
    .catch(() => {
      res.status(400).send({ success: false });
    });
};
