const db = require('../models');
const Users = db.users;
const bcrypt = require('bcryptjs');
const _ = require('lodash');

// Post a Customer
exports.create = (req, res) => {

  const { role } = req.body;
  delete req.body.role;
  req.body.password = bcrypt.hashSync(req.body.password, 8);
    Users.create({ ...req.body })
      .then(customer => {
        return customer.addRoles(role)
          .then(() => {
            return customer.addRealties(parseInt(req.body.realties))
          })
          .then(() => {
            return customer.reload();
          })
          .then((client) => {
            res.status(201).send(client);
          })
          .catch((error) => {
            res.status(500).send({ message: 'Unable to create the user', error});
          });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
};

// FETCH all Customers
exports.findAll = (req, res) => {
    Users.findAll().then(customers => {
        // Send all customers to Client
        res.send(customers);
    });
};

/**
 * Find user by roleId
 * @param req
 * @param res
 * @returns {Promise<void>} Return the user with his realties
 */
exports.findByRole = async (req, res) => {
  try {
    const scope = [{ method: ['withRole', req.query.role]}, 'withRealties'];
    const customers = await Users.scope(scope).findAll();

    const projects = [];
    customers.forEach((client, index) => {
      const projectsList = [];
      client.realties.forEach(realty => {
        projectsList.push(realty.project.dataValues.id);
        projects.push(realty.project.dataValues);
      });
      client.dataValues.projectsList = _.uniq(projectsList);
      customers[index] = client;
    });

    res.send({ customers, projects: _.uniqBy(projects, 'id') });
  } catch (error) {
    res.status(500).send('An error occurred')
  }
}

// Find a Customer by Id
exports.findById = (req, res) => {
    let scope = [];
    if(req.query.realties) scope.push('withRealties');
    Users.scope(scope).findByPk(req.params.customerId).then(customer => {
        res.send(customer);
    })
};

// Update a Customer
exports.update = (req, res) => {
    // A modifier pour sécuriser -> si pas admin, userId vient du token si pas de customerId
    const id = req.params.customerId; // ok si admin détecté

    Users.update(req.body,
        { where: {id: id} }
    ).then(() => {
        res.status(200).send( {auth: true, message: "updated successfully a customer with id = " + id});
    }).catch((err) => {
      res.status(500).send( {auth: false, message: err});
    });
};

// Delete a Customer by Id
exports.delete = (req, res) => {
    const id = req.params.customerId;
    Users.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a customer with id = ' + id);
    });
};

// validation du compte via mail
exports.validate = (req, res) => {
    Users.update( { validated: 1},
        { where: {id: req.userId} }
    ).then((data) => {
        res.status(200).send({auth: true, message: "updated successfully a customer with id = " + req.userId});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({message: "Houston we've got a problem :)"});
    });
};

exports.deleteRealty = (req, res) => {
  Users.findOne({
    where: { id: req.body.userId },
  })
    .then((user) => {
      return user.removeRealties([req.body.realtyId]);
    })
    .then(() => {
      res.send({ success: true });
    })
    .catch((error) => {
      res.status(500).send({ success: false, error });
    })
};

exports.addRealty = (req, res) => {
  Users.findOne({
    where: { id: req.body.userId },
  })
    .then((user) => {
      return user.addRealties(Number(req.body.realtyId))
    })
    .then(() => {
      res.send({success: true });
    })
    .catch((error) => {
      res.status(500).send({ success: false });
    });
}