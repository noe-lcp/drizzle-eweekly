import { AppService, UserCreate } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getUser(params: {
        id: string;
    }): Promise<void>;
    createUser(body: UserCreate): Promise<void>;
    updateUser(params: {
        id: string;
    }): Promise<void>;
    deleteUser(params: {
        id: string;
    }): Promise<void>;
}
