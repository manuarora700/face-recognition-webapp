const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const database = {
	users: [
	{
		id: '123',
		name: 'Manu',
		email: 'manu@gmail.com',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'Sally',
		email: 'sally@gmail.com',
		entries: 0,
		joined: new Date()
	}
	],
	login: [
		{
			id: "987",
			hash: '',
			email: 'manu@gmail.com'
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

//for signin
app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json('Success');
	} else {
		res.status(400).json('Error logging in');
	}
})

app.post('/register', (req,res) => {
	const { email, name, password } = req.body
	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		} 
	})
	if (!found) {
		res.status(404).json('Not found');
	}
})

app.post('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		} 
	})
	if (!found) {
		res.status(404).json('Not found here');
	}
})

app.listen(3000, () => {
	console.log("running okay! on port 3000");
});



/*
/ --> res = this is working
/signin --> POST = success/failure
/register --> POST = user object
/profile/:userId --> GET = user
/image --> PUT --> user updated
*/