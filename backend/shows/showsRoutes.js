// node dependencies
const express = require('express');
const knex = require('knex');

// Configuration 
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const router = express.Router();

// GET all shows
router.get('/', (req, res) => {
  db('shows')
    .then(shows => {
      res.status(200).json(shows);
    })
    .catch(err => res.status(500).json(err));
});


// GET all shows for specific genre_id



// GET all shows for specific user_id


// GET one show
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const show = await db('shows')
      .where({ id })
      .first();

    if (show) {
      res.status(200).json(show);
    } else {
      res.status(404).json({ message: "Show not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


// POST new show
router.post('/', (req, res) => {
  const show = req.body;
  db.insert(show)
    .into('shows')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;