//servidor básico com Express e Socket.io.
import express, { Application } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

// Extensão da interface Socket para adicionar a propriedade username
interface CustomSocket extends Socket {
    username?: string;
} 

interface Room {
    name: string;
    messages: { id: string; username: string; message: string }[];
    
}
class App {
    private app: Application;
    private http: http.Server;
    private io: Server;
    private rooms: Room[];

    constructor() {
        
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new Server(this.http);
        this.rooms = [];  
        this.listenSocket(); // Configura o servidor de WebSocket
        this.setupRoutes();  // Configura as rotas da aplicação
    }

    // Inicia o servidor HTTP na porta 3000
    listenServer() {
        this.http.listen(5000, () => console.log('Server is running on http://localhost:5000'));
    }

    // Configura os eventos de WebSocket
    listenSocket() {
        this.io.on('connection', (socket: CustomSocket) => {
            console.log('User connected =>', socket.id);

            // Enviar lista de salas quando o cliente solicitar
            socket.on('getRooms', () => {
                socket.emit('roomsList', this.rooms);
            });

            // Criar uma nova sala
            socket.on('createRoom', ({name}) => {
                const roomExists = this.rooms.find((room) => room.name === name);
                if (roomExists) {
                    socket.emit('error', 'A Sala já existe');
                    return;
                }

                const newRoom: Room = { 
                    name,
                    messages: [], 
                     
                };
                this.rooms.push(newRoom);
                this.io.emit('roomsList', this.rooms);  // Atualiza a lista de salas para todos os clientes
                socket.emit('roomCreated', newRoom);  // Envia a sala criada para o usuário
            });

            // Entrar em uma sala
            socket.on('joinRoom', ({ username, room }) => {
                const roomObj = this.rooms.find(r => r.name === room);
                if (!roomObj) {
                    socket.emit('error', 'Room does not exist');
                    return;
                }

                socket.username = username;
                socket.join(room);
                this.io.to(room).emit('message', { id: this.generateMessageId(), username: 'System', message: `${username} has joined the room!` });
                socket.emit('joinedRoom', roomObj);  // Envia as informações da sala para o usuário
            });

            // Enviar uma mensagem para a sala
            socket.on('message', (data) => {
                const roomObj = this.rooms.find(r => r.name === data.room);
                
                if (!roomObj) return;
                
                // Verifica se a mensagem está vazia ou contém apenas espaços
                if (!data.message || data.message.trim() === '') {
                    socket.emit('error', 'A mensagem não pode estar vazia.');
                    return;
                }

                const message = { 
                    id: this.generateMessageId(), 
                    username: data.username, 
                    message: data.message.trim() // Remove espaços extras
                };

                roomObj.messages.push(message);  // Adiciona a mensagem à sala
                this.io.to(data.room).emit('message', { ...message, room: data.room });  // Envia a mensagem para todos na sala
            });

            // Desconectar o usuário
            socket.on('disconnect', () => {
                console.log(`${socket.username || socket.id} disconnected`);
            });
        });
    }

    // Configura as rotas da aplicação
    setupRoutes() {
        this.app.use(express.static(path.join(__dirname, '..', 'public')));  // Serve arquivos estáticos
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));  // Serve o arquivo principal da aplicação
        });
    }

    // Função auxiliar para gerar IDs únicos para mensagens
    private generateMessageId(): string {
        return Math.random().toString(36).substr(2, 9);  // Gera um ID único baseado em números aleatórios
    }
}

// Inicializa e executa a aplicação
const app = new App();
app.listenServer();
