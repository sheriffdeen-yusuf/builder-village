import db from "../models/index.js";

const Client = db.clients;

// Add clients

const add_client = async (req, res) => {
  let info = {
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
  };
  const client = await Client.create(info);
  res.status(200).send(client);
};

const get_all_client = async (req, res) => {
  const clients = await Client.findAll({});
  res.status(200).send(clients);
};

const get_single_client = async (req, res) => {
  let req_id = req.params.id;
  const client = await Client.findOne({ where: { id: req_id } });
  res.status(200).send(client);
};

const update_client = async (req, res) => {
  let req_id = req.params.id;
  const client = await Client.update(req.body, { where: { id: req_id } });
  res.status(200).send(client);
};

const delete_client = async (req, res) => {
  let req_id = req.params.id;
  await Client.destroy({ where: { id: req_id } });
  res.status(200).send("client deleted successfully");
};

export {
  add_client,
  get_all_client,
  delete_client,
  update_client,
  get_single_client,
};
