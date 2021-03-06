const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getUser,
  getUsers,
  viewProfile,
  addProfile
}

function getUsers (db = connection) {
  return db('users').select()
}

function getUser (id, db = connection) {
  return db('users').where('id', id).first()
}

function viewProfile (id, db = connection) {
  return db('users')
    .join('socials', 'users.id', 'socials.user_id')
    .where('users.id', id)
    .select(
      'users.id as userId',
      'socials.user_id as profileId',
      'name',
      'email',
      'phone',
      'facebook',
      'instagram',
      'linkedin',
      'ps4_xbox',
      'github',
      'twitter'

    )
    .then((result) => ({
      id: result[0].userId,
      name: result[0].name,
      email: result[0].email,
      phone: result[0].phone,
      facebook: result[0].facebook,
      instagram: result[0].instagram,
      linkedin: result[0].linkedIn,
      ps4_xbox: result[0].ps4_xbox,
      github: result[0].github,
      twitter: result[0].twitter

    }))
}

function addProfile (name, email, phone, facebook, instagram, linkedin, ps4Xbox, github, Twitter, db = connection) {
  return db('users')
    .insert({ email, name, phone })

    .then((result) => {
      console.log(result) // this result is just id from users table and it is a result of promises
      const user_id = result[0]
      return db('socials').insert({ facebook, instagram, linkedin, ps4Xbox, github, Twitter, user_id })
    })
}
