const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteAllData() {
    try {
        // Delete all records from the User model
        await prisma.user.deleteMany({});
        console.log('All data deleted successfully.');
    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

deleteAllData();