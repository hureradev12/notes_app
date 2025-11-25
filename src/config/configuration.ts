export default () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/notes_app',
    nodeEnv: process.env.NODE_ENV || 'development',
});