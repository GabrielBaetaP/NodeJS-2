import { app } from './app.js'

app.listen({
	host: "0.0.0.0",
	port: 3333
	}).then(() => {
	console.log(`servidor está rodando na porta 3333`)
}) 