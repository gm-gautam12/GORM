import { db } from '../mysql-connection/MySQLConnection.js';


export class TransactionManager {

    static async withTransaction(callback: (connection: any) => Promise<void>){
        const connection = await db.getConnection(); 

        try {
            await connection.beginTransaction();
            await callback(connection);
            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        }finally {
            connection.release();
        }
    }

}