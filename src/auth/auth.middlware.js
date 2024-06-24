import AuthService from './auth.service';
import { ErrorsUtil } from '../utils';

const { UnauthorizedError, PermissionError } = ErrorsUtil;

export default class AuthMiddlaware {
    static authenticate() {
        return (req, res, next) => {
            try {
                const authorizationHeader = req.headers.authorization;

                if (!authorizationHeader) throw new UnauthorizedError('1');

                const accessToken = authorizationHeader.split(' ')[1];
                if (!accessToken) throw new UnauthorizedError('2');

                const user = AuthService.validateAccessToken(accessToken);

                if (!user) throw new UnauthorizedError('5');

                res.locals.auth = { user };
                next();
            } catch (error) {
                next(error);
            }
        };
    }

    static authenticateFor(accessScopes) {
        const access = accessScopes.map((r) => `access:${r}`);
        return (req, res, next) => {
            try {
                const authorizationHeader = req.headers.authorization;


                if (!authorizationHeader) throw new UnauthorizedError('1');

                const accessToken = authorizationHeader.split(' ')[1];

                if (!accessToken) throw new UnauthorizedError('2');


                const user = AuthService.validateAccessToken(accessToken);

                if (!user) throw new UnauthorizedError('5');

                const scope = `access:${user.role}`;

                if (!(access.includes(scope))) throw new PermissionError('6');
                res.locals.auth = { user };
                // req.user_id = decoded.id;
                req.user_id = user.id;
                console.log("authmoddlwar 53 accsess user id :   ", user.id); 
                next();
            } catch (error) {
                next(error);
            }
        };
    }

    static authenticateForSocket(client, res, next) {
        try {
            const accessToken = client.handshake.headers.authorization;

            if (!accessToken) throw new UnauthorizedError('111');
    
            const user = AuthService.validateAccessToken(accessToken);
            
            if (!user || user?.role === 'admin') throw new UnauthorizedError('333');
    
            client.client.locals = { user };
            next();
        } catch (error) {
            next(error);
        }
    }

    static isLoggedIn(req, res, next) {
        try {
            req.user ? next() : res.sendStatus(401);
        } catch (error) {
            next(error);
        }
    }
}